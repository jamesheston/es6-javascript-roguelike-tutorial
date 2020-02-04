import Entity from '../entity';
import * as ROT from 'rot-js';
import {RenderOrders} from '../../ui/renderOrders';

export default class Actor extends Entity {
  constructor(name, x, y, char, color, components, blocksMove = true) {
    const renderOrder = RenderOrders.ACTOR;

    super(name, x, y, char, color, blocksMove, renderOrder);

    const {
      combat,
      ai,
    } = {...components};

    if( combat ) {
      this.combat = combat;
      this.combat.owner = this;
    }
    if( ai ) {
      this.ai = ai;
      this.ai.owner = this;
    }  
  }
  move(dx, dy) {
    // Adjust entity x and y position by adding passed values to current values
    this.x += dx;
    this.y += dy;
  }
  moveToward(target, level, entities) {
    // First, compute a path array to target that doesn't factor in blocking entities,
    // then loop through the closest 5 steps of that until we find an unoccupied space.
    // Then, we compute a seconod path array to that unoccupied space. This double-path
    // approach is used to prevent NPCs from just standing still or "fleeing" when one 
    // other actor blocks the path to the player.

    // build a list of tiles with blocking entities
    const occupiedTiles = {};
    for( const entity of entities ) {
      if( entity !== this && entity !== target && entity.blocksMove ) {
        occupiedTiles[`${entity.x},${entity.y}`] = true;
      }
    }

    const passableCallback1 = (x, y) => {
      if( level.tiles[`${x},${y}`].blocksMove === false ) {
        return true;
      }      
    }
    const aStar1 = new ROT.Path.AStar(target.x, target.y, passableCallback1);    
    let path1 = []; 
    aStar1.compute( this.x, this.y, (x, y) => {
      path1.push({x, y});
    });

    // remove the first and last entries from the array because they are 
    // `this` entity and target locations
    path1.splice(0, 1);
    path1.splice(-1);    

    let openX, openY;    

    // Loop through last 5 entries in path array and store x & y of the first unoccupied tile
    // we find. This will become the target for our second path. 
    for( var i = 0; i < 5 && i < path1.length; i++ ) {
      const {x, y} = {...path1[path1.length - 1 - i]};
      if(! occupiedTiles[`${x},${y}`]) {
        openX = x;
        openY = y;
      }
    }

    const passableCallback2 = (x, y) => {
      if( level.tiles[`${x},${y}`] && level.tiles[`${x},${y}`].blocksMove === false && occupiedTiles[`${x},${y}`] === undefined) {
        return true;
      }
    }

    const aStar2 = new ROT.Path.AStar(openX, openY, passableCallback2);

    let path2 = [];

    aStar2.compute( this.x, this.y, (x, y) => {
      path2.push({x, y});
    });

    // remove the first entry from the array because it is 
    // `this` entity's location
    path2.splice(0, 1);

    const maxPathLen = 25;
    // Make sure path exists, and that its length is shorter than maxPathLen. 
    // Keeping the path size relatively low helps ensure monsters don't run all around
    // the map if there's an alternate route.
    if( path2.length > 0 && path2.length <= maxPathLen ) {
      this.x = path2[0]['x'];
      this.y = path2[0]['y'];
    } else {
      // entity just sits around waiting for the rapture
    }
  }
}
import Tile, {tileDict} from './tile';
import Rectangle from './rectangle';
import {randInt} from '../lib/randomUtil';
import {colors} from '../ui/colors';
import Actor from '../entity/actor/actor';
import Combat from '../entity/actor/components/combat';
import {MeleeAttacker} from '../entity/actor/components/ai';

const ROOM_MAX_SIZE = 10;
const ROOM_MIN_SIZE = 6;
const MAX_ROOMS = 30;
const MAX_ENEMIES_PER_ROOM = 3;

export default class Level {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = this.initTiles();
  }

  initTiles() {
    let tiles = {};
    for( let y = 0; y < this.height; y++ ) {
      for( let x = 0; x < this.width; x++ ) {
        tiles[`${x},${y}`] = new Tile( tileDict['dungeon wall'] );
      }
    }
    return tiles;
  }

  generate(player, entities) {
    const rooms = [];
    let numRooms = 0;

    for( let i = 0; i < MAX_ROOMS; i++ ) {
      // generate a room of random width and height within size constraints
      const w = randInt(ROOM_MIN_SIZE, ROOM_MAX_SIZE);
      const h = randInt(ROOM_MIN_SIZE, ROOM_MAX_SIZE);
      // place it on a random position within map boundries
      const x = randInt(0, this.width - w - 1);
      const y = randInt(0, this.height - h - 1);

      const newRoom = new Rectangle(x, y, w, h);
      // make sure this new room doesn't overlap with any previously generated rooms
      // before adding it to the level
      if( rooms.some( r => r.intersects(newRoom) ) ) {
        continue; // continue exits this iteration of loop and goes ahead to next
      }
      // else this room is valid, add it to level
      this.digRoom(newRoom);

      const [newX, newY] = newRoom.center(); 
      // if this is the first room added to the map, place the player in the middle
      // of this room
      if( numRooms === 0 ) {
        player.x = newX;
        player.y = newY;
      
      // if this isn't the first room, we need to dig a tunnel between this room
      // and the previous one
      } else {
        const [prevX, prevY] = rooms[numRooms - 1].center();
        // "Flip a coin" to choose whether to dig up or over first
        if( randInt(0,1) === 1 ) {
          this.digHTunnel(prevX, newX, prevY);
          this.digVTunnel(prevY, newY, newX)
        } else {
          this.digVTunnel(prevY, newY, prevX);
          this.digHTunnel(prevX, newX, newY);
        }
      }
      this.addEnemiesToRoom(newRoom, entities);

      numRooms++;
      rooms.push(newRoom);
    }
  }

  digRoom(room) {
    for(let x = room.x1 + 1; x < room.x2; x++) {
      for(let y = room.y1 + 1; y < room.y2; y++) {
        this.tiles[`${x},${y}`] = new Tile( tileDict['dungeon floor'] );
      }
    }
  }

  digHTunnel(x1, x2, y) {
    for(let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      this.tiles[`${x},${y}`] = new Tile( tileDict['dungeon floor'] );
    } 
  }

  digVTunnel(y1, y2, x) {
    for(let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      this.tiles[`${x},${y}`] = new Tile( tileDict['dungeon floor'] );
    } 
  }

  addEnemiesToRoom(room, entities) {
    const numOfEnemies = randInt(0, MAX_ENEMIES_PER_ROOM);
  
    for( let i = 0; i < numOfEnemies; i++ ) {
      // Choose a random tile in the room to place the new enemy.
      const x = randInt(room.x1 + 1, room.x2 - 1);
      const y = randInt(room.y1 + 1, room.y2 - 1);
      
      // Only add this enemy if no other entity is already occupying the tile 
      // at x, y.
      if(! entities.some( e => e.x === x && e.y === y ) ) {
        let enemy;
        // 80% chance new enemy is an orc, 20% chance it's a troll
        if( randInt(1, 100) <= 80 ) {
          const combat = new Combat(10, 0, 3);
          const ai = new MeleeAttacker();
          enemy = new Actor('orc', x, y, 'o', colors.DESATURATED_GREEN, {combat, ai});

        } else {
          const combat = new Combat(16, 1, 4);
          const ai = new MeleeAttacker();
          enemy = new Actor('troll', x, y, 'T', colors.DARKER_GREEN, {combat, ai});

        }
        entities.push(enemy);
      }
    }
  }

  blocksMoveAt(x, y) {
    return this.tiles[`${x},${y}`].blocksMove;
  }
}

export const getBlockingActorAtTile = function(actors, x, y) {
  for( const actor of actors ) {
    if( actor.x === x && actor.y === y && actor.blocksMove) {
      return actor;
    }
  }
  return false;
}
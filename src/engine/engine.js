import * as ROT from 'rot-js';
import {addInputListeners} from '../ui/addInputListeners';
import {constants} from '../lib/constants';
import Entity from '../entity/entity';
import {colors} from '../ui/colors';
import {renderMap} from '../ui/renderMap';
import Level from '../level/level';

export default class Engine {
  constructor() {
    this.mapDisplay = new ROT.Display({
      width: constants.MAP_WIDTH,
      height: constants.MAP_HEIGHT,
      fontFamily: 'metrickal, monospace',
    }); 
    document.querySelector('#root').appendChild(this.mapDisplay.getContainer());

    // Initially, place player in the center of the map.
    const playerX = Math.floor(constants.MAP_WIDTH / 2) - 1;
    const playerY = Math.floor(constants.MAP_HEIGHT / 2) - 1;    
    this.player = new Entity('Player', playerX, playerY, '@', colors.WHITE);
    // Create a yellow NPC with a position 5 tiles left of the player.   
    const npc = new Entity('NPC', playerX - 5, playerY, '@', colors.YELLOW);
    this.entities = [this.player, npc];
    this.level = new Level(constants.MAP_WIDTH, constants.MAP_HEIGHT);

    this.addInputListeners = addInputListeners.bind(this);
    this.addInputListeners();

    this.update();
  }

  update(action = {}) { 
    if( 'PLAYER_MOVE' in action ) {
      const dx = action.PLAYER_MOVE[0];
      const dy = action.PLAYER_MOVE[1];
      const destinationX = this.player.x + dx;
      const destinationY = this.player.y + dy;

      this.player.move(dx, dy);
    }

    renderMap(this.mapDisplay, this.level, this.entities);
  }
}
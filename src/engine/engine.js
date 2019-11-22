import * as ROT from 'rot-js';
import {addInputListeners} from '../ui/addInputListeners';
import {constants} from '../lib/constants';

export default class Engine {
  constructor() {
    this.mapDisplay = new ROT.Display({
      width: constants.MAP_WIDTH,
      height: constants.MAP_HEIGHT,
      fontFamily: 'metrickal, monospace',
    }); 
    document.querySelector('#root').appendChild(this.mapDisplay.getContainer());

    // Initially, place player in the center of the map.
    this.playerX = constants.MAP_WIDTH / 2 - 1;
    this.playerY = Math.floor(constants.MAP_HEIGHT / 2) - 1;

    this.addInputListeners = addInputListeners.bind(this);
    this.addInputListeners();

    this.update();
  }

  update(action = {}) { 
    if( 'PLAYER_MOVE' in action ) {
      const dx = action.PLAYER_MOVE[0];
      const dy = action.PLAYER_MOVE[1];

      this.playerX += dx;
      this.playerY += dy;
    }

    this.mapDisplay.clear();
    this.mapDisplay.draw(this.playerX, this.playerY, '@');
  }
}
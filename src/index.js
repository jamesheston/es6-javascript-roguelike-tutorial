import * as ROT from 'rot-js';
import {addInputListeners} from './addInputListeners';
import WebFont from 'webfontloader';
import './app.css';

const constants = {
  MAP_WIDTH: 80,
  MAP_HEIGHT: 45,
};

class Engine {
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

    // Use bind to pass _this_ Engine instance to the addInputListener() method 
    // defined in a separate file, so it can make calls to Engine.update().
    this.addInputListeners = addInputListeners.bind(this);
    this.addInputListeners();

    this.update();
  }

  update(action = {}) { 
    // Notice that in the update parameters above, we define the default action 
    // as an empty object so that we can check if a key such as 'PLAYER_MOVE' 
    // exists without worrying about throwing an error when it doesn't, like
    // in our constructor's call to update(), where no action was passed.
    
    if( 'PLAYER_MOVE' in action ) {
      const dx = action.PLAYER_MOVE[0];
      const dy = action.PLAYER_MOVE[1];

      this.playerX += dx;
      this.playerY += dy;
    }

    // Before redrawing the '@' symbol at its new position, we need to clear the
    // display, or the drawings of the player at previous positions will remain,
    // resulting in a bunch of undesired '@'s cluttering our map.
    this.mapDisplay.clear();
    this.mapDisplay.draw(this.playerX, this.playerY, '@');
  }
}

WebFont.load({
  custom: {
    families: ['Metrickal'],
  },
  active: function() {
    const engine = new Engine();
    window.ENGINE = engine;  
  },
});
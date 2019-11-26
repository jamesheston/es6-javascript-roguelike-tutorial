import * as ROT from 'rot-js';
import {addInputListeners} from '../ui/addInputListeners';
import {constants} from '../lib/constants';
import Actor from '../entity/actor/actor';
import {colors} from '../ui/colors';
import {renderMap} from '../ui/renderMap';
import Level from '../level/level';
import {setRNGSeed} from '../lib/randomUtil';
import {initFovComputer, computeFov} from '../lib/fov';
import {getBlockingActorAtTile} from '../level/level';
import {EngineModes} from './engineModes';

export default class Engine {
  constructor() {
    // init and log rot.js random number generator seed for debugging
    setRNGSeed();

    this.mapDisplay = new ROT.Display({
      width: constants.MAP_WIDTH,
      height: constants.MAP_HEIGHT,
      fontFamily: 'metrickal, monospace',
    }); 
    document.querySelector('#root').appendChild(this.mapDisplay.getContainer());

    this.player = new Actor('Player', -1, -1, '@', colors.WHITE);
    this.entities = [this.player];

    this.level = new Level(constants.MAP_WIDTH, constants.MAP_HEIGHT);
    this.level.generate(this.player, this.entities);

    this.fov = {};
    this.fov.radius = 10;
    initFovComputer(this.level);
    this.fov.map = computeFov(this.player.x, this.player.y, this.fov.radius);
    this.fov.needsRecompute = true;

    this.engineMode = EngineModes.PLAYER_TURN;

    this.addInputListeners = addInputListeners.bind(this);
    this.addInputListeners();

    this.update();
  }

  update(action = {}) { 
    if( 'PLAYER_MOVE' in action && this.engineMode === EngineModes.PLAYER_TURN ) {
      const dx = action.PLAYER_MOVE[0];
      const dy = action.PLAYER_MOVE[1];
      const destinationX = this.player.x + dx;
      const destinationY = this.player.y + dy;

      if(! this.level.blocksMoveAt(destinationX, destinationY) ) {
        const target = getBlockingActorAtTile(this.entities, destinationX, destinationY);
        if( target ) {
          console.log(`You box the ${target.name} right between the ears. POW!`);
        } else {
          this.player.move(dx, dy);
          this.fov.needsRecompute = true;
        }
        this.engineMode = EngineModes.ENEMY_TURN;
      }
    }

    if( this.fov.needsRecompute ) {
      this.fov.map = computeFov(this.player.x, this.player.y, this.fov.radius);
    }

    if( this.engineMode === EngineModes.ENEMY_TURN ) {
      const enemies = this.entities.filter( e => e instanceof Actor && e !== this.player );
      for( const enemy of enemies ) {
        console.log( `The ${enemy.name} awaits further instructions.` );
      }
      this.engineMode = EngineModes.PLAYER_TURN;
    }

    renderMap(this.mapDisplay, this.level, this.entities, this.fov.map);
  }
}
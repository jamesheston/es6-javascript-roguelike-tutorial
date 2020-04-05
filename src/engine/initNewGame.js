import {setRNGSeed} from '../lib/randomUtil';
import Combat from '../entity/actor/components/combat';
import Actor from '../entity/actor/actor';
import {colors} from '../ui/colors';
import Level from '../level/level';
import {initFovComputer, computeFov} from '../lib/fov';
import {EngineModes} from './engineModes';
import {constants} from '../lib/constants';
import {MessageLog} from '../lib/messageLog';

export const initNewGame = function() {
  // init and log rot.js random number generator seed for debugging
  setRNGSeed();  

  // init player
  const combat = new Combat(30, 2, 5);
  const player = new Actor('Player', 0, 0, '@', colors.WHITE, { combat });
  const entities = [player];    

  // init level
  const level = new Level(constants.MAP_WIDTH, constants.MAP_HEIGHT);
  level.generate(player, entities);  

  // init player's FOV
  const fov = {};
  fov.radius = 10;
  initFovComputer(level);
  fov.map = computeFov(player.x, player.y, fov.radius);
  fov.needsRecompute = true;

  // init messageLog 
  const messageLog = new MessageLog();

  const engineMode = EngineModes.PLAYER_TURN;

  return [
    player,
    entities,
    level,
    fov,
    messageLog,
    engineMode,
  ];
};
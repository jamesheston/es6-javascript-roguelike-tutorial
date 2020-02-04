import {colors} from '../../ui/colors';
import {EngineModes} from '../../engine/engineModes';
import {RenderOrders} from '../../ui/renderOrders';

export const killPlayer = function(player) {
  player.char = '%';
  player.color = colors.DARK_RED;
  player.renderOrder = RenderOrders.CORPSE;

  return ['You died!', EngineModes.PLAYER_DEAD];
};

export const killActor = function(actor) {
  const actorName = actor.name.slice(0, 1).toUpperCase() + actor.name.slice(1);
  const message = `${actorName} is dead!`;

  actor.char = '%';
  actor.color = colors.DARK_RED;
  actor.blocksMove = false;
  actor.combat = null;
  actor.ai = null;
  actor.name = `${actor.name} corpse`;
  actor.renderOrder = RenderOrders.CORPSE;

  return message;
};
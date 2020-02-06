import {colors} from '../../ui/colors';
import {EngineModes} from '../../engine/engineModes';
import {RenderOrders} from '../../ui/renderOrders';
import {Message} from '../../lib/messageLog';

export const killPlayer = function(player) {
  player.char = '%';
  player.color = colors.DARK_RED;
  player.renderOrder = RenderOrders.CORPSE;
  const message = new Message(`The ${player.name} is dead!`, colors.DARK_RED);

  return [message, EngineModes.PLAYER_DEAD];
};

export const killActor = function(actor) {
  const message = new Message(`The ${actor.name} is dead!`, colors.DARK_RED);

  actor.char = '%';
  actor.color = colors.DARK_RED;
  actor.blocksMove = false;
  actor.combat = null;
  actor.ai = null;
  actor.name = `${actor.name} corpse`;
  actor.renderOrder = RenderOrders.CORPSE;

  return message;
};
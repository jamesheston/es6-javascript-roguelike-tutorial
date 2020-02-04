const EngineModes = {
  PLAYER_TURN: 'PLAYER_TURN',
  ENEMY_TURN: 'ENEMY_TURN',
  PLAYER_DEAD: 'PLAYER_DEAD',
};
// Freeze the object so that it can't be accidentally modified anywhere else
// in the program.
Object.freeze(EngineModes);

export {EngineModes};
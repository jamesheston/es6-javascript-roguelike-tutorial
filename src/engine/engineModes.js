const EngineModes = {
  PLAYER_TURN: 'PLAYER_TURN',
  ENEMY_TURN: 'ENEMY_TURN',
};
// Freeze the object so that it can't be accidentally modified anywhere else
// in the program.
Object.freeze(EngineModes);

export {EngineModes};
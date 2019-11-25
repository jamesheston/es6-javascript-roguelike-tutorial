import * as ROT from 'rot-js';

export const setRNGSeed = function() {
  // Date.now() returns a integer that will always be different from a previous 
  // game, making it a good seed for our RNG.
  let seed = Date.now();
  console.log("seed:", seed);
  ROT.RNG.setSeed(seed); 
};

export const randInt = function (min, max) {
  const range = max + 1 - min;
  // generate a random number within the given range
  const a = Math.floor((ROT.RNG.getUniform() * range));
  return a + min;
};
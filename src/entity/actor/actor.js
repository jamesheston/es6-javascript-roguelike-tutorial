import Entity from '../entity';

export default class Actor extends Entity {
  constructor(name, x, y, char, color, blocksMove = true) {
    // Calling `super` here passes the listed arguments to Entity.constructor, so that the
    // parent class can access this important data from any methods it might have.
    super(name, x, y, char, color, blocksMove);
  }

  move(dx, dy) {
    // Adjust entity x and y position by adding passed values to current values
    this.x += dx;
    this.y += dy;
  }
}
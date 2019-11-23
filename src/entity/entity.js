export default class Entity {
  constructor(name, x, y, char, color) {
    this.name = name;
    this.x = x;
    this.y = y;
    // char is the symbol drawn to represent this entity, like "@" for the Player 
    this.char = char; 
    this.color = color;
  }

  move(dx, dy) {
    // Adjust entity x and y position by adding passed values to current values
    this.x += dx;
    this.y += dy;
  }
}
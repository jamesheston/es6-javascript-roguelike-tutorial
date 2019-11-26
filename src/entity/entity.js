export default class Entity {
  constructor(name, x, y, char, color, blocksMove = false) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.char = char;
    this.color = color;
    this.blocksMove = blocksMove;
  }
}
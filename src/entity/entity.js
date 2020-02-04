import {RenderOrders} from '../ui/renderOrders';

export default class Entity {
  constructor(name, x, y, char, color, blocksMove = false, renderOrder = RenderOrders.CORPSE) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.char = char;
    this.color = color;
    this.blocksMove = blocksMove;
    this.renderOrder = renderOrder;
  }
  distanceTo(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return Math.sqrt(dx**2 + dy**2);
  }
}
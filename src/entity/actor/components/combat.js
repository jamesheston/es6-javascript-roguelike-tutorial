import {Message} from '../../../lib/messageLog';

export default class Combat {
  constructor(hp, defense, power) {
    this.maxHp = hp;
    this.hp = hp;
    this.defense = defense;
    this.power = power;
  }
  takeDamage(amount) {
    const results = [];

    this.hp -= amount;

    if( this.hp <= 0 ) {
      results.push({ dead: this.owner });
    }

    return results;
  }

  attack(target) {
    let results = [];

    const damage = this.power - target.combat.defense;
    
    if( damage > 0 ) {
      results = [...results,  ...target.combat.takeDamage(damage)];
      results.push({ message: new Message(`The ${this.owner.name} attacks the ${target.name}, dealing ${damage} damage.`) });
    } else {
      results.push({ message: new Message(`The ${this.owner.name} attacks the ${target.name}, but does no damage.`) });
    }

    return results;
  }
}
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
    // capitalize owner name
    const ownerName = this.owner.name.slice(0, 1).toUpperCase() + this.owner.name.slice(1);
    
    if( damage > 0 ) {
      results = [...results,  ...target.combat.takeDamage(damage)];
      results.push({ message: `${ownerName} attacks ${target.name}, dealing ${damage} damage.` });
    } else {
      results.push({ message: `${ownerName} attacks ${target.name}, but does no damage.` });
    }

    return results;
  }
}
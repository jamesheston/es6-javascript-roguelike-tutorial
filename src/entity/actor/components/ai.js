class MeleeAttacker {
  takeTurn(target, fovMap, level, actors) {
    let results = [];

    const actor = this.owner;
    // Atm, enemies only act when within player's fov
    if( fovMap.indexOf(`${actor.x},${actor.y}`) !== -1 ) {
      if( actor.distanceTo(target) >= 2 ) {
        actor.moveToward(target, level, actors);
      } else if (target.combat.hp > 0) {
        const attackResults = actor.combat.attack(target);
        results = [...results, ...attackResults];
      }
    }

    return results;
  }
}

export {MeleeAttacker};
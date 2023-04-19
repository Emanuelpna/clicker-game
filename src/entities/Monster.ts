import { GameMultipliers } from "./Multipliers";

export class Monster {
  public name: string;

  public gold: number;

  public baseHealth: number;
  public health: number = 0;

  public isDead: boolean = false;

  public constructor(name: string, baseHealth: number, gold: number) {
    this.name = name;
    this.gold = gold;
    this.baseHealth = baseHealth;
  }
}

export class MonsterControls {
  public Monster: Monster;
  public gameMultipliers: typeof GameMultipliers;

  public constructor(
    monster: Monster,
    gameMultipliers: typeof GameMultipliers
  ) {
    this.Monster = monster;
    this.gameMultipliers = gameMultipliers;
  }

  public receiveDamage(heroDamage: number) {
    const finalDamage = heroDamage * this.gameMultipliers.damageMultiplier;

    const healthAfterDamage = this.Monster.health - finalDamage;

    const isDead = healthAfterDamage <= 0;

    const finalHealth = isDead ? 0 : healthAfterDamage;

    return { isDead, finalHealth };
  }
}

export type HERO_TIER = 1 | 2 | 3;

export class Hero {
  public name: string;
  public tier: HERO_TIER;

  private _damage: number;
  private _attackSpeed: number;
  public bonusGoldDrop: number = 0;

  public level: number = 1;

  public constructor(
    name: string,
    tier: HERO_TIER,
    damage: number,
    attackSpeed: number
  ) {
    this.name = name;
    this.tier = tier;
    this._damage = damage;
    this._attackSpeed = attackSpeed;
  }

  public get damage() {
    const levelMultiplier = this.level > 1 ? this.level - 1 * 0.2 : 1;

    return this._damage * levelMultiplier;
  }

  public get attackSpeed() {
    const levelMultiplier = this.level > 1 ? this.level - 1 * 0.2 : 1;

    return this._attackSpeed * levelMultiplier;
  }

  public levelUp() {
    this.level++;
  }
}

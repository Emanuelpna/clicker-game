import { useEffect, useState } from "react";

import { Hero } from "../entities/Hero";
import { Monster, MonsterControls } from "../entities/Monster";

import { getRandomMonster } from "../catalogue";
import { GameMultipliers } from "../entities/Multipliers";

export function useGame() {
  const [map, setMap] = useState(1);

  let monstersKilledOnMap = 0;

  const [activeHeroes, setActiveHeroes] = useState(new Set<Hero>());

  const [currentMonster, setCurrentMonster] = useState<Monster>(
    generateMonster()
  );

  function generateMonster() {
    const monster = getRandomMonster();

    const healthBonusByMap = map * 300;

    const healthAfterBonus =
      monster.baseHealth *
      GameMultipliers.monsterHealthMultiplier *
      healthBonusByMap;

    monster.health = healthAfterBonus;

    return monster;
  }

  function killMonster() {
    monstersKilledOnMap++;

    if (monstersKilledOnMap >= 10) {
      monstersKilledOnMap = 0;

      setMap((map) => map++);
    }

    setCurrentMonster(() => generateMonster());
  }

  useEffect(() => {
    const intervals: number[] = [];

    activeHeroes.forEach((hero) => {
      let alreadyDead = false;

      const interval = setInterval(() => {
        if (alreadyDead) {
          killMonster();

          alreadyDead = false;

          return;
        }

        setCurrentMonster((oldMonsterState) => {
          const { finalHealth, isDead } = new MonsterControls(
            oldMonsterState,
            GameMultipliers
          ).receiveDamage(hero.damage);

          alreadyDead = isDead;

          return {
            ...oldMonsterState,
            isDead: isDead,
            health: finalHealth,
          };
        });
      }, 1000 - 1000 * hero.attackSpeed);

      intervals.push(interval);
    });

    return () => {
      console.log("clear");

      for (const interval of intervals) {
        clearInterval(interval);
      }
    };
  }, [activeHeroes]);

  return {
    map,
    monster: currentMonster,
    activeHeroes: Array.from(activeHeroes.values()),
    addNewHero(hero: Hero) {
      activeHeroes.add(hero);

      setActiveHeroes(activeHeroes);
    },
    levelupHero(hero: Hero) {
      hero.levelUp();

      setActiveHeroes(activeHeroes);
    },
  };
}

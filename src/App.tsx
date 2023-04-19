import { useEffect, useLayoutEffect, useState } from "react";

import { useGame } from "./engine/useGame";

import { Burrow, TreeBeast } from "./catalogue/heroes";

import { Hero } from "./entities/Hero";
import { Monster } from "./entities/Monster";

function App() {
  const { map, monster, activeHeroes, addNewHero, levelupHero } = useGame();

  useEffect(() => {
    addNewHero(TreeBeast);
    addNewHero(Burrow);
  }, []);

  return (
    <div className="App">
      <h1>Mapa {map}</h1>

      <br />
      <br />

      {activeHeroes.map((hero) => (
        <div key={hero.name}>
          <strong>
            {hero.name} - Level: {hero.level}
          </strong>

          <br />

          <span>
            {hero.damage} (x{hero.attackSpeed})
          </span>

          <br />

          <button onClick={() => levelupHero(hero)}>+</button>
        </div>
      ))}

      <br />
      <br />

      <div>
        <strong>{monster.name}</strong>

        <span>
          {monster.health} (x{monster.baseHealth})
        </span>
      </div>
    </div>
  );
}

export default App;

import * as monsters from "./monsters";

export function getRandomMonster() {
  const monstersValues = Object.values(monsters);

  return monstersValues[Math.floor(Math.random() * monstersValues.length)];
}

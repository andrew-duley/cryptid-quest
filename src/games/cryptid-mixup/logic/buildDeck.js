import { shuffleCards } from '../../shared/logic/shuffleCards';

export function buildDeck(baseList, pairs = 8) {
  // 1) pick the first N cryptids (N = pairs)
  const chosen = shuffleCards(baseList).slice(0, pairs);

  // 2) duplicate each cryptid into two card instances
  const duplicated = chosen.flatMap(({ id, label }) => ([
    { pairId: id, instanceId: `${id}#1`, label, state: 'faceDown' },
    { pairId: id, instanceId: `${id}#2`, label, state: 'faceDown' },
  ]));

  // 3) shuffle the 16-card array
  return shuffleCards(duplicated)
}
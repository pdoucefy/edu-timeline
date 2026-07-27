/**
 * Returns a new array containing the same elements in a random order using the
 * Fisher–Yates shuffle.
 *
 * @remarks Does not mutate the input. Pool shuffling lives outside the game
 * reducer so the reducer stays pure and deterministic.
 */
export const shuffle = <T>(items: readonly T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

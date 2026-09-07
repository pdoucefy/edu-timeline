/**
 * Simple 32-bit LCG seeded RNG. Returns a float in [0, 1).
 */
const seededRandom = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
};

/**
 * Returns a new array containing the same elements in a random order using the
 * Fisher–Yates shuffle.
 *
 * @remarks Does not mutate the input. Pool shuffling lives outside the game
 * reducer so the reducer stays pure and deterministic.
 *
 * @param seed - Optional seed for deterministic shuffling. When provided, the
 * same seed always produces the same order (useful for SSR/hydration parity).
 */
export const shuffle = <T>(items: readonly T[], seed?: number): T[] => {
  const result = [...items];
  const random = seed !== undefined ? seededRandom(seed) : () => Math.random();

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

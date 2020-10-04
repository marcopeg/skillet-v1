/**
 * Given a set of entries and the surface of the area of the board that is represented,
 * it calculates a list of indicators to score such area.
 * @param {*} entries
 * @param {*} surface
 * @param {*} settings
 */

export const normalizeScore = (value, min = -100, max = 100) => {
  const score = (value - min) / (max - min);
  return score > 1 ? 1 : score < 0 ? 0 : score;
};

export const calculateStats = (entries) => {
  const scoreTot = entries.reduce((acc, curr) => acc + curr.score, 0);
  const score = normalizeScore(scoreTot, 0, entries.length);

  const filledEntries = entries.filter((entry) => entry.value !== null);

  return {
    score,
    fillRate: filledEntries.length / entries.length
  };
};

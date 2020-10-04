/**
 * Given a set of entries and the surface of the area of the board that is represented,
 * it calculates a list of indicators to score such area.
 * @param {*} entries
 * @param {*} surface
 * @param {*} settings
 */

// give or take it goes between -1 and 2
// this turns it into a 0-1 value
const normalizeScore = (value) => {
  const min = -1;
  const max = 1.66;
  const score = (value - min) / (max - min);
  return score > 1 ? 1 : score;
};

export const calculateStats = (entries, surface, settings) => {
  const { baseline, obsolescence, multipliers } = settings.efficiency;
  const now = new Date();

  const totalScore = entries.reduce((acc, curr) => acc + curr.value, 0);

  const updatedEntries$ = ($) => now - $.updatedAt < obsolescence;
  const updatedEntries = entries.filter(updatedEntries$);
  const updatedEntriesRate = entries.length
    ? updatedEntries.length / entries.length
    : 0;
  const obsolentEntriesRate = entries.length ? 1 - updatedEntriesRate : 0;

  const completionRate = entries.length / surface;
  const completionGapRate = 1 - completionRate;
  const entriesScore = totalScore / (entries.length * baseline) || 0;
  const boardScore = totalScore / (surface * baseline);

  // Global score value that factors in all the components with some
  // multipliers applied to them
  const scores = {
    completionRate,
    completionGapRate: 0 - completionGapRate,
    updatedEntriesRate,
    obsolentEntriesRate: 0 - obsolentEntriesRate,
    entriesScore,
    boardScore
  };

  const scoreValues = Object.keys(scores).map((key) => {
    const value = scores[key];
    if (value === 0) return 0;
    return (value * multipliers[key]) / 100;
  });

  const scoreTot = scoreValues.reduce((a, b) => a + b, 0);
  const scoreCount = scoreValues.reduce((a, b) => a + (b !== 0 ? 1 : 0), 0);

  return {
    completionRate,
    completionGapRate,
    updatedEntriesRate,
    obsolentEntriesRate,
    entriesScore,
    boardScore,
    scoreValues,
    scoreTot,
    scoreCount,
    score: scoreCount ? normalizeScore(scoreTot / scoreCount) : 0
  };
};

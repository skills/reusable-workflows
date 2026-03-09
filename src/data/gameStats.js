export const BEST_SCORE_STORAGE_KEY = 'octomatch-best-score'
export const MAX_MOVES = 20

export function getRemainingMoves(moves, maxMoves = MAX_MOVES) {
  return Math.max(maxMoves - moves, 0)
}

export function getHealthPercent(moves, maxMoves = MAX_MOVES) {
  if (maxMoves <= 0) return 0
  return Math.round((getRemainingMoves(moves, maxMoves) / maxMoves) * 100)
}

export function loadBestScore(storage = window.localStorage) {
  const value = storage.getItem(BEST_SCORE_STORAGE_KEY)
  if (value === null) return null

  const parsed = Number.parseInt(value, 10)
  if (!Number.isInteger(parsed) || parsed <= 0) return null
  return parsed
}

export function updateBestScore(score, storage = window.localStorage) {
  const bestScore = loadBestScore(storage)
  if (bestScore !== null && score >= bestScore) return bestScore

  storage.setItem(BEST_SCORE_STORAGE_KEY, String(score))
  return score
}

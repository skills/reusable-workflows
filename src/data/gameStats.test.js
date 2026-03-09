import { beforeEach, describe, expect, it } from 'vitest'
import {
  BEST_SCORE_STORAGE_KEY,
  MAX_MOVES,
  getHealthPercent,
  getRemainingMoves,
  loadBestScore,
  updateBestScore,
} from './gameStats'

describe('gameStats', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('derives remaining moves from max moves', () => {
    expect(getRemainingMoves(0)).toBe(MAX_MOVES)
    expect(getRemainingMoves(3)).toBe(MAX_MOVES - 3)
    expect(getRemainingMoves(MAX_MOVES + 3)).toBe(0)
  })

  it('derives health percentage from moves', () => {
    expect(getHealthPercent(0)).toBe(100)
    expect(getHealthPercent(MAX_MOVES / 2)).toBe(50)
    expect(getHealthPercent(MAX_MOVES)).toBe(0)
  })

  it('loads best score from localStorage', () => {
    expect(loadBestScore()).toBeNull()
    window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, '9')
    expect(loadBestScore()).toBe(9)
  })

  it('updates best score only when score improves', () => {
    expect(updateBestScore(10)).toBe(10)
    expect(window.localStorage.getItem(BEST_SCORE_STORAGE_KEY)).toBe('10')
    expect(updateBestScore(12)).toBe(10)
    expect(window.localStorage.getItem(BEST_SCORE_STORAGE_KEY)).toBe('10')
    expect(updateBestScore(8)).toBe(8)
    expect(window.localStorage.getItem(BEST_SCORE_STORAGE_KEY)).toBe('8')
  })
})

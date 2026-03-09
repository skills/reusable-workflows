import { describe, it, expect } from 'vitest'
import { BASE_CARDS, shuffleArray, createGameCards } from './cards'

describe('BASE_CARDS', () => {
  it('has 8 cards', () => {
    expect(BASE_CARDS).toHaveLength(8)
  })

  it('each card has required properties', () => {
    BASE_CARDS.forEach((card) => {
      expect(card).toHaveProperty('id')
      expect(card).toHaveProperty('name')
      expect(card).toHaveProperty('image')
    })
  })
})

describe('shuffleArray', () => {
  it('returns an array of the same length', () => {
    const input = [1, 2, 3, 4, 5]
    expect(shuffleArray(input)).toHaveLength(input.length)
  })

  it('contains the same elements', () => {
    const input = [1, 2, 3, 4, 5]
    const result = shuffleArray(input)
    expect(result.sort()).toEqual(input.sort())
  })

  it('does not mutate the original array', () => {
    const input = [1, 2, 3, 4, 5]
    const copy = [...input]
    shuffleArray(input)
    expect(input).toEqual(copy)
  })
})

describe('createGameCards', () => {
  it('returns 16 cards (8 pairs)', () => {
    const cards = createGameCards()
    expect(cards).toHaveLength(16)
  })

  it('each card has a uniqueId', () => {
    const cards = createGameCards()
    cards.forEach((card) => {
      expect(card).toHaveProperty('uniqueId')
    })
  })

  it('contains exactly 2 of each base card', () => {
    const cards = createGameCards()
    BASE_CARDS.forEach((baseCard) => {
      const matches = cards.filter((c) => c.id === baseCard.id)
      expect(matches).toHaveLength(2)
    })
  })

  it('all uniqueIds are distinct', () => {
    const cards = createGameCards()
    const uniqueIds = cards.map((c) => c.uniqueId)
    expect(new Set(uniqueIds).size).toBe(16)
  })
})

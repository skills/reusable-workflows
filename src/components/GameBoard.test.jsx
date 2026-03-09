import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GameBoard from './GameBoard'
import * as cardsModule from '../data/cards'
import { BEST_SCORE_STORAGE_KEY, MAX_MOVES } from '../data/gameStats'

// Create a deterministic set of cards for testing
const mockCards = [
  { id: 'a', uniqueId: 'a-1', name: 'Card A', image: '/a.png' },
  { id: 'a', uniqueId: 'a-2', name: 'Card A', image: '/a.png' },
  { id: 'b', uniqueId: 'b-1', name: 'Card B', image: '/b.png' },
  { id: 'b', uniqueId: 'b-2', name: 'Card B', image: '/b.png' },
  { id: 'c', uniqueId: 'c-1', name: 'Card C', image: '/c.png' },
  { id: 'c', uniqueId: 'c-2', name: 'Card C', image: '/c.png' },
  { id: 'd', uniqueId: 'd-1', name: 'Card D', image: '/d.png' },
  { id: 'd', uniqueId: 'd-2', name: 'Card D', image: '/d.png' },
  { id: 'e', uniqueId: 'e-1', name: 'Card E', image: '/e.png' },
  { id: 'e', uniqueId: 'e-2', name: 'Card E', image: '/e.png' },
  { id: 'f', uniqueId: 'f-1', name: 'Card F', image: '/f.png' },
  { id: 'f', uniqueId: 'f-2', name: 'Card F', image: '/f.png' },
  { id: 'g', uniqueId: 'g-1', name: 'Card G', image: '/g.png' },
  { id: 'g', uniqueId: 'g-2', name: 'Card G', image: '/g.png' },
  { id: 'h', uniqueId: 'h-1', name: 'Card H', image: '/h.png' },
  { id: 'h', uniqueId: 'h-2', name: 'Card H', image: '/h.png' },
]

beforeEach(() => {
  vi.restoreAllMocks()
  window.localStorage.clear()
  vi.spyOn(cardsModule, 'createGameCards').mockReturnValue([...mockCards])
})

describe('GameBoard', () => {
  it('renders 16 cards', () => {
    render(<GameBoard />)
    const board = screen.getByTestId('game-board')
    expect(board.children).toHaveLength(16)
  })

  it('starts with 0 moves', () => {
    render(<GameBoard />)
    expect(screen.getByTestId('move-counter')).toHaveTextContent('Moves: 0')
    expect(screen.getByTestId('moves-remaining')).toHaveTextContent(`${MAX_MOVES}/${MAX_MOVES}`)
  })

  it('shows existing best score from localStorage', () => {
    window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, '6')
    render(<GameBoard />)
    expect(screen.getByTestId('best-score')).toHaveTextContent('Best: 6')
  })

  it('flips a card when clicked', async () => {
    const user = userEvent.setup()
    render(<GameBoard />)
    const card = screen.getByTestId('card-a-1')
    await user.click(card)
    expect(card).toHaveClass('flipped')
  })

  it('increments move counter after flipping two cards', async () => {
    const user = userEvent.setup()
    render(<GameBoard />)
    await user.click(screen.getByTestId('card-a-1'))
    await user.click(screen.getByTestId('card-a-2'))
    expect(screen.getByTestId('move-counter')).toHaveTextContent('Moves: 1')
  })

  it('does not reduce health on a successful match', async () => {
    const user = userEvent.setup()
    render(<GameBoard />)
    await user.click(screen.getByTestId('card-a-1'))
    await user.click(screen.getByTestId('card-a-2'))
    expect(screen.getByTestId('moves-remaining')).toHaveTextContent(`${MAX_MOVES}/${MAX_MOVES}`)
  })

  it('keeps rules hint visible after moves', async () => {
    const user = userEvent.setup()
    render(<GameBoard />)

    expect(screen.getByTestId('rule-hint')).toBeInTheDocument()

    await user.click(screen.getByTestId('card-a-1'))
    await user.click(screen.getByTestId('card-a-2'))

    expect(screen.getByTestId('rule-hint')).toBeInTheDocument()
  })

  it('keeps matched cards face-up', async () => {
    const user = userEvent.setup()
    render(<GameBoard />)
    await user.click(screen.getByTestId('card-a-1'))
    await user.click(screen.getByTestId('card-a-2'))
    expect(screen.getByTestId('card-a-1')).toHaveClass('matched')
    expect(screen.getByTestId('card-a-2')).toHaveClass('matched')
  })

  it('flips mismatched cards back after delay', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<GameBoard />)

    await user.click(screen.getByTestId('card-a-1'))
    await user.click(screen.getByTestId('card-b-1'))

    expect(screen.getByTestId('card-a-1')).toHaveClass('flipped')

    await act(() => {
      vi.advanceTimersByTime(900)
    })

    expect(screen.getByTestId('card-a-1')).not.toHaveClass('flipped')
    expect(screen.getByTestId('card-b-1')).not.toHaveClass('flipped')

    vi.useRealTimers()
  })

  it('shows win message when all pairs matched', async () => {
    const user = userEvent.setup()
    render(<GameBoard />)

    // Match all 8 pairs
    const pairs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    for (const letter of pairs) {
      await user.click(screen.getByTestId(`card-${letter}-1`))
      await user.click(screen.getByTestId(`card-${letter}-2`))
    }

    expect(screen.getByTestId('win-message')).toBeInTheDocument()
    expect(screen.getByTestId('best-score')).toHaveTextContent('Best: 8')
    expect(window.localStorage.getItem(BEST_SCORE_STORAGE_KEY)).toBe('8')
  })

  it('does not replace best score when current win is worse', async () => {
    window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, '4')
    const user = userEvent.setup()
    render(<GameBoard />)

    const pairs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    for (const letter of pairs) {
      await user.click(screen.getByTestId(`card-${letter}-1`))
      await user.click(screen.getByTestId(`card-${letter}-2`))
    }

    expect(screen.getByTestId('best-score')).toHaveTextContent('Best: 4')
    expect(window.localStorage.getItem(BEST_SCORE_STORAGE_KEY)).toBe('4')
  })

  it('shows game over at max moves and blocks further flips', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<GameBoard />)

    for (let i = 0; i < MAX_MOVES; i++) {
      await user.click(screen.getByTestId('card-a-1'))
      await user.click(screen.getByTestId('card-b-1'))
      await act(() => {
        vi.advanceTimersByTime(900)
      })
    }

    const untouchedCard = screen.getByTestId('card-c-1')
    await user.click(untouchedCard)

    expect(screen.getByTestId('move-counter')).toHaveTextContent(`Moves: ${MAX_MOVES}`)
    expect(screen.getByTestId('moves-remaining')).toHaveTextContent(`0/${MAX_MOVES}`)
    expect(screen.getByTestId('lose-message')).toBeInTheDocument()
    expect(untouchedCard).not.toHaveClass('flipped')

    vi.useRealTimers()
  })

  it('resets the game when New Game is clicked', async () => {
    const user = userEvent.setup()
    render(<GameBoard />)

    await user.click(screen.getByTestId('card-a-1'))
    await user.click(screen.getByTestId('card-a-2'))
    expect(screen.getByTestId('move-counter')).toHaveTextContent('Moves: 1')

    await user.click(screen.getByRole('button', { name: /new game/i }))
    expect(screen.getByTestId('move-counter')).toHaveTextContent('Moves: 0')
    expect(screen.getByTestId('card-a-1')).not.toHaveClass('matched')
  })
})

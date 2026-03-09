import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GAME_NAME, GAME_SUBTITLE } from './branding/brand'
import App from './App'

vi.mock('./components/GameBoard', () => ({
  default: function MockGameBoard() {
    return <div data-testid="mock-game-board">Mock GameBoard</div>
  },
}))

describe('App', () => {
  it('renders title, subtitle, and game board', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(GAME_NAME)
    expect(screen.getByText(GAME_SUBTITLE)).toBeInTheDocument()
    expect(screen.getByTestId('mock-game-board')).toBeInTheDocument()
  })
})

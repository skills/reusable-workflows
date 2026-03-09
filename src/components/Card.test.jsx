import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from './Card'

const mockCard = {
  id: 'original',
  uniqueId: 'original-a',
  name: 'Original Octocat',
  image: '/images/original.png',
}

describe('Card', () => {
  it('renders face-down by default', () => {
    render(<Card card={mockCard} isFlipped={false} isMatched={false} onClick={() => {}} />)
    const button = screen.getByTestId('card-original-a')
    expect(button).not.toHaveClass('flipped')
    expect(button).toHaveAttribute('aria-label', 'Face-down card')
  })

  it('shows flipped state when isFlipped is true', () => {
    render(<Card card={mockCard} isFlipped={true} isMatched={false} onClick={() => {}} />)
    const button = screen.getByTestId('card-original-a')
    expect(button).toHaveClass('flipped')
    expect(button).toHaveAttribute('aria-label', 'Original Octocat')
    expect(screen.getByText('Original Octocat')).toBeInTheDocument()
  })

  it('calls onClick when clicked while face-down', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Card card={mockCard} isFlipped={false} isMatched={false} onClick={handleClick} />)
    await user.click(screen.getByTestId('card-original-a'))
    expect(handleClick).toHaveBeenCalledWith('original-a')
  })

  it('does not call onClick when already flipped', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Card card={mockCard} isFlipped={true} isMatched={false} onClick={handleClick} />)
    await user.click(screen.getByTestId('card-original-a'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not call onClick when matched', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Card card={mockCard} isFlipped={false} isMatched={true} onClick={handleClick} />)
    await user.click(screen.getByTestId('card-original-a'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies matched class when isMatched is true', () => {
    render(<Card card={mockCard} isFlipped={false} isMatched={true} onClick={() => {}} />)
    const button = screen.getByTestId('card-original-a')
    expect(button).toHaveClass('matched')
  })
})

import { useState, useCallback, useEffect } from 'react'
import Card from './Card'
import { createGameCards } from '../data/cards'
import { MAX_MOVES, getRemainingMoves, getHealthPercent, loadBestScore, updateBestScore } from '../data/gameStats'
import './GameBoard.css'

function GameBoard() {
  const [cards, setCards] = useState(() => createGameCards())
  const [flippedIds, setFlippedIds] = useState([])
  const [matchedIds, setMatchedIds] = useState(new Set())
  const [moves, setMoves] = useState(0)
  const [damage, setDamage] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [bestScore, setBestScore] = useState(() => loadBestScore())

  const isWon = matchedIds.size === cards.length
  const isLost = damage >= MAX_MOVES && !isWon
  const remainingMoves = getRemainingMoves(damage)
  const healthPercent = getHealthPercent(damage)
  const healthState = healthPercent <= 30 ? 'danger' : healthPercent <= 60 ? 'warn' : 'safe'

  const handleCardClick = useCallback(
    (uniqueId) => {
      if (isChecking || flippedIds.length >= 2 || isLost || isWon) return

      setFlippedIds((prev) => {
        if (prev.includes(uniqueId)) return prev
        return [...prev, uniqueId]
      })
    },
    [isChecking, flippedIds, isLost, isWon]
  )

  useEffect(() => {
    if (flippedIds.length !== 2) return

    setIsChecking(true)
    setMoves((m) => m + 1)

    const [firstId, secondId] = flippedIds
    const first = cards.find((c) => c.uniqueId === firstId)
    const second = cards.find((c) => c.uniqueId === secondId)

    if (first.id === second.id) {
      setMatchedIds((prev) => new Set([...prev, firstId, secondId]))
      setFlippedIds([])
      setIsChecking(false)
    } else {
      setDamage((d) => d + 1)
      const timer = setTimeout(() => {
        setFlippedIds([])
        setIsChecking(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [flippedIds, cards])

  useEffect(() => {
    if (!isWon) return
    setBestScore(updateBestScore(moves))
  }, [isWon, moves])

  const resetGame = useCallback(() => {
    setCards(createGameCards())
    setFlippedIds([])
    setMatchedIds(new Set())
    setMoves(0)
    setDamage(0)
    setIsChecking(false)
  }, [])

  return (
    <div className="game-board-container">
      <div className="game-hud">
        <div className="game-info">
          <span className="stat-chip" data-testid="move-counter">
            Moves: {moves}
          </span>
          <span className="stat-chip" data-testid="best-score">
            Best: {bestScore ?? '--'}
          </span>
          <button className="new-game-btn" onClick={resetGame}>
            New Game
          </button>
        </div>
        <div className="health-section">
          <div className="health-meta">
            <span className="health-label">💚 Health</span>
            <span data-testid="moves-remaining">
              {remainingMoves}/{MAX_MOVES}
            </span>
          </div>
          <div
            className="health-bar"
            role="progressbar"
            aria-label="Moves remaining"
            aria-valuemin={0}
            aria-valuemax={MAX_MOVES}
            aria-valuenow={remainingMoves}
          >
            <div className={`health-bar-fill health-bar-fill-${healthState}`} style={{ width: `${healthPercent}%` }} />
          </div>
        </div>
        <div className="rules-section">
          <h3 className="panel-heading">Rules</h3>
          <p className="rule-hint" data-testid="rule-hint" role="note">
            Click or tap two cards to find a matching pair. Each mismatch costs 1 health.
          </p>
        </div>
      </div>

      {isWon && (
        <div className="win-message" data-testid="win-message">
          🎉 You matched them all in {moves} moves!
        </div>
      )}
      {isLost && (
        <div className="lose-message" data-testid="lose-message">
          💥 Game over! You ran out of moves.
        </div>
      )}
      <div className="game-board" data-testid="game-board">
        {cards.map((card) => (
          <Card
            key={card.uniqueId}
            card={card}
            isFlipped={flippedIds.includes(card.uniqueId)}
            isMatched={matchedIds.has(card.uniqueId)}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  )
}

export default GameBoard

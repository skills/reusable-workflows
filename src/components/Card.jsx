import { CARD_BACK } from '../data/cards'
import './Card.css'

function Card({ card, isFlipped, isMatched, onClick }) {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(card.uniqueId)
    }
  }

  return (
    <button
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
      aria-label={isFlipped || isMatched ? card.name : 'Face-down card'}
      data-testid={`card-${card.uniqueId}`}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-front-image">
            <img src={card.image} alt={card.name} draggable="false" />
          </div>
          <p className="card-name">{card.name}</p>
        </div>
        <div className="card-back">
          <img src={CARD_BACK} alt="Card back" draggable="false" />
        </div>
      </div>
    </button>
  )
}

export default Card

import adventureCat from '../assets/images/adventure-cat.png'
import classAct from '../assets/images/class-act.png'
import femalecodertocat from '../assets/images/femalecodertocat.png'
import jetpacktocat from '../assets/images/jetpacktocat.png'
import original from '../assets/images/original.png'
import pythocat from '../assets/images/pythocat.png'
import skatetocat from '../assets/images/skatetocat.png'
import spidertocat from '../assets/images/spidertocat.png'
import welcometocat from '../assets/images/welcometocat.png'

export const CARD_BACK = original

export const BASE_CARDS = [
  { id: 'adventure-cat', name: 'Adventure Cat', image: adventureCat },
  { id: 'class-act', name: 'Class Act', image: classAct },
  { id: 'welcometocat', name: 'Welcometocat', image: welcometocat },
  { id: 'spidertocat', name: 'Spidertocat', image: spidertocat },
  { id: 'pythocat', name: 'Pythocat', image: pythocat },
  { id: 'skatetocat', name: 'Skatetocat', image: skatetocat },
  { id: 'femalecodertocat', name: 'Femalecodertocat', image: femalecodertocat },
  { id: 'jetpacktocat', name: 'Jetpacktocat', image: jetpacktocat },
]

export function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function createGameCards(cards = BASE_CARDS) {
  const pairs = cards.flatMap((card) => [
    { ...card, uniqueId: `${card.id}-a` },
    { ...card, uniqueId: `${card.id}-b` },
  ])
  return shuffleArray(pairs)
}

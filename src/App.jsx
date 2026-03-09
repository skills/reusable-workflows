import GameBoard from './components/GameBoard'
import { GAME_NAME, GAME_SUBTITLE } from './branding/brand'
import { CARD_BACK } from './data/cards'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <img src={CARD_BACK} alt="Original Octocat" className="app-logo" />
          <span className="app-title-text">{GAME_NAME}</span>
        </h1>
        <p className="subtitle">{GAME_SUBTITLE}</p>
      </header>
      <main>
        <GameBoard />
      </main>
    </div>
  )
}

export default App

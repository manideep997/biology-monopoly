import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Board from './components/Board';
import Dice from './components/Dice';
import QuizModal from './components/QuizModal';
import PlayerStats from './components/PlayerStats';
import Flashcard from './components/Flashcard';
import { Beaker } from 'lucide-react';

const GameEngine = () => {
  const { message, gameState } = useGame();

  if (gameState === 'bankrupt') {
    return (
      <div className="app-container">
        <h1 style={{ color: '#F44336' }}>GAME OVER</h1>
        <p>You have gone bankrupt.</p>
        <button className="btn" onClick={() => window.location.reload()}>Restart Game</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <Beaker size={32} color="#66fcf1" /> Bio-Quiz Monopoly
        </h1>
        <p style={{ color: '#45a29e', fontSize: '1.2rem', marginTop: '10px' }}>{message}</p>
      </header>

      <PlayerStats />

      <div style={{ display: 'flex', width: '100%', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
          <Dice />
        </div>
        
        <div style={{ flex: '2', display: 'flex', justifyContent: 'center' }}>
          <Board />
        </div>

        <div style={{ flex: '1' }}>
          {/* Empty Space for layout balance */}
        </div>
      </div>

      <QuizModal />
      <Flashcard />
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameEngine />
    </GameProvider>
  );
}

export default App;

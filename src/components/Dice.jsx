import React from 'react';
import { useGame } from '../context/GameContext';

const Dice = () => {
  const { rollDice, gameState } = useGame();

  return (
    <div className="dice-container">
      <div 
        className={`dice ${gameState === 'moving' ? 'rolling' : ''}`}
        onClick={rollDice}
        title={gameState === 'roll' ? "Click to roll" : "Wait..."}
      >
         🎲
      </div>
      <div style={{ fontSize: '0.8rem', color: '#c5c6c7', textTransform: 'uppercase' }}>
        {gameState === 'roll' ? "Roll Dice" : "Moving..."}
      </div>
    </div>
  );
};

export default Dice;

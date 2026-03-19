import React from 'react';
import { useGame } from '../context/GameContext';
import { CheckCircle, XCircle } from 'lucide-react';

const Flashcard = () => {
  const { gameState, flashcardData, closeFlashcard } = useGame();

  if (gameState !== 'flashcard' || !flashcardData) return null;

  const isSuccess = flashcardData.success;

  return (
    <div className="flashcard-overlay">
      <div className={`flashcard ${isSuccess ? 'success' : 'error'}`}>
        {isSuccess ? (
          <CheckCircle size={64} color="var(--color-bio)" style={{ marginBottom: '1rem' }} />
        ) : (
          <XCircle size={64} color="var(--color-anatomy)" style={{ marginBottom: '1rem' }} />
        )}
        
        <h2>{isSuccess ? 'Correct!' : 'Incorrect!'}</h2>
        
        <p style={{ fontSize: '1.2rem', color: '#ececec', margin: '1rem 0' }}>
          {isSuccess 
            ? `You bought ${flashcardData.propertyName} for $${flashcardData.price}.` 
            : `The right answer was: ${flashcardData.correctAnswer}. You failed to buy ${flashcardData.propertyName}.`
          }
        </p>
        
        <div className="fact">
          <strong>📝 Did you know?</strong><br/>
          {flashcardData.explanation}
        </div>
        
        <button 
          className="btn" 
          onClick={closeFlashcard}
          style={{ marginTop: '1rem', borderColor: isSuccess ? 'var(--color-bio)' : 'var(--color-anatomy)', color: isSuccess ? 'var(--color-bio)' : 'var(--color-anatomy)' }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Flashcard;

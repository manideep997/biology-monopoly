import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Dna, Activity, Locate, Coins, HelpCircle } from 'lucide-react';

const QuizModal = () => {
  const { currentQuiz, answerQuiz, declineBuy } = useGame();
  const [selectedOpt, setSelectedOpt] = useState(null);

  if (!currentQuiz) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <h3><HelpCircle size={20} style={{marginRight: 8, verticalAlign: 'middle'}}/> Quiz: {currentQuiz.name}</h3>
        <p style={{ margin: '1rem 0', color: '#ececec', fontSize: '1.1rem' }}>
          {currentQuiz.question}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {currentQuiz.options.map((opt, i) => (
            <button 
              key={i} 
              className={`btn btn-option ${selectedOpt === opt ? 'selected' : ''}`}
              onClick={() => setSelectedOpt(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            className="btn" 
            style={{ borderColor: '#F44336', color: '#F44336' }}
            onClick={declineBuy}
          >
            Pass
          </button>
          <button 
            className="btn"
            onClick={() => answerQuiz(selectedOpt)}
            disabled={!selectedOpt}
            style={{ opacity: !selectedOpt ? 0.5 : 1, cursor: !selectedOpt ? 'not-allowed' : 'pointer' }}
          >
            Submit & Buy (${currentQuiz.price})
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;

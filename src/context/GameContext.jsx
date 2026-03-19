import React, { createContext, useContext, useState, useEffect } from 'react';
import { BOARD_SIZE, tiles } from '../data/board';
import { getRandomQuestion } from '../data/questions';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [playerPos, setPlayerPos] = useState(0);
  const [money, setMoney] = useState(1500);
  const [ownedProperties, setOwnedProperties] = useState({}); // { tileId: true }
  
  // States: 'roll', 'moving', 'quiz', 'flashcard', 'action', 'bankrupt'
  const [gameState, setGameState] = useState('roll');
  const [currentQuiz, setCurrentQuiz] = useState(null); // { question, options, answer, explanation, tileId, price, name }
  const [flashcardData, setFlashcardData] = useState(null);
  const [message, setMessage] = useState("Roll the dice to start your journey!");

  const rollDice = () => {
    if (gameState !== 'roll') return;
    
    setGameState('moving');
    const roll = Math.floor(Math.random() * 6) + 1;
    setMessage(`You rolled a ${roll}!`);
    
    setTimeout(() => {
      movePlayer(roll);
    }, 1000);
  };

  const movePlayer = (steps) => {
    setPlayerPos((prev) => {
      let nextPos = prev + steps;
      if (nextPos >= BOARD_SIZE) {
        nextPos = nextPos % BOARD_SIZE;
        // Passed GO
        setMoney((m) => m + 200);
        setMessage("Passed START! Collect $200.");
      }
      return nextPos;
    });
  };

  // Trigger tile action after moving
  useEffect(() => {
    if (gameState === 'moving') {
      setTimeout(() => {
        handleTileAction(playerPos);
      }, 500); // Wait for move animation
    }
  }, [playerPos, gameState]);

  const handleTileAction = (pos) => {
    const tile = tiles[pos];
    
    if (tile.type === 'start') {
      setMessage("You landed on START. Take a breather.");
      setGameState('roll');
    } else if (tile.type === 'property') {
      if (ownedProperties[pos]) {
        setMessage(`You landed on your own property: ${tile.name}.`);
        setGameState('roll');
      } else {
        setMessage(`You found ${tile.name} (${tile.category}). Answer a quiz to buy it for $${tile.price}!`);
        setCurrentQuiz({
          ...getRandomQuestion(tile.category),
          tileId: pos,
          price: tile.price,
          name: tile.name
        });
        setGameState('quiz');
      }
    } else if (tile.type === 'chance') {
      // Simple random event
      const events = [
        { text: "Found a research grant! +$100", amount: 100 },
        { text: "Lab equipment broke! -$50", amount: -50 },
        { text: "Published a paper! +$200", amount: 200 },
      ];
      const ev = events[Math.floor(Math.random() * events.length)];
      setMessage(`Chance: ${ev.text}`);
      setMoney((m) => m + ev.amount);
      setGameState('roll');
    } else if (tile.type === 'tax') {
      const tax = tile.description.includes('50') ? 50 : 75;
      setMessage(`Tax: ${tile.description}`);
      setMoney((m) => m - tax);
      setGameState('roll');
    } else if (tile.type === 'action') {
      setMessage("Sent to Detention!");
      setPlayerPos(4); // Jail pos
      setGameState('roll');
    } else {
      setMessage(`You landed on ${tile.name}.`);
      setGameState('roll');
    }
  };

  const answerQuiz = (answer) => {
    let success = false;
    if (answer === currentQuiz.answer) {
      if (money >= currentQuiz.price) {
        setMoney((m) => m - currentQuiz.price);
        setOwnedProperties((prev) => ({ ...prev, [currentQuiz.tileId]: true }));
        setMessage(`Correct! You bought ${currentQuiz.name}.`);
        success = true;
      } else {
        setMessage(`Correct! But you don't have enough money to buy ${currentQuiz.name}.`);
        success = false;
      }
    } else {
      setMessage(`Incorrect! The right answer was ${currentQuiz.answer}. You failed to buy ${currentQuiz.name}.`);
      success = false; // Incorrect
    }

    setFlashcardData({
      success,
      explanation: currentQuiz.explanation,
      correctAnswer: currentQuiz.answer,
      propertyName: currentQuiz.name,
      price: currentQuiz.price
    });
    
    setCurrentQuiz(null);
    setGameState('flashcard');
  };

  const declineBuy = () => {
    setMessage(`You skipped buying ${currentQuiz.name}.`);
    setCurrentQuiz(null);
    setGameState('roll');
  };

  const closeFlashcard = () => {
    setFlashcardData(null);
    setGameState('roll');
  };

  useEffect(() => {
    if (money < 0) {
      setGameState('bankrupt');
      setMessage("You went bankrupt! Game Over.");
    }
  }, [money]);

  return (
    <GameContext.Provider value={{
      playerPos, money, ownedProperties, gameState, currentQuiz, flashcardData, message,
      rollDice, answerQuiz, declineBuy, closeFlashcard
    }}>
      {children}
    </GameContext.Provider>
  );
};

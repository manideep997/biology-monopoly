import React from 'react';
import { useGame } from '../context/GameContext';
import { tiles } from '../data/board';

const Board = () => {
  const { playerPos, ownedProperties } = useGame();

  return (
    <div className="board-container">
      <div className="board">
        {tiles.map((tile, index) => {
          let extraClasses = `tile-${index} ${tile.class}`;
          let ownerMarker = null;

          if (ownedProperties[index]) {
            ownerMarker = <div style={{marginTop: '4px', fontSize: '10px', color: '#66fcf1'}}>Owned</div>;
          }

          return (
            <div key={index} className={`tile ${extraClasses}`}>
              <div className="tile-color-bar"></div>
              <div className="name">{tile.name}</div>
              {tile.price && <div className="price">${tile.price}</div>}
              {ownerMarker}
              
              {/* Render Player Token if player is here */}
              {playerPos === index && (
                <div className="player-token"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;

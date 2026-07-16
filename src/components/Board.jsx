import React from 'react';
import { useGame } from '../context/GameContext';
import { tiles } from '../data/board';

const TILE_COORDINATES = [
  { col: 5, row: 5 }, // 0: START
  { col: 4, row: 5 }, // 1
  { col: 3, row: 5 }, // 2
  { col: 2, row: 5 }, // 3
  { col: 1, row: 5 }, // 4: Detention
  { col: 1, row: 4 }, // 5
  { col: 1, row: 3 }, // 6
  { col: 1, row: 2 }, // 7
  { col: 1, row: 1 }, // 8: Recess
  { col: 2, row: 1 }, // 9
  { col: 3, row: 1 }, // 10
  { col: 4, row: 1 }, // 11
  { col: 5, row: 1 }, // 12: To Detention
  { col: 5, row: 2 }, // 13
  { col: 5, row: 3 }, // 14
  { col: 5, row: 4 }, // 15
];

const Board = () => {
  const { playerPos, ownedProperties } = useGame();
  const coords = TILE_COORDINATES[playerPos] || { col: 5, row: 5 };

  // Calculate percentage center positions for absolute positioning
  const leftPos = `${(coords.col - 1) * 20 + 10}%`;
  const topPos = `${(coords.row - 1) * 20 + 10}%`;

  return (
    <div className="board-container">
      <div className="board" style={{ position: 'relative' }}>
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
            </div>
          );
        })}

        {/* Continuous Single Player Token with smooth layout transitions */}
        <div 
          className="player-token"
          style={{
            left: leftPos,
            top: topPos,
            transform: 'translate(-50%, -50%) translateZ(15px)',
          }}
        />
      </div>
    </div>
  );
};

export default Board;

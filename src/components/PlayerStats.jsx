import React from 'react';
import { useGame } from '../context/GameContext';
import { tiles } from '../data/board';
import { Coins, MapPin, Building } from 'lucide-react';

const PlayerStats = () => {
  const { money, playerPos, ownedProperties } = useGame();
  
  const currentTile = tiles[playerPos];
  const totalOwned = Object.keys(ownedProperties).length;

  return (
    <div className="hud glass-panel">
      <div className="stats">
        <div className="stat-item">
          <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Coins size={14} color="#66fcf1" /> Money
          </span>
          <span className="stat-value money">${money}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={14} color="#66fcf1" /> Location
          </span>
          <span className="stat-value">{currentTile.name}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Building size={14} color="#66fcf1" /> Properties
          </span>
          <span className="stat-value">{totalOwned} / 8</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;

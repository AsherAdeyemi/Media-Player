import React from 'react';
import './PlayerControls.css';

function PlayerControls() {
  return (
    <div className="player-controls">
      
      <div className="controls">
        <button className="prev-btn">Prev</button>
        <button className="play-btn">Play</button>
        <button className="next-btn">Next</button>
        <button className="mute-btn">Mute</button>
      </div>
    </div>
  );
}

export default PlayerControls;

import React, { useState } from 'react';
import './MediaLibrary.css';

function MediaLibrary() {
  const [library, setLibrary] = useState('music');

  return (
    <div className="media-library">
      <div className="library-tabs">
        <button onClick={() => setLibrary('music')} className={library === 'music' ? 'active' : ''}>Music</button>
        <button onClick={() => setLibrary('video')} className={library === 'video' ? 'active' : ''}>Video</button>
      </div>
      {library === 'music' ? (
        <div className="music-list">
          {}
        </div>
      ) : (
        <div className="video-list">
          {}
        </div>
      )}
    </div>
  );
}

export default MediaLibrary;

import React from 'react';

const NowPlaying = ({ media }) => {
  return (
    <div className="now-playing">
      <h2>Now Playing: {media || 'Select a media'}</h2>
    </div>
  );
};

export default NowPlaying;

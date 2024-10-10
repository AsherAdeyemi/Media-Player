import React, { useContext, useEffect, useState } from 'react';
import { MediaContext } from '../contexts/MediaContext';

const PlaybackControls = () => {
  const { currentFile, isPlaying, setIsPlaying, volume, setVolume, audioRef, seekTo } = useContext(MediaContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, [audioRef]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration; // Convert percentage to seconds
    seekTo(seekTime);
  };

  return (
    <div className="playback-controls">
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      />
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={(currentTime / duration) * 100 || 0}
        onChange={handleSeek}
      />
      <div>{`${Math.floor(currentTime)} / ${Math.floor(duration)}`}</div>
      <style jsx>{`
        .playback-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }
        button {
          margin-bottom: 10px;
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        input[type='range'] {
          margin: 10px 0;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default PlaybackControls;

import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaRedo, FaRandom, FaVolumeMute } from 'react-icons/fa';
import '../GlobalStyles.css'; 
import { MediaContext } from '../contexts/MediaContext'; // Make sure to import the context

function MediaGrid() {
  const { playedMedia, setPlayedMedia } = useContext(MediaContext); // Access context
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volumeDisplay, setVolumeDisplay] = useState('');
  const audioRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedFile(fileURL);
      setPlayedMedia((prev) => [...prev, { url: fileURL, name: file.name }]);
      if (audioRef.current) {
        audioRef.current.load();
      }
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    setVolumeDisplay(`${Math.round(newVolume * 100)}%`);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }

    setTimeout(() => {
      setVolumeDisplay('');
    }, 2500);
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const toggleRepeat = () => {
    setIsRepeating((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.volume = isMuted ? 0 : volume;
      currentAudioRef.loop = isRepeating;
      currentAudioRef.ontimeupdate = () => {
        setCurrentTime(currentAudioRef.currentTime);
        setDuration(currentAudioRef.duration);
      };
    }
    return () => {
      currentAudioRef && currentAudioRef.pause();
    };
  }, [volume, isRepeating, isMuted]);

  const handleProgressBarChange = (event) => {
    const newTime = event.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleKeyDown = useCallback((event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      handlePlayPause();
    } else if (event.code === 'ArrowRight') {
      skipForward();
    } else if (event.code === 'ArrowLeft') {
      skipBackward();
    }
  }, [handlePlayPause]); // only need to depend on handlePlayPause

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]); // Add handleKeyDown as a dependency

  const handleReplay = (url) => {
    setSelectedFile(url);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="media-grid">
      <div className="logo-container">
        <div className={`logo ${isPlaying ? 'spin' : ''}`}></div>
      </div>

      <div className="select-audio-container">
        <label htmlFor="file-input">Select Audio</label>
        <input 
          type="file" 
          id="file-input" 
          accept="audio/*" 
          onChange={handleFileSelect} 
          className="file-input"
        />
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressBarChange}
          className="progress-bar"
        />
        {volumeDisplay && (
          <div className="volume-display">{volumeDisplay}</div>
        )}
      </div>

      <audio ref={audioRef} controls style={{ display: 'none' }}>
        {selectedFile && <source src={selectedFile} type="audio/mp3" />}
        Your browser does not support the audio element.
      </audio>

      <div className="controls">
        <div className="icon-container">
          <button onClick={skipBackward}><FaBackward className="icon" /></button>
          <button onClick={handlePlayPause}>{isPlaying ? <FaPause className="icon" /> : <FaPlay className="icon" />}</button>
          <button onClick={skipForward}><FaForward className="icon" /></button>
          <button onClick={toggleRepeat}><FaRedo className="icon" color={isRepeating ? 'orange' : 'grey'} /></button>
          <button><FaRandom className="icon" /></button>
          <div className="volume-control">
            {isMuted ? (
              <button onClick={toggleMute}><FaVolumeMute className="icon" /></button>
            ) : (
              <button onClick={toggleMute}><FaVolumeUp className="icon" /></button>
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              style={{ width: '80px' }} 
              className="volume-bar"
            />
          </div>
        </div>
      </div>

      <div className="played-media-grid">
        {playedMedia.length > 0 && (
          <div className="grid">
            {playedMedia.map((media, index) => (
              <div className="media-item" key={index} onClick={() => handleReplay(media.url)} style={{ cursor: 'pointer' }}>
                <div className="overlay">
                  <img src="/path/to/video-icon.png" alt="Video Icon" style={{ width: '20px', marginRight: '5px' }} />
                  Played Media: {media.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .media-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          background-color: #e0e0e0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          box-sizing: border-box;
        }

        .logo-container {
          margin-bottom: 10px;
        }

        .spin {
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .select-audio-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          background-color: #b0b0b0;
          border-radius: 10px;
          padding: 10px;
        }

        .progress-bar, .volume-bar {
          width: 100%;
          margin-top: 10px;
          appearance: none;
          background-color: #ff6700; /* Fiery orange color */
          height: 5px;
          border-radius: 5px;
        }

        .progress-bar::-webkit-slider-thumb, .volume-bar::-webkit-slider-thumb {
          appearance: none;
          width: 15px;
          height: 15px;
          background-color: #ff6700;
          border-radius: 50%;
        }

        .controls {
          display: flex;
          justify-content: center;
          margin: 10px 0;
          flex-wrap: wrap;
        }

        .icon-container {
          display: flex;
          align-items: center;
        }

        .icon {
          font-size: 24px;
          margin: 0 5px;
          color: grey;
          transition: transform 0.2s;
        }

        .icon:hover {
          transform: scale(1.2);
        }

        .volume-display {
          position: absolute;
          bottom: 50px; 
          right: 10px;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 5px;
          border-radius: 5px;
        }

        .played-media-grid {
          display: flex;
          flex-direction: column;
          width: 100%;
          overflow: auto; /* Allow scrolling for overflow */
          margin-top: 10px; /* Add margin for spacing */
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          padding: 10px;
        }

        .media-item {
          position: relative;
          background-color: #f0f0f0;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
          transition: background-color 0.3s;
        }

        .media-item:hover {
          background-color: #d0d0d0; /* Lighten on hover */
        }

        .overlay {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.8);
          padding: 5px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}

export default MediaGrid;

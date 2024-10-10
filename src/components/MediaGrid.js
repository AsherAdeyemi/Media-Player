import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  FaPlay, FaPause, FaForward, FaBackward, FaStop, FaVolumeUp, FaRedo,
  FaRandom, FaVolumeMute, FaStepForward, FaStepBackward
} from 'react-icons/fa';
import { MediaContext } from '../contexts/MediaContext'; // Import MediaContext
import '../GlobalStyles.css';

function MediaGrid({ currentPage }) {
  const {
    setCurrentFile,
    currentFile,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    audioFiles,
  } = useContext(MediaContext);

  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');  // For the song search
  const [suggestions, setSuggestions] = useState([]);  // To hold filtered results
  const audioRef = useRef(null);

  // Automatically play the next song/video when the current one ends
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        playNext();
      };
    }
  }, [currentFileIndex, audioFiles]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key.toLowerCase()) {
        case 'p':
          playPrevious();
          break;
        case 'n':
          playNext();
          break;
        case 's':
          stopPlayback();
          break;
        case 'm':
          toggleMute();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentFileIndex, audioFiles]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
          console.error('Error trying to play:', error);
        });
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const playNext = () => {
    if (currentFileIndex < audioFiles.length - 1) {
      const nextFile = audioFiles[currentFileIndex + 1];
      setCurrentFileIndex((prevIndex) => prevIndex + 1);
      setCurrentFile({
        name: nextFile.name || `Audio ${currentFileIndex + 2}`,
        url: URL.createObjectURL(nextFile),
      });
    }
  };

  const playPrevious = () => {
    if (currentFileIndex > 0) {
      const prevFile = audioFiles[currentFileIndex - 1];
      setCurrentFileIndex((prevIndex) => prevIndex - 1);
      setCurrentFile({
        name: prevFile.name || `Audio ${currentFileIndex}`,
        url: URL.createObjectURL(prevFile),
      });
    }
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
      currentAudioRef.loop = isRepeating;
      currentAudioRef.volume = isMuted ? 0 : volume;
      currentAudioRef.src = currentFile ? currentFile.url : '';
      currentAudioRef.play().catch((error) => {
        console.error('Error trying to play:', error);
      });

      currentAudioRef.ontimeupdate = () => {
        setCurrentTime(currentAudioRef.currentTime);
        setDuration(currentAudioRef.duration);
      };
    }
    return () => {
      if (currentAudioRef) {
        currentAudioRef.pause();
      }
    };
  }, [currentFile, isRepeating, volume, isMuted]);

  // Function to handle input search in the existing navigation panel search bar
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredSuggestions = audioFiles.filter((file) =>
      file.name.toLowerCase().includes(value)
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="media-grid">
      <div className="logo-container">
        <div className={`logo ${isPlaying ? 'spin' : ''}`}>
          <img src="/path-to-your-logo.svg" alt="" />
        </div>
      </div>

      <audio ref={audioRef} controls style={{ display: 'none' }}>
        {audioFiles.length > 0 && <source src={currentFile ? currentFile.url : ''} type="audio/mp3" />}
        Your browser does not support the audio element.
      </audio>

      {}
      {}

      <div className="controls">
        <div className="icon-container">
          <button onClick={playPrevious} title="Previous"><FaStepBackward className="icon" /></button>
          <button onClick={skipBackward} title="Rewind"><FaBackward className="icon" /></button>
          <button onClick={handlePlayPause} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <FaPause className="icon" /> : <FaPlay className="icon" />}
          </button>
          <button onClick={skipForward} title="Forward"><FaForward className="icon" /></button>
          <button onClick={playNext} title="Next"><FaStepForward className="icon" /></button>
          <button onClick={stopPlayback} title="Stop"><FaStop className="icon" /></button>
          <button onClick={toggleRepeat} title="Repeat"><FaRedo className="icon" color={isRepeating ? 'orange' : 'grey'} /></button>
          <div className="volume-control">
            {isMuted ? (
              <button onClick={toggleMute} title="Unmute"><FaVolumeMute className="icon" /></button>
            ) : (
              <button onClick={toggleMute} title="Mute"><FaVolumeUp className="icon" /></button>
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(Math.max(0, Math.min(1, e.target.value)))}
              style={{ width: '80px' }}
            />
          </div>
        </div>
      </div>

      <div className="progress-container">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => (audioRef.current.currentTime = e.target.value)}
          className="progress-bar"
        />
      </div>

      {}
      <div className="file-name">
        {currentFile ? `Now playing: ${currentFile.name}` : 'No file selected'}
      </div>

      <style jsx>{`
        .media-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          padding-right:23px;
          box-sizing: border-box;
          border-radius: 25px;
          background-color: grey;
        }

        .progress-container {
          margin-top: 10px;
          width: 60%;
        }

        .progress-bar {
          width: 100%;
          -webkit-appearance: none;
          appearance: none;
          border-radius: 88px;
          padding: 1px;
        }

        .file-name {
          margin-top: 10px;
          font-size: 1.5em;
          color: orange;
          font-family: 'YourCustomFont', sans-serif;
        }

        .icon-container {
          display: flex;
          gap: 10px; /* Add some space between icons */
        }

        .icon {
          color: white; /* Default icon color */
          transition: color 0.3s; /* Smooth transition for color change */
        }

        .icon:hover {
          color: orange; /* Icon color on hover */
        }

        @media (max-width: 600px) {
          .progress-container {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default MediaGrid;

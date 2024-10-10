import React, { useContext, useState } from 'react';
import { MediaContext } from '../contexts/MediaContext'; 
import { FaMusic } from 'react-icons/fa';

const AudioPage = () => {
  const { audioFiles, updateAudioFiles, favoriteAudioFiles, toggleFavoriteAudio } = useContext(MediaContext);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScanMediaFiles = async () => {
    setIsScanning(true);
    setScanComplete(false);
    try {
      const directoryHandle = await window.showDirectoryPicker();
      const files = [];

      for await (const entry of directoryHandle.values()) {
        if (entry.kind === 'file') {
          const file = await entry.getFile();
          if (file.type.startsWith('audio')) {
            files.push(file);
          }
        }
      }

      updateAudioFiles(files);
      setScanComplete(true);
    } catch (error) {
      console.error('Error scanning audio files:', error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="audio-page">
      <h1>Audio Files</h1>
      <button onClick={handleScanMediaFiles} disabled={isScanning} className={`glow-button ${isScanning ? 'active' : ''}`}>
        {isScanning ? 'Scanning...' : 'Scan Audio Files'}
      </button>
      <ul>
        {audioFiles.length > 0 ? (
          audioFiles.map((file, index) => (
            <li key={index}>
              <FaMusic className="icon" /> {file.name}
              <input 
                type="checkbox" 
                checked={favoriteAudioFiles[file.name] || false} 
                onChange={() => toggleFavoriteAudio(file.name)} 
                className="favorite-checkbox"
              />
            </li>
          ))
        ) : (
          scanComplete && <div className="blinking-alert">No audio files were found</div>
        )}
      </ul>
      <style jsx>{`
        .audio-page {
          padding: 20px;
          background-color: grey;
          border-radius: 10px;
          max-width: 600px;
          margin: auto;
        }

        h1 {
          text-align: center;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          padding: 10px;
          border: 1px solid #ccc;
          margin: 5px 0;
          border-radius: 5px;
          background-color: orange;
          display: flex; 
          align-items: center; 
        }

        li:hover {
          background-color: #e0e0e0;
          transform: scale(1.05); /* Increase size on hover */
        }

        .icon {
          margin-right: 10px;
        }

        .blinking-alert {
          font-weight: bold;
          color: red;
          animation: blink-animation 1.5s infinite;
          text-align: center;
          margin-top: 10px;
        }

        .favorite-checkbox {
          margin-left: auto; /* Align checkbox to the right */
          transition: transform 0.3s; /* Transition effect for checkbox */
        }

        @keyframes blink-animation {
          0% {
            color: red;
          }
          50% {
            color: white;
          }
          100% {
            color: red;
          }
        }

        .glow-button {
          border: none; 
          background-color: #ff3737;  /* Red scan button */
          padding: 10px 20px; 
          border-radius: 5px; 
          cursor: pointer; 
          color: white; 
          font-weight: bold;
          position: relative;
          overflow: hidden;
          display: block; /* Center the button */
          margin: 20px auto; /* Center the button horizontally */
        }

        .glow-button.active {
          animation: glow-animation 2.3s linear infinite alternate;
        }

        @keyframes glow-animation {
          0% {
            text-shadow: 0 0 10px yellow, 0 0 20px yellow, 0 0 30px yellow;
            transform: translateX(-5px);
          }
          50% {
            text-shadow: 0 0 20px orange, 0 0 30px orange, 0 0 40px orange;
            transform: translateX(5px);
          }
          100% {
            text-shadow: 0 0 10px yellow, 0 0 20px yellow, 0 0 30px yellow;
            transform: translateX(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default AudioPage;

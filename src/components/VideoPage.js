import React, { useContext, useState } from 'react';
import { MediaContext } from '../contexts/MediaContext';
import { FaVideo } from 'react-icons/fa';

const VideoPage = () => {
  const { setCurrentFile, videoFiles, updateVideoFiles, currentFile, setIsPlaying, favoriteVideoFiles, toggleFavoriteVideo, videoRef } = useContext(MediaContext);
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
          if (file.type.startsWith('video')) {
            files.push(file);
          }
        }
      }

      updateVideoFiles(files);
      setScanComplete(true);
    } catch (error) {
      console.error('Error scanning video files:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const playVideoFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    setCurrentFile(fileURL);
    setIsPlaying(true); // Start playing the video
  };

  return (
    <div className="video-page">
      <h1>Video Files</h1>
      <button onClick={handleScanMediaFiles} disabled={isScanning} className={`glow-button ${isScanning ? 'active' : ''}`}>
        {isScanning ? 'Scanning...' : 'Scan Video Files'}
      </button>
      <ul>
        {videoFiles.length > 0 ? (
          videoFiles.map((file, index) => (
            <li key={index} onClick={() => playVideoFile(file)}>
              <FaVideo className="icon" /> {file.name}
              <input 
                type="checkbox" 
                checked={favoriteVideoFiles[file.name] || false} 
                onChange={() => toggleFavoriteVideo(file.name)} 
                className="favorite-checkbox"
              />
            </li>
          ))
        ) : (
          scanComplete && <div className="blinking-alert">No video files were found</div>
        )}
      </ul>
      {currentFile && (
        <div className="video-player">
          <video ref={videoRef} controls width="100%">
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <style jsx>{`
        .video-page {
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
          cursor: pointer;
          border: 1px solid #ccc;
          margin: 5px 0;
          border-radius: 5px;
          background-color: orange;
          transition: background-color 0.3s;
          display: flex; 
          align-items: center; 
        }

        li:hover {
          background-color: #e0e0e0;
          transform: scale(1.05);
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
          margin-left: auto;
          transition: all 0.2s ease-in-out;
          transform: scale(1.2);
        }

        @keyframes blink-animation {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .video-player {
          margin-top: 20px;
          text-align: center;
        }

        .glow-button {
          border: none; 
          background-color: #ff3737;  /* Red scan button */
          padding: 10px 20px; 
          border-radius: 5px; 
          cursor: pointer; 
          color: white; 
          font-weight: bold;
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

export default VideoPage;

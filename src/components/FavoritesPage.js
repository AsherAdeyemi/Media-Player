import React, { useContext, useState } from 'react';
import { MediaContext } from '../contexts/MediaContext';

const FavoritesPage = () => {
  const { favoriteAudioFiles, favoriteVideoFiles, audioFiles, videoFiles } = useContext(MediaContext);

  const [audioClicked, setAudioClicked] = useState(false);
  const [videoClicked, setVideoClicked] = useState(false);

  // Filter favorite audio and video files
  const favoriteAudioFilesList = audioFiles.filter(file => favoriteAudioFiles[file.name]);
  const favoriteVideoFilesList = videoFiles.filter(file => favoriteVideoFiles[file.name]);

  // Handle clicks on audio and video grids
  const handleAudioClick = () => setAudioClicked(true);
  const handleVideoClick = () => setVideoClicked(true);

  return (
    <div className="favorites-page">
      <h1>Favorites Page</h1>
      <div className="grid-container">
        {/* Audio Favorites Section */}
        <div className="audio-grid">
          <h2>Audio Favorites</h2>
          {audioClicked ? (
            favoriteAudioFilesList.length > 0 ? (
              <div className="grid-content">
                {favoriteAudioFilesList.map((file, index) => (
                  <div className="grid-item" key={index}>
                    {file.name}
                  </div>
                ))}
              </div>
            ) : (
              <p>No favorite songs found... click the checkbox to add files</p>
            )
          ) : (
            <p onClick={handleAudioClick}>Click here to view your favorite songs</p>
          )}
        </div>

        {/* Video Favorites Section */}
        <div className="video-grid">
          <h2>Video Favorites</h2>
          {videoClicked ? (
            favoriteVideoFilesList.length > 0 ? (
              <div className="grid-content">
                {favoriteVideoFilesList.map((file, index) => (
                  <div className="grid-item" key={index}>
                    {file.name}
                  </div>
                ))}
              </div>
            ) : (
              <p>No favorite videos found... click the checkbox to add files</p>
            )
          ) : (
            <p onClick={handleVideoClick}>Click here to view your favorite videos</p>
          )}
        </div>
      </div>
      <style jsx>{`
        .favorites-page {
          padding: 20px;
          background-color: grey;
          border-radius: 10px;
          max-width: 1200px; /* Increased to give more room */
          margin: auto;
        }

        h1 {
          text-align: center;
        }
          h2 {
          text-align: center;
        }
          p {
          text-align: center;
          cursor: pointer
        }

        .grid-container {
          display: flex;
          gap: 20px;
          flex-wrap: wrap; /* Allows wrapping if screen size is smaller */
        }

        .audio-grid, .video-grid {
          background-color: orange;
          border-radius: 10px;
          padding: 10px;
          flex: 1;
          min-width: 300px; /* Ensures the grids won't get too small */
          max-width: 50%; /* Keep the two grids side-by-side */
          overflow-y: auto; /* Add vertical scroll if content overflows */
          max-height: 400px; /* Adjust for the grid height */
          transition: all 0.3s ease;
        }

        .grid-content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }

        .grid-item {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: grey;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: background-color 0.3s, transform 0.3s ease;
        }

        .grid-item:hover {
          background-color: #e0e0e0;
          transform: scale(1.05);
        }

        @media (max-width: 800px) {
          .audio-grid, .video-grid {
            max-width: 100%; /* Adjust to full width on small screens */
          }
        }
      `}</style>
    </div>
  );
};

export default FavoritesPage;

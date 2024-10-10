import React, { useState } from 'react';
import { MediaProvider } from './contexts/MediaContext'; // Ensure the correct path to MediaContext
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AudioPage from './components/AudioPage'; // Import AudioPage
import VideoPage from './components/VideoPage'; // Import VideoPage
import FavoritesPage from './components/FavoritesPage'; // Import FavoritesPage
import MediaGrid from './components/MediaGrid';  // Import the MediaGrid component
import './GlobalStyles.css'; // Import global styles
import './App.css'; // Import additional styles for App component
import ThemePage from './components/ThemePage';
import EqualizerPage from './components/EqualizerPage';

function App() {
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
  };

  return (
    <MediaProvider>
      <Router>
        <div className="app-container">
          <aside className="sidebar">
            <div className="logo">    
              Rotating Fire
            </div>
            <input type="text" className="search-bar" placeholder="Find?" />
            <nav className="nav-menu">
              <Link to="/">Home</Link>
              <Link to="/audio">Audio</Link>
              <Link to="/video">Video</Link>
              <Link to="/favorites">Favorites</Link>

              {/* Settings Dropdown */}
              <div className="dropdown" onClick={toggleSettingsDropdown}>
                <span className="dropdown-toggle">Settings ▼</span>
                {isSettingsDropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/theme">Theme (Night/Day Mode)</Link>
                    <Link to="/equalizer">Equalizer</Link>
                  </div>
                )}
              </div>
            </nav>
          </aside>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MediaGrid currentPage="home" />} />
              <Route path="/audio" element={<AudioPage />} />
              <Route path="/video" element={<VideoPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/theme" element={<ThemePage />} />
              <Route path="/equalizer" element={<EqualizerPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </MediaProvider>
  );
}

export default App;

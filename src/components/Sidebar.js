import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <input type="text" placeholder="What are you looking for?" className="search-bar" />
      <ul className="menu">
        <li>Home</li>
        <li>Music library</li>
        <li>Video library</li>
        <li>Play queue</li>
        <li>Playlists</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;

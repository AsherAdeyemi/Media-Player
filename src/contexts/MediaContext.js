import React, { createContext, useState, useEffect, useRef } from 'react';

export const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [currentFile, setCurrentFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const audioRef = useRef(new Audio());
  const videoRef = useRef(null);

  const [favoriteAudioFiles, setFavoriteAudioFiles] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteAudioFiles');
    return savedFavorites ? JSON.parse(savedFavorites) : {};
  });

  const [favoriteVideoFiles, setFavoriteVideoFiles] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteVideoFiles');
    return savedFavorites ? JSON.parse(savedFavorites) : {};
  });

  // Load saved settings from localStorage
  useEffect(() => {
    const savedFile = localStorage.getItem('currentFile');
    const savedVolume = localStorage.getItem('volume');
    const savedIsPlaying = localStorage.getItem('isPlaying') === 'true';

    if (savedFile) setCurrentFile(savedFile);
    if (savedVolume) setVolume(Number(savedVolume));
    setIsPlaying(savedIsPlaying);
  }, []);

  // Audio playback control
  useEffect(() => {
    const currentAudio = audioRef.current;
    currentAudio.src = currentFile || '';
    currentAudio.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      currentAudio.play().catch(err => console.error("Play request was interrupted", err));
    } else {
      currentAudio.pause();
    }

    return () => {
      currentAudio.pause();
      currentAudio.src = '';
    };
  }, [currentFile, isPlaying, volume, isMuted]);

  // Video playback control
  useEffect(() => {
    if (videoRef.current && currentFile) {
      videoRef.current.src = currentFile;
      videoRef.current.volume = isMuted ? 0 : volume;

      if (isPlaying) {
        videoRef.current.play().catch(err => console.error("Video play request was interrupted", err));
      } else {
        videoRef.current.pause();
      }
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = ''; // Clear video source when stopped
      }
    };
  }, [currentFile, isPlaying, volume, isMuted]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('currentFile', currentFile);
    localStorage.setItem('volume', volume);
    localStorage.setItem('isPlaying', isPlaying);
    localStorage.setItem('favoriteAudioFiles', JSON.stringify(favoriteAudioFiles));
    localStorage.setItem('favoriteVideoFiles', JSON.stringify(favoriteVideoFiles));
  }, [currentFile, volume, isPlaying, favoriteAudioFiles, favoriteVideoFiles]);

  // Function to update audio files
  const updateAudioFiles = (files) => {
    setAudioFiles(files);
  };

  // Function to update video files
  const updateVideoFiles = (files) => {
    setVideoFiles(files);
  };

  // Toggle favorite status for audio files
  const toggleFavoriteAudio = (fileName) => {
    setFavoriteAudioFiles(prev => {
      const newFavorites = { ...prev, [fileName]: !prev[fileName] };
      return newFavorites;
    });
  };

  // Toggle favorite status for video files
  const toggleFavoriteVideo = (fileName) => {
    setFavoriteVideoFiles(prev => {
      const newFavorites = { ...prev, [fileName]: !prev[fileName] };
      return newFavorites;
    });
  };

  // Stop all media playback
  const stopMedia = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentFile(null);
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Keydown event for mute/unmute
  const handleKeyDown = (event) => {
    if (event.key.toLowerCase() === 'm') {
      setIsMuted(prev => !prev);
    }
  };

  // Attach keydown event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <MediaContext.Provider
      value={{
        currentFile,
        setCurrentFile,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        isMuted,
        toggleMute: () => setIsMuted(prev => !prev),
        audioFiles,
        updateAudioFiles,
        videoFiles,
        updateVideoFiles,
        audioRef,
        videoRef,
        seekTo: (time) => { if (audioRef.current.src) audioRef.current.currentTime = time; },
        favoriteAudioFiles,
        toggleFavoriteAudio,
        favoriteVideoFiles,
        toggleFavoriteVideo,
        stopMedia,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

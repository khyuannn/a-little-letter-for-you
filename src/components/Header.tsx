import React from 'react';
import { Volume2, VolumeX, Moon } from './Icons';

interface HeaderProps {
  audioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  audioPlaying,
  onToggleAudio,
}) => {
  return (
    <header className="app-header">
      <div className="header-badge">
        <Moon size={12} /> For Sara • A Quiet Space
      </div>
      <h1 className="header-title">A Little Letter for You</h1>
      <p className="header-subtitle">A cozy care package for your heart</p>

      <div className="controls-bar">
        <button
          className={`icon-button ${audioPlaying ? 'active' : ''}`}
          onClick={onToggleAudio}
          title="Toggle ambient rain sound"
        >
          {audioPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <span>{audioPlaying ? 'Rain Sound' : 'Mute Rain'}</span>
        </button>
      </div>
    </header>
  );
};

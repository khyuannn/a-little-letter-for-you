import React from 'react';
import { ArrowRight, Heart } from './Icons';

interface Screen1WelcomeProps {
  onBegin: () => void;
}

export const Screen1Welcome: React.FC<Screen1WelcomeProps> = ({ onBegin }) => {
  return (
    <div className="step-card welcome-hero-card">
      <div className="welcome-icon-emblem">
        💌
      </div>

      <h2 className="step-title">Welcome to your quiet sanctuary, Sara</h2>

      <p className="welcome-message">
        A small, thoughtful care package created for your heart. No notifications to answer, no pressure to maintain conversations—just a quiet moment to breathe and receive encouragement.
      </p>

      <button className="primary-btn" onClick={onBegin} style={{ marginTop: 10 }}>
        <span>Step Inside</span>
        <ArrowRight size={16} />
      </button>

      <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
        <Heart size={12} color="var(--accent-gold)" /> Take all the time you need
      </p>
    </div>
  );
};

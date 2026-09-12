import React from 'react';
import { Heart, RefreshCw } from './Icons';

interface Screen8ClosingProps {
  onRestart: () => void;
}

export const Screen8Closing: React.FC<Screen8ClosingProps> = ({ onRestart }) => {
  return (
    <div className="step-card closing-card">
      <div style={{ fontSize: '2.5rem', marginBottom: -10 }}>🌙</div>

      <h2 className="closing-title">Rest Well, Dear Sara</h2>

      <p className="closing-text">
        May your heart carry this quiet peace with you. Remember: you are allowed to move at your own gentle pace, and you don't owe anyone your peace.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 8 }}>
        <button className="primary-btn" onClick={onRestart}>
          <RefreshCw size={16} />
          <span>Read Another Letter</span>
        </button>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Heart size={12} color="var(--accent-gold)" /> You can return to this sanctuary anytime
        </p>
      </div>
    </div>
  );
};

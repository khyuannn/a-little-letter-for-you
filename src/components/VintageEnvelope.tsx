import React from 'react';
import type { MysteryLetter } from '../types';

interface VintageEnvelopeProps {
  letter: MysteryLetter;
  isSelected?: boolean;
  isDimmed?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const VintageEnvelope: React.FC<VintageEnvelopeProps> = ({
  letter,
  isSelected = false,
  isDimmed = false,
  onClick,
  style
}) => {
  return (
    <div
      className={`physical-envelope ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Select ${letter.title}`}
      style={style}
    >
      {/* 1. Envelope Back & Pocket Shadow */}
      <div className="env-layer env-back" />

      {/* 2. Inner Letter Peek */}
      <div className="env-layer env-letter-peek">
        <div className="env-letter-lines">
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* 3. Front Pocket Overlay (V-Shape) */}
      <div className="env-layer env-front-pocket">
        <svg className="env-pocket-svg" viewBox="0 0 320 200" preserveAspectRatio="none">
          <path
            d="M0,200 L160,110 L320,200 L320,0 L0,0 Z"
            fill="url(#parchment-gradient-front)"
          />
          <path
            d="M0,0 L160,110 L320,0"
            fill="none"
            stroke="rgba(180, 155, 120, 0.4)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="parchment-gradient-front" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f7f1e3" />
              <stop offset="100%" stopColor="#eadecb" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 4. Top Flap (Triangular Fold) */}
      <div className="env-layer env-top-flap">
        <svg className="env-flap-svg" viewBox="0 0 320 130" preserveAspectRatio="none">
          <polygon points="0,0 160,120 320,0" fill="url(#parchment-gradient-flap)" />
          <polyline points="0,0 160,120 320,0" fill="none" stroke="rgba(160, 135, 100, 0.45)" strokeWidth="1.5" />
          <defs>
            <linearGradient id="parchment-gradient-flap" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#eee3ce" />
              <stop offset="100%" stopColor="#e4d6be" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 5. Wax Seal Medallion */}
      <div
        className="env-wax-seal"
        style={{ backgroundColor: letter.sealColor }}
      >
        <span className="seal-symbol">{letter.sealSymbol}</span>
      </div>

      {/* Title & Description Tag Below Envelope */}
      <div className="env-caption">
        <h3 className="env-title">{letter.title}</h3>
        <p className="env-desc">{letter.description}</p>
      </div>
    </div>
  );
};

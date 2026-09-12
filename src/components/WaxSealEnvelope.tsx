import React, { useState } from 'react';
import type { MysteryLetter } from '../types';
import confetti from 'canvas-confetti';

interface WaxSealEnvelopeProps {
  mysteryLetter: MysteryLetter;
  onOpenComplete: () => void;
}

type OpeningPhase = 'idle' | 'anticipation' | 'crack' | 'flap' | 'reveal' | 'settle';

export const WaxSealEnvelope: React.FC<WaxSealEnvelopeProps> = ({
  mysteryLetter,
  onOpenComplete
}) => {
  const [phase, setPhase] = useState<OpeningPhase>('idle');

  const handleSealTap = () => {
    if (phase !== 'idle') return; // Lock duplicate taps

    // Phase 1: Anticipation (0.00s - 0.15s)
    setPhase('anticipation');

    // Soft sparkle accent
    confetti({
      particleCount: 24,
      spread: 55,
      origin: { y: 0.52 },
      colors: [mysteryLetter.sealColor, '#d4af37', '#f8f3e6']
    });

    // Phase 2: Wax Seal Crack (0.15s - 0.45s)
    setTimeout(() => {
      setPhase('crack');
    }, 150);

    // Phase 3: Flap Opens (0.35s - 0.85s)
    setTimeout(() => {
      setPhase('flap');
    }, 350);

    // Phase 4: Letter Slides Out (0.65s - 1.30s)
    setTimeout(() => {
      setPhase('reveal');
    }, 650);

    // Phase 5: Letter Settles & Content Fades In (1.10s - 1.60s)
    setTimeout(() => {
      setPhase('settle');
      setTimeout(() => {
        onOpenComplete();
      }, 400);
    }, 1100);
  };

  return (
    <div className="opening-stage">

      {/* Realistic 3D Physical Vintage Envelope */}
      <div className={`opening-envelope-wrapper phase-${phase}`}>
        
        {/* Layer 1: Envelope Back & Shadow */}
        <div className="env-layer env-back" />

        {/* Layer 2: Inner Folded Parchment Letter (Slides Upward) */}
        <div className={`env-layer env-inner-letter ${phase === 'reveal' || phase === 'settle' ? 'revealed' : ''}`}>
          <div className="inner-letter-content">
            <span className="inner-greeting">Dearest Sara,</span>
            <div className="inner-line-skeleton" />
            <div className="inner-line-skeleton short" />
          </div>
        </div>

        {/* Layer 3: Front Pocket Overlay */}
        <div className="env-layer env-front-pocket">
          <svg className="env-pocket-svg" viewBox="0 0 520 320" preserveAspectRatio="none">
            <path d="M0,320 L260,180 L520,320 L520,0 L0,0 Z" fill="url(#parchment-front-opening)" />
            <path d="M0,0 L260,180 L520,0" fill="none" stroke="rgba(180, 155, 120, 0.45)" strokeWidth="1.5" />
            <defs>
              <linearGradient id="parchment-front-opening" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8f3e7" />
                <stop offset="100%" stopColor="#ebdcc5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Layer 4: Top Flap (3D Flip 180deg around top fold) */}
        <div className={`env-layer env-top-flap ${phase === 'flap' || phase === 'reveal' || phase === 'settle' ? 'opened' : ''}`}>
          <svg className="env-flap-svg" viewBox="0 0 520 200" preserveAspectRatio="none">
            <polygon points="0,0 260,190 520,0" fill="url(#parchment-flap-opening)" />
            <polyline points="0,0 260,190 520,0" fill="none" stroke="rgba(160, 135, 100, 0.45)" strokeWidth="1.5" />
            <defs>
              <linearGradient id="parchment-flap-opening" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#eedfca" />
                <stop offset="100%" stopColor="#e3d3b7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Layer 5: Tactile Sealing Wax Medallion */}
        <button
          className={`tactile-wax-seal ${phase !== 'idle' ? 'cracked' : ''}`}
          style={{ backgroundColor: mysteryLetter.sealColor }}
          onClick={handleSealTap}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSealTap();
            }
          }}
          disabled={phase !== 'idle'}
          aria-label={`Open ${mysteryLetter.title}`}
        >
          <div className="seal-fragment seal-left">
            <span className="seal-icon">{mysteryLetter.sealSymbol}</span>
          </div>
          <div className="seal-fragment seal-right">
            <span className="seal-icon">{mysteryLetter.sealSymbol}</span>
          </div>
        </button>
      </div>

      {/* Understated Instructions Below Envelope (NO dark box) */}
      <div className="understated-instructions">
        <p className="instruction-primary">Tap the seal to open</p>
        <p className="instruction-secondary">Prepared especially for Sara</p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MYSTERY_LETTERS } from '../data/mysteryLetters';
import type { MysteryLetter } from '../types';

interface StepLetterPickerProps {
  onSelectLetter: (letter: MysteryLetter) => void;
}

export const StepLetterPicker: React.FC<StepLetterPickerProps> = ({ onSelectLetter }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEnvelopeClick = (letter: MysteryLetter) => {
    if (selectedId) return; // Lock duplicate taps
    setSelectedId(letter.id);

    // Short selection lift before moving to Screen 5
    setTimeout(() => {
      onSelectLetter(letter);
    }, 380);
  };

  return (
    <div className="picker-container">
      <div className="step-header">
        <h2 className="step-title">Three Sealed Letters Sit Before You</h2>
        <p className="step-desc">
          Choose the physical letter that draws your heart today.
        </p>
      </div>

      {/* Centered 3-Envelope Composition */}
      <div className="picker-stage-wrapper">
        <div className="physical-envelopes-stage">
          {MYSTERY_LETTERS.map((letter) => {
            const isSelected = selectedId === letter.id;
            const isDimmed = selectedId !== null && selectedId !== letter.id;

            return (
              <div
                key={letter.id}
                className={`picker-envelope-card ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}`}
                onClick={() => handleEnvelopeClick(letter)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleEnvelopeClick(letter);
                  }
                }}
                aria-label={`Select ${letter.title}`}
              >
                {/* Physical Envelope Object */}
                <div className="envelope-object">
                  <div className="env-layer env-back" />

                  <div className="env-layer env-letter-peek">
                    <div className="env-letter-lines">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  {/* V-Shape Front Pocket */}
                  <div className="env-layer env-front-pocket">
                    <svg className="env-pocket-svg" viewBox="0 0 280 170" preserveAspectRatio="none">
                      <path d="M0,170 L140,95 L280,170 L280,0 L0,0 Z" fill="url(#parchment-front-picker)" />
                      <path d="M0,0 L140,95 L280,0" fill="none" stroke="rgba(180, 155, 120, 0.45)" strokeWidth="1.5" />
                      <defs>
                        <linearGradient id="parchment-front-picker" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f7f1e3" />
                          <stop offset="100%" stopColor="#eadecb" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Top Fold Flap */}
                  <div className="env-layer env-top-flap">
                    <svg className="env-flap-svg" viewBox="0 0 280 110" preserveAspectRatio="none">
                      <polygon points="0,0 140,100 280,0" fill="url(#parchment-flap-picker)" />
                      <polyline points="0,0 140,100 280,0" fill="none" stroke="rgba(160, 135, 100, 0.45)" strokeWidth="1.5" />
                      <defs>
                        <linearGradient id="parchment-flap-picker" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#eee3ce" />
                          <stop offset="100%" stopColor="#e4d6be" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Wax Seal Medallion */}
                  <div
                    className="env-wax-seal"
                    style={{ backgroundColor: letter.sealColor }}
                  >
                    <span className="seal-symbol">{letter.sealSymbol}</span>
                  </div>
                </div>

                {/* Fixed-Height Equal Text Container */}
                <div className="env-caption-fixed">
                  <h3 className="env-title">{letter.title}</h3>
                  <p className="env-desc">{letter.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

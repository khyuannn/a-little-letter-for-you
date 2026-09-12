import React, { useState, useEffect } from 'react';
import { Play, Pause, X, Heart } from './Icons';

interface BreathingSanctuaryModalProps {
  onClose: () => void;
}

type Phase = 'inhale' | 'hold' | 'exhale';

export const BreathingSanctuaryModal: React.FC<BreathingSanctuaryModalProps> = ({ onClose }) => {
  const TOTAL_DURATION = 180; // 3 minutes = 180 seconds
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_DURATION);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Timer Countdown Effect
  useEffect(() => {
    if (isPaused || isCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, isCompleted]);

  // Determine current phase based on elapsed seconds in 12s cycle (4s Inhale, 2s Hold, 6s Exhale)
  const elapsedTotal = TOTAL_DURATION - timeLeft;
  const cycleTime = elapsedTotal % 12;

  let currentPhase: Phase = 'inhale';
  let phaseText = 'Breathe in';
  let transitionDuration = '4s';

  if (cycleTime < 4) {
    currentPhase = 'inhale';
    phaseText = 'Breathe in';
    transitionDuration = '4s';
  } else if (cycleTime < 6) {
    currentPhase = 'hold';
    phaseText = 'Hold gently';
    transitionDuration = '0.2s';
  } else {
    currentPhase = 'exhale';
    phaseText = 'Let it go';
    transitionDuration = '6s';
  }

  // Format mm:ss remaining
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="3-Minute Breathing Sanctuary">
      <div className="breathing-modal-card">
        {/* Header bar */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="grounding-badge" style={{ color: 'var(--accent-gold)' }}>
            <Heart size={12} /> 3-Minute Breathing Sanctuary
          </span>
          <button
            onClick={onClose}
            className="secondary-btn"
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            aria-label="End Sanctuary"
          >
            <X size={14} />
          </button>
        </div>

        {!isCompleted ? (
          <>
            {/* Visual Breathing Circle */}
            <div className="breath-circle-container">
              <div className="breath-circle-ring" />
              <div
                className={`breath-circle-inner ${currentPhase} ${isPaused ? 'paused' : ''}`}
                style={{ transitionDuration: isPaused ? '0s' : transitionDuration }}
              />
            </div>

            {/* Instruction & Status */}
            <div style={{ textAlign: 'center', minHeight: '60px' }}>
              <h3 className="breath-instruction">
                {isPaused ? 'Paused in stillness' : phaseText}
              </h3>
              <p className="breath-timer-text">
                {formattedTime} remaining
              </p>
            </div>

            {/* Action Controls */}
            <div className="breath-controls-row">
              <button className="secondary-btn" onClick={togglePause} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button className="secondary-btn" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>End gently</span>
              </button>
            </div>
          </>
        ) : (
          /* Completion State */
          <div className="breath-completion-box">
            <div style={{ fontSize: '2rem', marginBottom: 6 }}>🌿</div>
            <h3 className="breath-completion-title">You made a little space for yourself.</h3>
            <p className="breath-completion-sub">
              Your heart is unhurried. Take this quiet feeling with you.
            </p>

            <button className="primary-btn" onClick={onClose} style={{ marginTop: 14 }}>
              <span>Return to your letter</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

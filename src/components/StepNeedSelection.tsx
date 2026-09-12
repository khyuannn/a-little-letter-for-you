import React from 'react';
import { EMOTIONAL_NEEDS } from '../data/emotionalNeeds';
import type { EmotionalNeedId } from '../types';
import { MessageSquareOff, Wind, Feather, Hourglass, HeartHandshake, ArrowRight } from './Icons';

interface StepNeedSelectionProps {
  selectedNeedId: EmotionalNeedId | null;
  onSelectNeed: (id: EmotionalNeedId) => void;
  onContinue: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  MessageSquareOff: <MessageSquareOff size={20} />,
  Wind: <Wind size={20} />,
  Feather: <Feather size={20} />,
  Hourglass: <Hourglass size={20} />,
  HeartHandshake: <HeartHandshake size={20} />
};

export const StepNeedSelection: React.FC<StepNeedSelectionProps> = ({
  selectedNeedId,
  onSelectNeed,
  onContinue
}) => {
  return (
    <div className="step-card">
      <div className="step-header">
        <h2 className="step-title">What does your heart need today, Sara?</h2>
        <p className="step-desc">
          Choose whatever feels closest to how you are feeling right now. There are no right or wrong answers.
        </p>
      </div>

      <div className="need-options">
        {EMOTIONAL_NEEDS.map((need) => {
          const isSelected = selectedNeedId === need.id;
          return (
            <button
              key={need.id}
              className={`need-option-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectNeed(need.id)}
            >
              <div className="need-icon-badge">
                {ICON_MAP[need.iconName] || <HeartHandshake size={20} />}
              </div>
              <div className="need-text">
                <span className="need-title">{need.title}</span>
                <span className="need-sub">{need.subtitle}</span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        className="primary-btn"
        disabled={!selectedNeedId}
        onClick={onContinue}
      >
        <span>Continue</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

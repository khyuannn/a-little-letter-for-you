import React from 'react';
import type { GroundingSuggestion } from '../types';
import { Feather, Sparkles, ArrowRight } from './Icons';

interface Screen7TinyActionProps {
  suggestion: GroundingSuggestion;
  onStartBreathing: () => void;
  onProceedToClosing: () => void;
}

export const Screen7TinyAction: React.FC<Screen7TinyActionProps> = ({
  suggestion,
  onStartBreathing,
  onProceedToClosing
}) => {
  return (
    <div className="step-card">
      <div className="step-header">
        <h2 className="step-title">One Tiny Grounding Ritual</h2>
        <p className="step-desc">
          No big task or effort required. Just a single gentle step to ground your heart right now.
        </p>
      </div>

      <div className="grounding-card">
        <div className="grounding-badge">
          <Feather size={14} /> Grounding Step
        </div>
        <h3 className="grounding-title">{suggestion.title}</h3>
        <p className="grounding-desc">{suggestion.description}</p>

        {suggestion.breathExerciseable && (
          <button className="primary-btn" onClick={onStartBreathing} style={{ marginTop: 8 }}>
            <Sparkles size={16} />
            <span>{suggestion.actionText}</span>
          </button>
        )}
      </div>

      <button className="primary-btn" onClick={onProceedToClosing} style={{ marginTop: 10 }}>
        <span>Complete Ritual & Rest</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

import React from 'react';
import { OPTIONAL_CONTEXT_TAGS } from '../data/emotionalNeeds';
import { Sparkles, ArrowRight, SkipForward } from './Icons';

interface StepContextSelectionProps {
  selectedContextIds: string[];
  customNote: string;
  onChangeCustomNote: (text: string) => void;
  onToggleContext: (id: string) => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const StepContextSelection: React.FC<StepContextSelectionProps> = ({
  selectedContextIds,
  customNote,
  onChangeCustomNote,
  onToggleContext,
  onContinue,
  onSkip
}) => {
  return (
    <div className="step-card">
      <div className="step-header">
        <h2 className="step-title">Would you like to add a quiet whisper?</h2>
        <p className="step-desc">
          (Genuinely optional) Choose any feelings that resonate or type a small note to yourself, or skip directly.
        </p>
      </div>

      <div className="context-grid">
        {OPTIONAL_CONTEXT_TAGS.map((tag) => {
          const isSelected = selectedContextIds.includes(tag.id);
          return (
            <button
              key={tag.id}
              className={`context-chip ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggleContext(tag.id)}
            >
              {isSelected && <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />}
              {tag.label}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 4 }}>
        <textarea
          className="context-textarea"
          value={customNote}
          onChange={(e) => onChangeCustomNote(e.target.value)}
          placeholder="Optional: Anything else weighing on your mind today, Sara?"
          rows={3}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
        <button className="primary-btn" onClick={onContinue}>
          <span>Choose My Mystery Letter</span>
          <ArrowRight size={16} />
        </button>

        <button className="secondary-btn" onClick={onSkip} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <span>Skip & Choose Letter Directly</span>
          <SkipForward size={14} />
        </button>
      </div>
    </div>
  );
};

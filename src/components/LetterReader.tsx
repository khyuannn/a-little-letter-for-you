import React from 'react';
import type { LetterContent } from '../types';
import { ArrowRight, Heart } from './Icons';

interface LetterReaderProps {
  letter: LetterContent;
  onProceedToTinyAction: () => void;
  onSaveKeepsake: () => void;
}

export const LetterReader: React.FC<LetterReaderProps> = ({
  letter,
  onProceedToTinyAction,
  onSaveKeepsake
}) => {
  return (
    <div className="parchment-letter">
      <div className="letter-stamp">💌</div>
      
      <h2 className="letter-greeting">{letter.greeting}</h2>

      <div className="letter-body">
        {letter.bodyParagraphs.map((para, index) => (
          <p key={index}>{para}</p>
        ))}

        <div className="letter-quote-box">
          "{letter.reassuranceQuote}"
        </div>
      </div>

      <div className="letter-signature">
        With warmth & care,
        <br />
        Your Quiet Sanctuary
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
        <button className="primary-btn" onClick={onProceedToTinyAction}>
          <span>See One Tiny Gentle Action</span>
          <ArrowRight size={16} />
        </button>

        <button
          className="secondary-btn"
          onClick={onSaveKeepsake}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          <Heart size={14} />
          <span>Save as Keepsake</span>
        </button>
      </div>
    </div>
  );
};

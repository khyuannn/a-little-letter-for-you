export type EmotionalNeedId = 
  | 'overwhelmed'
  | 'feeling-behind'
  | 'overthinking'
  | 'drained-conversations'
  | 'seeking-reassurance';

export interface EmotionalNeed {
  id: EmotionalNeedId;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface ContextTag {
  id: string;
  label: string;
  needId?: EmotionalNeedId;
}

export interface MysteryLetter {
  id: 'moonlight' | 'wildflower' | 'stardust';
  title: string;
  sealColor: string;
  sealSymbol: string;
  envelopeTexture: string;
  description: string;
}

export interface GroundingSuggestion {
  title: string;
  description: string;
  actionText: string;
  breathExerciseable?: boolean;
}

export interface LetterContent {
  id: string;
  needId: EmotionalNeedId;
  mysteryId: string;
  greeting: string;
  bodyParagraphs: string[];
  reassuranceQuote: string;
  groundingSuggestion: GroundingSuggestion;
}

export type ScreenNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type SceneName = 'welcome' | 'sanctuary';

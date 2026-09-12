import type { EmotionalNeed, ContextTag } from '../types';

export const EMOTIONAL_NEEDS: EmotionalNeed[] = [
  {
    id: 'drained-conversations',
    title: 'Exhausted by constant messaging',
    subtitle: 'Feeling guilty for needing silence & space from conversations',
    iconName: 'MessageSquareOff'
  },
  {
    id: 'overthinking',
    title: 'Quiet my overthinking mind',
    subtitle: 'Re-analyzing past conversations and worrying about what people think',
    iconName: 'Wind'
  },
  {
    id: 'overwhelmed',
    title: 'Relief from heavy pressure',
    subtitle: 'Feeling like everything demands your attention all at once',
    iconName: 'Feather'
  },
  {
    id: 'feeling-behind',
    title: 'Permission to rest & go at my pace',
    subtitle: 'Feeling like everyone else is moving faster and you are falling behind',
    iconName: 'Hourglass'
  },
  {
    id: 'seeking-reassurance',
    title: 'A gentle reminder that I am enough',
    subtitle: 'Needing warmth, validation, and a soft place to land',
    iconName: 'HeartHandshake'
  }
];

export const OPTIONAL_CONTEXT_TAGS: ContextTag[] = [
  { id: 'unread-chats', label: 'Unreplied messages weighing on me' },
  { id: 'social-exhaustion', label: 'Social battery is completely at 0%' },
  { id: 'second-guessing', label: 'Second-guessing something I said' },
  { id: 'high-expectations', label: 'Trying too hard to make everyone happy' },
  { id: 'need-quiet', label: 'Just need a quiet moment to breathe alone' },
  { id: 'late-night-thoughts', label: 'Mind running in circles at night' }
];

import type { LetterContent, EmotionalNeedId } from '../types';

export const LETTERS_DATABASE: Record<EmotionalNeedId, Record<string, LetterContent>> = {
  'drained-conversations': {
    default: {
      id: 'drained-conv-1',
      needId: 'drained-conversations',
      mysteryId: 'all',
      greeting: 'Dearest Sara,',
      bodyParagraphs: [
        "First, take a deep, quiet breath. You do not owe anyone an immediate reply right now. Your peace is not a debt you must pay in notifications.",
        "It is okay to love your friends and people deeply while still needing hours—or days—of quiet sanctuary away from the glowing screen. True connection is built on understanding, not constant availability.",
        "The people who truly care about you do not expect you to run your battery down to zero just to stay in touch. Give yourself permission to let the unread count rest."
      ],
      reassuranceQuote: "Silence is not distance. It is simply your soul gathering its light back.",
      groundingSuggestion: {
        title: 'The Silent Hour Ritual',
        description: 'Put your phone in Do Not Disturb, place it out of sight in a drawer, and sip a warm cup of herbal tea or water while looking out the window for 10 unhurried minutes.',
        actionText: 'Start 3-Minute Breathing Sanctuary',
        breathExerciseable: true
      }
    }
  },
  'overthinking': {
    default: {
      id: 'overthinking-1',
      needId: 'overthinking',
      mysteryId: 'all',
      greeting: 'Sweet Sara,',
      bodyParagraphs: [
        "Your mind is a brilliant, tender garden, but sometimes it tries to grow thoughts far too fast. You have been re-playing conversations in your head, asking yourself if you said the wrong thing or sounded strange.",
        "Here is a gentle truth: most people are so focused on their own inner worlds that they never notice the tiny flaws you worry over. You were warm, genuine, and enough—exactly as you were.",
        "You don't need to figure out every outcome tonight. Let the unsolved thoughts lie down and rest."
      ],
      reassuranceQuote: "You don't have to carry tomorrow's answers into tonight's rest.",
      groundingSuggestion: {
        title: 'Unclench & Release',
        description: 'Drop your shoulders down away from your ears. Unclench your jaw, soften your eyelids, and let out a long slow exhale.',
        actionText: 'Begin Guided Breathe & Unclench',
        breathExerciseable: true
      }
    }
  },
  'overwhelmed': {
    default: {
      id: 'overwhelmed-1',
      needId: 'overwhelmed',
      mysteryId: 'all',
      greeting: 'Dear Sara,',
      bodyParagraphs: [
        "When the world feels too loud and demanding, remember that you are allowed to shrink your universe down to this exact room, this exact breath.",
        "You do not have to solve everything today. You do not have to hold the weight of everyone's expectations on your shoulders.",
        "Right now, your only job is to be gentle with yourself. Step back, wrap yourself in your softest blanket, and rest."
      ],
      reassuranceQuote: "You are allowed to pause. The world can wait while you gather yourself.",
      groundingSuggestion: {
        title: '5-4-3-2-1 Sensory Reset',
        description: 'Name 3 soft textures near you, feel the weight of your feet on the ground, and take 3 gentle slow breaths.',
        actionText: 'Start Soothing Breath Counter',
        breathExerciseable: true
      }
    }
  },
  'feeling-behind': {
    default: {
      id: 'behind-1',
      needId: 'feeling-behind',
      mysteryId: 'all',
      greeting: 'My Gentle Sara,',
      bodyParagraphs: [
        "Life is not a race track, and you are not falling behind. Flowers do not bloom at the same hour, and trees do not shed leaves on the same day.",
        "Your path has its own quiet season. The progress you make in secret—learning to protect your energy, learning to say no, learning to honor your spirit—is just as grand as anything visible.",
        "Trust your own timing. You are right where you need to be."
      ],
      reassuranceQuote: "You are not late. You are unfolding on your own tender timeline.",
      groundingSuggestion: {
        title: 'Soft Pace Affirmation',
        description: 'Place your hand over your heart. Feel its steady rhythm. Remind yourself: "I am going at the exact right pace."',
        actionText: 'Take 3 Calm Breaths with Me',
        breathExerciseable: true
      }
    }
  },
  'seeking-reassurance': {
    default: {
      id: 'reassurance-1',
      needId: 'seeking-reassurance',
      mysteryId: 'all',
      greeting: 'Dearest Sara,',
      bodyParagraphs: [
        "In case no one told you today: you are a deeply thoughtful, lovely soul. Your sensitivity is not a weakness; it is your capacity to care profoundly.",
        "Even on days when you feel hesitant, unsure, or quiet, your presence matters to the world around you.",
        "Be soft with your heart. You are doing so much better than your anxious thoughts let you believe."
      ],
      reassuranceQuote: "You are loved not for how productive or responsive you are, but simply for who you are.",
      groundingSuggestion: {
        title: 'Warm Hug Meditation',
        description: 'Wrap your arms gently around your own shoulders, squeeze softly, and let yourself feel held.',
        actionText: 'Start Quiet Breathing Exercise',
        breathExerciseable: true
      }
    }
  }
};

export function getPersonalizedLetter(
  needId: EmotionalNeedId,
  selectedContextIds: string[],
  _mysteryId: string
): LetterContent {
  const baseLetter = LETTERS_DATABASE[needId]?.default || LETTERS_DATABASE['seeking-reassurance'].default;

  // Add subtle personalized sentence if context is selected
  let customSentence = '';
  if (selectedContextIds.includes('unread-chats')) {
    customSentence = " I know those pending messages feel like a lingering shadow, but your friends will understand when you return with a rested heart.";
  } else if (selectedContextIds.includes('social-exhaustion')) {
    customSentence = " When your social battery reaches zero, silence is not selfishness—it is vital maintenance for your soul.";
  } else if (selectedContextIds.includes('second-guessing')) {
    customSentence = " Please stop replay-ing that moment in your mind; you spoke with kind intentions, and that is what shines through.";
  } else if (selectedContextIds.includes('late-night-thoughts')) {
    customSentence = " Nighttime always makes worries look twice their size. In the morning light, things will feel softer.";
  }

  if (customSentence) {
    return {
      ...baseLetter,
      bodyParagraphs: [
        baseLetter.bodyParagraphs[0],
        baseLetter.bodyParagraphs[1] + customSentence,
        baseLetter.bodyParagraphs[2]
      ]
    };
  }

  return baseLetter;
}

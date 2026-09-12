import { useState, useRef } from 'react';
import type { ScreenNumber, SceneName, EmotionalNeedId, MysteryLetter, LetterContent } from './types';
import { Atmosphere } from './components/Atmosphere';
import { Header } from './components/Header';
import { Screen1Welcome } from './components/Screen1Welcome';
import { StepNeedSelection } from './components/StepNeedSelection';
import { StepContextSelection } from './components/StepContextSelection';
import { StepLetterPicker } from './components/StepLetterPicker';
import { WaxSealEnvelope } from './components/WaxSealEnvelope';
import { LetterReader } from './components/LetterReader';
import { Screen7TinyAction } from './components/Screen7TinyAction';
import { Screen8Closing } from './components/Screen8Closing';
import { BreathingSanctuaryModal } from './components/BreathingSanctuaryModal';
import { getPersonalizedLetter } from './data/letterTemplates';
import './index.css';

export function App() {
  const [screen, setScreen] = useState<ScreenNumber>(1);
  const [selectedNeedId, setSelectedNeedId] = useState<EmotionalNeedId | null>(null);
  const [selectedContextIds, setSelectedContextIds] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState<string>('');
  const [selectedMystery, setSelectedMystery] = useState<MysteryLetter | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);

  // Web Audio Synth for ambient white noise/rain
  const audioCtxRef = useRef<AudioContext | null>(null);

  const toggleAudio = () => {
    if (audioPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setAudioPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 750;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.035;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start(0);
      } else {
        audioCtxRef.current.resume();
      }
      setAudioPlaying(true);
    }
  };

  const handleSelectNeed = (id: EmotionalNeedId) => {
    setSelectedNeedId(id);
  };

  const handleToggleContext = (id: string) => {
    setSelectedContextIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectMysteryLetter = (letter: MysteryLetter) => {
    setSelectedMystery(letter);
    setScreen(5); // Screen 5: Opening / Seal
  };

  const handleSealOpened = () => {
    setScreen(6); // Screen 6: Letter Display
  };

  const handleReset = () => {
    setScreen(1);
    setSelectedNeedId(null);
    setSelectedContextIds([]);
    setCustomNote('');
    setSelectedMystery(null);
  };

  const currentScene: SceneName = screen === 1 ? 'welcome' : 'sanctuary';

  const currentLetter: LetterContent | null = selectedNeedId && selectedMystery
    ? getPersonalizedLetter(selectedNeedId, selectedContextIds, selectedMystery.id)
    : null;

  return (
    <div className="app-container">
      {/* Reusable Atmosphere Component */}
      <Atmosphere scene={currentScene} />

      <main className="content-wrapper">
        <Header
          audioPlaying={audioPlaying}
          onToggleAudio={toggleAudio}
        />

        {/* SCREEN 1 — Welcome */}
        {screen === 1 && (
          <Screen1Welcome onBegin={() => setScreen(2)} />
        )}

        {/* SCREEN 2 — Choose Emotion */}
        {screen === 2 && (
          <StepNeedSelection
            selectedNeedId={selectedNeedId}
            onSelectNeed={handleSelectNeed}
            onContinue={() => setScreen(3)}
          />
        )}

        {/* SCREEN 3 — Optional Context */}
        {screen === 3 && (
          <StepContextSelection
            selectedContextIds={selectedContextIds}
            customNote={customNote}
            onChangeCustomNote={setCustomNote}
            onToggleContext={handleToggleContext}
            onContinue={() => setScreen(4)}
            onSkip={() => setScreen(4)}
          />
        )}

        {/* SCREEN 4 — Choose a Letter */}
        {screen === 4 && (
          <StepLetterPicker onSelectLetter={handleSelectMysteryLetter} />
        )}

        {/* SCREEN 5 — Opening Animation / Wax Seal */}
        {screen === 5 && selectedMystery && (
          <WaxSealEnvelope
            mysteryLetter={selectedMystery}
            onOpenComplete={handleSealOpened}
          />
        )}

        {/* SCREEN 6 — Letter Display */}
        {screen === 6 && currentLetter && (
          <LetterReader
            letter={currentLetter}
            onProceedToTinyAction={() => setScreen(7)}
            onSaveKeepsake={() => alert("Letter saved to your quiet heart. You can return here anytime.")}
          />
        )}

        {/* SCREEN 7 — Tiny Action */}
        {screen === 7 && currentLetter && (
          <Screen7TinyAction
            suggestion={currentLetter.groundingSuggestion}
            onStartBreathing={() => setIsBreathingOpen(true)}
            onProceedToClosing={() => setScreen(8)}
          />
        )}

        {/* SCREEN 8 — Closing */}
        {screen === 8 && (
          <Screen8Closing onRestart={handleReset} />
        )}

        <footer className="app-footer">
          Made with gentle care for Sara • Step {screen} of 8
        </footer>
      </main>

      {/* 3-Minute Breathing Sanctuary Modal */}
      {isBreathingOpen && (
        <BreathingSanctuaryModal onClose={() => setIsBreathingOpen(false)} />
      )}
    </div>
  );
}

export default App;

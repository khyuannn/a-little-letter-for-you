import React from 'react';
import type { SceneName } from '../types';

interface AtmosphereProps {
  scene: SceneName;
}

export const Atmosphere: React.FC<AtmosphereProps> = ({ scene }) => {
  return (
    <div className="atmosphere-container" aria-hidden="true">
      {/* Background Image Layer 1: Welcome Room (Screen 1) */}
      <div className={`atmosphere-layer scene-welcome ${scene === 'welcome' ? 'active' : ''}`} />

      {/* Background Image Layer 2: Sanctuary Room (Screens 2–8) */}
      <div className={`atmosphere-layer scene-sanctuary ${scene === 'sanctuary' ? 'active' : ''}`} />

      {/* Subtle Soft Edge Vignette (Keeps image clear & bright, avoids muddy darkness) */}
      <div className="atmosphere-vignette" />

      {/* Natural Candle Warm Light Accent */}
      <div className="atmosphere-candle-glow" />

      {/* Tiny Dust Floating Particles */}
      <div className="atmosphere-dust-layer">
        <span className="dust-particle p1" />
        <span className="dust-particle p2" />
        <span className="dust-particle p3" />
        <span className="dust-particle p4" />
        <span className="dust-particle p5" />
      </div>
    </div>
  );
};

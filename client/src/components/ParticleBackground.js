import React from 'react';
import Particles from 'react-tsparticles';
import './ParticleBackground.css';

const ParticleBackground = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            resize: true
          }
        },
        particles: {
          color: { value: "#ffffff" },
          links: { enable: false },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            outMode: "bounce"
          },
          number: {
            value: 70,
            density: {
              enable: true,
              area: 800
            }
          },
          opacity: { value: 0.2 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true
      }}
    />
  );
};

export default ParticleBackground;

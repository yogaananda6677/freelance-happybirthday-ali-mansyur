import React, { useMemo } from 'react';

export const StarsBackground: React.FC = () => {
  // Generate distinct atmospheric stars with different layers
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.2 + 0.8,
      duration: Math.random() * 3.5 + 2.5,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Celestial Nebula Aura */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-blue-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-indigo-950/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-40 w-[550px] h-[550px] bg-blue-950/25 rounded-full blur-[130px] pointer-events-none" />

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity,
            boxShadow: star.size > 1.8 ? '0 0 8px 1px rgba(197, 216, 251, 0.9)' : 'none',
          }}
        />
      ))}

      {/* Atmospheric Shooting Stars */}
      <div className="celestial-shooting-star shooting-star-1" />
      <div className="celestial-shooting-star shooting-star-2" />

      <style>{`
        .celestial-shooting-star {
          position: absolute;
          width: 140px;
          height: 1.5px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.95), rgba(96, 143, 230, 0.5), transparent);
          border-radius: 999px;
          transform: rotate(-45deg);
          pointer-events: none;
          opacity: 0;
        }
        .shooting-star-1 {
          top: 18%;
          left: 65%;
          animation: celestialShoot 9s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.5s;
        }
        .shooting-star-2 {
          top: 48%;
          left: 82%;
          animation: celestialShoot 14s cubic-bezier(0.4, 0, 0.2, 1) infinite 7s;
        }
        @keyframes celestialShoot {
          0% {
            transform: translate(0, 0) rotate(-45deg);
            opacity: 0;
          }
          4% {
            opacity: 1;
          }
          15% {
            transform: translate(-380px, 380px) rotate(-45deg);
            opacity: 0;
          }
          100% {
            transform: translate(-380px, 380px) rotate(-45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

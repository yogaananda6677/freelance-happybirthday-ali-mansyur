import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Camera, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface ScrapbookCakeSlideProps {
  config: BirthdayConfig;
}

export const ScrapbookCakeSlide: React.FC<ScrapbookCakeSlideProps> = ({ config }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);

    // Launch celebratory confetti
    const count = 220;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#608fe6', '#93b5f3', '#c5d8fb', '#ffffff', '#3b82f6', '#fbbf24'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 30, startVelocity: 60 });
    fire(0.2, { spread: 65 });
    fire(0.35, { spread: 100, decay: 0.92, scalar: 0.85 });
    fire(0.1, { spread: 125, startVelocity: 25, decay: 0.93, scalar: 1.2 });
    fire(0.1, { spread: 125, startVelocity: 50 });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 max-w-md mx-auto text-center select-none py-16">
      {/* Retro Camera Scrapbook Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-xs mb-6 group"
      >
        <div className="bg-gradient-to-b from-navy-850 to-navy-950 border-2 border-navy-500/50 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
          {/* Top Camera Controls Bar */}
          <div className="flex justify-between items-center mb-2 px-1">
            <div className="flex items-center gap-1.5 text-xs text-blue-300 font-mono tracking-wider">
              <Camera className="w-3.5 h-3.5 text-blue-400" />
              <span>MEMORIES.RAW</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-[10px] text-navy-400 font-mono uppercase">REC</span>
            </div>
          </div>

          {/* Photo Frame */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-navy-400/30 bg-navy-950 shadow-inner">
            <img
              src={config.scrapbookPhoto}
              alt="Memory"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-xs text-white bg-navy-900/80 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
              <Sparkles className="w-3 h-3 text-blue-300" />
              <span className="font-serif">You & Me</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Note Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full glass-card-navy rounded-xl p-5 mb-6 text-left border border-navy-400/30 relative shadow-lg"
      >
        <div className="flex items-center gap-1.5 text-xs text-blue-300 mb-2 font-mono tracking-wider">
          <Heart className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
          <span>A Special Wish:</span>
        </div>
        <p className="font-serif text-sm text-slate-100 leading-relaxed italic">
          "{config.cakeMessage}"
        </p>
      </motion.div>

      {/* Interactive Cake with Animated Vector Candle Flames */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        onClick={handleBlowCandles}
        className="flex flex-col items-center cursor-pointer group"
      >
        {/* Cake Vector Construction */}
        <div className="relative w-40 h-32 flex flex-col items-center justify-end">
          {/* Candles & Flames */}
          <div className="flex gap-4 mb-1 z-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {!candlesBlown ? (
                  <motion.div
                    animate={{
                      scaleY: [1, 1.2, 0.95, 1.15],
                      scaleX: [1, 0.9, 1.05, 0.95],
                      rotate: [-2, 3, -1, 2],
                    }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
                    className="w-2.5 h-4 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full shadow-lg shadow-yellow-400/80"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -20, scale: 1.5 }}
                    transition={{ duration: 1.2 }}
                    className="w-2 h-2 rounded-full bg-slate-300 blur-[1px]"
                  />
                )}
                {/* Candle Stick */}
                <div className="w-1.5 h-7 bg-gradient-to-b from-blue-300 to-blue-600 rounded-t-sm shadow-sm" />
              </div>
            ))}
          </div>

          {/* Top Cake Tier */}
          <div className="w-28 h-9 bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-t-xl border border-blue-200 shadow-sm relative overflow-hidden flex items-center justify-center">
            <div className="w-full h-2.5 bg-blue-300/60 absolute top-0 rounded-t-xl" />
            <div className="flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
          </div>

          {/* Bottom Cake Tier */}
          <div className="w-36 h-11 bg-gradient-to-r from-navy-600 via-navy-500 to-navy-600 rounded-t-xl border border-navy-400/50 shadow-xl relative flex items-center justify-around px-3">
            <div className="w-full h-2.5 bg-white/40 absolute top-0" />
            <div className="w-2 h-2 rounded-full bg-white/70" />
            <div className="w-2 h-2 rounded-full bg-white/70" />
            <div className="w-2 h-2 rounded-full bg-white/70" />
            <div className="w-2 h-2 rounded-full bg-white/70" />
          </div>

          {/* Golden/Silver Stand Plate */}
          <div className="w-40 h-2.5 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-full shadow-lg" />
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="mt-4 px-5 py-2 rounded-full bg-navy-800/90 border border-blue-400/40 text-xs text-blue-200 font-medium tracking-wide hover:bg-blue-600 hover:text-white transition-all shadow-md group-hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          {candlesBlown ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Doa telah dipanjatkan</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Sentuh untuk Tiup Lilin</span>
            </>
          )}
        </button>
      </motion.div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface MirrorPhotoSlideProps {
  config: BirthdayConfig;
}

export const MirrorPhotoSlide: React.FC<MirrorPhotoSlideProps> = ({ config }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 max-w-md mx-auto text-center select-none py-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-5"
      >
        <span className="font-serif text-xs tracking-widest text-blue-300 uppercase block mb-1">
          A Gentle Reminder
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-white">
          One Last Thing
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-blue-400" />
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-blue-400" />
        </div>
      </motion.div>

      {/* Ornate Mirror Oval Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative mb-6"
      >
        {/* Hanging Ribbon & Hook */}
        <div className="flex flex-col items-center -mb-2">
          <div className="w-4 h-4 rounded-full border-2 border-amber-400 bg-navy-950 shadow-md z-20" />
          <div className="w-0.5 h-6 bg-gradient-to-b from-amber-400 to-amber-600 -mt-1" />
        </div>

        {/* Vintage Mirror Frame */}
        <div className="relative w-64 h-80 sm:w-72 sm:h-90 rounded-[42px] sm:rounded-[48px] p-2.5 bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700 shadow-2xl shadow-amber-500/25 border-2 border-amber-300 flex items-center justify-center group overflow-hidden">
          {/* Inner Frame */}
          <div className="w-full h-full rounded-[36px] sm:rounded-[42px] p-1.5 bg-navy-950 border border-amber-400/60 overflow-hidden relative shadow-inner">
            {/* The Photo */}
            <img
              src={config.mirrorPhoto}
              alt="You and Me"
              className="w-full h-full object-cover object-center rounded-[32px] sm:rounded-[38px] transition-transform duration-700 group-hover:scale-105"
            />
            {/* Glass Sheen Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none rounded-[32px] sm:rounded-[38px]" />
          </div>

          {/* Sparkle Badge (placed on bottom-left over dark shirt so it doesn't cover either face) */}
          <div className="absolute bottom-3.5 left-4.5 bg-navy-950/90 p-1.5 rounded-full border border-amber-400/70 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
        </div>
      </motion.div>

      {/* Closing Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2 }}
        className="w-full glass-card-navy rounded-2xl p-5 border border-navy-400/30 text-center relative shadow-xl"
      >
        <p className="font-serif text-sm text-slate-100 italic leading-relaxed">
          "{config.mirrorClosingText}"
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-blue-300 mt-4 font-mono">
          <Heart className="w-3.5 h-3.5 text-blue-400 fill-blue-400 animate-pulse" />
          <span>You mean the world to me</span>
          <Heart className="w-3.5 h-3.5 text-blue-400 fill-blue-400 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

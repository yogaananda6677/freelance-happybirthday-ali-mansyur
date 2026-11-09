import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface LongMessageSlideProps {
  config: BirthdayConfig;
}

export const LongMessageSlide: React.FC<LongMessageSlideProps> = ({ config }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 max-w-md mx-auto text-center select-none py-16">
      {/* Script Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-6"
      >
        <span className="font-serif text-xs tracking-widest text-blue-300 uppercase block mb-1">
          From the bottom of my heart
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-white">
          Message for you
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-blue-400" />
          <Heart className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-blue-400" />
        </div>
      </motion.div>

      {/* Aesthetic Luxury Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="w-full glass-panel-luxury rounded-3xl p-6 sm:p-7 border-2 border-navy-400/40 shadow-2xl relative text-left"
      >
        {/* Top ribbon ornament */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-700 to-navy-600 text-white text-[11px] font-mono tracking-widest flex items-center gap-1.5 shadow-md border border-blue-400/30">
          <Sparkles className="w-3 h-3 text-yellow-300" />
          <span>DEAR {config.recipientName.toUpperCase()}</span>
        </div>

        {/* Heartfelt Letter Paragraphs */}
        <div className="text-slate-100 text-xs sm:text-sm leading-relaxed space-y-3.5 font-serif max-h-[48vh] overflow-y-auto pr-1 mt-2">
          {config.longMessageText.split('\n\n').map((para, i) => (
            <p key={i} className="text-justify font-light leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Footer with Vintage Car Vector Illustration (Pure SVG, No Emojis) */}
        <div className="mt-5 pt-3.5 border-t border-navy-500/30 flex justify-between items-center text-navy-400 text-xs">
          <span className="font-cursive text-base text-blue-300">Forever and always</span>
          
          {/* Animated SVG Vintage Roadster Car */}
          <motion.div
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2"
          >
            <svg
              className="w-10 h-6 text-blue-300 fill-current drop-shadow"
              viewBox="0 0 48 24"
            >
              {/* Car Body */}
              <path d="M4 14c0-2 1-3 3-4l6-4h18l7 4c2 1 3 2 3 4v4H4v-4z" opacity="0.9" />
              {/* Roof & Windshield */}
              <path d="M14 6l-3 4h18l-3-4H14z" opacity="0.5" fill="#ffffff" />
              {/* Wheels */}
              <circle cx="11" cy="18" r="4" fill="#030712" stroke="#93b5f3" strokeWidth="1.5" />
              <circle cx="34" cy="18" r="4" fill="#030712" stroke="#93b5f3" strokeWidth="1.5" />
              {/* Headlight beam */}
              <path d="M41 14l5-1v3l-5-1z" fill="#fef08a" opacity="0.8" />
            </svg>
            <span className="text-[10px] tracking-widest uppercase font-mono text-blue-300">Journey Ahead</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

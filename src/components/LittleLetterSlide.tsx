import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Gift } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface LittleLetterSlideProps {
  config: BirthdayConfig;
}

export const LittleLetterSlide: React.FC<LittleLetterSlideProps> = ({ config }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 max-w-md mx-auto text-center select-none py-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-6"
      >
        <span className="font-serif text-xs tracking-widest text-blue-300 uppercase block mb-1">
          A Heartfelt Note
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-white">
          A Little Letter
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-blue-400" />
          <Heart className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-blue-400" />
        </div>
      </motion.div>

      {/* Envelope with letter popping out */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-sm mb-6"
      >
        <div className="relative pt-12 pb-4">
          {/* Popping Letter Card */}
          <motion.div
            initial={{ y: 25 }}
            whileInView={{ y: -15 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="w-11/12 mx-auto bg-gradient-to-b from-slate-50 to-blue-50 text-navy-950 rounded-2xl p-5 shadow-2xl border border-blue-200/80 relative z-10 text-left"
          >
            <div className="flex justify-between items-center border-b border-navy-200/50 pb-2 mb-3">
              <span className="text-[11px] font-mono tracking-widest text-navy-600 uppercase font-semibold">
                To: {config.recipientName}
              </span>
              <Heart className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
            </div>

            <p className="font-serif text-sm leading-relaxed text-navy-950 font-medium">
              "{config.littleLetterText}"
            </p>

            <div className="mt-3 text-right">
              <span className="font-cursive text-base text-navy-700">With all my love</span>
            </div>
          </motion.div>

          {/* Envelope Pocket Base */}
          <div className="w-full h-32 bg-navy-850 border-2 border-navy-600/70 rounded-2xl relative -mt-16 z-20 shadow-xl overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0 bg-navy-800"
              style={{ clipPath: 'polygon(0 0, 50% 65%, 100% 0, 100% 100%, 0 100%)' }}
            />
            <div className="z-30 w-11 h-11 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center shadow-inner">
              <Heart className="w-5 h-5 text-blue-300 fill-blue-300" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Illustrated Teddy Bear & Gift Box (Pure SVG, No Emojis) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-5 mt-2"
      >
        {/* SVG Teddy Bear */}
        <div className="relative w-20 h-20 flex flex-col items-center justify-center">
          {/* Party Hat */}
          <div 
            className="w-5 h-7 bg-gradient-to-b from-blue-400 to-indigo-600 absolute -top-2 z-20 shadow-md"
            style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300 absolute -top-1 left-1/2 -translate-x-1/2" />
          </div>

          {/* Bear Head */}
          <div className="w-14 h-12 bg-amber-800 rounded-full relative flex items-center justify-center shadow-lg border border-amber-900">
            {/* Ears */}
            <div className="w-4 h-4 rounded-full bg-amber-900 absolute -top-1 -left-1 border border-amber-700" />
            <div className="w-4 h-4 rounded-full bg-amber-900 absolute -top-1 -right-1 border border-amber-700" />
            
            {/* Eyes */}
            <div className="w-1.5 h-1.5 rounded-full bg-slate-950 absolute top-4 left-3.5" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-950 absolute top-4 right-3.5" />
            
            {/* Snout */}
            <div className="w-6 h-5 rounded-full bg-amber-200 absolute bottom-1.5 flex items-center justify-center shadow-inner">
              <div className="w-2 h-1.5 rounded-full bg-amber-950 mb-1" />
            </div>
          </div>

          {/* Paws */}
          <div className="flex gap-6 -mt-1 z-10">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-900 border border-amber-950" />
            <div className="w-3.5 h-3.5 rounded-full bg-amber-900 border border-amber-950" />
          </div>
        </div>

        {/* Gift Box with Ribbon */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-12 h-12 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-lg shadow-xl border border-blue-300/40 flex items-center justify-center"
        >
          {/* Yellow Ribbon */}
          <div className="w-full h-2.5 bg-gradient-to-r from-amber-300 to-yellow-200 absolute shadow-sm" />
          <div className="h-full w-2.5 bg-gradient-to-b from-amber-300 to-yellow-200 absolute shadow-sm" />
          <div className="w-4 h-2 bg-amber-300 rounded-full absolute -top-1.5 shadow-sm" />
          <Gift className="w-5 h-5 text-white z-10 opacity-75" />
        </motion.div>
      </motion.div>
    </section>
  );
};

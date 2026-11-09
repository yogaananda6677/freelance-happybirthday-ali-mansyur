import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, ArrowUp, Heart, X, Eye } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface MoonPolaroidSlideProps {
  config: BirthdayConfig;
  onOpenQR: () => void;
  onScrollToTop: () => void;
}

export const MoonPolaroidSlide: React.FC<MoonPolaroidSlideProps> = ({
  config,
  onOpenQR,
  onScrollToTop,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const rotations = [-3, 3, -2, 4, -3, 2];

  return (
    <section className="min-h-screen flex flex-col items-center justify-start px-4 max-w-lg mx-auto text-center select-none py-16 relative">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-6 z-10"
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-blue-200">
          You are my moon
        </h2>
        <p className="font-cursive text-lg text-blue-300 mt-1">
          in a sky full of stars
        </p>
      </motion.div>

      {/* Rotating Real Warm Golden Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="relative mb-8 flex items-center justify-center"
      >
        {/* Warm Golden Moonlight Halo Aura */}
        <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-amber-400/20 blur-[50px] pointer-events-none" />
        <div className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-yellow-200/25 blur-[30px] pointer-events-none" />

        {/* Rotating Real Moon Sphere */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full shadow-[0_0_60px_15px_rgba(251,191,36,0.35)] overflow-hidden border border-amber-200/40">
          <motion.img
            src="/moon.png"
            alt="Real Golden Moon"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full object-cover select-none pointer-events-none rounded-full"
          />
          {/* Subtle Warm Moonlight Tint & Glow Reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/10 via-transparent to-yellow-100/25 pointer-events-none mix-blend-screen" />
        </div>
      </motion.div>

      {/* Floating Polaroid Memories Gallery */}
      <div className="w-full mb-8 z-10">
        <p className="text-xs text-blue-300 mb-4 font-mono tracking-wider flex items-center justify-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span>Sentuh foto untuk memperbesar tampilan</span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-sm mx-auto">
          {config.polaroidPhotos.map((photo, index) => {
            const rot = rotations[index % rotations.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.06, rotate: 0 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedPhoto(photo)}
                style={{ transform: `rotate(${rot}deg)` }}
                className="polaroid-luxury cursor-pointer bg-white text-navy-950 p-2 pb-4 rounded shadow-xl transition-all"
              >
                {/* Washi Tape Accent */}
                <div className="washi-tape" />

                <div className="aspect-[4/5] bg-slate-200 overflow-hidden rounded-sm mb-2 shadow-inner">
                  <img
                    src={photo}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-navy-800 font-serif font-semibold">
                  <Heart className="w-2.5 h-2.5 text-blue-600 fill-blue-600" />
                  <span>Memory #{index + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Closing Quote Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm glass-card-navy rounded-2xl p-5 mb-8 border border-navy-400/40 shadow-xl"
      >
        <p className="font-cursive text-2xl text-blue-100">
          "{config.moonQuote}"
        </p>
      </motion.div>

      {/* Interactive Action Hub */}
      <div className="flex items-center justify-center gap-3 z-20 w-full max-w-sm pb-12">
        {/* Heart QR Code Button */}
        <button
          type="button"
          onClick={onOpenQR}
          className="flex-1 px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-navy-600 hover:from-blue-500 hover:to-navy-500 text-white font-medium text-xs sm:text-sm tracking-wide shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95 border border-blue-400/30"
        >
          <QrCode className="w-4 h-4" />
          <span>Heart QR Code</span>
        </button>

        {/* Scroll to Top Button */}
        <button
          type="button"
          onClick={onScrollToTop}
          className="px-5 py-3 rounded-full bg-navy-800/90 hover:bg-navy-700 border border-navy-400/40 text-navy-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-md"
          title="Kembali ke Bagian Awal"
        >
          <ArrowUp className="w-4 h-4 text-blue-400" />
          <span>Ke Atas</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-sm w-full bg-white p-3.5 pb-6 rounded-lg shadow-2xl polaroid-luxury"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-navy-950/80 text-white hover:bg-navy-900 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="max-h-[72vh] flex items-center justify-center bg-slate-900/10 rounded overflow-hidden mb-3">
                <img
                  src={selectedPhoto}
                  alt="Enlarged Memory"
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded"
                />
              </div>

              <div className="flex items-center justify-center gap-2 text-navy-900 font-cursive text-xl">
                <Heart className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span>Our Beautiful Moment</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

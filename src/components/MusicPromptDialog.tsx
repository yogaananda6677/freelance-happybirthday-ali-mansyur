import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Disc, Volume2, Sparkles, X, Heart } from 'lucide-react';

interface MusicPromptDialogProps {
  isOpen: boolean;
  musicTitle: string;
  musicArtist: string;
  onPlay: () => void;
  onClose: () => void;
}

export const MusicPromptDialog: React.FC<MusicPromptDialogProps> = ({
  isOpen,
  musicTitle,
  musicArtist,
  onPlay,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
          {/* Backdrop Click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative w-full max-w-sm glass-card-navy border border-blue-400/40 rounded-3xl p-6 shadow-2xl text-center z-10 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-navy-400 hover:text-white hover:bg-navy-800/80 transition-colors"
              title="Tutup dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Aura Behind Disc */}
            <div className="relative my-2 flex items-center justify-center">
              <div className="absolute w-28 h-28 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
              
              {/* Spinning Vinyl Record with Music Icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="relative w-20 h-20 rounded-full bg-navy-950 border-2 border-blue-400/50 flex items-center justify-center shadow-lg"
              >
                <Disc className="w-16 h-16 text-blue-300/80" />
                <div className="absolute w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center border border-white/60 shadow">
                  <Music className="w-3 h-3 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Title & Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-300 text-[11px] font-mono tracking-wider">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Background Music</span>
              <Sparkles className="w-3 h-3 text-blue-400" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
              Nyalakan Musik? 🎶
            </h3>

            {/* Song Info Card */}
            <div className="my-3 py-2 px-3 rounded-xl bg-navy-900/90 border border-navy-700/60 text-xs flex items-center justify-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="truncate text-left">
                <span className="font-semibold text-white truncate block">{musicTitle}</span>
                <span className="text-[10px] text-navy-300 truncate block">{musicArtist}</span>
              </div>
            </div>

            <p className="text-xs text-navy-200/90 leading-relaxed mb-5 font-serif italic">
              "Biar suasana lebih berkesan dan romantis, dengarkan alunan lagu spesial yang sudah disiapkan untuk mengiringi ucapan ini."
            </p>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={onPlay}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-95 group"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
                </motion.div>
                <span>Putar Musik Sekarang</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs text-navy-400 hover:text-navy-200 transition-colors"
              >
                Nanti saja / Lewati
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState, useEffect } from 'react';
import { Music, VolumeX, QrCode, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenQR: () => void;
  onScrollToTop: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onOpenQR,
  onScrollToTop,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
        setShowScrollTop(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 inset-x-0 h-1 bg-navy-950/60 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-300 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Top Controls Header */}
      <div className="fixed top-4 inset-x-4 max-w-lg mx-auto flex items-center justify-between z-40 pointer-events-none">
        {/* Heart QR Code Generator Quick Button */}
        <button
          type="button"
          onClick={onOpenQR}
          className="pointer-events-auto p-2.5 rounded-full glass-card-navy hover:bg-navy-800 text-blue-300 hover:text-white transition-all shadow-xl active:scale-95 border border-navy-500/50 flex items-center gap-1.5"
          title="Tampilkan Heart QR Code"
        >
          <QrCode className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-medium pr-1 hidden sm:inline">Heart QR</span>
        </button>

        {/* Music Player Control */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Music Toggle */}
          <button
            type="button"
            onClick={onTogglePlay}
            className={`px-3 py-2 rounded-full glass-card-navy transition-all shadow-xl active:scale-95 border border-navy-500/50 flex items-center gap-2 ${
              isPlaying ? 'text-blue-300 border-blue-400/60' : 'text-navy-400'
            }`}
            title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          >
            {isPlaying ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Music className="w-3.5 h-3.5 text-blue-400" />
                </motion.div>
                <span className="text-[11px] font-mono pr-1 text-blue-200">Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono pr-1 text-navy-400">Muted</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Floating Scroll to Top Pill */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={onScrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/30 transition-all active:scale-90 border border-blue-400/40 backdrop-blur-md"
          title="Kembali ke Bagian Paling Atas"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </>
  );
};

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, Pause, Disc, Sparkles } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface CalendarMusicSlideProps {
  config: BirthdayConfig;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const CalendarMusicSlide: React.FC<CalendarMusicSlideProps> = ({
  config,
  isPlaying,
  onTogglePlay,
}) => {
  const { day, monthName, year, daysInMonth, startDayOfWeek } = useMemo(() => {
    const dateObj = new Date(config.birthDate || '2002-08-13');
    const d = isNaN(dateObj.getDate()) ? 13 : dateObj.getDate();
    const y = isNaN(dateObj.getFullYear()) ? 2002 : dateObj.getFullYear();
    const m = isNaN(dateObj.getMonth()) ? 7 : dateObj.getMonth();

    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const firstDay = new Date(y, m, 1).getDay();
    const totalDays = new Date(y, m + 1, 0).getDate();

    return {
      day: d,
      monthName: monthNames[m],
      year: y,
      daysInMonth: totalDays,
      startDayOfWeek: firstDay,
    };
  }, [config.birthDate]);

  const daysHeader = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 max-w-md mx-auto text-center select-none py-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-4"
      >
        <span className="font-serif text-xs tracking-widest text-blue-300 uppercase block mb-1">
          Special Date in History
        </span>
        <h2 className="font-cursive text-3xl sm:text-4xl text-white">
          The Day My Favorite Person Was Born
        </h2>
      </motion.div>

      {/* Calendar Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full glass-panel-luxury rounded-2xl p-6 mb-6 border border-navy-400/30"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
            {monthName} {year}
          </h3>
          <Sparkles className="w-4 h-4 text-blue-400" />
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1.5 mb-2 text-xs font-semibold text-navy-300/80">
          {daysHeader.map((d, i) => (
            <div key={i} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-xs sm:text-sm">
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const currentDay = i + 1;
            const isBirthday = currentDay === day;

            return (
              <div
                key={`day-${currentDay}`}
                className={`h-8 flex items-center justify-center rounded-full transition-all ${
                  isBirthday
                    ? 'relative bg-gradient-to-tr from-blue-600 to-navy-400 text-white font-bold shadow-lg shadow-blue-500/50 scale-110 ring-2 ring-white/80'
                    : 'text-navy-200/80 hover:bg-navy-800/40'
                }`}
              >
                {isBirthday ? (
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center justify-center"
                  >
                    <span>{currentDay}</span>
                    <Heart className="w-2 h-2 text-blue-200 fill-blue-200 absolute -top-1" />
                  </motion.div>
                ) : (
                  currentDay
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Music Section Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-cursive text-xl text-blue-200 mb-3"
      >
        Nyalakan musiknya untuk menemani momen ini
      </motion.p>

      {/* Spotify-style Music Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="w-full glass-card-navy rounded-2xl p-4 flex items-center gap-4 border border-navy-500/40 shadow-xl cursor-pointer hover:border-blue-400/50 transition-all group"
        onClick={onTogglePlay}
      >
        {/* Spinning Vinyl Record */}
        <div className="relative w-14 h-14 shrink-0 rounded-full bg-navy-950 border-2 border-navy-400/50 flex items-center justify-center overflow-hidden shadow-md">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 3.5, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
            className="w-full h-full flex items-center justify-center"
          >
            <Disc className="w-12 h-12 text-navy-400" />
            <div className="absolute w-4 h-4 rounded-full bg-blue-500 border border-white" />
          </motion.div>
        </div>

        {/* Track Info */}
        <div className="flex-1 text-left min-w-0">
          <p className="font-semibold text-white text-sm truncate flex items-center gap-2">
            <span>{config.musicTitle}</span>
            {isPlaying && (
              <span className="flex gap-0.5 items-end h-3">
                <span className="w-0.5 h-3 bg-blue-400 animate-pulse" />
                <span className="w-0.5 h-2 bg-blue-300 animate-pulse delay-75" />
                <span className="w-0.5 h-3.5 bg-blue-500 animate-pulse delay-150" />
              </span>
            )}
          </p>
          <p className="text-xs text-navy-300 truncate">{config.musicArtist}</p>
          
          {/* Audio Equalizer / Progress Bar */}
          <div className="w-full bg-navy-950 h-1.5 rounded-full mt-2.5 overflow-hidden border border-navy-700/50">
            <motion.div
              animate={{ width: isPlaying ? ['15%', '85%'] : '35%' }}
              transition={{ duration: 12, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
              className="bg-gradient-to-r from-blue-500 to-blue-300 h-full rounded-full"
            />
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          type="button"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="w-10 h-10 rounded-full bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>
      </motion.div>
    </section>
  );
};

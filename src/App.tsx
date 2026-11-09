import React, { useState, useEffect, useRef } from 'react';
import { DEFAULT_CONFIG } from './data/defaultConfig';
import { BirthdayConfig } from './types';
import { StarsBackground } from './components/StarsBackground';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { CalendarMusicSlide } from './components/CalendarMusicSlide';
import { ScrapbookCakeSlide } from './components/ScrapbookCakeSlide';
import { LittleLetterSlide } from './components/LittleLetterSlide';
import { LongMessageSlide } from './components/LongMessageSlide';
import { MirrorPhotoSlide } from './components/MirrorPhotoSlide';
import { MoonPolaroidSlide } from './components/MoonPolaroidSlide';
import { NavigationControls } from './components/NavigationControls';
import { HeartQRGenerator } from './components/HeartQRGenerator';
import { MusicPromptDialog } from './components/MusicPromptDialog';

export const App: React.FC = () => {
  // Always remove old stale localStorage to ensure fresh Ali Mansur config
  useEffect(() => {
    try {
      localStorage.removeItem('navy_birthday_config');
    } catch (e) {}
  }, []);

  const [config] = useState<BirthdayConfig>(() => {
    const initial = { ...DEFAULT_CONFIG };
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const toParam = params.get('to');
        if (toParam) {
          initial.recipientName = toParam;
          initial.coverGreeting = `Happy Birthday\n${toParam}!`;
        }
      } catch (e) {}
    }
    return initial;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const [isQROpen, setIsQROpen] = useState(false);
  const [shareableUrl, setShareableUrl] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const calendarSectionRef = useRef<HTMLDivElement | null>(null);

  // Generate clean shareable URL
  useEffect(() => {
    try {
      const isLocal =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const baseOrigin = isLocal ? window.location.origin : (window.location.origin || '');
      
      const cleanUrl = `${baseOrigin}${window.location.pathname}`;
      setShareableUrl(cleanUrl);
    } catch (e) {
      setShareableUrl(typeof window !== 'undefined' ? window.location.href : '');
    }
  }, []);

  // Audio Playback Controls
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowMusicPrompt(false);
        })
        .catch((err) => {
          console.warn('Audio play error, falling back:', err);
          if (audioRef.current) {
            audioRef.current.src = '/sempurna.mp3';
            audioRef.current.play().then(() => {
              setIsPlaying(true);
              setShowMusicPrompt(false);
            }).catch(() => {});
          }
        });
    }
  };

  const handleStartMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowMusicPrompt(false);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
          if (audioRef.current) {
            audioRef.current.src = '/sempurna.mp3';
            audioRef.current.play().then(() => {
              setIsPlaying(true);
              setShowMusicPrompt(false);
            }).catch(() => {});
          }
        });
    }
  };

  const handleScrollToCalendar = () => {
    handleStartMusic();
    if (calendarSectionRef.current) {
      calendarSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-navy-950 text-slate-100 flex flex-col items-center">
      {/* Native HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={config.musicUrl || '/sempurna.mp3'}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Background Atmosphere */}
      <StarsBackground />

      {/* Top Floating Controls */}
      <NavigationControls
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onOpenQR={() => setIsQROpen(true)}
        onScrollToTop={handleScrollToTop}
      />

      {/* Main Continuous Scrollable Story Container */}
      <main className="w-full max-w-lg z-10 space-y-12 sm:space-y-16">
        {/* Section 1: 3D Wax Seal Envelope Intro */}
        <EnvelopeIntro
          config={config}
          onStartMusic={handleStartMusic}
          onContinue={handleScrollToCalendar}
        />

        {/* Section 2: Calendar & Spotify Music Player */}
        <div ref={calendarSectionRef} className="scroll-mt-12">
          <CalendarMusicSlide
            config={config}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
          />
        </div>

        {/* Section 3: Scrapbook Camera & Interactive Birthday Cake */}
        <ScrapbookCakeSlide
          config={config}
        />

        {/* Section 4: A Little Letter & Teddy Bear */}
        <LittleLetterSlide
          config={config}
        />

        {/* Section 5: Message for You & Vintage Car */}
        <LongMessageSlide
          config={config}
        />

        {/* Section 6: One Last Thing & Vintage Mirror */}
        <MirrorPhotoSlide
          config={config}
        />

        {/* Section 7: You Are My Moon & Polaroid Memories */}
        <MoonPolaroidSlide
          config={config}
          onOpenQR={() => setIsQROpen(true)}
          onScrollToTop={handleScrollToTop}
        />
      </main>

      {/* Music Notice / Prompt Dialog */}
      <MusicPromptDialog
        isOpen={showMusicPrompt && !isPlaying}
        musicTitle={config.musicTitle}
        musicArtist={config.musicArtist}
        onPlay={() => {
          handleStartMusic();
          setShowMusicPrompt(false);
        }}
        onClose={() => setShowMusicPrompt(false)}
      />

      {/* Heart QR Code Modal */}
      {isQROpen && (
        <HeartQRGenerator
          url={shareableUrl || window.location.href}
          recipientName={config.recipientName}
          onClose={() => setIsQROpen(false)}
        />
      )}
    </div>
  );
};

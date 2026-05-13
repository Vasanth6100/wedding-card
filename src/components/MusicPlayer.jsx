import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('/mangalam-sezhikka-tamil-christian-wedding-suite-orchestral-music_2m8kKNGs.mp3')); // User provided audio
  const isPlayingRef = useRef(false);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    // Expose for explicit playback bypass via click handler
    window.weddingAudio = audioRef.current;
    
    // Auto-play listener cleanup function
    const removeListeners = () => {
      const events = ['click', 'touchstart', 'keydown', 'scroll', 'wheel'];
      events.forEach(event => document.removeEventListener(event, startAudio));
      window.removeEventListener('start-wedding-audio', startAudio);
    };

    const startAudio = () => {
      if (userInteractedRef.current) {
        removeListeners();
        return;
      }
      
      if (audioRef.current.paused) {
        audioRef.current.loop = true;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            removeListeners();
          }).catch(error => console.log("Audio still blocked:", error));
        }
      } else {
        setIsPlaying(true); // If it was already played
        removeListeners();
      }
    };

    // Attempt to play immediately (will likely fail on modern browsers)
    const initialPlay = audioRef.current.play();
    if (initialPlay !== undefined) {
      initialPlay.then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // If blocked, wait for user interaction
        const events = ['click', 'touchstart', 'keydown', 'scroll', 'wheel'];
        events.forEach(event => document.addEventListener(event, startAudio, { once: true }));
      });
    }

    // Listen for explicit trigger from WelcomeOverlay
    window.addEventListener('start-wedding-audio', startAudio);

    // Handle visibility change to pause audio when user minimizes or switches tabs
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioRef.current.pause();
      } else {
        // Resume if it was supposed to be playing
        if (isPlayingRef.current) {
          audioRef.current.play().catch(e => console.log("Audio resume blocked:", e));
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      removeListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const togglePlay = () => {
    userInteractedRef.current = true; // User explicitly toggled, stop auto-play attempts
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser"));
      audioRef.current.loop = true;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border border-white/50 backdrop-blur-md transition-colors ${isPlaying ? 'bg-gold text-white' : 'bg-white text-gold'
          }`}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <Volume2 className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <VolumeX className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing Ring when playing */}
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-gold/50"
          />
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;


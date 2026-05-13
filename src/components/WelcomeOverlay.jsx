import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const WelcomeOverlay = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    if (window.weddingAudio) {
      window.weddingAudio.loop = true;
      window.weddingAudio.play().catch(() => { });
    }
    setTimeout(() => { if (onOpen) onOpen(); }, 1000);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          style={{ touchAction: 'none' }}
          className="fixed inset-0 w-screen h-screen z-[100] overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdf8f0] via-[#F8F5EF] to-[#f5efe3]" />

          {/* Subtle radial glow in center */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,106,0.08) 0%, transparent 70%)',
            }}
          />

          {/* Outer gold border */}
          <div className="absolute inset-3 border border-[#C9A86A]/50 pointer-events-none" />
          {/* Inner gold border */}
          <div className="absolute inset-5 border border-[#C9A86A]/20 pointer-events-none" />

          {/* Corner ornaments — top left */}
          <svg className="absolute top-2 left-2 w-16 h-16 text-[#C9A86A]/60" viewBox="0 0 60 60" fill="none">
            <path d="M2 30 Q2 2 30 2" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.4" />
            <path d="M12 2 Q2 2 2 12" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path d="M18 2 Q2 2 2 18" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 3" />
          </svg>

          {/* Corner ornaments — top right */}
          <svg className="absolute top-2 right-2 w-16 h-16 text-[#C9A86A]/60" viewBox="0 0 60 60" fill="none" style={{ transform: 'scaleX(-1)' }}>
            <path d="M2 30 Q2 2 30 2" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.4" />
            <path d="M12 2 Q2 2 2 12" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path d="M18 2 Q2 2 2 18" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 3" />
          </svg>

          {/* Corner ornaments — bottom left */}
          <svg className="absolute bottom-2 left-2 w-16 h-16 text-[#C9A86A]/60" viewBox="0 0 60 60" fill="none" style={{ transform: 'scaleY(-1)' }}>
            <path d="M2 30 Q2 2 30 2" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.4" />
            <path d="M12 2 Q2 2 2 12" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path d="M18 2 Q2 2 2 18" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 3" />
          </svg>

          {/* Corner ornaments — bottom right */}
          <svg className="absolute bottom-2 right-2 w-16 h-16 text-[#C9A86A]/60" viewBox="0 0 60 60" fill="none" style={{ transform: 'scale(-1,-1)' }}>
            <path d="M2 30 Q2 2 30 2" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.4" />
            <path d="M12 2 Q2 2 2 12" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path d="M18 2 Q2 2 2 18" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 3" />
          </svg>

          {/* Top decorative floral line */}
          <div className="absolute top-10 left-0 w-full flex justify-center pointer-events-none">
            <svg width="280" height="30" viewBox="0 0 280 30" fill="none">
              <line x1="0" y1="15" x2="110" y2="15" stroke="#C9A86A" strokeWidth="0.6" strokeOpacity="0.4" />
              <circle cx="120" cy="15" r="2" fill="#C9A86A" fillOpacity="0.5" />
              <circle cx="130" cy="10" r="3.5" fill="#C9A86A" fillOpacity="0.3" />
              <circle cx="140" cy="15" r="5" fill="#C9A86A" fillOpacity="0.2" />
              <circle cx="140" cy="15" r="2" fill="#C9A86A" fillOpacity="0.6" />
              <circle cx="150" cy="10" r="3.5" fill="#C9A86A" fillOpacity="0.3" />
              <circle cx="160" cy="15" r="2" fill="#C9A86A" fillOpacity="0.5" />
              <line x1="170" y1="15" x2="280" y2="15" stroke="#C9A86A" strokeWidth="0.6" strokeOpacity="0.4" />
            </svg>
          </div>

          {/* Bottom decorative floral line */}
          <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none">
            <svg width="280" height="30" viewBox="0 0 280 30" fill="none">
              <line x1="0" y1="15" x2="110" y2="15" stroke="#C9A86A" strokeWidth="0.6" strokeOpacity="0.4" />
              <circle cx="120" cy="15" r="2" fill="#C9A86A" fillOpacity="0.5" />
              <circle cx="130" cy="20" r="3.5" fill="#C9A86A" fillOpacity="0.3" />
              <circle cx="140" cy="15" r="5" fill="#C9A86A" fillOpacity="0.2" />
              <circle cx="140" cy="15" r="2" fill="#C9A86A" fillOpacity="0.6" />
              <circle cx="150" cy="20" r="3.5" fill="#C9A86A" fillOpacity="0.3" />
              <circle cx="160" cy="15" r="2" fill="#C9A86A" fillOpacity="0.5" />
              <line x1="170" y1="15" x2="280" y2="15" stroke="#C9A86A" strokeWidth="0.6" strokeOpacity="0.4" />
            </svg>
          </div>

          {/* ── Centered Content ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">

            {/* Top divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="flex items-center space-x-3 mb-8"
            >
              <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#C9A86A]/60" />
              <div className="w-1 h-1 rounded-full bg-[#C9A86A]/70" />
              <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#C9A86A]/60" />
            </motion.div>

            {/* Subtitle */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-gold-dark tracking-[0.45em] uppercase text-[10px] mb-6 font-medium"
            >
              You are invited To
            </motion.span>

            {/* Main Script Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.55 }}
              className="script-font text-[64px] leading-none text-gold-darker mb-8 font-bold"
              style={{ textShadow: '0 2px 20px rgba(201,168,106,0.15)' }}
            >
              A Sacred Union
            </motion.h1>

            {/* Heart divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex items-center space-x-4 mb-8"
            >
              <div className="h-px w-10 bg-[#C9A86A]/40" />
              <Heart className="w-3.5 h-3.5 text-[#C9A86A]/80" fill="currentColor" />
              <div className="h-px w-10 bg-[#C9A86A]/40" />
            </motion.div>

            {/* Verse */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="font-serif text-gold-dark text-[15px] italic leading-relaxed mb-10 max-w-[260px] font-semibold"
            >
              "Let all that you do be done in love."
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.95 }}
              onClick={handleOpen}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden px-10 py-[14px] font-serif text-sm tracking-[0.3em] text-white shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #967A3D 0%, #C9A86A 50%, #967A3D 100%)',
                backgroundSize: '200% 100%',
              }}
            >
              Open Invitation
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;

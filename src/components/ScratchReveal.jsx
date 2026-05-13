import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Particles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 20 + 10;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold/30"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(3px)',
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        );
      })}
    </div>
  );
};

const ScratchReveal = () => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set proper resolution for high-DPI displays
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const width = rect.width;
    const height = rect.height;

    // Velvet gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#B8860B'); // Deep gold
    grad.addColorStop(0.5, '#D8AD55'); // Light gold
    grad.addColorStop(1, '#6B4905'); // Dark gold
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Velvet noise texture (light)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let i = 0; i < 3000; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    }
    // Velvet noise texture (dark)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    for (let i = 0; i < 3000; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    }

    // Scratch logic
    let isDrawing = false;

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      // Use a softer brush with radial gradient for a smoother scratch feel
      const brushGradient = ctx.createRadialGradient(x, y, 0, x, y, 25);
      brushGradient.addColorStop(0, 'rgba(0,0,0,1)');
      brushGradient.addColorStop(0.5, 'rgba(0,0,0,0.8)');
      brushGradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = brushGradient;
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();

      // Check reveal percentage
      // We only check a subset of pixels for performance
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clearPixels = 0;
      const stride = 16; // Check every 4th pixel to save CPU
      let totalChecked = 0;

      for (let i = 3; i < imageData.length; i += stride * 4) {
        if (imageData[i] < 128) clearPixels++;
        totalChecked++;
      }

      const percentage = (clearPixels / totalChecked) * 100;
      if (percentage > 50 && !isRevealed) {
        setIsRevealed(true);
      }
    };

    const handleStart = (e) => {
      isDrawing = true;
      handleMove(e);
    };

    const handleMove = (e) => {
      if (!isDrawing) return;
      // Prevent scrolling while scratching
      if (e.cancelable) e.preventDefault();

      const clientRect = canvas.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - clientRect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - clientRect.top;
      scratch(x, y);
    };

    const handleEnd = () => (isDrawing = false);

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove, { passive: false });
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isRevealed]);

  // High-quality heart SVG path
  const heartSvgUrl = `data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 92 C 50 92, 5 65, 5 32 C 5 12, 28 5, 50 25 C 72 5, 95 12, 95 32 C 95 65, 50 92, 50 92 Z" fill="black"/></svg>`;

  return (
    <section className="relative py-16 px-6 bg-ivory flex flex-col items-center justify-center overflow-hidden">
      <Particles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 w-full flex flex-col items-center"
      >
        <h3 className="text-2xl md:text-3xl font-serif text-gold-darker mb-8 text-center font-bold tracking-wide">
          Scratch to Reveal
        </h3>

        {/* Outer Glow & Hover Container */}
        <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-square group">

          {/* Subtle golden glow around the heart */}
          <div
            className="absolute inset-4 bg-gold blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 rounded-full pointer-events-none"
          />

          {/* The Heart Masked Container */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full h-full drop-shadow-2xl"
            style={{
              maskImage: `url('${heartSvgUrl}')`,
              WebkitMaskImage: `url('${heartSvgUrl}')`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
          >
            {/* Background Reveal Content inside the heart */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md border border-white/40">
              <div className="flex flex-col items-center justify-center mt-6">
                <span className="text-sage-dark text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 font-semibold">
                  The Special Day
                </span>
                <span className="text-gold-darker font-serif text-3xl sm:text-4xl font-bold mb-4">
                  3rd June 2026
                </span>
                {isRevealed && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="mt-2 text-gold-dark script-font text-3xl sm:text-4xl"
                  >
                    See you there
                  </motion.div>
                )}
              </div>
            </div>

            {/* Canvas Layer for scratching */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-1500 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              style={{
                // Prevent iOS selection highlighting
                WebkitTapHighlightColor: 'transparent'
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ScratchReveal;

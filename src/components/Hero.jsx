import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero = ({ heroImage }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 0 to 0.4: Images split apart
  const groomX = useTransform(smoothProgress, [0, 0.4], ["0%", "-100%"]);
  const brideX = useTransform(smoothProgress, [0, 0.4], ["0%", "100%"]);
  
  // 0.2 to 0.4: Text fades in
  const textOpacity = useTransform(smoothProgress, [0.2, 0.4], [0, 1]);
  const textScale = useTransform(smoothProgress, [0.2, 0.4], [0.95, 1]);
  const textY = useTransform(smoothProgress, [0.2, 0.4], [20, 0]);

  // 0.8 to 1.0: Entire hero fades out to transition
  const heroOpacity = useTransform(smoothProgress, [0.8, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-ivory">
      {/* Sticky Hero Container */}
      <motion.div 
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-ivory"
      >
        
        {/* Central Reveal Content */}
        <motion.div 
          style={{ 
            opacity: textOpacity,
            scale: textScale,
            y: textY
          }}
          className="absolute inset-0 z-0 flex flex-col items-center justify-center px-6"
        >
          <span className="text-gold-dark script-font text-5xl md:text-6xl mb-4 drop-shadow-sm font-bold">
            A Sacred Union
          </span>
          <h2 className="text-gold-darker font-serif text-5xl md:text-8xl tracking-[0.1em] uppercase text-center leading-tight font-bold">
            Joined by God
          </h2>
          <div className="mt-8 w-px h-16 bg-[#C9A86A]/60" />
        </motion.div>

        {/* Hand Separation Elements (Clean Split) */}
        <div className="absolute inset-0 flex z-10 pointer-events-none overflow-hidden">
          {/* Groom Side (Left) */}
          <motion.div 
            style={{ x: groomX }}
            className="relative w-1/2 h-full overflow-hidden flex-shrink-0"
          >
            <img 
              src={heroImage} 
              alt="Groom" 
              className="absolute left-0 top-0 h-full w-[200%] max-w-none object-cover object-center"
            />
          </motion.div>

          {/* Bride Side (Right) */}
          <motion.div 
            style={{ x: brideX }}
            className="relative w-1/2 h-full overflow-hidden flex-shrink-0"
          >
            <img 
              src={heroImage} 
              alt="Bride" 
              className="absolute right-0 top-0 h-full w-[200%] max-w-none object-cover object-center"
              style={{ marginLeft: '-1px' }}
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-20 left-0 w-full text-center z-20"
        >
          <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-sm animate-float drop-shadow-lg">
            Scroll to Begin
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;

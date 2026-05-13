import React from 'react';
import Hero from './components/Hero';
import BibleVerse from './components/BibleVerse';
import CoupleReveal from './components/CoupleReveal';
import EventSection from './components/EventSection';
import ScratchReveal from './components/ScratchReveal';
import Countdown from './components/Countdown';
import MusicPlayer from './components/MusicPlayer';
import WelcomeOverlay from './components/WelcomeOverlay';
import { motion } from 'framer-motion';

// Hero image from the provided generation
import heroImg from './assets/hero.png';

function App() {
  return (
    <main className="relative selection:bg-gold/30 w-full" style={{ touchAction: 'pan-y' }}>
      <WelcomeOverlay />
      <MusicPlayer />

      <Hero heroImage={heroImg} />

      <BibleVerse />

      <ScratchReveal />

      <CoupleReveal />

      <EventSection />

      <Countdown />

      {/* Final Blessing Section */}
      <section className="py-16 px-8 bg-ivory text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-12 flex justify-center space-x-2">
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-gold"
              />
            ))}
          </div>

          <p className="text-xl md:text-2xl font-serif text-gold-dark italic leading-relaxed mb-12">
            “With the grace of God and the blessings of our loved ones, we joyfully await your presence.”
          </p>

          <div className="flex flex-col items-center">
            <span className="text-sage tracking-[0.5em] uppercase text-xs mb-4">With Love</span>
            <h4 className="script-font text-5xl text-gold">The Families</h4>
          </div>
        </motion.div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 bg-ivory text-center border-t border-gold/10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-sage-dark/60">
          Created by Sneha Paulraj • 2026
        </p>
      </footer>
    </main>
  );
}

export default App;

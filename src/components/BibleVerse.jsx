import React from 'react';
import { motion } from 'framer-motion';

const BibleVerse = () => {
  return (
    <section className="py-16 px-8 flex flex-col items-center justify-center bg-ivory text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        <p className="text-2xl md:text-3xl font-serif italic text-gold-darker leading-relaxed mb-6 font-bold">
          “The Lord has done great things for us, and we are filled with joy.”
        </p>
        <span className="text-gold-dark tracking-[0.3em] uppercase text-sm font-bold">
          — Psalm 126:3
        </span>
      </motion.div>
      
      <div className="mt-8 w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
    </section>
  );
};

export default BibleVerse;

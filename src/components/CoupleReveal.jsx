import React from 'react';
import { motion } from 'framer-motion';

const CoupleReveal = () => {
  return (
    <section className="py-16 px-4 flex flex-col items-center justify-center bg-ivory relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-center"
      >
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="script-font text-6xl md:text-8xl text-gold mb-4"
        >
          Jayanti Shiromani
        </motion.h2>
        
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="my-8 flex items-center justify-center"
        >
          <div className="h-px w-12 bg-gold/30" />
          <span className="mx-6 text-gold-dark font-serif text-4xl">&</span>
          <div className="h-px w-12 bg-gold/30" />
        </motion.div>

        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="script-font text-6xl md:text-8xl text-gold"
        >
          Albert John
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 text-sage tracking-[0.4em] uppercase text-xs"
        >
          Save the Date • 03.06.2026
        </motion.p>
      </motion.div>
    </section>
  );
};

export default CoupleReveal;

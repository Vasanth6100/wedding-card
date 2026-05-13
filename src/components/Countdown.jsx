import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date('June 3, 2026 16:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimerUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-gold/20 rounded-2xl flex items-center justify-center shadow-sm mb-2">
        <span className="text-2xl md:text-3xl font-serif text-gold-dark">{value}</span>
      </div>
      <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-sage-dark font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-12 bg-ivory flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h3 className="text-gold script-font text-4xl mb-2">Counting down to forever</h3>
        <div className="h-px w-24 bg-gold/30 mx-auto mb-10" />
        
        <div className="flex space-x-4 md:space-x-8">
          <TimerUnit value={timeLeft.days} label="Days" />
          <TimerUnit value={timeLeft.hours} label="Hours" />
          <TimerUnit value={timeLeft.minutes} label="Minutes" />
          <TimerUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </motion.div>
    </section>
  );
};

export default Countdown;

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar } from 'lucide-react';

const EventCard = ({ title, date, time, venue, mapsUrl, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: delay === 0 ? -50 : 50, scale: 0.95 }}
    whileInView={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, type: "spring", stiffness: 50 }}
    viewport={{ once: true, margin: "-50px" }}
    className="luxury-card p-8 mb-12 w-full max-w-md mx-auto relative overflow-hidden"
  >
    {/* Decorative Border Corner */}
    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/20 rounded-tr-3xl" />
    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold/20 rounded-bl-3xl" />

    <h3 className="text-3xl font-serif text-gold-dark mb-8 text-center border-b border-gold/10 pb-4">
      {title}
    </h3>

    <div className="space-y-6">
      <div className="flex items-center space-x-4 text-sage-dark">
        <Calendar className="w-5 h-5 text-gold" />
        <p className="font-light">{date}</p>
      </div>
      
      <div className="flex items-center space-x-4 text-sage-dark">
        <Clock className="w-5 h-5 text-gold" />
        <p className="font-light">{time}</p>
      </div>

      <div className="flex items-start space-x-4 text-sage-dark">
        <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
        <p className="font-light leading-relaxed">{venue}</p>
      </div>
    </div>

    <motion.a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="mt-10 w-full py-4 bg-gold text-white rounded-full flex items-center justify-center space-x-2 font-medium tracking-wide shadow-lg shadow-gold/20 hover:bg-gold-dark transition-colors"
    >
      <MapPin className="w-4 h-4" />
      <span>Open in Google Maps</span>
    </motion.a>
  </motion.div>
);

const EventSection = () => {
  return (
    <section className="py-12 px-6 bg-ivory">
      <div className="max-w-4xl mx-auto">
        <EventCard 
          title="Wedding Ceremony"
          date="Wednesday, 3rd June 2026"
          time="4:00 PM"
          venue="Warner Methodist Tamil Church, Halav Pool, Kurla West, Mumbai - 400070"
          mapsUrl="https://www.google.com/maps/search/Warner+Methodist+Tamil+Church+Kurla"
        />

        <div className="h-12 flex items-center justify-center">
          <div className="h-full w-px bg-gradient-to-b from-gold/20 via-gold/40 to-gold/20" />
        </div>

        <EventCard 
          title="Reception"
          date="Wednesday, 3rd June 2026"
          time="7:00 PM onwards"
          venue="Saltanat Banquet Hall, Kohinoor City Mall, Premier Road, Kurla West, Mumbai - 400070"
          mapsUrl="https://www.google.com/maps/search/Saltanat+Banquet+Hall+Kohinoor+City+Mall"
          delay={0.3}
        />
      </div>
    </section>
  );
};

export default EventSection;

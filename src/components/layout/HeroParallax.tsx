"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // The background image moves slightly down to create parallax
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // The background dims slightly as we scroll
  const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0.3, 0.7]);
  // The text moves up slightly faster
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div 
      ref={ref}
      className="relative h-[80vh] w-full overflow-hidden flex flex-col items-center justify-center bg-gray-900"
    >
      {/* Photorealistic Parallax Background */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 w-full h-[120%]"
      >
        <img 
          src="/hero-bg.jpg" 
          alt="Bali Beach Bungalow" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Dynamic Overlay - Darker for better contrast */}
      <motion.div 
        style={{ opacity: opacityOverlay }}
        className="absolute inset-0 z-10 bg-black pointer-events-none"
      />

      {/* Hero Text */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-20 text-center px-4 flex flex-col items-center"
      >
        <h1 className="text-6xl sm:text-8xl font-serif font-bold text-white mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] tracking-wide">
          Bali <span className="text-[var(--color-bali-gold)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Cafe</span>
        </h1>
        <p className="text-xl sm:text-2xl text-white/95 font-medium max-w-xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-10">
          Шматочок тропічного раю у вашому місті
        </p>
        
        <a href="#menu" className="glass-panel px-8 py-4 rounded-full font-bold text-[var(--color-bali-gold)] hover:text-white hover:scale-105 hover:-translate-y-1 transition-all duration-300">
          Переглянути меню
        </a>
      </motion.div>

      {/* Gradient fade to beige at the bottom to blend with the menu section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-bali-beige)] to-transparent z-20 pointer-events-none"></div>
    </div>
  );
}

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
      className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center bg-gray-900"
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

      {/* Dynamic Overlay */}
      <motion.div 
        style={{ opacity: opacityOverlay }}
        className="absolute inset-0 z-10 bg-black pointer-events-none"
      />

      {/* Hero Text */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-20 text-center px-4"
      >
        <h1 className="text-6xl sm:text-8xl font-serif font-bold text-white mb-6 drop-shadow-lg tracking-wide">
          Bali <span className="text-[var(--color-bali-gold)]">Cafe</span>
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 font-medium max-w-xl mx-auto drop-shadow-md">
          Шматочок тропічного раю у вашому місті
        </p>
      </motion.div>

      {/* Gradient fade to beige at the bottom to blend with the menu section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-bali-beige)] to-transparent z-20 pointer-events-none"></div>
    </div>
  );
}

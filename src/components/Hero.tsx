import React from 'react';
import { motion } from 'framer-motion';
interface HeroProps {
        onShowPortfolio: () => void;
        onContactClick: () => void;
    }
    
const Hero: React.FC<HeroProps> = ({ onShowPortfolio, onContactClick }) => {
    

  return (
    <section className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4">

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 px-4 py-1 border border-purple-500/30 bg-purple-500/10 rounded-full text-purple-400 text-xs font-semibold uppercase tracking-widest"
      >
        Disponible para nuevos proyectos
      </motion.div>

  
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-400 text-lg md:text-xl font-medium mb-2"
      >
        Bienvenido al portafolio de
      </motion.h2>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6"
      >
        LUIS ANGEL <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          CORDOBA
        </span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-2xl text-gray-400 text-base md:text-lg mb-10 leading-relaxed"
      >
        Ingeniero de Sistemas, desarrollador fullstack especializado en construir aplicaciones web escalables
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button onClick={onShowPortfolio} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20">
          Ver portafolio
        </button>
        
        <button 
        onClick={onContactClick}
        className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
          Contactar
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
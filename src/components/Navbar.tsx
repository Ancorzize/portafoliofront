import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-6">
      <div className="w-full max-w-5xl flex justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full">
        <div className="text-white font-bold tracking-tighter text-xl">
          LC<span className="text-blue-500">.</span>
        </div>

        <div className="flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Inicio</a>
          <a href="#" className="hover:text-white transition-colors">Proyectos</a>
          <a href="#" className="hover:text-white transition-colors">Sobre mí</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
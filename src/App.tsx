import { useState, useEffect } from 'react';
import Background from './components/Background';
import FallingCubes from './components/FallingCubes';
import Hero from './components/Hero';
import { fetchData, getFotos, downloadCV } from './services/apiService';
import { getDatosPersonales } from './services/datosPersonalesService';
import type { DatosPersonales, ExperienciaLaboral, Estudio, Tecnologia, Foto } from './types/Portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import TechIcon from './components/TechIcon';

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'perfil' | 'experiencia' | 'estudios' | 'tech' | 'contacto'>('perfil');
 
  const [datos, setDatos] = useState<DatosPersonales[]>([]);
  const [experiencias, setExperiencias] = useState<ExperienciaLaboral[]>([]);
  const [estudios, setEstudios] = useState<Estudio[]>([]);
  const [techs, setTechs] = useState<Tecnologia[]>([]);
  const [fotos, setFotos] = useState<Foto[]>([]);

  const menuOptions = [
    { id: 'perfil', label: 'Sobre Mí' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'estudios', label: 'Estudios' },
    { id: 'tech', label: 'Tecnologías' },
    { id: 'contacto', label: 'Contactar' }
  ];

  useEffect(() => {
    if (showPortfolio) {
      setLoading(true);
      Promise.all([
        getDatosPersonales(),
        fetchData<ExperienciaLaboral>('ExperienciaLaboral'),
        fetchData<Estudio>('Estudios'),
        fetchData<Tecnologia>('Tecnologias'),
        getFotos()
      ]).then(([datosData, expData, eduData, techData, fotosData]) => {
        setDatos(datosData);
        setExperiencias(expData.sort((a, b) => a.orden - b.orden));
        setEstudios(eduData.sort((a, b) => a.orden - b.orden));
        setTechs(techData.sort((a, b) => a.orden - b.orden));
        setFotos(fotosData);
      }).finally(() => setLoading(false));
    }
  }, [showPortfolio]);

  const handleContactRedirect = () => {
    setShowPortfolio(true);
    setActiveTab('contacto');
  };

  return (
    <div className="relative min-h-screen w-full text-white selection:bg-purple-500/30">
      <Background />
      <FallingCubes />
      
      <main className="relative z-20 container mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {!showPortfolio ? (
            <Hero 
              key="hero" 
              onShowPortfolio={() => {
                setShowPortfolio(true);
                setActiveTab('perfil');
              }} 
              onContactClick={handleContactRedirect}
            />
          ) : (
            <motion.section 
              key="portfolio" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-6 md:py-8 max-w-6xl mx-auto"
            >
     
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-10 md:mb-16 border-b border-white/5 pb-6 md:pb-8">
              
                <nav className="flex gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-sm overflow-x-auto max-w-full scrollbar-none snap-x unique-scrollbar-fix">
                  {menuOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setActiveTab(option.id as any)}
                      className={`px-4 md:px-5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap snap-clamp ${
                        activeTab === option.id 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </nav>

                {/* Botones secundarios agrupados en una fila en móviles */}
                <div className="flex items-center justify-end gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => downloadCV()} 
                    className="group flex flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-purple-400 transition-colors">PDF</span>
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-purple-500 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </div>
                  </button>

                  <button 
                    onClick={() => setShowPortfolio(false)} 
                    className="group flex flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300"
                  >
                    <span className="text-xs font-mono text-gray-500 group-hover:text-red-400 transition-colors">CERRAR</span>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-red-500 transition-colors">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              <div className="min-h-[500px]">
                {loading ? (
                  <div className="flex flex-col justify-center items-center h-64 gap-4">
                    <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                    <p className="text-purple-400 animate-pulse font-mono text-xs tracking-widest">SINCRONIZANDO DATOS .NET</p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'perfil' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                          <div className="lg:col-span-4 flex justify-center">
                            <div className="relative group">
                              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                              <div className="relative bg-[#0d091a] rounded-2xl overflow-hidden border border-white/10 w-64 h-80 sm:w-72 sm:h-96 shadow-2xl">
                                {fotos.find(f => f.tipo === 'perfil') ? (
                                  <img 
                                    src={`data:image/jpeg;base64,${fotos.find(f => f.tipo === 'perfil')?.contenidoBase64}`} 
                                    alt="Luis Angel Cordoba" 
                                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                                    <span className="text-gray-600 text-xs font-mono">NO IMAGE FOUND</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="lg:col-span-8 space-y-6">
                            {datos.map((item) => (
                              <div key={item.id} className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-[80px] rounded-full"></div>
                                {/* Ajustado tamaño de fuente responsivo para nombres largos en móviles */}
                                <h3 className="text-3xl sm:text-5xl font-bold text-white mb-3 tracking-tight">{item.nombre} {item.apellidos}</h3>
                                <p className="text-purple-400 font-mono mb-6 sm:mb-8 uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold">{item.profesion}</p>
                                <p className="text-gray-300 leading-relaxed text-base sm:text-xl font-light italic">"{item.sobreMi}"</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'experiencia' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6">
                          {experiencias.map((exp) => (
                            <div key={exp.id} className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl border-l-4 border-l-purple-500 hover:bg-white/[0.07] transition-all duration-300 group">
                              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">{exp.empresa}</span>
                              <h4 className="text-xl sm:text-2xl font-bold text-white mt-2 mb-3 group-hover:text-purple-300 transition-colors">{exp.cargo}</h4>
                              <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light">{exp.descripcion}</p>
                              <div className="flex flex-wrap gap-2 justify-between items-center mt-auto pt-4 border-t border-white/5">
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold bg-white/5 px-3 py-1 rounded-full">
                                  {new Date(exp.fechaInicio).getFullYear()} — {exp.actualmente ? 'PRESENTE' : 'FINALIZADO'}
                                </span>
                                <span className="text-[10px] text-gray-600 font-mono uppercase tracking-tighter">{exp.ubicacion}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'estudios' && (
                        <div className="space-y-4 max-w-4xl mx-auto">
                          {estudios.map((edu) => (
                            <div key={edu.id} className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center group hover:bg-white/10 transition-all duration-300 gap-4">
                              <div className="flex items-center gap-4 sm:gap-6">
                                <div className="w-12 h-12 shrink-0 rounded-2xl bg-purple-600/10 flex items-center justify-center text-2xl group-hover:bg-purple-600/20 transition-colors">🎓</div>
                                <div>
                                  <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{edu.titulo}</h4>
                                  <p className="text-gray-400 text-sm mt-1">{edu.institucion}</p>
                                </div>
                              </div>
                              <div className="bg-purple-600/10 px-6 py-2 rounded-2xl text-xs font-mono text-purple-300 border border-purple-500/20 self-start md:self-auto">
                                {edu.fechaFin ? new Date(edu.fechaFin).getFullYear() : "Actualidad"}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'tech' && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
                          {techs.map((tech) => (
                            <div key={tech.id} className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl text-center hover:border-purple-500/50 hover:bg-white/10 transition-all duration-500 group relative">
                              <div className="absolute top-2 right-4 text-[8px] font-mono text-white/10 group-hover:text-purple-500/50 transition-colors">0{tech.orden}</div>
                              <div className="flex justify-center mb-4 sm:mb-5 group-hover:scale-125 transition-transform duration-500 ease-out">
                                <TechIcon name={tech.icono} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                              </div>
                              <h5 className="font-bold text-xs sm:text-sm text-white mb-1">{tech.nombre}</h5>
                              <p className="text-[9px] sm:text-[10px] text-purple-500 uppercase tracking-[0.15em] font-black opacity-80">
                                {tech.nivel}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'contacto' && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="max-w-2xl mx-auto"
                        >
                          <div className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] backdrop-blur-xl text-center relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full"></div>
                            
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-10">Canales de Contacto</h3>
                            
                            <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12 text-base sm:text-lg">
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 text-gray-300 group">
                                <TechIcon name="gmail" className="w-6 h-6 transition-transform group-hover:scale-110" />
                                <div className="text-center sm:text-left">
                                  <strong className="text-white block text-xs uppercase tracking-widest opacity-50">Correo</strong>
                                  <span className="text-sm sm:text-base break-all">cordobaangel0250@gmail.com</span>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 text-gray-300 group">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                  <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                  </svg>
                                </div>
                                <div className="text-center sm:text-left">
                                  <strong className="text-white block text-xs uppercase tracking-widest opacity-50">WhatsApp / Tel</strong>
                                  <span className="text-sm sm:text-base">+57 311 510 8204</span>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 text-gray-300 group">
                                <TechIcon name="maps" className="w-6 h-6 transition-transform group-hover:scale-110" />
                                <div className="text-center sm:text-left">
                                  <strong className="text-white block text-xs uppercase tracking-widest opacity-50">Ubicación</strong>
                                  <span className="text-sm sm:text-base">Medellín, Antioquia</span>
                                </div>
                              </div>
                            </div>

                            <a 
                              href="https://wa.me/573115108204" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] text-sm sm:text-base"
                            >
                              <TechIcon name="whatsapp" className="w-6 h-6" />
                              CHATEAR AHORA
                            </a>
                          </div>
                        </motion.div>
                      )}

                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
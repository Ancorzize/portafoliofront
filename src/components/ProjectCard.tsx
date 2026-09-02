import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  date: string;
}

const ProjectCard: React.FC<CardProps> = ({ title, subtitle, description, tags, date }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-purple-500/50 transition-colors group"
    >
      <span className="text-purple-400 text-xs font-mono">{date}</span>
      <h3 className="text-xl font-bold text-white mt-2">{title}</h3>
      <h4 className="text-purple-300 text-sm mb-4">{subtitle}</h4>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] text-purple-300 uppercase">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
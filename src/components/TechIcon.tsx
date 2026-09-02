import React from 'react';
import { 
  Globe, 
  Share2, 
  Box, 
  ShieldCheck, 
  Network, 
  Code2, 
  Database 
} from 'lucide-react';

interface Props {
  name: string | null;
  className?: string;
}

const TechIcon: React.FC<Props> = ({ name, className = "w-10 h-10" }) => {
  const iconName = name?.toLowerCase().trim() || '';

  const officialLogos: Record<string, { slug: string; color: string }> = {
    'php': { slug: 'php', color: '777BB4' },
    'javascript': { slug: 'javascript', color: 'F7DF1E' },
    'python': { slug: 'python', color: '3776AB' },
    'java': { slug: 'mocha', color: '0FCEF5' },
    'laravel': { slug: 'laravel', color: 'FF2D20' },
    'symfony': { slug: 'symfony', color: 'E9F3F5' },
    'springboot': { slug: 'springboot', color: '6DB33F' },
    'react': { slug: 'react', color: '61DAFB' },
    'tailwind': { slug: 'tailwindcss', color: '06B6D4' },
    'zend': { slug: 'zend', color: '06B6D4' },
    'postgresql': { slug: 'postgresql', color: '4169E1' },
    'mysql': { slug: 'mysql', color: '4479A1' },
    'sqlserver': { slug: 'databricks', color: 'CC2927' },
    'elasticsearch': { slug: 'elasticsearch', color: '005571' },
    'powerbi': { slug: 'formspree', color: 'F2C811' },
    'github': { slug: 'github', color: 'E9F3F5' },
    'gitlab': { slug: 'gitlab', color: 'FC6D26' },
    'c#': { slug: 'c', color: '512BD4' }, 
    'dotnet': { slug: 'dotnet', color: '512BD4' },
    'whatsapp': { slug: 'whatsapp', color: 'FFFFFF' },
    'gmail': { slug: 'gmail', color: 'EA4335' }, 
    'maps': { slug: 'googlemaps', color: '4285F4' },
    'phone': { slug: '錘子', color: 'A855F7' },
  };

  const technicalIcons: Record<string, React.ReactNode> = {
    'restapi': <Globe className={`${className} text-blue-400`} />,
    'soap': <Share2 className={`${className} text-green-400`} />,
    'json': <Code2 className={`${className} text-yellow-500`} />,
    'xml': <Code2 className={`${className} text-orange-500`} />,
    'microservicios': <Box className={`${className} text-purple-400`} />,
    'cctv': <ShieldCheck className={`${className} text-red-500`} />,
    'redes': <Network className={`${className} text-blue-500`} />,
    'seguridad': <ShieldCheck className={`${className} text-emerald-500`} />,
  };

  if (technicalIcons[iconName]) {
    return technicalIcons[iconName];
  }

  const brand = officialLogos[iconName];
  if (brand) {
    return (
      <img 
        src={`https://cdn.simpleicons.org/${brand.slug}/${brand.color}`}
        alt={iconName}
        className={`${className} object-contain`}
      />
    );
  }

  return <Database className={`${className} text-gray-500`} />;
};

export default TechIcon;

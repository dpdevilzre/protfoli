import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface SocialLinksProps {
  vertical?: boolean;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  vertical = false,
  className = ''
}) => {
  const { colors } = useTheme();
  
  // Social media links
  const socialLinks = [
    { 
      href: 'https://instagram.com/dpdevilz',
      icon: <Instagram size={20} />,
      label: 'Instagram'
    },
    { 
      href: 'https://twitter.com/',
      icon: <Twitter size={20} />,
      label: 'Twitter'
    },
    { 
      href: 'https://linkedin.com/in/',
      icon: <Linkedin size={20} />,
      label: 'LinkedIn'
    },
    { 
      href: 'https://github.com/',
      icon: <Github size={20} />,
      label: 'GitHub'
    },
  ];
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 3.0,
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      } 
    }
  };
  
  return (
    <motion.div 
      className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-4 ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {socialLinks.map((link) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-300"
          style={{ 
            color: colors.textSecondary,
            '--hover-color': colors.primary
          } as React.CSSProperties}
          variants={item}
          whileHover={{ 
            scale: 1.1, 
            color: colors.primary
          }}
          whileTap={{ scale: 0.95 }}
          data-cursor-text={link.label}
          aria-label={link.label}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';

interface SocialLinksProps {
  vertical?: boolean;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ vertical = false, className = '' }) => {
  const { colors } = useTheme();
  
  const links = [
    {
      name: 'Instagram',
      icon: <FaInstagram size={20} />,
      url: 'https://instagram.com/dpdevilz',
      hoverColor: 'hover:bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500',
      hoverText: 'hover:text-white',
      cursorText: 'Instagram'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter size={20} />,
      url: 'https://twitter.com',
      hoverColor: 'hover:bg-blue-500',
      hoverText: 'hover:text-white',
      cursorText: 'Twitter'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn size={20} />,
      url: 'https://linkedin.com',
      hoverColor: 'hover:bg-blue-700',
      hoverText: 'hover:text-white',
      cursorText: 'LinkedIn'
    },
    {
      name: 'GitHub',
      icon: <FaGithub size={20} />,
      url: 'https://github.com',
      hoverColor: 'hover:bg-gray-800',
      hoverText: 'hover:text-white',
      cursorText: 'GitHub'
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: vertical ? { x: -10, opacity: 0 } : { y: 10, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {links.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 flex items-center justify-center rounded-full border border-border/50 bg-background/80 backdrop-blur-sm text-foreground transition-all duration-300 ${link.hoverColor} ${link.hoverText}`}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          data-cursor-text={link.cursorText}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
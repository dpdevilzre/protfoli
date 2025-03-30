import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Mail } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { useTheme } from '@/contexts/ThemeContext';

const Footer: React.FC = () => {
  const { colors } = useTheme();
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
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
    <footer className="pt-12 pb-6 bg-muted/30 border-t border-border/50 relative">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Column 1 - About */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3 
              className="text-lg font-bold mb-4"
              variants={itemVariants}
            >
              Devesh Prakash
            </motion.h3>
            <motion.p 
              className="text-muted-foreground mb-6 text-sm"
              variants={itemVariants}
            >
              A passionate full-stack developer dedicated to creating beautiful, functional, and user-friendly web applications.
            </motion.p>
            <motion.div variants={itemVariants}>
              <SocialLinks />
            </motion.div>
          </motion.div>
          
          {/* Column 2 - Quick Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3 
              className="text-lg font-bold mb-4"
              variants={itemVariants}
            >
              Quick Links
            </motion.h3>
            <motion.ul className="space-y-2" variants={containerVariants}>
              {footerLinks.map((link) => (
                <motion.li key={link.name} variants={itemVariants}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          {/* Column 3 - Contact */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3 
              className="text-lg font-bold mb-4"
              variants={itemVariants}
            >
              Contact
            </motion.h3>
            <motion.div 
              className="mb-4 flex items-start gap-3"
              variants={itemVariants}
            >
              <Mail size={18} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Email Me</p>
                <a 
                  href="mailto:devesh.btech.cs18@gmail.com" 
                  className="text-sm hover:text-primary transition-colors duration-300"
                >
                  devesh.btech.cs18@gmail.com
                </a>
              </div>
            </motion.div>
            <motion.p 
              className="text-sm text-muted-foreground"
              variants={itemVariants}
            >
              Thank you for visiting my portfolio. I'm currently available for freelance work and full-time positions.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-border/50 my-6"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Devesh Prakash. Made with <Heart size={14} className="inline text-red-500" /> All rights reserved.
          </p>
          
          <button
            onClick={handleScrollToTop}
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-300"
            data-cursor-text="Top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
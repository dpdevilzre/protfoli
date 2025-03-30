import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import anime from 'animejs';

interface LoadingScreenProps {
  duration?: number; // Duration in ms
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ duration = 2500 }) => {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate logo
    anime({
      targets: logoRef.current,
      scale: [0.8, 1.2, 1],
      opacity: [0, 1],
      duration: 1500,
      easing: 'easeOutElastic(1, .5)',
    });
    
    // Animate text
    anime({
      targets: textRef.current?.querySelectorAll('span'),
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(120),
      easing: 'easeOutQuad',
    });
    
    // Hide loading screen after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);
    
    // Clean up timer
    return () => clearTimeout(timer);
  }, [duration]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.6,
              ease: 'easeInOut'
            }
          }}
        >
          {/* Logo or initial */}
          <div 
            ref={logoRef}
            className="mb-8 text-5xl font-bold"
            style={{ color: colors.primary }}
          >
            DP
          </div>
          
          {/* Text */}
          <div ref={textRef} className="overflow-hidden">
            <div className="flex space-x-1.5 font-medium">
              {"WELCOME".split('').map((char, i) => (
                <span 
                  key={i} 
                  className="opacity-0 inline-block"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          
          {/* Loading indicator */}
          <motion.div
            className="mt-8 w-32 h-1 bg-muted overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: colors.primary }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: (duration - 500) / 1000,
                ease: 'easeInOut'
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
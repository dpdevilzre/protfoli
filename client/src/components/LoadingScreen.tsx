import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface LoadingScreenProps {
  duration?: number; // Duration in ms
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ duration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { colors } = useTheme();
  
  useEffect(() => {
    // Set body to prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    // Animate progress from 0 to 100
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, duration / 100);
    
    // Hide the loading screen after duration
    const timeout = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, duration);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      document.body.style.overflow = 'auto';
    };
  }, [duration]);
  
  // Variants for animations
  const containerVariants = {
    visible: { opacity: 1 },
    hidden: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        when: "afterChildren" 
      }
    }
  };
  
  const logoVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] 
      }
    },
    exit: { 
      scale: 1.2, 
      opacity: 0,
      transition: { 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };
  
  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${progress}%`,
      transition: { 
        ease: "easeInOut"
      }
    }
  };
  
  // Animated name letters
  const nameLetters = "Devesh".split('');
  
  const letterVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + (i * 0.1),
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    exit: (i: number) => ({
      y: -40,
      opacity: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center"
          variants={containerVariants}
          initial="visible"
          animate="visible"
          exit="hidden"
        >
          <div className="flex flex-col items-center">
            {/* Animated Logo */}
            <motion.div
              className="w-24 h-24 rounded-full border-4 flex items-center justify-center mb-8"
              style={{ borderColor: colors.primary }}
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.span 
                className="text-3xl font-bold"
                style={{ color: colors.primary }}
              >
                DP
              </motion.span>
            </motion.div>
            
            {/* Animated Name */}
            <div className="flex mb-10 overflow-hidden">
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl font-bold inline-block"
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={i % 2 === 0 ? { color: colors.primary } : {}}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            
            {/* Progress bar */}
            <div className="w-48 h-1 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: colors.primary }}
                variants={progressVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            
            {/* Progress text */}
            <motion.p
              className="mt-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading... {progress}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
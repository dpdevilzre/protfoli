import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomCursor: React.FC = () => {
  const { colors } = useTheme();
  const isMobile = useIsMobile();
  
  // Skip rendering cursor on mobile devices
  if (isMobile) return null;
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Make the cursor visible when we have mouse movement
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Handle cursor text
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if element or any parent has 'data-cursor-text' attribute
      let cursorTextElement = target;
      let foundText = false;
      
      while (cursorTextElement && !foundText) {
        if (cursorTextElement.dataset && cursorTextElement.dataset.cursorText) {
          setCursorText(cursorTextElement.dataset.cursorText);
          foundText = true;
        } else {
          cursorTextElement = cursorTextElement.parentElement as HTMLElement;
        }
      }
      
      if (!foundText) {
        setCursorText('');
      }
      
      // Check if cursor should be pointer style
      const computedStyle = window.getComputedStyle(target);
      setIsPointer(computedStyle.cursor === 'pointer');
    };
    
    // Reset cursor text when mouse leaves an element
    const showDefaultCursor = (e: Event) => {
      setCursorText('');
      setIsPointer(false);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', showDefaultCursor);
    
    // Clean up event listeners
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', showDefaultCursor);
    };
  }, []);
  
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: 'spring',
        mass: 0.3,
        stiffness: 800,
        damping: 30,
        restDelta: 0.001
      }
    },
    text: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: `${colors.primary}20`,
      mixBlendMode: 'difference' as const,
      transition: {
        type: 'spring',
        mass: 0.3,
        stiffness: 800,
        damping: 30,
        restDelta: 0.001
      }
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full bg-transparent border-2 border-primary z-[9999] pointer-events-none flex items-center justify-center ${
          isPointer ? 'opacity-50 mix-blend-difference' : 'opacity-80'
        }`}
        variants={variants}
        animate={cursorText ? 'text' : 'default'}
        style={{ 
          borderColor: colors.primary,
          mixBlendMode: 'exclusion'
        }}
      >
        {cursorText && (
          <motion.span 
            className="text-xs text-white font-medium text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
      
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[9999] pointer-events-none"
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          backgroundColor: colors.primary,
          mixBlendMode: 'exclusion'
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.1
        }}
      />
    </>
  );
};

export default CustomCursor;
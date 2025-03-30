import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const CustomCursor: React.FC = () => {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Smooth cursor position with springs
  const cursorX = useSpring(0, { stiffness: 150, damping: 15 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 15 });
  
  // Smooth dot position for a trailing effect
  const dotX = useSpring(0, { stiffness: 500, damping: 20 });
  const dotY = useSpring(0, { stiffness: 500, damping: 20 });
  
  useEffect(() => {
    // Update cursor position on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      
      setVisible(true);
    };
    
    // Check for hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for button or interactive elements
      const isButton = target.tagName.toLowerCase() === 'button' || 
                      target.closest('button') ||
                      target.tagName.toLowerCase() === 'a' ||
                      target.closest('a') ||
                      target.tagName.toLowerCase() === 'input' ||
                      target.closest('input') ||
                      target.tagName.toLowerCase() === 'textarea' ||
                      target.closest('textarea') ||
                      target.tagName.toLowerCase() === 'select' ||
                      target.closest('select');
      
      // Also check for data-cursor-text attributes
      const cursorText = target.getAttribute('data-cursor-text') || 
                        (target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text') || null);
      
      setIsPointer(!!isButton);
      setText(cursorText);
    };
    
    // Show default cursor when leaving the window
    const showDefaultCursor = (e: Event) => {
      setVisible(false);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', showDefaultCursor);
    document.addEventListener('mouseleave', showDefaultCursor);
    
    return () => {
      // Clean up event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', showDefaultCursor);
      document.removeEventListener('mouseleave', showDefaultCursor);
    };
  }, [cursorX, cursorY, dotX, dotY]);
  
  // Set the cursor size based on if it's over a button
  const cursorSize = isPointer ? 40 : 25;
  const dotSize = isPointer ? 0 : 5;
  
  // Hide native cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    // Add special class for handling cursor on hoverable elements
    document.documentElement.classList.add('custom-cursor');
    
    return () => {
      document.body.style.cursor = '';
      document.documentElement.classList.remove('custom-cursor');
    };
  }, []);
  
  return (
    <>
      {/* Custom cursor styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-cursor a, 
          .custom-cursor button,
          .custom-cursor input,
          .custom-cursor textarea,
          .custom-cursor select,
          .custom-cursor [role="button"] {
            cursor: none !important;
          }
        `
      }} />
      
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
          borderRadius: '50%',
          border: `1.5px solid ${colors.primary}`,
          mixBlendMode: 'difference',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease-out, height 0.2s ease-out',
        }}
      >
        {text && (
          <div
            ref={textRef}
            className="absolute whitespace-nowrap text-[10px] font-medium"
            style={{
              color: 'white',
              opacity: 0.8,
              transform: 'translateY(25px)',
            }}
          >
            {text}
          </div>
        )}
      </motion.div>
      
      {/* Small cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          backgroundColor: colors.primary,
          opacity: visible && !isPointer ? 1 : 0,
          transition: 'width 0.1s ease, height 0.1s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
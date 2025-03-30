import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import gsap from 'gsap';
import VideoBackground from './VideoBackground';

export type BackgroundType = 'particles' | 'waves' | 'gradient' | 'net' | 'live' | 'video';

const logBackgroundTypeChange = (type: BackgroundType) => {
  console.log(`Background changed to: ${type}`);
};

interface AnimatedBackgroundProps {
  type?: BackgroundType;
  color?: string;
  secondaryColor?: string;
  density?: number;
  speed?: number;
  opacity?: number;
  interactive?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  type = 'particles',
  color,
  secondaryColor,
  density = 100,
  speed = 1,
  opacity = 0.7,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colors, backgroundType } = useTheme();
  const [currentType, setCurrentType] = useState<BackgroundType>(type);
  
  useEffect(() => {
    setCurrentType(type);
    logBackgroundTypeChange(type);
  }, [type]);
    
  // Set up the gradient animation
  useEffect(() => {
    if (type !== 'gradient' || !containerRef.current) return;
    
    const gradientElement = document.createElement('div');
    gradientElement.className = 'gradient-bg';
    gradientElement.style.position = 'absolute';
    gradientElement.style.top = '0';
    gradientElement.style.left = '0';
    gradientElement.style.width = '100%';
    gradientElement.style.height = '100%';
    gradientElement.style.opacity = opacity.toString();
    
    containerRef.current.appendChild(gradientElement);
    
    const primaryCol = color || colors.primary;
    const secondaryCol = secondaryColor || colors.secondary || colors.primary;
    
    gradientElement.style.background = `linear-gradient(45deg, ${primaryCol}40 0%, ${secondaryCol}40 100%)`;
    
    // Instead of anime.js, use GSAP for the gradient animation
    gsap.to(gradientElement, {
      backgroundImage: `linear-gradient(225deg, ${primaryCol}40 0%, ${secondaryCol}40 100%)`,
      duration: 10 / speed,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Create floating elements with GSAP
    const floatingElementsCount = 8;
    for (let i = 0; i < floatingElementsCount; i++) {
      const element = document.createElement('div');
      element.className = 'floating-element';
      element.style.position = 'absolute';
      element.style.borderRadius = '50%';
      element.style.background = i % 2 === 0 ? `${primaryCol}20` : `${secondaryCol}20`;
      
      // Random size between 50px and 300px
      const size = 50 + Math.random() * 250;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      
      // Random position
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.zIndex = '-1';
      element.style.filter = 'blur(40px)';
      
      containerRef.current.appendChild(element);
      
      // Animate with GSAP
      gsap.to(element, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        duration: 10 + Math.random() * 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
    
    return () => {
      if (containerRef.current) {
        // Clean up the gradient elements
        const gradientBg = containerRef.current.querySelector('.gradient-bg');
        if (gradientBg) {
          containerRef.current.removeChild(gradientBg);
        }
        
        // Clean up floating elements
        const floatingElements = containerRef.current.querySelectorAll('.floating-element');
        floatingElements.forEach((el) => {
          containerRef.current?.removeChild(el);
        });
      }
    };
  }, [type, color, secondaryColor, opacity, speed, colors.primary, colors.secondary]);
  
  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden" style={{ opacity }}>
      {currentType === 'video' ? (
        <VideoBackground opacity={opacity} />
      ) : (
        <div className="w-full h-full">
          {/* We're simplifying this component - for now, default to video if not gradient */}
          {currentType !== 'gradient' && <VideoBackground opacity={opacity} />}
        </div>
      )}
    </div>
  );
};

export default AnimatedBackground;
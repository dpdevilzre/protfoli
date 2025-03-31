import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import SocialLinks from './SocialLinks';

const HeroSection: React.FC = () => {
  const { colors, isDark } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // React Spring animations
  const nameProps = useSpring({
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    delay: 300,
    config: {
      mass: 1,
      tension: 280,
      friction: 60
    }
  });
  
  const titleProps = useSpring({
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    delay: 600,
    config: {
      mass: 1,
      tension: 280,
      friction: 60
    }
  });
  
  const descriptionProps = useSpring({
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    delay: 900,
    config: {
      mass: 1,
      tension: 280,
      friction: 60
    }
  });
  
  const buttonProps = useSpring({
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    delay: 1200,
    config: {
      mass: 1,
      tension: 280,
      friction: 60
    }
  });
  
  const socialProps = useSpring({
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
    delay: 1500,
    config: {
      mass: 1,
      tension: 280,
      friction: 60
    }
  });
  
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      window.scrollTo({
        top: nextSection.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };
  
  // Scroll indicator animation
  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2,
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse' as const
      }
    }
  };
  
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content - Left Side */}
          <div className="order-2 md:order-1">
            {/* Vertical Social Links on Left */}
            <animated.div 
              style={socialProps}
              className="absolute left-6 md:left-10 top-1/2 transform -translate-y-1/2 hidden lg:flex"
            >
              <div className="flex flex-col items-center gap-6">
                <SocialLinks vertical />
                <div className="w-px h-20 bg-border/50" />
              </div>
            </animated.div>
            
            {/* Greeting */}
            <animated.div 
              style={nameProps}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-10 bg-primary/70" />
              <p className="text-lg text-muted-foreground font-medium">Hi, my name is</p>
            </animated.div>
            
            {/* Name */}
            <animated.h1 
              style={nameProps}
              className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
            >
              Devesh <span className="text-primary">Prakash</span>
            </animated.h1>
            
            {/* Title */}
            <animated.h2 
              style={titleProps}
              className="text-3xl md:text-4xl font-bold mb-6 text-muted-foreground"
            >
              Full Stack Developer
            </animated.h2>
            
            {/* Description */}
            <animated.p 
              style={descriptionProps}
              className="text-lg text-muted-foreground mb-8 max-w-lg"
            >
              I create beautiful, responsive, and user-friendly web applications using modern technologies. Let's build something amazing together!
            </animated.p>
            
            {/* CTA Buttons */}
            <animated.div 
              style={buttonProps}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                className="gap-2 bg-primary hover:bg-primary/90 text-white"
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    window.scrollTo({
                      top: contactSection.getBoundingClientRect().top + window.scrollY - 80,
                      behavior: 'smooth'
                    });
                  }
                }}
                data-cursor-text="Get In Touch"
              >
                Get In Touch
                <ArrowRight size={16} />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                asChild
                data-cursor-text="Resume"
              >
                <a href="/assets/deveshresume.pdf" download>
                  Download CV
                </a>
              </Button>
            </animated.div>
            
            {/* Mobile Social Links */}
            <animated.div 
              style={socialProps}
              className="mt-8 md:hidden"
            >
              <SocialLinks />
            </animated.div>
          </div>
          
          {/* Profile Image - Right Side */}
          <div className="order-1 md:order-2 flex justify-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Hero Image Area */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                {/* Profile Image */}
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="./assets/profile.jpg" 
                    alt="Devesh Prakash" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay gradient */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/30 opacity-60"
                  />
                </motion.div>
                
                {/* Animated circles */}
                <motion.div 
                  className="absolute inset-0 border-4 border-primary/20 rounded-full"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                  }}
                />
              </div>
              
              {/* Floating Role Badges */}
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-background shadow-lg rounded-full px-4 py-2 border border-border"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.4, type: "spring" }}
              >
                <span className="text-sm font-medium">React.js Expert</span>
              </motion.div>
              
              <motion.div 
                className="absolute -top-4 -left-4 bg-background shadow-lg rounded-full px-4 py-2 border border-border"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4, type: "spring" }}
              >
                <span className="text-sm font-medium">UI/UX Designer</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate="visible"
          onClick={scrollToNextSection}
        >
          <div className="flex flex-col items-center gap-2 cursor-pointer" data-cursor-text="Scroll">
            <span className="text-xs text-muted-foreground">Scroll Down</span>
            <ChevronDown size={20} className="text-primary animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
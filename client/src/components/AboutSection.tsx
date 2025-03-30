import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const AboutSection: React.FC = () => {
  const { colors } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Text animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 md:py-32 px-6 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Left column - Image/Profile */}
          <motion.div 
            className="order-2 lg:order-1 flex justify-center"
            variants={fadeIn}
          >
            <div className="relative">
              {/* Profile image with decorative elements */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-border bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl md:text-7xl font-bold" style={{ color: colors.primary }}>
                    DP
                  </span>
                </div>
                
                {/* Decorative circles */}
                <motion.div 
                  className="absolute w-full h-full border-4 border-primary/20 rounded-2xl"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Experience badge */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-background shadow-lg rounded-full px-4 py-2 border border-border"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
              >
                <span className="text-sm font-medium">4+ Years Experience</span>
              </motion.div>
              
              {/* Education badge */}
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-background shadow-lg rounded-full px-4 py-2 border border-border"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4, type: "spring" }}
              >
                <span className="text-sm font-medium">B.Tech CS Graduate</span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right column - About text */}
          <motion.div 
            className="order-1 lg:order-2"
            variants={fadeIn}
          >
            <div className="mb-6 inline-block">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                About Me
              </motion.h2>
              <motion.div 
                className="h-1 w-20 rounded-full" 
                style={{ backgroundColor: colors.primary }}
                initial={{ width: 0 }}
                animate={isInView ? { width: 80 } : { width: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </div>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-6"
              variants={fadeIn}
            >
              I'm a passionate Full Stack Developer with expertise in modern web technologies. 
              With a strong foundation in both frontend and backend development, I create 
              seamless, responsive, and user-friendly applications.
            </motion.p>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8"
              variants={fadeIn}
            >
              My journey in tech started during my B.Tech in Computer Science, where I 
              discovered my love for building interactive web experiences. Since then, 
              I've been constantly learning and improving my skills to stay at the 
              forefront of web development trends.
            </motion.p>
            
            <motion.div 
              className="space-y-4 mb-8"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                <span className="font-medium">Full Stack Development</span>
              </motion.div>
              <motion.div variants={fadeIn} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                <span className="font-medium">UI/UX Design</span>
              </motion.div>
              <motion.div variants={fadeIn} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                <span className="font-medium">Mobile App Development</span>
              </motion.div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 flex gap-2"
                asChild
              >
                <a href="/assets/deveshresume.pdf" download>
                  Download CV
                  <Download size={18} />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
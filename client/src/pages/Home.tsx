import React, { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import AnimatedBackground from '@/components/AnimatedBackground';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  const { backgroundType, colors } = useTheme();
  
  // Apply global styles based on theme
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      ::selection {
        background-color: ${colors.primary}40;
        color: ${colors.text};
      }
      
      .section-fade-in {
        position: relative;
        z-index: 1;
      }
      
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 10px;
      }
      
      ::-webkit-scrollbar-track {
        background: ${colors.background};
      }
      
      ::-webkit-scrollbar-thumb {
        background: ${colors.primary}60;
        border-radius: 5px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: ${colors.primary}80;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [colors]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated background component */}
      <AnimatedBackground 
        type={backgroundType}
        opacity={0.7}
        interactive={true}
      />
      
      {/* Main content sections */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
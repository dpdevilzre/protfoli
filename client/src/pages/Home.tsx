import React, { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useSpring, animated } from '@react-spring/web';

const Home: React.FC = () => {
  // React Spring animation for page transition
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  useEffect(() => {
    // Section fade-in animation on scroll using Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections with fade-in class
    const sections = document.querySelectorAll('.section-fade-in');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <animated.div style={fadeIn}>
      <style>{`
        .section-fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .section-visible {
          opacity: 1;
          transform: translateY(0);
        }
        html {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 53, 0.5);
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 107, 53, 0.8);
        }
      `}</style>
      <div className="relative overflow-hidden">
        <AnimatedBackground />
        <Header />
        <main className="pt-16">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </animated.div>
  );
};

export default Home;

import React, { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  useEffect(() => {
    // Section fade-in animation on scroll
    const fadeInSection = () => {
      const sections = document.querySelectorAll(".section-fade-in");
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("section-visible");
        }
      });
    };
    
    // Initial check on page load
    fadeInSection();
    
    // Check on scroll
    window.addEventListener("scroll", fadeInSection);
    
    return () => {
      window.removeEventListener("scroll", fadeInSection);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .section-fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .section-visible {
          opacity: 1;
          transform: translateY(0);
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;

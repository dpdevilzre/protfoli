import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark } = useTheme();

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? isDark
            ? 'bg-black/90 shadow-lg'
            : 'bg-white/90 shadow-md' 
          : isDark
            ? 'bg-transparent' 
            : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <a href="#" className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-primary'} font-poppins tracking-tight`}>
            Devesh<span className="text-orange-500">.</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className={`font-medium ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}>Home</a>
            <a href="#about" className={`font-medium ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}>About</a>
            <a href="#skills" className={`font-medium ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}>Skills</a>
            <a href="#projects" className={`font-medium ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}>Projects</a>
            <a href="#contact" className={`font-medium ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}>Contact</a>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            type="button" 
            className={`md:hidden ${isDark ? 'text-white' : 'text-gray-700'} hover:text-primary`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} ${isDark ? 'bg-black/95' : 'bg-white'} pb-4 rounded-lg`}>
          <div className="flex flex-col space-y-4">
            <a 
              href="#home" 
              className={`px-4 py-2 ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}
              onClick={closeMobileMenu}
            >
              Home
            </a>
            <a 
              href="#about" 
              className={`px-4 py-2 ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}
              onClick={closeMobileMenu}
            >
              About
            </a>
            <a 
              href="#skills" 
              className={`px-4 py-2 ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}
              onClick={closeMobileMenu}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className={`px-4 py-2 ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}
              onClick={closeMobileMenu}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className={`px-4 py-2 ${isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors`}
              onClick={closeMobileMenu}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

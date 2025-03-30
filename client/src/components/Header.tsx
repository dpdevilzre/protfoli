import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="#" className="text-2xl font-bold text-primary font-poppins">
            Devesh<span className="text-orange-500">.</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="font-medium text-gray-700 hover:text-primary transition-colors">Home</a>
            <a href="#about" className="font-medium text-gray-700 hover:text-primary transition-colors">About</a>
            <a href="#skills" className="font-medium text-gray-700 hover:text-primary transition-colors">Skills</a>
            <a href="#projects" className="font-medium text-gray-700 hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="font-medium text-gray-700 hover:text-primary transition-colors">Contact</a>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            type="button" 
            className="md:hidden text-gray-700 hover:text-primary"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <i className={`bx ${isMobileMenuOpen ? 'bx-x' : 'bx-menu'} text-3xl`}></i>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white pb-4`}>
          <div className="flex flex-col space-y-4">
            <a 
              href="#home" 
              className="px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              About
            </a>
            <a 
              href="#skills" 
              className="px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className="px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="px-4 py-2 text-gray-700 hover:text-primary transition-colors"
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

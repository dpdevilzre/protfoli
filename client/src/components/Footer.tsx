import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background/50 backdrop-blur-sm border-t border-border/30 py-8 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: colors.primary }}
            >
              Devesh Prakash
            </h2>
            <p className="text-muted-foreground mb-4 max-w-md">
              A passionate web designer and developer focused on creating beautiful, 
              functional digital experiences.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#skills"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#projects"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact & Social */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Connect
            </h3>
            <p className="text-muted-foreground mb-4">
              Feel free to reach out for collaborations or just a friendly hello.
            </p>
            <SocialLinks className="mb-4" />
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-border/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Devesh Prakash. All rights reserved.
          </p>
          
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            Designed & Built with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
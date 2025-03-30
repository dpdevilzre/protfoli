import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';

interface SocialLinksProps {
  vertical?: boolean;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ vertical = true, className = '' }) => {
  const { isDark } = useTheme();
  
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/deveshprakash', // Update with correct URL
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/in/deveshprakash', // Update with correct URL
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: 'https://twitter.com/deveshprakash', // Update with correct URL
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/dpdevilz', // Updated with user's Instagram account
    }
  ];

  return (
    <div 
      className={`fixed z-40 right-6 top-1/2 transform -translate-y-1/2 flex ${
        vertical ? 'flex-col space-y-5' : 'flex-row space-x-5'
      } ${className}`}
    >
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className={`text-xl transform transition-all duration-300 hover:scale-125 ${
            isDark 
              ? 'text-gray-300 hover:text-white' 
              : 'text-gray-600 hover:text-primary'
          }`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
import React, { createContext, useState, useContext, useEffect } from 'react';
import { BackgroundType } from '@/components/AnimatedBackground';

export type ThemeMode = 'light' | 'dark';
export type AccentColor = 'orange' | 'blue' | 'purple' | 'green' | 'pink';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  textSecondary: string;
  accent: string;
}

interface ThemeContextType {
  themeMode: ThemeMode;
  accentColor: AccentColor;
  backgroundType: BackgroundType;
  colors: ThemeColors;
  toggleTheme: () => void;
  setAccentColor: (color: AccentColor) => void;
  setBackgroundType: (type: BackgroundType) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'light',
  accentColor: 'orange',
  backgroundType: 'live',
  colors: {
    primary: '#FF6B35',
    secondary: '#f8b195',
    background: '#ffffff',
    text: '#1e293b',
    textSecondary: '#64748b',
    accent: '#FF6B35'
  },
  toggleTheme: () => {},
  setAccentColor: () => {},
  setBackgroundType: () => {},
  isDark: false
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check for system dark mode preference
  const prefersDarkMode = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-color-scheme: dark)').matches 
    : false;
  
  // Load theme preferences from localStorage or use defaults
  // Always default to dark mode for Carrd-like experience
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('themeMode');
      return (savedTheme as ThemeMode) || 'dark'; // Default to dark mode
    }
    return 'dark'; // Default to dark mode
  });
  
  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem('accentColor');
      return (savedColor as AccentColor) || 'orange';
    }
    return 'orange';
  });
  
  const [backgroundType, setBackgroundTypeState] = useState<BackgroundType>(() => {
    if (typeof window !== 'undefined') {
      const savedBackground = localStorage.getItem('backgroundType');
      return (savedBackground as BackgroundType) || 'video';
    }
    return 'video';
  });
  
  const isDark = themeMode === 'dark';
  
  // Apply theme to document
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      localStorage.setItem('themeMode', themeMode);
    }
  }, [themeMode, isDark]);
  
  // Get theme colors based on current theme and accent color
  const getColors = (): ThemeColors => {
    const colorMap: Record<AccentColor, {light: string, dark: string}> = {
      orange: { light: '#FF6B35', dark: '#FF8B55' },
      blue: { light: '#66c6ff', dark: '#80d0ff' },  // Brighter blue that pops on dark backgrounds
      purple: { light: '#a56bff', dark: '#bd8bff' }, // Vibrant purple that matches Carrd style
      green: { light: '#4cd3a5', dark: '#6bdfb9' },  // Modern teal-green
      pink: { light: '#ff6bc6', dark: '#ff8bd6' }    // Neon pink like in modern portfolios
    };
    
    const secondaryColorMap: Record<AccentColor, {light: string, dark: string}> = {
      orange: { light: '#f8b195', dark: '#f8c2a9' },
      blue: { light: '#cceeff', dark: '#e0f5ff' },   // Lighter blue for secondary elements
      purple: { light: '#e0ccff', dark: '#ecdcff' }, // Soft purple for accents
      green: { light: '#c8f7e6', dark: '#dffaf0' },  // Soft teal for accents
      pink: { light: '#ffd9f0', dark: '#ffe6f5' }    // Soft pink for accents
    };
    
    return {
      primary: isDark ? colorMap[accentColor].dark : colorMap[accentColor].light,
      secondary: isDark ? secondaryColorMap[accentColor].dark : secondaryColorMap[accentColor].light,
      background: isDark ? '#0a0a18' : '#ffffff',  // Darker blue-black like Carrd site
      text: isDark ? '#ffffff' : '#1e293b',        // Pure white text on dark background for better readability
      textSecondary: isDark ? '#bbc2d0' : '#64748b', // Lighter secondary text for better contrast
      accent: isDark ? colorMap[accentColor].dark : colorMap[accentColor].light
    };
  };
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  // Set accent color and save to localStorage
  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    if (typeof window !== 'undefined') {
      localStorage.setItem('accentColor', color);
    }
  };
  
  // Set background type and save to localStorage
  const setBackgroundType = (type: BackgroundType) => {
    console.log('ThemeContext: Setting background type to:', type);
    setBackgroundTypeState(type);
    if (typeof window !== 'undefined') {
      localStorage.setItem('backgroundType', type);
      console.log('ThemeContext: Saved background type to localStorage:', type);
    }
  };
  
  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        if (localStorage.getItem('themeMode') === null) {
          setThemeMode(e.matches ? 'dark' : 'light');
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, []);
  
  const contextValue: ThemeContextType = {
    themeMode,
    accentColor,
    backgroundType,
    colors: getColors(),
    toggleTheme,
    setAccentColor,
    setBackgroundType,
    isDark
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
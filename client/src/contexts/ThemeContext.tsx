import React, { createContext, useContext, useState, useEffect } from 'react';
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
  themeMode: 'dark',
  accentColor: 'orange',
  backgroundType: 'video',
  colors: {
    primary: '#FF5D01',
    secondary: '#7000FF',
    background: '#111111',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    accent: '#FF5D01',
  },
  toggleTheme: () => {},
  setAccentColor: () => {},
  setBackgroundType: () => {},
  isDark: true,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get saved preferences from localStorage or use defaults
  const getSavedTheme = (): ThemeMode => {
    const saved = localStorage.getItem('themeMode');
    if (saved && (saved === 'dark' || saved === 'light')) {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  
  const getSavedAccentColor = (): AccentColor => {
    const saved = localStorage.getItem('accentColor');
    if (saved && (saved === 'orange' || saved === 'blue' || saved === 'purple' || saved === 'green' || saved === 'pink')) {
      return saved as AccentColor;
    }
    return 'orange';
  };
  
  const getSavedBackgroundType = (): BackgroundType => {
    const saved = localStorage.getItem('backgroundType');
    if (saved && (saved === 'particles' || saved === 'waves' || saved === 'gradient' || saved === 'net' || saved === 'live' || saved === 'video')) {
      return saved as BackgroundType;
    }
    return 'video';
  };
  
  const [themeMode, setThemeMode] = useState<ThemeMode>(getSavedTheme);
  const [accentColor, setAccentColor] = useState<AccentColor>(getSavedAccentColor);
  const [backgroundType, setBackgroundType] = useState<BackgroundType>(getSavedBackgroundType);
  const isDark = themeMode === 'dark';
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('themeMode')) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  // Apply theme to the document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode, isDark]);
  
  // Save accent color to localStorage
  useEffect(() => {
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor]);
  
  // Save background type to localStorage
  useEffect(() => {
    localStorage.setItem('backgroundType', backgroundType);
  }, [backgroundType]);
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };
  
  // Generate colors based on theme and accent
  const getColors = (): ThemeColors => {
    const accentColors = {
      orange: '#FF5D01',
      blue: '#0077FF',
      purple: '#7000FF',
      green: '#00CC88',
      pink: '#FF3366',
    };
    
    const secondaryColors = {
      orange: '#7000FF',
      blue: '#00CC88',
      purple: '#FF3366',
      green: '#0077FF',
      pink: '#7000FF',
    };
    
    const accent = accentColors[accentColor];
    const secondary = secondaryColors[accentColor];
    
    if (isDark) {
      return {
        primary: accent,
        secondary: secondary,
        background: '#111111',
        text: '#FFFFFF',
        textSecondary: '#AAAAAA',
        accent: accent,
      };
    } else {
      return {
        primary: accent,
        secondary: secondary,
        background: '#FFFFFF',
        text: '#111111',
        textSecondary: '#555555',
        accent: accent,
      };
    }
  };
  
  const handleSetAccentColor = (color: AccentColor) => {
    setAccentColor(color);
  };
  
  const handleSetBackgroundType = (type: BackgroundType) => {
    setBackgroundType(type);
  };
  
  const contextValue: ThemeContextType = {
    themeMode,
    accentColor,
    backgroundType,
    colors: getColors(),
    toggleTheme,
    setAccentColor: handleSetAccentColor,
    setBackgroundType: handleSetBackgroundType,
    isDark,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
import React, { createContext, useContext, useState, useEffect } from 'react';

export type BackgroundType = 'particles' | 'waves' | 'gradient' | 'net' | 'live' | 'video';

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

const defaultColors: Record<AccentColor, string> = {
  orange: '#f97316',
  blue: '#3b82f6',
  purple: '#a855f7',
  green: '#22c55e',
  pink: '#ec4899',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get saved theme from localStorage or use system preference
  const getSavedTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // Use system preference as fallback
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  
  // Get saved accent color from localStorage or use default
  const getSavedAccentColor = (): AccentColor => {
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor && Object.keys(defaultColors).includes(savedColor)) {
      return savedColor as AccentColor;
    }
    return 'orange';
  };
  
  // Get saved background type from localStorage or use default
  const getSavedBackgroundType = (): BackgroundType => {
    const savedBg = localStorage.getItem('backgroundType');
    if (
      savedBg && 
      ['particles', 'waves', 'gradient', 'net', 'live', 'video'].includes(savedBg)
    ) {
      return savedBg as BackgroundType;
    }
    return 'gradient';
  };
  
  const [themeMode, setThemeMode] = useState<ThemeMode>('light'); // Initial default
  const [accentColor, setAccentColor] = useState<AccentColor>('orange');
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('gradient');
  const [isDark, setIsDark] = useState(false);
  
  // Initialize theme and accent color from localStorage on mount
  useEffect(() => {
    setThemeMode(getSavedTheme());
    setAccentColor(getSavedAccentColor());
    setBackgroundType(getSavedBackgroundType());
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      if (localStorage.getItem('theme') === null) {
        setThemeMode(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Update document attributes when theme changes
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
    
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);
  
  // Save accent color to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('accentColor', accentColor);
    
    // Update the CSS variables for the accent color
    document.documentElement.style.setProperty('--color-primary', defaultColors[accentColor]);
  }, [accentColor]);
  
  // Save background type to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('backgroundType', backgroundType);
  }, [backgroundType]);
  
  // Calculate theme colors based on mode and accent
  const getColors = (): ThemeColors => {
    const primary = defaultColors[accentColor];
    
    return {
      primary,
      secondary: isDark ? '#333333' : '#f5f5f5',
      background: isDark ? '#111111' : '#ffffff',
      text: isDark ? '#ffffff' : '#111111',
      textSecondary: isDark ? '#cccccc' : '#666666',
      accent: primary,
    };
  };
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // Handle accent color changes
  const handleSetAccentColor = (color: AccentColor) => {
    setAccentColor(color);
  };
  
  // Handle background type changes
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
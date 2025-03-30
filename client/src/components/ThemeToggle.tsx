import React, { useState } from 'react';
import { useTheme, AccentColor } from '@/contexts/ThemeContext';
import { BackgroundType } from '@/components/AnimatedBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, PaintBucket, Monitor, Waves, Grid3X3, GripHorizontal } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { 
    themeMode, 
    toggleTheme, 
    accentColor, 
    setAccentColor, 
    backgroundType, 
    setBackgroundType,
    isDark 
  } = useTheme();
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Available accent colors
  const accentColors: { value: AccentColor; hex: string; name: string }[] = [
    { value: 'orange', hex: '#FF6B35', name: 'Orange' },
    { value: 'blue', hex: '#3498db', name: 'Blue' },
    { value: 'purple', hex: '#8e44ad', name: 'Purple' },
    { value: 'green', hex: '#27ae60', name: 'Green' },
    { value: 'pink', hex: '#e84393', name: 'Pink' }
  ];
  
  // Available background types
  const backgroundTypes: { value: BackgroundType; icon: React.ReactNode; name: string }[] = [
    { value: 'video', icon: <Monitor size={16} />, name: 'Video' },
    { value: 'live', icon: <Grid3X3 size={16} />, name: 'Pro' },
    { value: 'particles', icon: <Grid3X3 size={16} />, name: 'Particles' },
    { value: 'waves', icon: <Waves size={16} />, name: 'Waves' },
    { value: 'gradient', icon: <GripHorizontal size={16} />, name: 'Gradient' },
    { value: 'net', icon: <Grid3X3 size={16} />, name: 'Network' }
  ];
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
        aria-label="Theme settings"
      >
        <PaintBucket size={20} />
      </button>
      
      {/* Expanded panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 p-4 rounded-lg shadow-xl bg-white dark:bg-slate-800 w-64"
          >
            <div className="space-y-4">
              {/* Theme toggle */}
              <div>
                <h3 className="font-medium text-sm text-slate-700 dark:text-slate-200 mb-2">Theme Mode</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleTheme}
                    className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-1 ${
                      !isDark ? 'bg-slate-100 text-slate-900' : 'text-slate-500 dark:text-slate-400'
                    }`}
                    aria-label="Light theme"
                  >
                    <Sun size={16} />
                    <span className="text-sm">Light</span>
                  </button>
                  
                  <button 
                    onClick={toggleTheme}
                    className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-1 ${
                      isDark ? 'bg-slate-700 text-white' : 'text-slate-500'
                    }`}
                    aria-label="Dark theme"
                  >
                    <Moon size={16} />
                    <span className="text-sm">Dark</span>
                  </button>
                  
                  <button 
                    onClick={toggleTheme}
                    className="py-2 px-3 rounded-md flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                    aria-label="System theme"
                  >
                    <Monitor size={16} />
                  </button>
                </div>
              </div>
              
              {/* Accent color */}
              <div>
                <h3 className="font-medium text-sm text-slate-700 dark:text-slate-200 mb-2">Accent Color</h3>
                <div className="flex flex-wrap gap-2">
                  {accentColors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setAccentColor(color.value)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        color.value === accentColor ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ring-black dark:ring-white' : ''
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`${color.name} accent color`}
                    >
                      {color.value === accentColor && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Background type */}
              <div>
                <h3 className="font-medium text-sm text-slate-700 dark:text-slate-200 mb-2">Background Style</h3>
                <div className="grid grid-cols-2 gap-2">
                  {backgroundTypes.map(bg => (
                    <button
                      key={bg.value}
                      onClick={() => {
                        console.log('Background selected:', bg.value);
                        setBackgroundType(bg.value);
                      }}
                      className={`py-2 px-3 rounded-md flex items-center justify-center space-x-1 ${
                        bg.value === backgroundType 
                          ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold border-2 border-primary' 
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                      aria-label={bg.name}
                    >
                      {bg.icon}
                      <span className="text-sm">{bg.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
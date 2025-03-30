import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, ThemeMode, AccentColor, BackgroundType } from '@/contexts/ThemeContext';
import { 
  Sun, Moon, 
  Palette, ChevronDown, 
  CheckCircle2, 
  Sparkles, Waves, 
  Grid, PaintBucket, 
  Video, Network
} from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { themeMode, accentColor, backgroundType, toggleTheme, setAccentColor, setBackgroundType } = useTheme();
  const [isColorsOpen, setIsColorsOpen] = useState(false);
  const [isBackgroundsOpen, setIsBackgroundsOpen] = useState(false);
  
  // Color options for accent colors
  const accentColors: { value: AccentColor; hex: string; name: string }[] = [
    { value: 'orange', hex: '#f97316', name: 'Orange' },
    { value: 'blue', hex: '#3b82f6', name: 'Blue' },
    { value: 'purple', hex: '#a855f7', name: 'Purple' },
    { value: 'green', hex: '#22c55e', name: 'Green' },
    { value: 'pink', hex: '#ec4899', name: 'Pink' },
  ];
  
  // Background type options
  const backgroundTypes: { value: BackgroundType; icon: React.ReactNode; name: string }[] = [
    { value: 'gradient', icon: <PaintBucket size={18} />, name: 'Gradient' },
    { value: 'particles', icon: <Sparkles size={18} />, name: 'Particles' },
    { value: 'waves', icon: <Waves size={18} />, name: 'Waves' },
    { value: 'net', icon: <Grid size={18} />, name: 'Grid' },
    { value: 'live', icon: <Network size={18} />, name: 'Interactive' },
    { value: 'video', icon: <Video size={18} />, name: 'Video' },
  ];
  
  const isCurrentColor = (color: AccentColor) => accentColor === color;
  const isCurrentBackground = (bg: BackgroundType) => backgroundType === bg;
  
  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 22
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { 
        duration: 0.15,
        ease: 'easeOut'
      }
    }
  };
  
  return (
    <div className="relative flex items-center gap-2">
      {/* Theme mode toggle */}
      <motion.button
        className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground"
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
        data-cursor-text="Theme"
      >
        <AnimatePresence mode="wait">
          {themeMode === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      
      {/* Color picker */}
      <div className="relative">
        <motion.button
          className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground flex items-center gap-1"
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsColorsOpen(!isColorsOpen);
            setIsBackgroundsOpen(false);
          }}
          aria-label="Change accent color"
          aria-expanded={isColorsOpen}
          data-cursor-text="Accent"
        >
          <Palette size={20} />
          <ChevronDown 
            size={14} 
            className={`transition-transform duration-200 ${isColorsOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </motion.button>
        
        <AnimatePresence>
          {isColorsOpen && (
            <motion.div
              className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg p-2 z-50 min-w-[200px]"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                Accent Color
              </div>
              <div className="space-y-1">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    className={`flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted transition-colors duration-150 ${
                      isCurrentColor(color.value) ? 'bg-muted' : ''
                    }`}
                    onClick={() => setAccentColor(color.value)}
                    style={{ color: color.hex }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm text-foreground">{color.name}</span>
                    {isCurrentColor(color.value) && (
                      <CheckCircle2 size={14} className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Background type selector */}
      <div className="relative">
        <motion.button
          className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground flex items-center gap-1"
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsBackgroundsOpen(!isBackgroundsOpen);
            setIsColorsOpen(false);
          }}
          aria-label="Change background type"
          aria-expanded={isBackgroundsOpen}
          data-cursor-text="Background"
        >
          {backgroundTypes.find(bg => bg.value === backgroundType)?.icon || <PaintBucket size={20} />}
          <ChevronDown 
            size={14} 
            className={`transition-transform duration-200 ${isBackgroundsOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </motion.button>
        
        <AnimatePresence>
          {isBackgroundsOpen && (
            <motion.div
              className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg p-2 z-50 min-w-[200px]"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                Background Type
              </div>
              <div className="space-y-1">
                {backgroundTypes.map((bgType) => (
                  <button
                    key={bgType.value}
                    className={`flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted transition-colors duration-150 ${
                      isCurrentBackground(bgType.value) ? 'bg-muted' : ''
                    }`}
                    onClick={() => setBackgroundType(bgType.value)}
                  >
                    <div className="text-primary">{bgType.icon}</div>
                    <span className="text-sm text-foreground">{bgType.name}</span>
                    {isCurrentBackground(bgType.value) && (
                      <CheckCircle2 size={14} className="ml-auto text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeToggle;
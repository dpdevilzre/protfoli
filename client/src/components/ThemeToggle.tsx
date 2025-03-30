import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, AccentColor } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { 
  Settings2, 
  Sun, 
  Moon, 
  X, 
  Droplets, 
  Waves, 
  GripHorizontal, 
  Grid3X3, 
  MoreHorizontal, 
  Video 
} from 'lucide-react';
import { BackgroundType } from './AnimatedBackground';

const ThemeToggle: React.FC = () => {
  const { themeMode, accentColor, backgroundType, toggleTheme, setAccentColor, setBackgroundType } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  // Define accent colors with their hex values
  const accentColors: { value: AccentColor; hex: string; name: string }[] = [
    { value: 'orange', hex: '#FF5D01', name: 'Orange' },
    { value: 'blue', hex: '#0077FF', name: 'Blue' },
    { value: 'purple', hex: '#7000FF', name: 'Purple' },
    { value: 'green', hex: '#00CC88', name: 'Green' },
    { value: 'pink', hex: '#FF3366', name: 'Pink' },
  ];
  
  // Define background types
  const backgroundTypes: { value: BackgroundType; icon: React.ReactNode; name: string }[] = [
    { value: 'particles', icon: <Droplets size={16} />, name: 'Particles' },
    { value: 'waves', icon: <Waves size={16} />, name: 'Waves' },
    { value: 'gradient', icon: <GripHorizontal size={16} />, name: 'Gradient' },
    { value: 'net', icon: <Grid3X3 size={16} />, name: 'Network' },
    { value: 'live', icon: <MoreHorizontal size={16} />, name: 'Interactive' },
    { value: 'video', icon: <Video size={16} />, name: 'Video' },
  ];
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Main toggle button */}
      <Button
        size="icon"
        variant="outline"
        className="rounded-full h-12 w-12 border-2 border-border bg-background/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={toggleOpen}
        aria-label="Theme settings"
      >
        {isOpen ? <X size={20} /> : <Settings2 size={20} />}
      </Button>
      
      {/* Theme settings panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute bottom-16 right-0 bg-background/90 backdrop-blur-lg border border-border rounded-lg p-4 shadow-lg w-[240px]"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-4">
              {/* Light/Dark Mode Toggle */}
              <div>
                <h3 className="text-sm font-medium mb-2">Theme Mode</h3>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={themeMode === 'light' ? 'default' : 'outline'}
                    className="flex-1 gap-1"
                    onClick={themeMode === 'dark' ? toggleTheme : undefined}
                  >
                    <Sun size={16} />
                    <span>Light</span>
                  </Button>
                  <Button
                    size="sm"
                    variant={themeMode === 'dark' ? 'default' : 'outline'}
                    className="flex-1 gap-1"
                    onClick={themeMode === 'light' ? toggleTheme : undefined}
                  >
                    <Moon size={16} />
                    <span>Dark</span>
                  </Button>
                </div>
              </div>
              
              {/* Accent Color Options */}
              <div>
                <h3 className="text-sm font-medium mb-2">Accent Color</h3>
                <div className="flex flex-wrap gap-2">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        accentColor === color.value ? 'border-foreground scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setAccentColor(color.value)}
                      aria-label={`Set accent color to ${color.name}`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              {/* Background Options */}
              <div>
                <h3 className="text-sm font-medium mb-2">Background</h3>
                <div className="grid grid-cols-3 gap-2">
                  {backgroundTypes.map((bg) => (
                    <Button
                      key={bg.value}
                      size="sm"
                      variant={backgroundType === bg.value ? 'default' : 'outline'}
                      className="flex flex-col items-center justify-center h-12 py-1 px-1"
                      onClick={() => setBackgroundType(bg.value)}
                      title={bg.name}
                    >
                      {bg.icon}
                      <span className="text-xs mt-1">{bg.name}</span>
                    </Button>
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
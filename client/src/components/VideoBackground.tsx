import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface VideoBackgroundProps {
  opacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ opacity = 0.7 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [videoError, setVideoError] = useState<string | null>(null);
  const { colors } = useTheme();
  
  // Load video with retry mechanism
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    const handleVideoLoaded = () => {
      if (video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
        setIsVideoLoaded(true);
        setVideoError(null);
        video.play().catch(err => {
          console.warn("Video autoplay failed:", err);
          // Still show the video frame even if autoplay fails
          setIsVideoLoaded(true);
        });
      }
    };
    
    const handleVideoError = (e: ErrorEvent) => {
      console.error("Video loading error:", e);
      setVideoError("Failed to load video background");
      
      // Retry loading a few times
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          video.load(); // Retry loading
        }, 1000 * (retryCount + 1)); // Exponential backoff
      }
    };
    
    // Check if video is already loaded
    if (video.readyState >= 3) {
      handleVideoLoaded();
    } else {
      video.addEventListener('loadeddata', handleVideoLoaded);
      video.addEventListener('error', handleVideoError as EventListener);
    }
    
    return () => {
      video.removeEventListener('loadeddata', handleVideoLoaded);
      video.removeEventListener('error', handleVideoError as EventListener);
      video.pause();
    };
  }, [retryCount]);
  
  return (
    <div ref={containerRef} className="h-full w-full overflow-hidden relative">
      {/* The video element */}
      <video
        ref={videoRef}
        className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loop
        muted
        playsInline
        preload="auto"
        style={{ 
          filter: 'brightness(0.7) blur(2px)',
        }}
      >
        <source src="/assets/3693587-hd_1920_1080_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay and gradient for better text readability */}
      <div 
        className="absolute inset-0 bg-black opacity-40"
        style={{ mixBlendMode: 'multiply' }}
      ></div>
      
      {/* Gradient overlays */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `linear-gradient(45deg, ${colors.primary}20 0%, transparent 70%)`,
          mixBlendMode: 'overlay',
        }}
      ></div>
      
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: `linear-gradient(to bottom, transparent 40%, ${colors.background} 100%)`,
        }}
      ></div>
      
      {/* Error message */}
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 text-muted-foreground z-10">
          <p>{videoError}</p>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
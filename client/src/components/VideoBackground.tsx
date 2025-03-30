import React, { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  opacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ opacity = 0.5 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleVideoError = (e: ErrorEvent) => {
      console.error('Video error:', e);
      setHasError(true);
      
      if (retryCount < maxRetries) {
        // Try to reload the video after a short delay
        setTimeout(() => {
          setRetryCount(prevCount => prevCount + 1);
          if (video) {
            video.load();
            video.play().catch(err => {
              console.error('Failed to play video:', err);
            });
          }
        }, 2000);
      }
    };
    
    const handleCanPlay = () => {
      setHasError(false);
      
      // Set playback settings for smoother playback
      video.playbackRate = 0.75; // Slightly slower for smoother effect
    };
    
    video.addEventListener('error', handleVideoError as any);
    video.addEventListener('canplay', handleCanPlay);
    
    // Initial play
    video.play().catch(err => {
      console.error('Initial video play failed:', err);
      setHasError(true);
    });
    
    return () => {
      video.removeEventListener('error', handleVideoError as any);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [retryCount]);
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-[-1]">
      {hasError && retryCount >= maxRetries ? (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <p>Video background unavailable</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          style={{ 
            filter: 'blur(2px) brightness(0.6)', 
            opacity: opacity 
          }}
        >
          <source src="/assets/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Gradient overlays for depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-70"
        aria-hidden="true"
      />
    </div>
  );
};

export default VideoBackground;
import React, { useRef, useEffect } from 'react';
import backgroundVideo from '@assets/3693587-hd_1920_1080_30fps.mp4';

interface VideoBackgroundProps {
  opacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ opacity = 0.7 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Autoplay the video with retry mechanism
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
          console.log('Video playing successfully');
        } catch (error) {
          console.log('Error playing video:', error);
          // Retry playing after a short delay
          setTimeout(() => playVideo(), 1000);
        }
      }
    };
    
    playVideo();
    
    // Make sure video doesn't get garbage collected
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      {/* Apply blur filter to the video container */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover scale-110" // Scale up slightly to avoid white edges with blur
          autoPlay
          loop
          muted
          playsInline
          style={{ 
            opacity,
            filter: 'brightness(0.4) contrast(1.2) blur(8px)'
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Gradient overlay for a more professional look */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-90"
        style={{ 
          background: 'linear-gradient(135deg, rgba(5,5,25,0.95) 0%, rgba(20,20,50,0.85) 100%)',
          mixBlendMode: 'normal'
        }}
      ></div>
      
      {/* Additional subtle radial gradient for depth */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-60"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(40,40,120,0.2) 0%, rgba(0,0,20,0.6) 100%)',
          mixBlendMode: 'overlay'
        }}
      ></div>
    </div>
  );
};

export default VideoBackground;
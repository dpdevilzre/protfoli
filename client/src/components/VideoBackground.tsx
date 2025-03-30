import React, { useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  opacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ opacity = 0.7 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Autoplay the video
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Error playing video:', error);
      });
    }
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 min-w-full min-h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        style={{ opacity }}
      >
        <source src="/assets/3693587-hd_1920_1080_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Add an overlay to darken the video slightly and make text more readable */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-black dark:opacity-50 opacity-30"
        style={{ mixBlendMode: 'multiply' }}
      ></div>
    </div>
  );
};

export default VideoBackground;
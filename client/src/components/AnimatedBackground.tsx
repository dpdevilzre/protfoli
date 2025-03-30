import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    mountRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    // Fill the positions array with random coordinates
    for (let i = 0; i < particlesCount * 3; i++) {
      // Spread particles throughout the scene
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: new THREE.Color('#FF6B35'), // Use orange color to match the theme
      transparent: true,
      opacity: 0.8
    });
    
    // Combine geometry and material to create particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation function
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      frame += 0.01;
      
      // Rotate particles slightly
      particlesMesh.rotation.x = frame * 0.03;
      particlesMesh.rotation.y = frame * 0.02;
      
      // Add subtle movement to particles to make them "float"
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const idx = i * 3;
        const x = positions[idx];
        const y = positions[idx + 1];
        const z = positions[idx + 2];
        
        // Apply subtle sine wave movement
        positions[idx] = x + Math.sin(frame + i * 0.1) * 0.005;
        positions[idx + 1] = y + Math.cos(frame + i * 0.1) * 0.005;
        positions[idx + 2] = z + Math.sin(frame + i * 0.1) * 0.005;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default AnimatedBackground;
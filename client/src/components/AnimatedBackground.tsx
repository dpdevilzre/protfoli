import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type BackgroundType = 'particles' | 'waves' | 'gradient' | 'net' | 'live' | 'video';

interface AnimatedBackgroundProps {
  type?: BackgroundType;
  color?: string;
  secondaryColor?: string;
  density?: number;
  speed?: number;
  opacity?: number;
  interactive?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  type = 'particles',
  color = '#FF6B35',
  secondaryColor = '#3498db',
  density = 500,
  speed = 0.01,
  opacity = 0.6,
  interactive = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Setup canvas for CSS-based animations
  useEffect(() => {
    if (type === 'gradient') {
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [type]);
  
  // Handle mouse movement for interactive backgrounds
  useEffect(() => {
    if (interactive && (type === 'particles' || type === 'net')) {
      const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({
          x: event.clientX,
          y: event.clientY
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [interactive, type]);
  
  // Three.js based animations (particles and net)
  useEffect(() => {
    if (!mountRef.current || type === 'gradient' || type === 'waves') return;
    
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
    
    // Create objects based on type
    let particlesMesh: THREE.Object3D | null = null;
    let particlesGeometry: THREE.BufferGeometry | null = null;
    let particlesMaterial: THREE.Material | null = null;
    let positions: Float32Array | null = null;
    
    const particlesCount = density;
    
    if (type === 'particles') {
      // Create particles
      particlesGeometry = new THREE.BufferGeometry();
      positions = new Float32Array(particlesCount * 3);
      
      // Fill the positions array with random coordinates
      for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      // Material
      particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.8
      });
      
      // Combine geometry and material to create particle system
      particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
    } else if (type === 'net') {
      // Create a net/grid of connected particles
      particlesGeometry = new THREE.BufferGeometry();
      positions = new Float32Array(particlesCount * 3);
      
      // Create a grid pattern
      const gridSize = Math.ceil(Math.sqrt(particlesCount));
      const spacing = 10 / gridSize;
      
      for (let i = 0; i < particlesCount; i++) {
        const x = (i % gridSize) * spacing - 5;
        const y = Math.floor(i / gridSize) * spacing - 5;
        const z = 0;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      // Material
      particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.6
      });
      
      // Create connections between nearby points (lines)
      const indices: number[] = [];
      for (let i = 0; i < particlesCount; i++) {
        for (let j = i + 1; j < particlesCount; j++) {
          const x1 = positions[i * 3];
          const y1 = positions[i * 3 + 1];
          const x2 = positions[j * 3];
          const y2 = positions[j * 3 + 1];
          
          // Only connect points that are reasonably close
          const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          if (dist < spacing * 1.5) {
            indices.push(i, j);
          }
        }
      }
      
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setIndex(indices);
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.3
      });
      
      const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineMesh);
      
      // Add points on top of lines
      particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
    }
    
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
      
      frame += speed;
      
      if (type === 'particles' && particlesMesh && particlesGeometry && positions) {
        // Rotate particles slightly
        particlesMesh.rotation.x = frame * 0.03;
        particlesMesh.rotation.y = frame * 0.02;
        
        // Add subtle movement to particles to make them "float"
        for (let i = 0; i < particlesCount; i++) {
          const idx = i * 3;
          const x = positions[idx];
          const y = positions[idx + 1];
          const z = positions[idx + 2];
          
          // Apply subtle sine wave movement
          positions[idx] = x + Math.sin(frame + i * 0.1) * 0.005;
          positions[idx + 1] = y + Math.cos(frame + i * 0.1) * 0.005;
          positions[idx + 2] = z + Math.sin(frame + i * 0.1) * 0.005;
          
          // Interactive effect - particles move away from mouse
          if (interactive) {
            const mouseX = (mousePosition.x / window.innerWidth) * 10 - 5;
            const mouseY = -(mousePosition.y / window.innerHeight) * 10 + 5;
            
            const dx = mouseX - positions[idx];
            const dy = mouseY - positions[idx + 1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 1) {
              const force = 0.05 / Math.max(0.1, dist);
              positions[idx] -= dx * force;
              positions[idx + 1] -= dy * force;
            }
          }
        }
        particlesGeometry.attributes.position.needsUpdate = true;
      } else if (type === 'net' && particlesMesh && particlesGeometry && positions) {
        // Animate the net with subtle waves
        for (let i = 0; i < particlesCount; i++) {
          const idx = i * 3;
          const x = (i % Math.sqrt(particlesCount)) * (10 / Math.sqrt(particlesCount)) - 5;
          const y = Math.floor(i / Math.sqrt(particlesCount)) * (10 / Math.sqrt(particlesCount)) - 5;
          
          // Wave effect on z-axis
          const z = Math.sin(frame + x * 0.5) * Math.cos(frame + y * 0.5) * 0.5;
          
          positions[idx] = x;
          positions[idx + 1] = y;
          positions[idx + 2] = z;
          
          // Interactive effect - points rise up when mouse is near
          if (interactive) {
            const mouseX = (mousePosition.x / window.innerWidth) * 10 - 5;
            const mouseY = -(mousePosition.y / window.innerHeight) * 10 + 5;
            
            const dx = mouseX - x;
            const dy = mouseY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 2) {
              positions[idx + 2] += (1 - dist / 2) * 1;
            }
          }
        }
        particlesGeometry.attributes.position.needsUpdate = true;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (particlesMesh) scene.remove(particlesMesh);
      if (particlesGeometry) particlesGeometry.dispose();
      if (particlesMaterial) particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [type, color, density, speed, interactive, mousePosition]);
  
  // Handle canvas-based animations (waves)
  useEffect(() => {
    if (type !== 'waves' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let animationFrameId: number;
    
    const primaryColorObj = hexToRgb(color);
    const secondaryColorObj = hexToRgb(secondaryColor);
    
    // Animation parameters
    const waveCount = 3;
    const waves = Array(waveCount).fill(0).map((_, i) => ({
      y: canvas.height * (0.5 + (i * 0.1)),
      amplitude: 20 + i * 10,
      frequency: 0.005 + i * 0.002,
      speed: 0.05 + i * 0.01,
      phase: 0
    }));
    
    const drawWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      waves.forEach((wave, waveIndex) => {
        ctx.beginPath();
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        
        // Create gradient based on the colors
        const waveColor = {
          r: primaryColorObj.r + (secondaryColorObj.r - primaryColorObj.r) * (waveIndex / waveCount),
          g: primaryColorObj.g + (secondaryColorObj.g - primaryColorObj.g) * (waveIndex / waveCount),
          b: primaryColorObj.b + (secondaryColorObj.b - primaryColorObj.b) * (waveIndex / waveCount)
        };
        
        gradient.addColorStop(0, `rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, ${opacity * 0.5})`);
        gradient.addColorStop(0.5, `rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, ${opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(${waveColor.r}, ${waveColor.g}, ${waveColor.b}, ${opacity * 0.5})`);
        
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x < canvas.width; x++) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Update the phase for next frame
        wave.phase += wave.speed * speed;
      });
      
      animationFrameId = requestAnimationFrame(drawWaves);
    };
    
    drawWaves();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, color, secondaryColor, speed, opacity]);
  
  // Convert hex color to rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 107, b: 53 }; // Default to orange if invalid hex
  };
  
  // Create Live background animation with canvas
  useEffect(() => {
    if (type !== 'live' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let animationFrameId: number;
    const nodes: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      connections: number[];
    }> = [];
    
    // Create nodes
    const numNodes = Math.min(80, Math.max(30, Math.floor(window.innerWidth * window.innerHeight / 20000)));
    const primaryColorObj = hexToRgb(color);
    const secondaryColorObj = hexToRgb(secondaryColor);
    
    for (let i = 0; i < numNodes; i++) {
      // Create gradient colors between primary and secondary
      const ratio = i / numNodes;
      const r = Math.floor(primaryColorObj.r * (1 - ratio) + secondaryColorObj.r * ratio);
      const g = Math.floor(primaryColorObj.g * (1 - ratio) + secondaryColorObj.g * ratio);
      const b = Math.floor(primaryColorObj.b * (1 - ratio) + secondaryColorObj.b * ratio);
      
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: `rgba(${r}, ${g}, ${b}, ${0.3 + Math.random() * 0.5})`,
        connections: []
      });
    }
    
    // Calculate initial connections between nodes
    const maxDistance = Math.min(canvas.width, canvas.height) / 4;
    updateConnections();
    
    function updateConnections() {
      // Reset connections
      nodes.forEach(node => node.connections = []);
      
      // Calculate new connections based on distance
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            nodes[i].connections.push(j);
            nodes[j].connections.push(i);
          }
        }
      }
    }
    
    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimer: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      
      // Reset timer
      if (mouseTimer) clearTimeout(mouseTimer);
      
      // Set a timer to detect when mouse stops moving
      mouseTimer = window.setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
        
        // Mouse interaction
        if (interactive && isMouseMoving) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            // Push nodes away from mouse
            const angle = Math.atan2(dy, dx);
            const force = 0.8 * (1 - distance / 150);
            
            node.vx -= Math.cos(angle) * force;
            node.vy -= Math.sin(angle) * force;
          }
        }
        
        // Apply some damping
        node.vx *= 0.99;
        node.vy *= 0.99;
        
        // Add some random motion
        node.vx += (Math.random() - 0.5) * 0.01;
        node.vy += (Math.random() - 0.5) * 0.01;
      });
      
      // Periodically update connections as nodes move
      if (Math.random() < 0.05) {
        updateConnections();
      }
      
      // Draw connections first (behind nodes)
      ctx.lineWidth = 0.5;
      
      nodes.forEach((node, i) => {
        node.connections.forEach(j => {
          if (j > i) { // Avoid drawing connections twice
            const otherNode = nodes[j];
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Fade lines based on distance
            const opacity = 1 - distance / maxDistance;
            
            // Draw line with gradient
            const gradient = ctx.createLinearGradient(
              node.x, node.y, otherNode.x, otherNode.y
            );
            
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, otherNode.color);
            
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = opacity * 0.5;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });
      });
      
      // Reset global alpha for nodes
      ctx.globalAlpha = 1;
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        const glowSize = node.radius * 5;
        const radialGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowSize
        );
        
        radialGradient.addColorStop(0, node.color);
        radialGradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = radialGradient;
        ctx.globalAlpha = 0.1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1;
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (mouseTimer) clearTimeout(mouseTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, color, secondaryColor, interactive, opacity]);

  if (type === 'gradient') {
    // CSS gradient background
    return (
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, ${color}, ${secondaryColor})`,
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          opacity
        }}
      >
        <style>
          {`
            @keyframes gradient {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `}
        </style>
      </div>
    );
  } else if (type === 'waves') {
    // Canvas-based waves
    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ opacity }}
      />
    );
  } else if (type === 'live') {
    // Canvas-based network nodes - professional look
    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ opacity }}
      />
    );
  } else if (type === 'video') {
    // Import and use dedicated VideoBackground component
    // to ensure consistent video handling across the application
    const VideoBackground = React.lazy(() => import('./VideoBackground'));
    return (
      <React.Suspense fallback={<div className="absolute inset-0 -z-10 bg-black/30" />}>
        <VideoBackground opacity={opacity} />
      </React.Suspense>
    );
  } else {
    // Three.js based animations (particles and net)
    return (
      <div
        ref={mountRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ opacity }}
      />
    );
  }
};

export default AnimatedBackground;
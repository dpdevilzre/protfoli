import React, { useEffect, useRef } from 'react';
import { useTheme, BackgroundType } from '@/contexts/ThemeContext';
import VideoBackground from './VideoBackground';
import * as THREE from 'three';

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
  type = 'gradient',
  color,
  secondaryColor,
  density = 50,
  speed = 1,
  opacity = 0.5,
  interactive = true
}) => {
  const { colors, isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Log background type change for debugging
  const logBackgroundTypeChange = (type: BackgroundType) => {
    console.log(`Background type changed to: ${type}`);
  };
  
  // Set primary color based on theme or props
  const primaryColor = color || colors.primary;
  const secondColor = secondaryColor || (isDark ? '#111111' : '#f5f5f5');
  
  // Create and clean up Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    if (type === 'video') return; // Skip Three.js for video background
    
    logBackgroundTypeChange(type);
    
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Initialize based on background type
    switch (type) {
      case 'particles':
        initParticles(scene, primaryColor, density);
        break;
      case 'waves':
        initWaves(scene, primaryColor, secondColor, density);
        break;
      case 'net':
        initNet(scene, primaryColor, density);
        break;
      case 'live':
        initLiveBackground(scene, primaryColor, secondColor, density, interactive);
        break;
      default: // 'gradient' is handled by CSS
        break;
    }
    
    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Animation logic based on type
      switch (type) {
        case 'particles':
          animateParticles(scene);
          break;
        case 'waves':
          animateWaves(scene, speed);
          break;
        case 'net':
          animateNet(scene, speed);
          break;
        case 'live':
          animateLive(scene, speed);
          break;
        default:
          break;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!renderer || !camera) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clean up Three.js objects
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [type, primaryColor, secondColor, density, speed, interactive]);
  
  // Particles background initialization
  const initParticles = (scene: THREE.Scene, color: string, density: number) => {
    const particleCount = Math.floor(density * 20);
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.5,
      transparent: true,
      opacity: opacity
    });
    
    const particleSystem = new THREE.Points(particles, material);
    particleSystem.name = 'particleSystem';
    scene.add(particleSystem);
  };
  
  // Waves background initialization
  const initWaves = (scene: THREE.Scene, color: string, secondColor: string, density: number) => {
    const planeGeometry = new THREE.PlaneGeometry(100, 100, Math.max(10, Math.floor(density / 2)), Math.max(10, Math.floor(density / 2)));
    
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: opacity
    });
    
    const plane = new THREE.Mesh(planeGeometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10;
    plane.name = 'wavesPlane';
    
    // Store original positions for animation
    const positions = planeGeometry.attributes.position.array;
    (plane as any).userData.originalPositions = Float32Array.from(positions);
    
    scene.add(plane);
  };
  
  // Net background initialization
  const initNet = (scene: THREE.Scene, color: string, density: number) => {
    const size = 100;
    const divisions = Math.max(5, Math.floor(density / 5));
    
    const gridHelper = new THREE.GridHelper(size, divisions, new THREE.Color(color), new THREE.Color(color));
    gridHelper.position.y = -10;
    gridHelper.name = 'grid';
    
    // Make grid transparent
    // GridHelper materials are a bit tricky to handle
    const materials = gridHelper.material;
    
    if (Array.isArray(materials)) {
      for (let i = 0; i < materials.length; i++) {
        if (materials[i]) {
          materials[i].transparent = true;
          materials[i].opacity = opacity;
        }
      }
    } else if (materials) {
      materials.transparent = true;
      materials.opacity = opacity;
    }
    
    scene.add(gridHelper);
  };
  
  // Live interactive background initialization
  const initLiveBackground = (scene: THREE.Scene, color: string, secondColor: string, density: number, interactive: boolean) => {
    const particleCount = Math.floor(density * 10);
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    // Create particles in a more organized pattern
    const areaSize = 80;
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * areaSize;
      const y = (Math.random() - 0.5) * areaSize;
      const z = (Math.random() - 0.5) * 20;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.8,
      transparent: true,
      opacity: opacity
    });
    
    const particleSystem = new THREE.Points(particles, material);
    particleSystem.name = 'liveParticles';
    scene.add(particleSystem);
    
    // Store velocities for animation
    (particleSystem as any).userData.velocities = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      (particleSystem as any).userData.velocities[i] = (Math.random() - 0.5) * 0.05;
    }
    
    // Add mouse interaction if enabled
    if (interactive && containerRef.current) {
      const mousePosition = new THREE.Vector2();
      
      const handleMouseMove = (event: MouseEvent) => {
        mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Store mouse position for animation use
        (particleSystem as any).userData.mousePosition = mousePosition.clone();
      };
      
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      
      // Clean up
      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }
  };
  
  // Animation functions
  const animateParticles = (scene: THREE.Scene) => {
    const particleSystem = scene.getObjectByName('particleSystem') as THREE.Points;
    if (!particleSystem) return;
    
    particleSystem.rotation.y += 0.001;
    particleSystem.rotation.x += 0.0005;
  };
  
  const animateWaves = (scene: THREE.Scene, speed: number) => {
    const plane = scene.getObjectByName('wavesPlane') as THREE.Mesh;
    if (!plane) return;
    
    const positions = (plane.geometry as THREE.PlaneGeometry).attributes.position.array;
    const originalPositions = (plane as any).userData.originalPositions;
    
    if (!originalPositions) return;
    
    const time = Date.now() * 0.001 * speed;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const z = originalPositions[i + 2];
      
      // Create wave effect
      positions[i + 1] = Math.sin(x * 0.05 + time) * 2 + Math.sin(z * 0.05 + time) * 2;
    }
    
    (plane.geometry as THREE.PlaneGeometry).attributes.position.needsUpdate = true;
  };
  
  const animateNet = (scene: THREE.Scene, speed: number) => {
    const grid = scene.getObjectByName('grid') as THREE.GridHelper;
    if (!grid) return;
    
    grid.rotation.y += 0.002 * speed;
    
    // Add subtle movement
    grid.position.y = -10 + Math.sin(Date.now() * 0.001 * speed) * 2;
  };
  
  const animateLive = (scene: THREE.Scene, speed: number) => {
    const particleSystem = scene.getObjectByName('liveParticles') as THREE.Points;
    if (!particleSystem) return;
    
    const positions = (particleSystem.geometry as THREE.BufferGeometry).attributes.position.array;
    const velocities = (particleSystem as any).userData.velocities;
    const mousePosition = (particleSystem as any).userData.mousePosition;
    
    if (!velocities) return;
    
    for (let i = 0; i < positions.length; i += 3) {
      // Update position based on velocity
      positions[i] += velocities[i] * speed;
      positions[i + 1] += velocities[i + 1] * speed;
      positions[i + 2] += velocities[i + 2] * speed;
      
      // Boundaries check and bounce
      if (Math.abs(positions[i]) > 40) {
        velocities[i] *= -1;
      }
      if (Math.abs(positions[i + 1]) > 40) {
        velocities[i + 1] *= -1;
      }
      if (Math.abs(positions[i + 2]) > 10) {
        velocities[i + 2] *= -1;
      }
      
      // Mouse interaction
      if (mousePosition) {
        const distX = (mousePosition.x * 40) - positions[i];
        const distY = (mousePosition.y * 40) - positions[i + 1];
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 10) {
          // Push particles away from mouse
          velocities[i] += (distX / distance) * -0.01;
          velocities[i + 1] += (distY / distance) * -0.01;
        }
      }
    }
    
    (particleSystem.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
  };
  
  // Render appropriate background
  return (
    <div className="fixed inset-0 w-full h-full z-[-10] overflow-hidden">
      {type === 'gradient' && (
        <div 
          className="absolute inset-0 bg-gradient-to-br transition-colors duration-1000"
          style={{ 
            backgroundImage: `linear-gradient(to bottom right, ${primaryColor}10, ${secondColor}80)`,
            opacity
          }}
        />
      )}
      
      {type === 'video' && <VideoBackground opacity={opacity} />}
      
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
};

export default AnimatedBackground;
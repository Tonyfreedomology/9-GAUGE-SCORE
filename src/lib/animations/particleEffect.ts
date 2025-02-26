import { useEffect, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
};

type ParticleOptions = {
  count: number;
  colors: string[];
  speed: number;
  opacity: number;
  size: { min: number; max: number };
};

export const useParticleEffect = (options: Partial<ParticleOptions> = {}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Default options
  const defaultOptions: ParticleOptions = {
    count: 15,
    colors: ['#ffffff'],
    speed: 0.2,
    opacity: 0.3,
    size: { min: 1, max: 3 },
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  useEffect(() => {
    let particles: Particle[] = [];
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize handler
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      
      // Re-init particles
      initParticles();
    };
    
    // Init particles based on current dimensions
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < mergedOptions.count; i++) {
        const particle: Particle = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (mergedOptions.size.max - mergedOptions.size.min) + mergedOptions.size.min,
          speedX: (Math.random() - 0.5) * mergedOptions.speed,
          speedY: (Math.random() - 0.5) * mergedOptions.speed,
          opacity: Math.random() * mergedOptions.opacity,
          color: mergedOptions.colors[Math.floor(Math.random() * mergedOptions.colors.length)],
        };
        particles.push(particle);
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Draw particle
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    if (isVisible) {
      window.addEventListener('resize', handleResize);
      handleResize();
      animate();
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible, mergedOptions]);
  
  return { canvasRef, setIsVisible };
};

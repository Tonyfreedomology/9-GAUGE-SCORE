import { useEffect, useState, useRef } from 'react';

// Type definitions
export type ParallaxConfig = {
  speed: number;
  direction: 'up' | 'down' | 'left' | 'right';
  startPosition?: number;
};

// Hook for parallax scrolling effect
export const useParallax = (config: ParallaxConfig = { speed: 0.2, direction: 'up' }) => {
  const [offset, setOffset] = useState(config.startPosition || 0);
  const elementRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const elementTop = elementRef.current.getBoundingClientRect().top;
      const elementHeight = elementRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is from the center of the viewport
      const distFromCenter = elementTop - windowHeight / 2 + elementHeight / 2;
      
      // Calculate the parallax offset based on the scroll position
      const newOffset = distFromCenter * config.speed;
      
      setOffset(newOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [config.speed]);
  
  // Convert offset to CSS transform based on direction
  const getTransform = () => {
    switch (config.direction) {
      case 'up':
        return `translateY(${-offset}px)`;
      case 'down':
        return `translateY(${offset}px)`;
      case 'left':
        return `translateX(${-offset}px)`;
      case 'right':
        return `translateX(${offset}px)`;
      default:
        return `translateY(${-offset}px)`;
    }
  };
  
  return { elementRef, style: { transform: getTransform() } };
};

// Hook for scroll-based opacity animation
export const useScrollFade = (threshold: number = 0.3, fadeDirection: 'in' | 'out' = 'in') => {
  const [opacity, setOpacity] = useState(fadeDirection === 'in' ? 0 : 1);
  const elementRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const calculateOpacity = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the viewport the element is
      let progress = 1 - (rect.top / (windowHeight * (1 - threshold)));
      
      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      
      // Set opacity based on fade direction
      setOpacity(fadeDirection === 'in' ? progress : 1 - progress);
    };
    
    window.addEventListener('scroll', calculateOpacity);
    calculateOpacity(); // Initial calculation
    
    return () => window.removeEventListener('scroll', calculateOpacity);
  }, [threshold, fadeDirection]);
  
  return { elementRef, style: { opacity } };
};

// Hook to handle staggered animations on scroll
export const useStaggeredReveal = (count: number, threshold: number = 0.1, baseDelay: number = 0.05) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [threshold]);
  
  const getDelayForIndex = (index: number) => {
    return isRevealed ? baseDelay * index : 0;
  };
  
  return { containerRef, isRevealed, getDelayForIndex };
};

// Hook to apply perspective effect based on mouse position over an element
export const usePerspectiveEffect = (intensity: number = 10) => {
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const elementRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the element
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation angles (limited to prevent extreme angles)
      const rotateX = -y / rect.height * intensity;
      const rotateY = x / rect.width * intensity;
      
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };
    
    const handleMouseLeave = () => {
      // Reset transform on mouse leave
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    };
    
    const element = elementRef.current;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);
  
  return { elementRef, style: { transform, transition: 'transform 0.1s ease-out' } };
};

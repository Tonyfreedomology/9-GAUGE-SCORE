import React, { useEffect } from 'react';
import { useParticleEffect } from '@/lib/animations/particleEffect';
import { SprintType } from '@/types';

type ParticleBackgroundProps = {
  color: SprintType;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
};

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  color,
  intensity = 'low',
  className = '',
}) => {
  const getParticleColors = () => {
    switch (color) {
      case 'health':
        return ['#22DFDC', '#1BEBE7', '#60F5F3', '#B3FCFA'];
      case 'financial':
        return ['#22EDB6', '#00C896', '#07E6BE', '#80FFDC'];
      case 'relationships':
        return ['#FF105F', '#D10045', '#FF5088', '#FF9FBE'];
      default:
        return ['#FFFFFF', '#F0F0F0', '#E0E0E0'];
    }
  };
  
  const getParticleCount = () => {
    switch (intensity) {
      case 'low': return 12;
      case 'medium': return 20;
      case 'high': return 30;
      default: return 12;
    }
  };
  
  const { canvasRef, setIsVisible } = useParticleEffect({
    count: getParticleCount(),
    colors: getParticleColors(),
    speed: 0.1,
    opacity: 0.3,
    size: { min: 1, max: 3 },
  });
  
  useEffect(() => {
    setIsVisible(true);
  }, [setIsVisible]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} 
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;

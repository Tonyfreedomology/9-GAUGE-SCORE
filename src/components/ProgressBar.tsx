import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  color?: string;
  className?: string;
  variant?: 'line' | 'circle';
  size?: number;
  categoryScores?: { 
    health: number, 
    financial: number, 
    relationships: number 
  };
};

export const ProgressBar = ({ 
  value, 
  color, 
  className, 
  variant = 'line',
  size = 120,
  categoryScores
}: ProgressBarProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 2000; // Match the duration in ScoreCard
    const steps = 60; // Match the steps in ScoreCard
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      if (current < value) {
        current += increment;
        setAnimatedValue(Math.min(current, value));
      } else {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  if (variant === 'circle') {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = ((100 - animatedValue) / 100) * circumference;

    // Use dynamic gradient if category scores are provided, otherwise use the blue-green gradient
    const gradientToUse = categoryScores 
      ? 'url(#dynamic-weighted-gradient)' 
      : 'url(#blue-gradient)';

    // Create dynamic weighted gradient for the circle stroke
    const createDynamicGradient = () => {
      if (!categoryScores) return null;

      const total = categoryScores.health + categoryScores.financial + categoryScores.relationships;
      
      // Calculate percentages for each category
      const healthPercent = Math.round((categoryScores.health / total) * 100);
      const financialPercent = Math.round((categoryScores.financial / total) * 100);
      const relationshipsPercent = Math.round((categoryScores.relationships / total) * 100);
      
      // Position the stops based on category weights with distinct color segments (no blending)
      const healthStop = `${healthPercent}%`;
      const financialStop = `${healthPercent + financialPercent}%`;
      
      return (
        <linearGradient id="dynamic-weighted-gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          {/* Health segment */}
          <stop offset="0%" stopColor="#22DFDC" />
          <stop offset={healthStop} stopColor="#22DFDC" />
          
          {/* Financial segment */}
          <stop offset={healthStop} stopColor="#22EDB6" />
          <stop offset={financialStop} stopColor="#22EDB6" />
          
          {/* Relationships segment */}
          <stop offset={financialStop} stopColor="#FF105F" />
          <stop offset="100%" stopColor="#FF105F" />
        </linearGradient>
      );
    };

    return (
      <div 
        className={cn(
          "relative transition-transform duration-300 hover:scale-105", 
          className
        )} 
        style={{ 
          width: size, 
          height: size, 
          overflow: 'visible',
          padding: '15px'
        }}
      >
        <svg
          className="transform -rotate-90 drop-shadow-lg"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22DFDC">
                <animate 
                  attributeName="stop-color" 
                  calcMode="spline"
                  keyTimes="0; 0.5; 1"
                  values="#22DFDC; #00E8A9; #22DFDC" 
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                  dur="8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="offset"
                  values="0%; 10%; 0%"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#00E8A9">
                <animate
                  attributeName="stop-color"
                  values="#00E8A9; #22DFDC; #00E8A9" 
                  keyTimes="0; 0.5; 1"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                  dur="8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="offset"
                  values="100%; 90%; 100%"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            <linearGradient id="dynamic-gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22DFDC" />
              <stop offset="33%" stopColor="#22EDB6" />
              <stop offset="66%" stopColor="#FF105F" />
            </linearGradient>
            {createDynamicGradient()}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor="#22DFDC" floodOpacity="0.7" result="glow-color" />
              <feComposite in="glow-color" in2="blur" operator="in" result="glow-blur" />
              <feComposite in="SourceGraphic" in2="glow-blur" operator="over" />
            </filter>
            <filter id="enhanced-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feFlood result="flood" floodColor="#22DFDC" floodOpacity="0.4"></feFlood>
              <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
              <feGaussianBlur in="mask" result="blurred" stdDeviation="3"></feGaussianBlur>
              <feComposite in="SourceGraphic" in2="blurred" operator="over"></feComposite>
              <animate 
                attributeName="floodOpacity" 
                values="0.4; 0.7; 0.4" 
                dur="8s" 
                repeatCount="indefinite"
              />
            </filter>
          </defs>
          <circle
            className="text-secondary/20"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          <circle
            className="transition-all duration-2000 ease-out"
            strokeWidth={10}
            stroke={gradientToUse}
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            filter="url(#enhanced-glow)"
          >
            {color === 'url(#blue-gradient)' && (
              <>
                <animate 
                  attributeName="stroke-dashoffset" 
                  from={circumference} 
                  to={progress} 
                  dur="2s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1"
                  repeatCount="1"
                />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="30s"
                  repeatCount="indefinite"
                  additive="sum"
                />
              </>
            )}
          </circle>
        </svg>
      </div>
    );
  }

  // For the horizontal progress bars, we'll use a new approach to fix the sync issue
  return (
    <div className={cn(
      "w-full h-3 bg-secondary/30 rounded-full overflow-hidden",
      className
    )}>
      <div
        className="h-full rounded-full"
        style={{
          width: `${animatedValue}%`, // Use animated value directly
          background: `linear-gradient(to right, ${color}, ${color}CC)`,
          transition: 'width 2s ease-out' // Use CSS transition instead of keyframes
        }}
      >
      </div>
    </div>
  );
};

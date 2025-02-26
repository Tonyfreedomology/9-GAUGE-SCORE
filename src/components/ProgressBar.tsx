import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  color?: string;
  className?: string;
  variant?: 'line' | 'circle';
  size?: number;
};

export const ProgressBar = ({ 
  value, 
  color, 
  className, 
  variant = 'line',
  size = 120 
}: ProgressBarProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
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
              <stop offset="0%" stopColor="#23F1EE">
                <animate 
                  attributeName="stop-color" 
                  calcMode="spline"
                  keyTimes="0; 0.5; 1"
                  values="#23F1EE; #00FFBA; #23F1EE" 
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#00FFBA">
                <animate
                  attributeName="stop-color"
                  values="#00FFBA; #23F1EE; #00FFBA" 
                  keyTimes="0; 0.5; 1"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor="#23F1EE" floodOpacity="0.7" result="glow-color" />
              <feComposite in="glow-color" in2="blur" operator="in" result="glow-blur" />
              <feComposite in="SourceGraphic" in2="glow-blur" operator="over" />
            </filter>
            <filter id="enhanced-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feFlood result="flood" floodColor="#23F1EE" floodOpacity="0.4"></feFlood>
              <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
              <feGaussianBlur in="mask" result="blurred" stdDeviation="3"></feGaussianBlur>
              <feComposite in="SourceGraphic" in2="blurred" operator="over"></feComposite>
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
            className="transition-all duration-1000 ease-out"
            strokeWidth={10}
            stroke={color === 'url(#blue-gradient)' ? 'url(#blue-gradient)' : color}
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
              <animate 
                attributeName="stroke-dashoffset" 
                from={progress+1} 
                to={progress} 
                dur="1s"
                repeatCount="1"
              />
            )}
          </circle>
        </svg>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full h-3 bg-secondary/30 rounded-full overflow-hidden",
      className
    )}>
      <div
        className="h-full transition-all duration-1000 ease-out rounded-full"
        style={{
          width: `${animatedValue}%`,
          background: `linear-gradient(to right, ${color}, ${color}CC)`,
        }}
      />
    </div>
  );
};

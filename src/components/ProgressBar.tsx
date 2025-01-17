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
      <div className={cn("relative group", className)} style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90 transition-transform duration-300 group-hover:scale-105"
          width={size}
          height={size}
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#17BEBB" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle
            className="text-secondary/30"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          <circle
            className="transition-all duration-300 ease-out drop-shadow-lg"
            strokeWidth="8"
            stroke="url(#progressGradient)"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            filter="url(#glow)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className={cn(
              "text-6xl font-bold bg-gradient-to-r from-[#17BEBB] to-[#0EA5E9] bg-clip-text text-transparent transition-all duration-300",
              variant === 'circle' && "animate-scale-in"
            )}
          >
            {Math.round(animatedValue)}
          </span>
          <span className="text-sm font-medium text-muted-foreground mt-1">
            {value >= 80 ? "Excellent" : value >= 60 ? "Good" : "Building"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full h-3 bg-secondary/30 rounded-full overflow-hidden shadow-inner",
      className
    )}>
      <div
        className="h-full transition-all duration-300 ease-out rounded-full bg-gradient-to-r"
        style={{
          width: `${animatedValue}%`,
          backgroundImage: `linear-gradient(90deg, ${color}, ${color}CC)`,
        }}
      />
    </div>
  );
};
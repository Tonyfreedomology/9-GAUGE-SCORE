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
    // Animate the progress
    const duration = 2000; // 2 seconds
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
      <div className={cn("relative", className)} style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#17BEBB" />
              <stop offset="100%" stopColor="rgba(23, 190, 187, 0.7)" />
            </linearGradient>
          </defs>
          <circle
            className="text-secondary"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          <circle
            className="transition-all duration-300 ease-out"
            strokeWidth="8"
            stroke="url(#progressGradient)"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className={cn(
              "text-6xl font-bold bg-gradient-to-r from-[#17BEBB] to-[#17BEBB]/70 bg-clip-text text-transparent",
              variant === 'circle' && "animate-scale-in"
            )}
          >
            {Math.round(animatedValue)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-2 bg-secondary rounded-full overflow-hidden", className)}>
      <div
        className="h-full transition-all duration-300 ease-out rounded-full"
        style={{
          width: `${animatedValue}%`,
          backgroundColor: color || 'var(--primary)',
        }}
      />
    </div>
  );
};
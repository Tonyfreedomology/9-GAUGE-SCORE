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
  if (variant === 'circle') {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = ((100 - value) / 100) * circumference;

    return (
      <div className={cn("relative", className)} style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox="0 0 100 100"
        >
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
            className="transition-all duration-500 ease-out"
            strokeWidth="8"
            stroke={color || 'var(--primary)'}
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
          <span className="text-2xl font-semibold">{Math.round(value)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-2 bg-secondary rounded-full overflow-hidden", className)}>
      <div
        className="h-full transition-all duration-500 ease-out rounded-full"
        style={{
          width: `${value}%`,
          backgroundColor: color || 'var(--primary)',
        }}
      />
    </div>
  );
};
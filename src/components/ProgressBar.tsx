import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  color?: string;
  className?: string;
};

export const ProgressBar = ({ value, color, className }: ProgressBarProps) => {
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
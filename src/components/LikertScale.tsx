import { cn } from "@/lib/utils";

type LikertScaleProps = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

export const LikertScale = ({ value, onChange, className }: LikertScaleProps) => {
  const options = [1, 2, 3, 4, 5];

  return (
    <div className={cn("flex justify-between gap-2 w-full max-w-md mx-auto", className)}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "w-12 h-12 rounded-full transition-all duration-200 text-sm font-medium",
            value === option
              ? "bg-primary text-primary-foreground scale-110"
              : "bg-secondary hover:bg-secondary/80"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
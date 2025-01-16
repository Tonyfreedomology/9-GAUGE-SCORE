import { cn } from "@/lib/utils";

type LikertScaleProps = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  options?: { value: number; label: string }[];
};

export const LikertScale = ({ value, onChange, className, options }: LikertScaleProps) => {
  const defaultOptions = [1, 2, 3, 4, 5];
  const displayOptions = options || defaultOptions;

  return (
    <div className={cn("flex justify-between gap-2 w-full max-w-md mx-auto", className)}>
      {displayOptions.map((option) => {
        const optionValue = typeof option === 'number' ? option : option.value;
        const optionLabel = typeof option === 'number' ? option.toString() : option.label;
        
        return (
          <button
            key={optionValue}
            onClick={() => onChange(optionValue)}
            className={cn(
              "min-w-12 h-12 rounded-full transition-all duration-200 text-sm font-medium px-3",
              value === optionValue
                ? "bg-primary text-primary-foreground scale-110"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            {optionLabel}
          </button>
        );
      })}
    </div>
  );
};
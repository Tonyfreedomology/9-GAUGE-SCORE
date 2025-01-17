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
    <div className={cn("flex justify-between gap-3 w-full max-w-md mx-auto", className)}>
      {displayOptions.map((option) => {
        const optionValue = typeof option === 'number' ? option : option.value;
        const optionLabel = typeof option === 'number' ? option.toString() : option.label;
        
        return (
          <button
            key={optionValue}
            onClick={() => onChange(optionValue)}
            className={cn(
              "w-24 h-24 rounded-full transition-all duration-300 text-sm font-medium flex items-center justify-center text-center px-2",
              "hover:shadow-lg transform hover:-translate-y-0.5",
              value === optionValue
                ? "bg-foreground text-white scale-110 shadow-lg"
                : "bg-white/80 hover:bg-white text-foreground shadow-md"
            )}
          >
            {optionLabel}
          </button>
        );
      })}
    </div>
  );
};
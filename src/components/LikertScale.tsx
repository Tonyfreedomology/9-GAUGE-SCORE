
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
    <div className={cn(
      "flex flex-col space-y-3 w-full max-w-2xl mx-auto",
      className
    )}>
      {displayOptions.map((option) => {
        const optionValue = typeof option === 'number' ? option : option.value;
        const optionLabel = typeof option === 'number' ? option.toString() : option.label;
        const isSelected = value === optionValue;
        
        return (
          <button
            key={optionValue}
            onClick={() => onChange(optionValue)}
            className={cn(
              "w-full py-4 px-6 rounded-lg transition-all duration-300",
              "text-sm md:text-base font-medium text-left",
              "hover:bg-[#F9FAFB] hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]",
              isSelected ? [
                "border-2 border-[#9b87f5]",
                "bg-gradient-to-r from-[#E5DEFF] to-white",
                "shadow-[0_2px_8px_rgba(155,135,245,0.15)]",
                "translate-x-1"
              ] : [
                "bg-white/80 border-2 border-transparent",
                "shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
              ]
            )}
          >
            {optionLabel}
          </button>
        );
      })}
    </div>
  );
};

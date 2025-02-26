import { cn } from "@/lib/utils";
import { useMemo } from "react";

type LikertScaleProps = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  options?: { value: number; label: string }[];
};

export const LikertScale = ({ value, onChange, className, options }: LikertScaleProps) => {
  const defaultOptions = [1, 2, 3, 4, 5];
  
  // Use useMemo to ensure this calculation doesn't happen on every render
  const displayOptions = useMemo(() => {
    // Start with either the provided options or the default options
    let optionsToUse = options || defaultOptions;
    
    // Create a deterministic but pseudo-random pattern based on the option values
    // This ensures the same question always has the same order, but different questions
    // will have different directions
    
    // We'll use the first value and first character of the first label as a seed
    const firstValue = typeof optionsToUse[0] === 'number' 
      ? optionsToUse[0] 
      : optionsToUse[0].value;
    
    const firstLabel = typeof optionsToUse[0] === 'number' 
      ? optionsToUse[0].toString()
      : optionsToUse[0].label;
    
    // Get the first character code of the label (if available)
    const firstCharCode = firstLabel.charCodeAt(0) || 0;
    
    // Determine if we should reverse based on a consistent pattern
    // This will give approximately 50% of questions in reverse order
    const shouldReverse = ((firstValue + firstCharCode) % 2 === 1);
    
    // Clone the options to avoid mutating props
    const clonedOptions = [...optionsToUse];
    
    // Simply reverse if needed, maintaining the sequential nature
    return shouldReverse ? clonedOptions.reverse() : clonedOptions;
  }, [options]);

  const formatLabel = (label: string) => {
    if (label.includes(' – ')) {
      const [first, ...rest] = label.split(' – ');
      return (
        <>
          <span className="font-bold">{first}</span>
          {' – '}
          {rest.join(' – ')}
        </>
      );
    }
    return label;
  };

  return (
    <div className={cn(
      "flex flex-col space-y-3 w-full max-w-2xl mx-auto",
      className
    )}>
      {displayOptions.map((option, index) => {
        const optionValue = typeof option === 'number' ? option : option.value;
        const optionLabel = typeof option === 'number' ? option.toString() : option.label;
        const isSelected = value === optionValue;
        
        return (
          <button
            key={`option-${optionValue}`}
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
            {formatLabel(optionLabel)}
          </button>
        );
      })}
    </div>
  );
};

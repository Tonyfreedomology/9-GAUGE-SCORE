import { LikertScale } from "@/components/LikertScale";
import { cn } from "@/lib/utils";

type QuestionCardProps = {
  pillarName: string;
  category: string;
  questionText: string;
  currentValue: number;
  options?: { value: number; label: string }[];
  onAnswer: (value: number) => void;
};

export const QuestionCard = ({
  pillarName,
  category,
  questionText,
  currentValue,
  options,
  onAnswer,
}: QuestionCardProps) => {
  return (
    <div className={cn(
      "p-8 md:p-10 shadow-lg backdrop-blur-sm bg-gradient-to-b from-white to-[#F9FAFB]/90 rounded-2xl",
      "border-0 shadow-[0_4px_10px_rgba(0,0,0,0.1)]",
      pillarName === 'Financial' && "border-financial",
      pillarName === 'Health' && "border-health",
      pillarName === 'Relationships' && "border-relationships"
    )}>
      <div className="space-y-10">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-foreground/80 to-foreground">
            {category}
          </h2>
          <p className="text-xl md:text-2xl font-semibold leading-relaxed text-foreground/90">
            {questionText}
          </p>
        </div>
        
        <LikertScale
          value={currentValue}
          onChange={onAnswer}
          options={options}
          className="mt-8"
        />
        
        {!options && (
          <div className="flex justify-between text-sm font-medium text-foreground/60 mt-4">
            <span>Strongly Disagree</span>
            <span>Strongly Agree</span>
          </div>
        )}
      </div>
    </div>
  );
};
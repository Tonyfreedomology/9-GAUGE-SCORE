
import { LikertScale } from "@/components/LikertScale";
import { cn } from "@/lib/utils";

type QuestionCardProps = {
  questionText: string;
  currentValue: number;
  options?: { value: number; label: string }[];
  onAnswer: (value: number) => void;
};

export const QuestionCard = ({
  questionText,
  currentValue,
  options,
  onAnswer,
}: QuestionCardProps) => {
  return (
    <div className="p-8 md:p-10 shadow-lg backdrop-blur-sm bg-gradient-to-b from-white to-[#F9FAFB]/90 rounded-2xl border-0 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
      <div className="space-y-10">
        <p 
          className="text-xl md:text-2xl font-semibold leading-relaxed text-foreground/90 opacity-0 animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          {questionText}
        </p>
        
        <div 
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '400ms' }}
        >
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
    </div>
  );
};

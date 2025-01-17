import { Card } from "@/components/ui/card";
import { LikertScale } from "@/components/LikertScale";
import { cn } from "@/lib/utils";
import { FreedomologyLogo } from "./FreedomologyLogo";

type AssessmentQuestionProps = {
  pillarName: string;
  category: string;
  questionText: string;
  progress: number;
  currentValue: number;
  options?: { value: number; label: string }[];
  onAnswer: (value: number) => void;
};

export const AssessmentQuestion = ({
  pillarName,
  category,
  questionText,
  progress,
  currentValue,
  options,
  onAnswer,
}: AssessmentQuestionProps) => {
  return (
    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
      <FreedomologyLogo />
      
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
          {pillarName}
        </h1>
        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className={cn(
        "p-8 shadow-lg backdrop-blur-sm bg-white/90 animate-scale-in",
        pillarName === 'Financial' && "border-financial",
        pillarName === 'Health' && "border-health",
        pillarName === 'Relationships' && "border-relationships"
      )}>
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-foreground/80 to-foreground">
              {category}
            </h2>
            <p className="text-lg font-normal text-foreground/80">
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
      </Card>
    </div>
  );
};
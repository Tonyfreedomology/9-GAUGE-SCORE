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
  currentStep: number;
  totalSteps: number;
  options?: { value: number; label: string }[];
  onAnswer: (value: number) => void;
};

export const AssessmentQuestion = ({
  pillarName,
  category,
  questionText,
  progress,
  currentValue,
  currentStep,
  totalSteps,
  options,
  onAnswer,
}: AssessmentQuestionProps) => {
  return (
    <div className="relative z-10 max-w-2xl mx-auto min-h-[80vh] flex flex-col justify-center space-y-12">
      <FreedomologyLogo />
      
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
          {pillarName}
        </h1>
        
        <div className="space-y-2">
          <div className="flex justify-between text-white/90 text-sm font-medium px-1">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-3 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3ECF8E, #36A2EB)'
              }}
            />
          </div>
        </div>
      </div>

      <Card className={cn(
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
      </Card>
    </div>
  );
};
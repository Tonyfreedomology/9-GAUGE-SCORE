
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FreedomologyLogo } from "./FreedomologyLogo";
import { getPillarIcon } from "@/lib/getPillarIcon";
import { AssessmentProgress } from "./AssessmentProgress";
import { QuestionCard } from "./QuestionCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type AssessmentQuestionProps = {
  category: string;
  questionText: string;
  progress: number;
  currentValue: number;
  currentStep: number;
  totalSteps: number;
  options?: { value: number; label: string }[];
  onAnswer: (value: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
};

export const AssessmentQuestion = ({
  category,
  questionText,
  progress,
  currentValue,
  currentStep,
  totalSteps,
  options,
  onAnswer,
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion,
}: AssessmentQuestionProps) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prev => prev + 1);
    console.log("Question changed, triggering animation");
  }, [questionText]);

  return (
    <div className="relative z-10 max-w-2xl mx-auto min-h-[80vh] flex flex-col justify-center space-y-12">
      <FreedomologyLogo variant="9gauge" />
      
      <div className="space-y-6 animate-[fade-in_0.5s_ease-out]">
        <AssessmentProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          progress={progress}
        />
      </div>

      <div className="transition-all duration-500">
        <QuestionCard
          key={key}
          category={category}
          questionText={questionText}
          currentValue={currentValue}
          options={options}
          onAnswer={onAnswer}
        />
      </div>

      <div className="flex justify-center items-center gap-4 mt-6 animate-[fade-in_0.5s_ease-out]">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={cn(
            "p-3 rounded-full transition-all duration-300",
            "bg-white/10 hover:bg-white/20 backdrop-blur-sm",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
          aria-label="Previous question"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={onNext}
          disabled={isLastQuestion || !currentValue}
          className={cn(
            "p-3 rounded-full transition-all duration-300",
            "bg-white/10 hover:bg-white/20 backdrop-blur-sm",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
          aria-label="Next question"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};


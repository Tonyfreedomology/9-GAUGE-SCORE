import { FreedomologyLogo } from "./FreedomologyLogo";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { QuestionCard } from "./QuestionCard";
import { QuestionHeader } from "./assessment/QuestionHeader";

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
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
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
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion,
}: AssessmentQuestionProps) => {
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    setKey(prev => prev + 1);
    console.log("Question changed, triggering animation");
  }, [questionText]);

  return (
    <div className="relative z-10 max-w-2xl mx-auto min-h-[80vh] flex flex-col justify-center space-y-12">
      <FreedomologyLogo />
      
      <QuestionHeader
        pillarName={pillarName}
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progress}
      />

      <div className="transition-all duration-500">
        <QuestionCard
          key={key}
          pillarName={pillarName}
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
          type="button"
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
          type="button"
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
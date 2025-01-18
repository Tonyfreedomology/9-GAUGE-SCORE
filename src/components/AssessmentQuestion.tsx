import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FreedomologyLogo } from "./FreedomologyLogo";
import { getPillarIcon } from "@/lib/getPillarIcon";
import { AssessmentProgress } from "./AssessmentProgress";
import { QuestionCard } from "./QuestionCard";

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
    <div className="relative z-10 max-w-2xl mx-auto min-h-[80vh] flex flex-col justify-center space-y-12 animate-[fade-in_0.5s_ease-out,scale-in_0.4s_ease-out]">
      <FreedomologyLogo />
      
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-3">
          {getPillarIcon(pillarName)}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
            {pillarName}
          </h1>
        </div>
        
        <AssessmentProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          progress={progress}
        />
      </div>

      <QuestionCard
        pillarName={pillarName}
        category={category}
        questionText={questionText}
        currentValue={currentValue}
        options={options}
        onAnswer={onAnswer}
      />
    </div>
  );
};
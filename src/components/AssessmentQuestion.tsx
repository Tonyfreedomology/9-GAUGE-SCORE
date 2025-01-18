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
        <div className="flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-4 shadow-lg">
            <div className="bg-white rounded-full p-2 shadow-sm">
              {getPillarIcon(pillarName)}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {pillarName}
            </h1>
          </div>
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
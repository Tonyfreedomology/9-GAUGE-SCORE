import { getPillarIcon } from "@/lib/getPillarIcon";
import { AssessmentProgress } from "../AssessmentProgress";

type QuestionHeaderProps = {
  pillarName: string;
  currentStep: number;
  totalSteps: number;
  progress: number;
};

export const QuestionHeader = ({ 
  pillarName, 
  currentStep, 
  totalSteps, 
  progress 
}: QuestionHeaderProps) => {
  return (
    <div className="space-y-6 animate-[fade-in_0.5s_ease-out]">
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
  );
};
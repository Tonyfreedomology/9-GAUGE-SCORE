type AssessmentProgressProps = {
  currentStep: number;
  totalSteps: number;
  progress: number;
};

export const AssessmentProgress = ({
  currentStep,
  totalSteps,
  progress,
}: AssessmentProgressProps) => {
  return (
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
  );
};
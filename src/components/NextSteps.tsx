import { ScrollPrompt } from "./ScrollPrompt";
import { SprintCard } from "./SprintCard";
import { ProgramWeeks } from "./ProgramWeeks";
import { SignupForm } from "./SignupForm";

type NextStepsProps = {
  lowestPillar: string;
  onStartOver: () => void;
};

export const NextSteps = ({ lowestPillar, onStartOver }: NextStepsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 space-y-8">
      <SprintCard lowestPillar={lowestPillar} />

      <div className="relative h-24 flex items-center justify-center">
        <ScrollPrompt />
      </div>

      <ProgramWeeks pillarName={lowestPillar} />
      <SignupForm />
    </div>
  );
};
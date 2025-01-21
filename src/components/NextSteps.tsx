import { SprintCard } from "./SprintCard";
import { SignupForm } from "./SignupForm";

type NextStepsProps = {
  lowestPillar: string;
  onStartOver: () => void;
};

export const NextSteps = ({ lowestPillar, onStartOver }: NextStepsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 space-y-8">
      <SprintCard lowestPillar={lowestPillar} />
      <SignupForm />
    </div>
  );
};
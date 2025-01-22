import { SprintCard } from "./SprintCard";
import { SignupForm } from "./SignupForm";

type NextStepsProps = {
  lowestPillar: string;
  onStartOver: () => void;
};

export const NextSteps = ({ lowestPillar, onStartOver }: NextStepsProps) => {
  return (
    <div className="space-y-8">
      <SprintCard lowestPillar={lowestPillar} />
      <SignupForm />
    </div>
  );
};
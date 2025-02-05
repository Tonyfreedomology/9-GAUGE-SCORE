
import { SprintCard } from "./SprintCard";

type NextStepsProps = {
  lowestPillar: string;
  onStartOver: () => void;
};

export const NextSteps = ({ lowestPillar, onStartOver }: NextStepsProps) => {
  return (
    <div className="space-y-8">
      <SprintCard lowestPillar={lowestPillar} />
    </div>
  );
};

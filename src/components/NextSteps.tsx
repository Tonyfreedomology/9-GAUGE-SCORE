import { SprintCard } from "./SprintCard";

type NextStepsProps = {
  lowestPillar: string;
  onStartOver: () => void;
};

export const NextSteps = ({ lowestPillar, onStartOver }: NextStepsProps) => {
  return (
    <div className="space-y-8 relative w-full overflow-visible bg-transparent">
      {/* This wrapper ensures the card can expand to full width */}
      <div className="w-full relative bg-transparent" style={{ 
        maxWidth: '100%',
        overflowX: 'clip',
        overflowY: 'visible'
      }}>
        <SprintCard lowestPillar={lowestPillar} />
      </div>
    </div>
  );
};

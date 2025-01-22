import { ScoreCard } from "../ScoreCard";
import { questions, calculatePillarScore } from "@/lib/questions";

type ResultsBreakdownProps = {
  answers: Record<string, number>;
};

export const ResultsBreakdown = ({ answers }: ResultsBreakdownProps) => {
  const getPillarColor = (pillarName: string) => {
    switch (pillarName) {
      case 'Financial':
        return '#17BEBB';
      case 'Health':
        return '#EDB88B';
      case 'Relationships':
        return '#EF3E36';
      default:
        return '#293230';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-white text-center mb-8">
        Your Results Breakdown
      </h2>
      
      <div className="grid gap-8 md:grid-cols-3">
        {questions.map((pillar) => (
          <ScoreCard
            key={pillar.name}
            title={pillar.name}
            score={calculatePillarScore(pillar, answers)}
            color={getPillarColor(pillar.name)}
          />
        ))}
      </div>
    </div>
  );
};
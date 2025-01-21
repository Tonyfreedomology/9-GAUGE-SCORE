import { ScoreCard } from "../ScoreCard";
import { questions, calculatePillarScore } from "@/lib/questions";

type ScoreBreakdownProps = {
  answers: Record<string, number>;
};

export const ScoreBreakdown = ({ answers }: ScoreBreakdownProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-white text-center mb-8">
        Your Results Breakdown
      </h2>
      
      <div className="grid gap-8 md:grid-cols-3">
        {questions.map((pillar) => {
          let color;
          switch (pillar.name) {
            case 'Financial':
              color = '#17BEBB';
              break;
            case 'Health':
              color = '#EDB88B';
              break;
            case 'Relationships':
              color = '#EF3E36';
              break;
            default:
              color = '#293230';
          }
          return (
            <ScoreCard
              key={pillar.name}
              title={pillar.name}
              score={calculatePillarScore(pillar, answers)}
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
};
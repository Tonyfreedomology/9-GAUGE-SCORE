import { useRef } from "react";
import { ScoreCard } from "./ScoreCard";
import { questions, calculatePillarScore } from "@/lib/questions";
import { ShareResults } from "./ShareResults";
import { SprintCard } from "./SprintCard";
import { AssessmentHeader } from "./assessment/AssessmentHeader";
import { ScoreBreakdown } from "./assessment/ScoreBreakdown";
import { ScoreExplanation } from "./assessment/ScoreExplanation";

type AssessmentResultsProps = {
  answers: Record<string, number>;
  onStartOver: () => void;
};

export const AssessmentResults = ({ answers, onStartOver }: AssessmentResultsProps) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const calculateOverallScore = () => {
    const pillarScores = questions.map(pillar => calculatePillarScore(pillar, answers));
    return Math.round(pillarScores.reduce((a, b) => a + b, 0) / pillarScores.length);
  };

  const findLowestPillar = () => {
    let lowestScore = Infinity;
    let lowestPillar = questions[0].name;

    questions.forEach(pillar => {
      const score = calculatePillarScore(pillar, answers);
      if (score < lowestScore) {
        lowestScore = score;
        lowestPillar = pillar.name;
      }
    });

    return lowestPillar;
  };

  const overallScore = calculateOverallScore();
  const lowestPillar = findLowestPillar();

  return (
    <div className="min-h-screen">
      <div 
        ref={resultsRef}
        className="relative z-10 max-w-5xl mx-auto space-y-12 bg-gradient-to-b from-black/60 via-black/40 to-transparent p-8 rounded-3xl"
      >
        <AssessmentHeader />
        
        <ScoreCard
          title=""
          score={overallScore}
          color="#17BEBB"
          className="mb-12 max-w-2xl mx-auto"
          isOverallScore={true}
          hideSubtext={true}
        />

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={onStartOver}
            type="button"
            className="bg-gradient-to-r from-[#17BEBB] to-[#00D4FF] text-white px-8 py-4 rounded-xl text-lg font-semibold
              transition-all duration-300 hover:shadow-lg hover:scale-105 min-w-[200px]"
          >
            Start Over
          </button>
          <ShareResults containerRef={resultsRef} />
        </div>

        <ScoreBreakdown answers={answers} />
        <ScoreExplanation />

        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-serif font-bold text-center text-white mb-8">
            Next Steps
          </h2>
          <SprintCard lowestPillar={lowestPillar} />
        </div>
      </div>
    </div>
  );
};
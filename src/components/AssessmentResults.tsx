import { useRef } from "react";
import { questions, calculatePillarScore } from "@/lib/questions";
import { NextSteps } from "./NextSteps";
import { ResultsHeader } from "./results/ResultsHeader";
import { ResultsActions } from "./results/ResultsActions";
import { ResultsBreakdown } from "./results/ResultsBreakdown";
import { ScoreCard } from "./ScoreCard";
import { ScoreExplanation } from "./results/ScoreExplanation";

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
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: "url('https://static.wixstatic.com/media/af616c_236c8c1137ba4146a1d6fbd7874561ed~mv2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      <div 
        ref={resultsRef}
        className="relative z-10 max-w-5xl mx-auto space-y-12 p-8 rounded-3xl"
      >
        <ResultsHeader overallScore={overallScore} />

        <div className="mb-12 max-w-2xl mx-auto">
          <ScoreCard
            title=""
            score={overallScore}
            color="#17BEBB"
            isOverallScore={true}
            hideSubtext={true}
          />
        </div>

        <ResultsBreakdown answers={answers} />
        
        <ResultsActions onStartOver={onStartOver} containerRef={resultsRef} />
        
        <ScoreExplanation />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Next Steps</h2>
        <NextSteps lowestPillar={lowestPillar} onStartOver={onStartOver} />
      </div>
    </div>
  );
};

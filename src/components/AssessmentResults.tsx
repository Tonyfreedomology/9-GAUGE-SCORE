import { ScoreCard } from "./ScoreCard";
import { FreedomologyLogo } from "./FreedomologyLogo";
import { questions, calculatePillarScore } from "@/lib/questions";
import { NextSteps } from "./NextSteps";

type AssessmentResultsProps = {
  answers: Record<string, number>;
  onStartOver: () => void;
};

export const AssessmentResults = ({ answers, onStartOver }: AssessmentResultsProps) => {
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
      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <FreedomologyLogo />
        
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Overall Freedomology Score
          </h1>
          <p className="text-xl text-white/90 font-medium">
            You're on the path to thriving freedom. Keep growing!
          </p>
        </div>

        <ScoreCard
          title=""
          score={overallScore}
          color="#17BEBB"
          className="mb-12 max-w-2xl mx-auto"
          isOverallScore={true}
          hideSubtext={true}
        />

        <div className="flex justify-center mb-8">
          <button
            onClick={onStartOver}
            className="bg-gradient-to-r from-[#17BEBB] to-[#00D4FF] text-white px-8 py-4 rounded-xl text-lg font-semibold
              transition-all duration-300 hover:shadow-lg hover:scale-105 min-w-[200px]"
          >
            Start Over
          </button>
        </div>

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
      </div>

      <NextSteps lowestPillar={lowestPillar} onStartOver={onStartOver} />
    </div>
  );
};
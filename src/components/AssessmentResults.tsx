import { useRef } from "react";
import { ScoreCard } from "./ScoreCard";
import { FreedomologyLogo } from "./FreedomologyLogo";
import { questions, calculatePillarScore } from "@/lib/questions";
import { NextSteps } from "./NextSteps";
import { ShareResults } from "./ShareResults";
import { HelpCircle } from "lucide-react";
import { SprintCard } from "./SprintCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <FreedomologyLogo />
        
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Overall Freedomology Score
            </h1>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="cursor-help">
                    <HelpCircle className="w-6 h-6 text-white/80 hover:text-white transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs bg-white text-gray-900 p-3 rounded-lg shadow-lg">
                  <p>Your Freedomology Score represents your overall well-being across financial, health, and relationship dimensions. A higher score indicates greater freedom and balance in these key life areas.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={onStartOver}
            className="bg-gradient-to-r from-[#17BEBB] to-[#00D4FF] text-white px-8 py-4 rounded-xl text-lg font-semibold
              transition-all duration-300 hover:shadow-lg hover:scale-105 min-w-[200px]"
          >
            Start Over
          </button>
          <ShareResults containerRef={resultsRef} />
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

        <div className="mt-16 space-y-8 text-white">
          <h2 className="text-3xl font-serif font-bold text-center">
            Your Score Explained
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-white/90">
            <p>
              Your Freedomology Score measures your well-being across Finance, Health (physical and mental), and Relationships.
            </p>
            <p>
              We've worked with over 11,000 people in the past 15 years and learned that <span className="font-bold italic">balance</span> is the key to building a beautiful life.
            </p>
            <p>
              Our culture pushes the hustle and grind mindset as the path to success, but we see it differently.
            </p>
            <p>
              Balance is a superpower, and hustle culture is a disease. When your finances, health, and relationships work in harmony, life becomes more free, fulfilling, and fun.
            </p>
            <p>
              So how did we arrive at your score?
            </p>
            <p>
              Each pillar gets a rating from 0 to 100, based on questions about key areas—like debt, investments, generosity, mental health, and your connection to the people around you.
            </p>
            <p>
              If certain areas slip below a healthy level (like generosity or mental well-being), your overall score gets capped. That's because true freedom is about more than just being personally successful—it's about building a life that helps you thrive and also uplifts the people around you.
            </p>
            <p>
              Below, you'll find our suggestions for how to boost your score and live a more balanced life. Whether you need more financial independence, better health habits, or stronger relationships, we've got a 40-day sprint to help you grow where it counts.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-center text-white mb-8">
          Next Steps
        </h2>
        <SprintCard lowestPillar={lowestPillar} />
      </div>
    </div>
  );
};
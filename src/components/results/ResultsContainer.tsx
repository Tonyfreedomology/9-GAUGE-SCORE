
import { Database } from "@/integrations/supabase/types";
import { useRef } from "react";
import { ResultsHeader } from "./ResultsHeader";
import { ResultsBreakdown } from "./ResultsBreakdown";
import { ResultsActions } from "./ResultsActions";
import { ScoreCard } from "../ScoreCard";
import { ScoreExplanation } from "./ScoreExplanation";
import { calculateOverallScore } from "@/lib/services/assessmentService";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

interface ResultsContainerProps {
  answers: Record<string, number>;
  categories: AssessmentCategory[];
  onStartOver: () => void;
}

export const ResultsContainer = ({ answers, categories, onStartOver }: ResultsContainerProps) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  const overallScore = calculateOverallScore(categories, answers);

  return (
    <div 
      ref={resultsRef}
      className="space-y-12 p-8 rounded-3xl"
      style={{
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
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

      <ResultsBreakdown answers={answers} categories={categories} />
      
      <ResultsActions 
        onStartOver={onStartOver} 
        containerRef={resultsRef}
        answers={answers}
        categories={categories}
      />
      
      <ScoreExplanation />
    </div>
  );
};


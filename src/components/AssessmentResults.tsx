
import { useRef, useEffect } from "react";
import { NextSteps } from "./NextSteps";
import { ResultsHeader } from "./results/ResultsHeader";
import { ResultsActions } from "./results/ResultsActions";
import { ResultsBreakdown } from "./results/ResultsBreakdown";
import { ScoreCard } from "./ScoreCard";
import { ScoreExplanation } from "./results/ScoreExplanation";
import { calculateCategoryScore, calculateOverallScore, saveAssessmentScores } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

type AssessmentResultsProps = {
  answers: Record<string, number>;
  categories: AssessmentCategory[];
  onStartOver: () => void;
};

export const AssessmentResults = ({ answers, categories, onStartOver }: AssessmentResultsProps) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const overallScore = calculateOverallScore(categories, answers);

  useEffect(() => {
    const saveScores = async () => {
      try {
        await saveAssessmentScores(categories, answers);
        console.log('Assessment scores saved successfully');
      } catch (error) {
        console.error('Error saving assessment scores:', error);
        toast.error('There was an error saving your results');
      }
    };
    
    saveScores();
  }, [categories, answers]);

  const findLowestCategory = () => {
    let lowestScore = Infinity;
    let lowestCategory = categories[0].display_name;

    categories.forEach(category => {
      const score = calculateCategoryScore(category.questions, answers);
      if (score < lowestScore) {
        lowestScore = score;
        lowestCategory = category.display_name;
      }
    });

    return lowestCategory.includes('Physical') || lowestCategory.includes('Mental') || lowestCategory.includes('Environmental') 
      ? 'Health' 
      : lowestCategory.includes('Income') || lowestCategory.includes('Independence') || lowestCategory.includes('Impact')
      ? 'Financial'
      : 'Relationships';
  };

  const lowestCategory = findLowestCategory();

  return (
    <div className="relative z-10 max-w-5xl mx-auto space-y-12">
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
        />
        
        <ScoreExplanation />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-[10rem] font-heading font-bold text-white mb-8 text-center relative z-20 tracking-tighter lowercase">
          Next Steps
        </h2>
        <NextSteps lowestPillar={lowestCategory} onStartOver={onStartOver} />
      </div>
    </div>
  );
};

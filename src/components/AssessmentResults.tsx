
import { NextSteps } from "./NextSteps";
import { ResultsContainer } from "./results/ResultsContainer";
import { Database } from "@/integrations/supabase/types";
import { useEffect } from "react";
import { calculateCategoryScore, saveAssessmentScores } from "@/lib/services/assessmentService";
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
      <ResultsContainer 
        answers={answers}
        categories={categories}
        onStartOver={onStartOver}
      />

      <div className="w-full max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-[6rem] md:text-[10rem] font-heading font-bold text-white mb-8 text-center relative z-20 tracking-tighter lowercase">
          Next Steps
        </h2>
        <NextSteps lowestPillar={lowestCategory} onStartOver={onStartOver} />
      </div>
    </div>
  );
};


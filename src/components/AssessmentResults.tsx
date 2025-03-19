
import { useRef, useEffect } from "react";
import { NextSteps } from "./NextSteps";
import { ResultsHeader } from "./results/ResultsHeader";
import { ResultsActions } from "./results/ResultsActions";
import { ResultsBreakdown } from "./results/ResultsBreakdown";
import { ScoreCard } from "./ScoreCard";
import { calculateCategoryScore, calculateOverallScore, saveAssessmentScores } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { motion } from "framer-motion";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

type AssessmentResultsProps = {
  answers: Record<string, number>;
  categories: AssessmentCategory[];
  onStartOver: () => void;
  userInfo: {
    firstName: string;
    email: string;
  };
};

export const AssessmentResults = ({ answers, categories, onStartOver, userInfo }: AssessmentResultsProps) => {
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
    let lowestCategory = '';

    categories.forEach(category => {
      const score = calculateCategoryScore(category.questions, answers);
      if (score < lowestScore && score > 0) {  // Only consider categories with valid scores
        lowestScore = score;
        lowestCategory = category.display_name;
      }
    });

    // Fallback if we couldn't find a valid lowest score
    if (lowestCategory === '') {
      return 'Health'; // Default to Health if no valid scores
    }

    return lowestCategory.includes('Physical') || lowestCategory.includes('Mental') || lowestCategory.includes('Environmental') 
      ? 'Health' 
      : lowestCategory.includes('Income') || lowestCategory.includes('Independence') || lowestCategory.includes('Impact')
      ? 'Financial'
      : 'Relationships';
  };

  const getCategoryScores = () => {
    const healthCategories = categories.filter(cat => 
      cat.display_name.includes('Physical') || 
      cat.display_name.includes('Mental') || 
      cat.display_name.includes('Environmental')
    );
    
    const financialCategories = categories.filter(cat => 
      cat.display_name.includes('Income') || 
      cat.display_name.includes('Independence') || 
      cat.display_name.includes('Impact')
    );
    
    const relationshipCategories = categories.filter(cat => 
      !healthCategories.includes(cat) && !financialCategories.includes(cat)
    );
    
    // Calculate scores with safeguards against division by zero
    const calculateAvgScore = (cats: AssessmentCategory[]) => {
      if (cats.length === 0) return 0;
      
      let totalScore = 0;
      let validCategories = 0;
      
      cats.forEach(cat => {
        const score = calculateCategoryScore(cat.questions, answers);
        if (score > 0) {  // Only include valid scores
          totalScore += score;
          validCategories++;
        }
      });
      
      return validCategories > 0 ? totalScore / validCategories : 0;
    };
    
    return {
      health: calculateAvgScore(healthCategories),
      financial: calculateAvgScore(financialCategories),
      relationships: calculateAvgScore(relationshipCategories)
    };
  };

  const categoryScores = getCategoryScores();
  const lowestCategory = findLowestCategory();

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto space-y-0 md:space-y-12 px-0">
      <div 
        ref={resultsRef}
        className="space-y-8 md:space-y-12 p-4 sm:p-6 md:p-8 rounded-none sm:rounded-2xl md:rounded-3xl w-full"
        style={{
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <ResultsHeader overallScore={overallScore} firstName={userInfo.firstName} />

        <div className="mb-6 md:mb-12 w-full md:max-w-2xl mx-auto">
          <ScoreCard
            title=""
            score={overallScore}
            color="#17BEBB"
            isOverallScore={true}
            hideSubtext={true}
            categoryScores={categoryScores}
          />
        </div>

        <ResultsBreakdown answers={answers} categories={categories} />
        
        <ResultsActions 
          onStartOver={onStartOver} 
          containerRef={resultsRef}
          answers={answers}
          categories={categories}
        />
      </div>

      {/* Next Steps section - negative margin to eliminate gap on mobile */}
      <div className="w-full max-w-none sm:max-w-4xl mx-auto px-0 sm:px-2 md:px-4 py-0 sm:py-8 md:py-16 -mt-1 sm:mt-8 bg-transparent">
        <div className="relative bg-[#363636] sm:bg-transparent py-4 sm:py-0">
          <motion.h2 
            className="text-[6rem] sm:text-[6rem] md:text-[10rem] font-heading font-bold text-white mb-4 md:mb-8 text-center relative z-20 tracking-tighter lowercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Next Steps
          </motion.h2>
        </div>
        <NextSteps lowestPillar={lowestCategory} onStartOver={onStartOver} />
      </div>
    </div>
  );
};

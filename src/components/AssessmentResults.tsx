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
import { categoryToPillarMapping } from "@/lib/config/categoryMapping";

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
    const categoryScores: { category: string; pillar: string; score: number }[] = [];

    // Calculate scores for each category
    categories.forEach(category => {
      const score = calculateCategoryScore(category.questions, answers);
      if (score > 0) { // Only consider categories with valid scores
        const mapping = findPillarForCategory(category.display_name);
        if (mapping) {
          categoryScores.push({
            category: category.display_name,
            pillar: mapping.pillar,
            score
          });
        }
      }
    });

    // Sort by score (lowest first) and get the lowest one
    categoryScores.sort((a, b) => a.score - b.score);
    
    if (categoryScores.length === 0) {
      return 'Health'; // Default if no scores available
    }
    
    // Return the pillar of the lowest-scoring category
    return categoryScores[0].pillar;
  };

  const findPillarForCategory = (categoryName: string) => {
    // Try direct match
    let mapping = categoryToPillarMapping[categoryName];
    
    if (!mapping) {
      // Try partial match
      const matchingKey = Object.keys(categoryToPillarMapping).find(key => 
        categoryName.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(categoryName.toLowerCase())
      );
      
      if (matchingKey) {
        mapping = categoryToPillarMapping[matchingKey];
      }
    }
    
    return mapping;
  };

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
        <NextSteps lowestPillar={findLowestCategory()} onStartOver={onStartOver} />
      </div>
    </div>
  );
};

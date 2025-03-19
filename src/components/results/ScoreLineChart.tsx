import { Database } from "@/integrations/supabase/types";
import { PillarScores } from "./PillarScores";
import { categoryToPillarMapping, pillarColors, pillarOrder } from "@/lib/config/categoryMapping";

type Category = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

export const ScoreLineChart = ({ answers, categories }: { 
  answers: Record<string, number>;
  categories: Category[];
}) => {
  // Initialize all pillar groups with empty arrays
  const initialGroups: Record<string, { label: string; score: number; }[]> = {};
  pillarOrder.forEach(pillar => {
    initialGroups[pillar] = [];
  });

  // Filter out pillar-level categories (IDs 1-3) and keep only subcategories (IDs 30-38)
  const subcategories = categories.filter(category => category.id >= 30);
  
  // Process each subcategory and assign to the correct pillar
  const groupedCategories = subcategories.reduce((acc, category) => {
    const categoryName = category.display_name;
    const pillarName = category.pillar;
    
    // If we have a valid pillar, add this subcategory to its group
    if (pillarName && pillarOrder.includes(pillarName as any)) {
      if (!acc[pillarName]) {
        acc[pillarName] = [];
      }
      
      // Calculate score for this category
      const totalPossibleScore = category.questions.length * 5; // 5 is max score per question
      let totalScore = 0;
      let answeredQuestions = 0;
      
      category.questions.forEach(q => {
        const answer = answers[q.id];
        if (typeof answer === 'number' && answer > 0) {
          totalScore += answer;
          answeredQuestions++;
        }
      });
      
      // Calculate percentage score (ensure we don't divide by zero)
      const score = answeredQuestions > 0 
        ? Math.round((totalScore / (answeredQuestions * 5)) * 100)
        : 0;
      
      // Only add categories with actual questions
      if (category.questions.length > 0) {
        acc[pillarName].push({
          label: categoryName,
          score
        });
      }
    }
    
    return acc;
  }, initialGroups);
  
  return (
    <div className="grid gap-16">
      {pillarOrder.map(pillar => 
        groupedCategories[pillar] && groupedCategories[pillar].length > 0 && (
          <PillarScores
            key={pillar}
            title={pillar}
            scores={groupedCategories[pillar]}
            color={pillarColors[pillar]}
          />
        )
      )}
    </div>
  );
};

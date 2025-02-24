
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
  const groupedCategories = categories.reduce((acc, category) => {
    const categoryName = category.display_name;
    console.log('Processing category:', categoryName);
    
    const matchingEntry = categoryToPillarMapping[categoryName];
    
    if (matchingEntry) {
      const { pillar, displayName } = matchingEntry;
      
      if (!acc[pillar]) {
        acc[pillar] = [];
      }
      
      const totalQuestions = category.questions.length;
      const totalScore = category.questions.reduce((sum, q) => {
        const answer = answers[q.id] || 0;
        console.log(`Question ${q.id} (${q.question_text}) answer:`, answer);
        return sum + answer;
      }, 0);
      
      // Guard against division by zero
      const score = totalQuestions > 0 
        ? Math.round((totalScore / (totalQuestions * 5)) * 100)
        : 0;
        
      console.log(`Category ${categoryName} - Total: ${totalScore}, Questions: ${totalQuestions}, Final Score: ${score}`);
      
      acc[pillar].push({
        label: displayName,
        score
      });
    } else {
      console.warn('No matching entry found for category:', categoryName);
    }
    
    return acc;
  }, {} as Record<string, { label: string; score: number; }[]>);

  return (
    <div className="grid gap-16">
      {pillarOrder.map(pillar => 
        groupedCategories[pillar] && (
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

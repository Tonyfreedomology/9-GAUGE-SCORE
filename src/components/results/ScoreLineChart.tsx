
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

  // Filter for subcategories only (IDs 30-38)
  const subcategories = categories.filter(category => category.id >= 30);
  
  console.log("Available subcategories:", subcategories.map(c => ({ 
    id: c.id, 
    name: c.display_name, 
    pillar: c.pillar,
    questionCount: c.questions.length
  })));
  
  console.log("Available answers:", Object.keys(answers).length, "keys");
  
  // Process each subcategory and assign to the correct pillar
  const groupedCategories = subcategories.reduce((acc, category) => {
    const categoryName = category.display_name;
    const pillarName = category.pillar;
    
    // Debug category information
    console.log(`Processing category: ${categoryName} (${category.id}) under pillar: ${pillarName}`);
    console.log(`Questions in this category:`, category.questions.map(q => q.id));
    
    // If we have a valid pillar, add this subcategory to its group
    if (pillarName && pillarOrder.includes(pillarName as any)) {
      // Calculate score for this category
      let totalScore = 0;
      let answeredQuestions = 0;
      
      // Debug questions and answers
      category.questions.forEach(q => {
        const answer = answers[q.id];
        console.log(`Question ID ${q.id}: Answer = ${answer}`);
        
        if (typeof answer === 'number' && answer > 0) {
          totalScore += answer;
          answeredQuestions++;
        }
      });
      
      // Calculate percentage score (ensure we don't divide by zero)
      const score = answeredQuestions > 0 
        ? Math.round((totalScore / (answeredQuestions * 5)) * 100)
        : 0;
      
      console.log(`Category ${categoryName}: Score = ${score}% (${answeredQuestions} questions answered)`);
      
      // Include all categories in output, even with zero scores
      if (!acc[pillarName]) {
        acc[pillarName] = [];
      }
      
      acc[pillarName].push({
        label: categoryName,
        score
      });
    }
    
    return acc;
  }, initialGroups);
  
  // Final debug output
  Object.keys(groupedCategories).forEach(pillar => {
    console.log(`Pillar: ${pillar}, Categories: ${groupedCategories[pillar].length}`);
    console.log(groupedCategories[pillar]);
  });
  
  return (
    <div className="grid gap-16">
      {pillarOrder.map(pillar => 
        groupedCategories[pillar] && groupedCategories[pillar].length > 0 && (
          <div key={pillar} className="space-y-8">
            <PillarScores
              title={pillar}
              scores={groupedCategories[pillar]}
              color={pillarColors[pillar]}
            />
          </div>
        )
      )}
    </div>
  );
};

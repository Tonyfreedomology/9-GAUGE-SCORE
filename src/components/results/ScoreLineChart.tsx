
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
  // Initialize all pillar groups
  const initialGroups: Record<string, { label: string; score: number; }[]> = {};
  pillarOrder.forEach(pillar => {
    initialGroups[pillar] = [];
  });

  // Process each category and assign to the correct pillar
  const groupedCategories = categories.reduce((acc, category) => {
    const categoryName = category.display_name;
    
    // Find the mapping using exact or partial match
    let matchingEntry = categoryToPillarMapping[categoryName];
    
    if (!matchingEntry) {
      // Try to find a partial match if no exact match is found
      const matchingKey = Object.keys(categoryToPillarMapping).find(key => 
        categoryName.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(categoryName.toLowerCase())
      );
      
      if (matchingKey) {
        matchingEntry = categoryToPillarMapping[matchingKey];
      }
    }
    
    if (matchingEntry) {
      const { pillar, displayName } = matchingEntry;
      
      if (!acc[pillar]) {
        acc[pillar] = [];
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
        // Check if we already have this category (to avoid duplicates)
        const existingCategory = acc[pillar].find(c => c.label === displayName);
        if (!existingCategory) {
          acc[pillar].push({
            label: displayName,
            score
          });
        }
      }
    }
    
    return acc;
  }, initialGroups);
  
  // Filter out any duplicates and ensure we have exactly 3 categories per pillar
  pillarOrder.forEach(pillar => {
    // Sort the categories alphabetically for consistency
    groupedCategories[pillar].sort((a, b) => a.label.localeCompare(b.label));
  });

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

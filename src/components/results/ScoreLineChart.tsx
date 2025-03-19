
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
  // Initialize all pillar groups to ensure we have entries even if no categories are found
  const initialGroups: Record<string, { label: string; score: number; }[]> = {};
  pillarOrder.forEach(pillar => {
    initialGroups[pillar] = [];
  });

  const groupedCategories = categories.reduce((acc, category) => {
    const categoryName = category.display_name;
    
    // Find the mapping by exact match or partial match
    let matchingEntry = categoryToPillarMapping[categoryName];
    
    if (!matchingEntry) {
      // Try to find a partial match if no exact match is found
      const matchingKey = Object.keys(categoryToPillarMapping).find(key => 
        categoryName.includes(key) || key.includes(categoryName)
      );
      
      if (matchingKey) {
        matchingEntry = categoryToPillarMapping[matchingKey];
      } else {
        // Determine pillar based on category name patterns
        if (categoryName.includes('Mental') || categoryName.includes('Physical') || categoryName.includes('Environmental')) {
          matchingEntry = { pillar: 'Health', displayName: categoryName };
        } else if (categoryName.includes('Income') || categoryName.includes('Independen') || categoryName.includes('Impact')) {
          matchingEntry = { pillar: 'Financial', displayName: categoryName };
        } else {
          matchingEntry = { pillar: 'Relationships', displayName: categoryName };
        }
      }
    }
    
    if (matchingEntry) {
      const { pillar, displayName } = matchingEntry;
      
      if (!acc[pillar]) {
        acc[pillar] = [];
      }
      
      const totalQuestions = category.questions.length;
      let totalScore = 0;
      let answeredQuestions = 0;
      
      category.questions.forEach(q => {
        const answer = answers[q.id];
        if (typeof answer === 'number' && answer > 0) {
          totalScore += answer;
          answeredQuestions++;
        }
      });
      
      // Guard against division by zero and ensure we only count answered questions
      const score = answeredQuestions > 0 
        ? Math.round((totalScore / (answeredQuestions * 5)) * 100)
        : 0;
      
      acc[pillar].push({
        label: displayName,
        score
      });
    } else {
      console.warn('No matching entry found for category:', categoryName);
    }
    
    return acc;
  }, initialGroups);

  // Ensure categories within each pillar are in a consistent order
  Object.keys(groupedCategories).forEach(pillar => {
    // Sort categories within each pillar alphabetically by label
    groupedCategories[pillar].sort((a, b) => a.label.localeCompare(b.label));
  });

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

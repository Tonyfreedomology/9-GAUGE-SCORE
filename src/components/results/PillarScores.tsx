
import { getPillarIcon } from "@/lib/getPillarIcon";
import { ScoreLine } from "./ScoreLine";
import { calculateCategoryScore } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";
import { categoryToPillarMapping, pillarColors, pillarOrder } from "@/lib/config/categoryMapping";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

type PillarScoresProps = {
  answers: Record<string, number>;
  categories: AssessmentCategory[];
};

export const PillarScores = ({ answers, categories }: PillarScoresProps) => {
  if (!categories || !Array.isArray(categories)) {
    return null;
  }

  const groupedCategories = categories.reduce((acc, category) => {
    const categoryName = category.display_name;
    const matchingEntry = categoryToPillarMapping[categoryName];
    
    if (matchingEntry) {
      const { pillar, displayName } = matchingEntry;
      
      if (!acc[pillar]) {
        acc[pillar] = [];
      }
      
      const score = calculateCategoryScore(category.questions, answers);
      
      acc[pillar].push({
        label: displayName,
        score
      });
    }
    
    return acc;
  }, {} as Record<string, { label: string; score: number; }[]>);

  return (
    <div className="grid gap-16">
      {pillarOrder.map(pillar => 
        groupedCategories[pillar] && (
          <div key={pillar} className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              {getPillarIcon(pillar)}
              <h3 className="text-3xl font-heading font-bold text-white tracking-tighter lowercase">{pillar}</h3>
            </div>
            <div className="space-y-8">
              {groupedCategories[pillar]?.map((score, index) => (
                <ScoreLine
                  key={score.label}
                  label={score.label}
                  score={score.score}
                  color={pillarColors[pillar]}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};


import { ScoreLineChart } from "../ScoreLineChart";
import { calculateCategoryScore } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

type ResultsBreakdownProps = {
  answers: Record<string, number>;
  categories: AssessmentCategory[];
};

export const ResultsBreakdown = ({ answers, categories }: ResultsBreakdownProps) => {
  const getPillarColor = (pillarName: string) => {
    switch (pillarName) {
      case 'Financial':
        return '#17BEBB';
      case 'Health':
        return '#EDB88B';
      case 'Relationships':
        return '#EF3E36';
      default:
        return '#293230';
    }
  };

  // Group categories by pillar
  const groupedCategories = categories.reduce<Record<string, AssessmentCategory[]>>((acc, category) => {
    const pillar = category.display_name;
    if (!acc[pillar]) acc[pillar] = [];
    acc[pillar].push(category);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      <h2 className="text-2xl font-heading font-bold text-white text-center mb-8 tracking-tighter lowercase">
        Your Results Breakdown
      </h2>
      
      {Object.entries(groupedCategories).map(([pillar, categories]) => (
        <div key={pillar} className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-6">{pillar}</h3>
          <ScoreLineChart
            scores={categories.map(category => ({
              name: category.display_name,
              value: calculateCategoryScore(category.questions, answers),
              pillar: pillar
            }))}
            color={getPillarColor(pillar)}
          />
        </div>
      ))}
    </div>
  );
};

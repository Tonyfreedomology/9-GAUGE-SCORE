
import { ScoreCard } from "../ScoreCard";
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-white text-center mb-8 tracking-tighter lowercase">
        Your Results Breakdown
      </h2>
      
      <div className="grid gap-8 md:grid-cols-3">
        {categories.map((category) => (
          <ScoreCard
            key={category.id}
            title={category.display_name}
            score={calculateCategoryScore(category.questions, answers)}
            color={getPillarColor(category.display_name)}
          />
        ))}
      </div>
    </div>
  );
};

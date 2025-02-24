
import { ScoreLineChart } from "./ScoreLineChart";
import { Database } from "@/integrations/supabase/types";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

type ResultsBreakdownProps = {
  answers: Record<string, number>;
  categories: AssessmentCategory[];
};

export const ResultsBreakdown = ({ answers, categories }: ResultsBreakdownProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-white text-center mb-8 tracking-tighter lowercase">
        Your Results Breakdown
      </h2>
      
      <ScoreLineChart answers={answers} categories={categories} />
    </div>
  );
};

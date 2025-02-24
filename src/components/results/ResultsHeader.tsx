
import { calculateOverallScore } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";

type ResultsHeaderProps = {
  answers: Record<string, number>;
  categories: (Database['public']['Tables']['assessment_categories']['Row'] & {
    questions: Database['public']['Tables']['assessment_questions']['Row'][];
  })[];
};

export const ResultsHeader = ({ answers, categories }: ResultsHeaderProps) => {
  const overallScore = calculateOverallScore(categories, answers);

  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tighter">
        Your Freedom Score: {overallScore}
      </h1>
      <p className="text-white/80 max-w-2xl mx-auto">
        Your Freedom Score is a comprehensive measure of your overall progress across Health, Financial, and Relationship pillars.
      </p>
    </div>
  );
};

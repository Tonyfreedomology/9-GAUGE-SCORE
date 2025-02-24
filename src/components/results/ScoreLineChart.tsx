
import { Database } from "@/integrations/supabase/types";
import { PillarScores } from "./PillarScores";
import { categoryToPillarMapping, pillarColors, pillarOrder } from "@/lib/config/categoryMapping";

type Category = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

type ScoreLineChartProps = {
  answers: Record<string, number>;
  categories: Category[];
};

export const ScoreLineChart = ({ answers, categories }: ScoreLineChartProps) => {
  if (!categories || !Array.isArray(categories)) {
    return null;
  }

  return (
    <div className="grid gap-16">
      <PillarScores answers={answers} categories={categories} />
    </div>
  );
};

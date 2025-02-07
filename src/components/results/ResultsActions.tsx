
import { ShareResults } from "../ShareResults";
import { Database } from "@/integrations/supabase/types";

type ResultsActionsProps = {
  onStartOver: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
  answers: Record<string, number>;
  categories: (Database['public']['Tables']['assessment_categories']['Row'] & {
    questions: Database['public']['Tables']['assessment_questions']['Row'][];
  })[];
};

export const ResultsActions = ({ onStartOver, containerRef, answers, categories }: ResultsActionsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
      <button
        onClick={onStartOver}
        className="bg-gradient-to-r from-[#17BEBB] to-[#00D4FF] text-white px-8 py-4 rounded-xl 
          text-lg font-heading font-bold tracking-tighter lowercase
          transition-all duration-300 hover:shadow-lg hover:scale-105 min-w-[200px]"
      >
        start over
      </button>
      <ShareResults containerRef={containerRef} answers={answers} categories={categories} />
    </div>
  );
};

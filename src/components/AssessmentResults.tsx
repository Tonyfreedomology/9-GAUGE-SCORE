
import { ShareResults } from "./ShareResults";
import { ResultsBreakdown } from "./results/ResultsBreakdown";
import { PillarScores } from "./results/PillarScores";
import { ResultsHeader } from "./results/ResultsHeader";
import { ResultsActions } from "./results/ResultsActions";
import { Database } from "@/integrations/supabase/types";
import { useRef } from "react";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

type AssessmentResultsProps = {
  answers: Record<string, number>;
  categories: AssessmentCategory[];
  onStartOver: () => void;
};

export const AssessmentResults = ({ answers, categories, onStartOver }: AssessmentResultsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://static.wixstatic.com/media/af616c_493e2c122a7049cf84997445a1c30517~mv2.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 z-[1] bg-black/60" />
      
      <div className="relative z-[2] container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12" ref={containerRef}>
          <ResultsHeader answers={answers} categories={categories} />
          <PillarScores answers={answers} categories={categories} />
          <ResultsBreakdown answers={answers} categories={categories} />
          <ShareResults 
            answers={answers} 
            categories={categories}
            containerRef={containerRef}
          />
          <ResultsActions onStartOver={onStartOver} />
        </div>
      </div>
    </div>
  );
};

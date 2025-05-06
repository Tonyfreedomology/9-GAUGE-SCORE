import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AssessmentQuestion } from "@/components/AssessmentQuestion";
import { fetchAssessmentData } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: (Database['public']['Tables']['assessment_questions']['Row'] & {
    originalCategoryName: string;
    pillar: string;
  })[];
};

type Answers = Record<string, number>;

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const Assessment = () => {
  const navigate = useNavigate();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const { data: assessmentData, isLoading, error } = useQuery({
    queryKey: ['assessment'],
    queryFn: fetchAssessmentData
  });

  // Render the layout structure regardless of loading state
  return (
    
  );
};

export default Assessment;

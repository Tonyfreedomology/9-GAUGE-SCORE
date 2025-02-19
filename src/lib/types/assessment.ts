
import { Database } from "@/integrations/supabase/types";

type AssessmentQuestion = Database['public']['Tables']['assessment_questions']['Row'];
type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'];

export interface Question extends AssessmentQuestion {
  category: string;
  pillar: string;
  options?: { value: number; label: string }[];
}

export interface Category extends AssessmentCategory {
  name: string;
  weight: number;
  questions: Question[];
}

export interface Pillar {
  name: string;
  color: string;
  categories: Category[];
}


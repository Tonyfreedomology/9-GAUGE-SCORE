
import { Database } from "@/integrations/supabase/types";

type DbQuestion = Database['public']['Tables']['assessment_questions']['Row'];
type DbCategory = Database['public']['Tables']['assessment_categories']['Row'];

// Extend the base question type
export interface Question extends Omit<DbQuestion, 'id' | 'options'> {
  id: string; // Override id to allow string IDs for our static questions
  category: string;
  pillar: string;
  options: { value: number; label: string }[]; // Make options required and specific
}

export interface Category extends Omit<DbCategory, 'id'> {
  id?: number; // Make ID optional since our static categories might not have IDs yet
  name: string;
  weight: number;
  questions: Question[];
}

export interface Pillar {
  name: string;
  color: string;
  categories: Category[];
}

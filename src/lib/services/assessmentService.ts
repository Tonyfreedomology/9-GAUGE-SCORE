
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'];
type AssessmentQuestion = Database['public']['Tables']['assessment_questions']['Row'];

export const fetchAssessmentData = async () => {
  // Fetch categories first
  const { data: categories, error: categoriesError } = await supabase
    .from('assessment_categories')
    .select('*')
    .order('id');

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError);
    throw categoriesError;
  }

  // Fetch questions
  const { data: questions, error: questionsError } = await supabase
    .from('assessment_questions')
    .select('*')
    .order('id');

  if (questionsError) {
    console.error('Error fetching questions:', questionsError);
    throw questionsError;
  }

  // Organize questions by category
  const organizedData = categories.map(category => ({
    ...category,
    questions: questions.filter(q => q.category_id === category.id)
  }));

  return organizedData;
};

export const calculateCategoryScore = (
  questions: AssessmentQuestion[],
  answers: Record<string, number>
): number => {
  if (!questions.length) return 0;

  let totalScore = 0;
  let answeredQuestions = 0;

  questions.forEach(question => {
    const answer = answers[question.id];
    if (typeof answer === 'number') {
      totalScore += answer;
      answeredQuestions++;
    }
  });

  return answeredQuestions ? Math.round((totalScore / (answeredQuestions * 5)) * 100) : 0;
};

export const calculateOverallScore = (
  categories: (AssessmentCategory & { questions: AssessmentQuestion[] })[],
  answers: Record<string, number>
): number => {
  const categoryScores = categories.map(category => 
    calculateCategoryScore(category.questions, answers)
  );

  return Math.round(
    categoryScores.reduce((sum, score) => sum + score, 0) / categories.length
  );
};

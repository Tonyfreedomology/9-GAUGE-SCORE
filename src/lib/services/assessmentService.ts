
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'];
type AssessmentQuestion = Database['public']['Tables']['assessment_questions']['Row'];

const getPillarFromCategory = (categoryName: string) => {
  if (categoryName.includes('Physical') || categoryName.includes('Mental') || categoryName.includes('Environmental')) {
    return 'Health';
  }
  if (categoryName.includes('Income') || categoryName.includes('Independence') || categoryName.includes('Impact')) {
    return 'Financial';
  }
  return 'Relationships';
};

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

  // First, organize questions by category
  const questionsByCategory = categories.map(category => ({
    ...category,
    questions: questions.filter(q => {
      console.log(`Checking question ${q.id} with category_id ${q.category_id} against category ${category.id}`);
      return q.category_id === category.id;
    })
  }));

  // Get the maximum number of questions in any category
  const maxQuestions = Math.max(...questionsByCategory.map(cat => cat.questions.length));

  // Create an interleaved array of questions with category information
  const interleavedQuestions = [];
  for (let i = 0; i < maxQuestions; i++) {
    for (const category of questionsByCategory) {
      if (category.questions[i]) {
        interleavedQuestions.push({
          ...category.questions[i],
          originalCategoryName: category.display_name,
          pillar: getPillarFromCategory(category.display_name)
        });
      }
    }
  }

  // Return both the interleaved questions for the assessment flow
  // and the original categories for the results display
  return {
    assessmentCategory: {
      ...categories[0], // Use the first category as a base to maintain type compatibility
      id: 1,
      display_name: "Assessment",
      description: "Combined assessment questions",
      name: "physical_health" as const,
      weight: 1,
      questions: interleavedQuestions
    },
    originalCategories: questionsByCategory
  };
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

export const saveAssessmentScores = async (
  categories: (AssessmentCategory & { questions: AssessmentQuestion[] })[],
  answers: Record<string, number>
) => {
  // Create a new assessment
  const { data: assessment, error: assessmentError } = await supabase
    .from('assessments')
    .insert({})
    .select()
    .single();

  if (assessmentError) {
    console.error('Error creating assessment:', assessmentError);
    throw assessmentError;
  }

  // Calculate and save overall score
  const overallScore = calculateOverallScore(categories, answers);
  const { error: overallError } = await supabase
    .from('assessment_overall_scores')
    .insert({
      assessment_id: assessment.id,
      score: overallScore
    });

  if (overallError) {
    console.error('Error saving overall score:', overallError);
    throw overallError;
  }

  // Calculate and save pillar scores
  const pillarScores = categories.map(category => ({
    assessment_id: assessment.id,
    category_id: category.id,
    score: calculateCategoryScore(category.questions, answers)
  }));

  const { error: pillarError } = await supabase
    .from('assessment_pillar_scores')
    .insert(pillarScores);

  if (pillarError) {
    console.error('Error saving pillar scores:', pillarError);
    throw pillarError;
  }

  return {
    assessmentId: assessment.id,
    overallScore,
    pillarScores
  };
};

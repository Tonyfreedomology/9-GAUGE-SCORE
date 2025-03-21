
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

export const fetchAssessmentData = async () => {
  console.log('Fetching assessment data from Supabase...');
  
  // Fetch categories first
  const { data: categories, error: categoriesError } = await supabase
    .from('assessment_categories')
    .select(`
      id,
      name,
      display_name,
      pillar,
      weight,
      created_at
    `)
    .order('id');

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError);
    toast.error('Error loading assessment questions');
    throw categoriesError;
  }

  // Fetch questions with explicit field selection
  const { data: questions, error: questionsError } = await supabase
    .from('assessment_questions')
    .select(`
      id,
      question_text,
      options,
      weight,
      category_id,
      created_at
    `)
    .order('id');

  if (questionsError) {
    console.error('Error fetching questions:', questionsError);
    toast.error('Error loading assessment questions');
    throw questionsError;
  }

  // First, organize questions by category
  const questionsByCategory = categories.map(category => ({
    ...category,
    questions: questions.filter(q => q.category_id === category.id)
  }));

  // Create a more balanced interleaving of questions
  const interleavedQuestions = [];
  let categoryQueues = questionsByCategory.map(category => ({
    ...category,
    remainingQuestions: [...category.questions]
  }));
  
  // Keep track of the last used categories to avoid clusters
  const lastUsedCategories: string[] = [];
  const AVOID_RECENT = 2; // Avoid repeating from the last 2 categories used

  while (categoryQueues.some(cat => cat.remainingQuestions.length > 0)) {
    // Filter out categories we want to avoid (recently used) and empty categories
    const availableCategories = categoryQueues.filter(cat => 
      cat.remainingQuestions.length > 0 && 
      !lastUsedCategories.includes(cat.name)
    );

    // If no available categories that weren't recently used, reset the history
    if (availableCategories.length === 0) {
      const categoriesWithQuestions = categoryQueues.filter(cat => 
        cat.remainingQuestions.length > 0
      );
      if (categoriesWithQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoriesWithQuestions.length);
        const selectedCategory = categoriesWithQuestions[randomIndex];
        
        const question = selectedCategory.remainingQuestions.shift()!;
        interleavedQuestions.push({
          ...question,
          originalCategoryName: selectedCategory.display_name,
          pillar: selectedCategory.pillar
        });

        lastUsedCategories.push(selectedCategory.name);
        if (lastUsedCategories.length > AVOID_RECENT) {
          lastUsedCategories.shift();
        }
      }
    } else {
      // Randomly select from available categories
      const randomIndex = Math.floor(Math.random() * availableCategories.length);
      const selectedCategory = availableCategories[randomIndex];
      
      const question = selectedCategory.remainingQuestions.shift()!;
      interleavedQuestions.push({
        ...question,
        originalCategoryName: selectedCategory.display_name,
        pillar: selectedCategory.pillar
      });

      lastUsedCategories.push(selectedCategory.name);
      if (lastUsedCategories.length > AVOID_RECENT) {
        lastUsedCategories.shift();
      }
    }
  }

  return {
    assessmentCategory: {
      ...categories[0],
      id: 1,
      display_name: "Assessment",
      name: "assessment",
      pillar: "Assessment",
      questions: interleavedQuestions
    },
    originalCategories: questionsByCategory
  };
};

export const calculateCategoryScore = (
  questions: Database['public']['Tables']['assessment_questions']['Row'][],
  answers: Record<string, number>
): number => {
  if (!questions.length) return 0;

  let totalScore = 0;
  let answeredQuestions = 0;

  questions.forEach(question => {
    const answer = answers[question.id];
    if (typeof answer === 'number' && answer > 0) {
      totalScore += answer;
      answeredQuestions++;
    }
  });

  // If no questions were answered, return 0
  if (answeredQuestions === 0) return 0;
  
  // Calculate score as percentage
  return Math.round((totalScore / (answeredQuestions * 5)) * 100);
};

export const calculateOverallScore = (
  categories: (Database['public']['Tables']['assessment_categories']['Row'] & { 
    questions: Database['public']['Tables']['assessment_questions']['Row'][] 
  })[],
  answers: Record<string, number>
): number => {
  // Calculate scores for each category and filter out zeros
  const categoryScores = categories.map(category => 
    calculateCategoryScore(category.questions, answers)
  ).filter(score => score > 0); // Only include valid scores
  
  if (categoryScores.length === 0) return 0;

  // Average the scores
  return Math.round(
    categoryScores.reduce((sum, score) => sum + score, 0) / categoryScores.length
  );
};

export const saveAssessmentScores = async (
  categories: (Database['public']['Tables']['assessment_categories']['Row'] & { 
    questions: Database['public']['Tables']['assessment_questions']['Row'][] 
  })[],
  answers: Record<string, number>
) => {
  try {
    // Create a new assessment
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .insert({})
      .select()
      .single();

    if (assessmentError) {
      console.error('Error creating assessment:', assessmentError);
      toast.error('Error saving assessment results');
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
      toast.error('Error saving assessment results');
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
      toast.error('Error saving assessment results');
      throw pillarError;
    }

    console.log('Assessment scores saved successfully');
    return {
      assessmentId: assessment.id,
      overallScore,
      pillarScores
    };
  } catch (error) {
    console.error('Error in saveAssessmentScores:', error);
    toast.error('Error saving assessment results');
    throw error;
  }
};

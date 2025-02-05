
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AssessmentQuestion } from "@/components/AssessmentQuestion";
import { AssessmentResults } from "@/components/AssessmentResults";
import { fetchAssessmentData } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

type QuestionOption = {
  value: number;
  label: string;
};

type Answers = Record<string, number>;

const Assessment = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);

  const { data: assessmentData, isLoading } = useQuery({
    queryKey: ['assessment'],
    queryFn: fetchAssessmentData
  });

  if (isLoading || !assessmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading assessment...</div>
      </div>
    );
  }

  const currentCategory = assessmentData[currentCategoryIndex];
  const questions = currentCategory.questions;
  const currentQuestion = questions[currentQuestionIndex];
  
  const getPillarFromCategory = (categoryName: string) => {
    if (categoryName.includes('Physical') || categoryName.includes('Mental') || categoryName.includes('Environmental')) {
      return 'Health';
    }
    if (categoryName.includes('Income') || categoryName.includes('Independence') || categoryName.includes('Impact')) {
      return 'Financial';
    }
    return 'Relationships';
  };

  const pillarName = getPillarFromCategory(currentCategory.display_name);
  
  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < assessmentData.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setShowResults(true);
    }
  };

  const handleStartOver = () => {
    setShowResults(false);
    setCurrentCategoryIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentCategoryIndex > 0) {
      const previousCategory = assessmentData[currentCategoryIndex - 1];
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setCurrentQuestionIndex(previousCategory.questions.length - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < assessmentData.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const totalQuestions = assessmentData.reduce(
    (acc, category) => acc + category.questions.length, 
    0
  );

  const currentQuestionNumber = assessmentData
    .slice(0, currentCategoryIndex)
    .reduce((acc, category) => acc + category.questions.length, 0) + currentQuestionIndex + 1;

  const progress = (currentQuestionNumber / totalQuestions) * 100;

  const isFirstQuestion = currentCategoryIndex === 0 && currentQuestionIndex === 0;
  const isLastQuestion = currentCategoryIndex === assessmentData.length - 1 && 
    currentQuestionIndex === questions.length - 1;

  const options = currentQuestion.options as QuestionOption[];

  return (
    <div className="relative min-h-screen">
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
      <div className="fixed inset-0 z-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen p-8 md:p-12">
        <div className="animate-[fade-in_0.5s_ease-out]">
          {showResults ? (
            <AssessmentResults 
              answers={answers}
              categories={assessmentData}
              onStartOver={handleStartOver}
            />
          ) : (
            <AssessmentQuestion
              category={pillarName}
              questionText={currentQuestion.question_text}
              progress={progress}
              currentValue={answers[currentQuestion.id] || 0}
              currentStep={currentQuestionNumber}
              totalSteps={totalQuestions}
              options={currentQuestion.options}
              onAnswer={handleAnswer}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isFirstQuestion={isFirstQuestion}
              isLastQuestion={isLastQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;

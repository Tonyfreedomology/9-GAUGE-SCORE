
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AssessmentQuestion } from "@/components/AssessmentQuestion";
import { AssessmentResults } from "@/components/AssessmentResults";
import { fetchAssessmentData } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";

type AssessmentCategory = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: (Database['public']['Tables']['assessment_questions']['Row'] & {
    originalCategoryName: string;
    pillar: string;
  })[];
};

type Answers = Record<string, number>;

const Assessment = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);

  const { data: assessmentData, isLoading, error } = useQuery({
    queryKey: ['assessment'],
    queryFn: fetchAssessmentData
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading assessment...</div>
      </div>
    );
  }

  if (error || !assessmentData?.assessmentCategory?.questions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Error loading assessment. Please try again.</div>
      </div>
    );
  }

  const questions = assessmentData.assessmentCategory.questions;
  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">No questions available.</div>
      </div>
    );
  }
  
  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleStartOver = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const totalQuestions = questions.length;
  const currentQuestionNumber = currentQuestionIndex + 1;
  const progress = (currentQuestionNumber / totalQuestions) * 100;

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Properly type assert the options from Json to our expected structure
  const options = (currentQuestion.options as { value: number; label: string }[] | null) ?? [];

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
              categories={assessmentData.originalCategories}
              onStartOver={handleStartOver}
            />
          ) : (
            <AssessmentQuestion
              category={currentQuestion.pillar}
              questionText={currentQuestion.question_text}
              progress={progress}
              currentValue={answers[currentQuestion.id] || 0}
              currentStep={currentQuestionNumber}
              totalSteps={totalQuestions}
              options={options}
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

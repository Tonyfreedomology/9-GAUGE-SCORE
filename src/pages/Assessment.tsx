
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AssessmentQuestion } from "@/components/AssessmentQuestion";
import { AssessmentResults } from "@/components/AssessmentResults";
import { fetchAssessmentData, saveAssessmentScores } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";
import { trackFacebookEvent, FB_EVENTS } from "@/lib/utils/facebookTracking";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  const { data: assessmentData, isLoading, error } = useQuery({
    queryKey: ['assessment'],
    queryFn: fetchAssessmentData
  });

  // Create a new assessment when the component mounts
  useState(async () => {
    trackFacebookEvent(FB_EVENTS.START_ASSESSMENT);
    try {
      const { data, error } = await supabase
        .from('assessments')
        .insert({})
        .select()
        .single();

      if (error) throw error;
      setAssessmentId(data.id);
    } catch (error) {
      console.error('Error creating assessment:', error);
      toast.error('Error starting assessment');
    }
  });

  // Save individual response as soon as user answers
  const saveResponse = async (questionId: number, answer: number) => {
    if (!assessmentId) return;

    try {
      const { error } = await supabase
        .from('user_responses')
        .insert({
          assessment_id: assessmentId,
          question_id: questionId,
          answer: answer,
          completed: false // Will be updated to true when assessment is completed
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving response:', error);
      // Don't show error toast to user to avoid disrupting their experience
    }
  };

  // Render the layout structure regardless of loading state
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
      
      {/* Content */}
      <div className="relative z-[2] min-h-screen p-8 md:p-12">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="animate-pulse text-white text-xl">Loading assessment...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-white text-xl">Error loading assessment. Please try again.</div>
          </div>
        ) : !assessmentData?.assessmentCategory?.questions?.length ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-white text-xl">No questions available.</div>
          </div>
        ) : (
          <div className="animate-[fade-in_0.5s_ease-out]">
            {(() => {
              const questions = assessmentData.assessmentCategory.questions;
              const currentQuestion = questions[currentQuestionIndex];
              
              if (!currentQuestion) {
                return (
                  <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-white text-xl">No questions available.</div>
                  </div>
                );
              }

              const totalQuestions = questions.length;
              const currentQuestionNumber = currentQuestionIndex + 1;
              const progress = (currentQuestionNumber / totalQuestions) * 100;
              const isFirstQuestion = currentQuestionIndex === 0;
              const isLastQuestion = currentQuestionIndex === questions.length - 1;
              const options = (currentQuestion.options as { value: number; label: string }[] | null) ?? [];

              const handleAnswer = async (value: number) => {
                // Save the response immediately
                await saveResponse(currentQuestion.id, value);

                // Track question completion
                trackFacebookEvent(FB_EVENTS.COMPLETE_QUESTION, {
                  question_number: currentQuestionNumber,
                  total_questions: totalQuestions,
                  category: currentQuestion.originalCategoryName,
                  pillar: currentQuestion.pillar
                });

                setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
                
                if (currentQuestionIndex < questions.length - 1) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                  // Mark responses as completed and save final scores
                  try {
                    await supabase
                      .from('user_responses')
                      .update({ completed: true })
                      .eq('assessment_id', assessmentId);

                    // Track assessment completion
                    trackFacebookEvent(FB_EVENTS.COMPLETE_ASSESSMENT, {
                      total_questions_answered: Object.keys(answers).length + 1
                    });

                    // Save overall scores
                    await saveAssessmentScores(assessmentData.originalCategories, {
                      ...answers,
                      [currentQuestion.id]: value
                    });

                    setShowResults(true);
                  } catch (error) {
                    console.error('Error finalizing assessment:', error);
                    toast.error('Error saving final results');
                  }
                }
              };

              const handleStartOver = () => {
                setShowResults(false);
                setCurrentQuestionIndex(0);
                setAnswers({});
                trackFacebookEvent(FB_EVENTS.START_ASSESSMENT);
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

              return showResults ? (
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
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;

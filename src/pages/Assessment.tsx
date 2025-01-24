import { useState } from "react";
import { questions } from "@/lib/questions";
import { AssessmentQuestion } from "@/components/AssessmentQuestion";
import { AssessmentResults } from "@/components/AssessmentResults";

type Answers = Record<string, number>;

const Assessment = () => {
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);

  const currentPillar = questions[currentPillarIndex];
  const allQuestions = currentPillar.categories.flatMap(category => category.questions);
  const currentQuestion = allQuestions[currentQuestionIndex];
  
  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentPillarIndex < questions.length - 1) {
      setCurrentPillarIndex(currentPillarIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setShowResults(true);
    }
  };

  const handleStartOver = () => {
    setShowResults(false);
    setCurrentPillarIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentPillarIndex > 0) {
      const previousPillar = questions[currentPillarIndex - 1];
      const previousPillarQuestions = previousPillar.categories.flatMap(category => category.questions);
      setCurrentPillarIndex(currentPillarIndex - 1);
      setCurrentQuestionIndex(previousPillarQuestions.length - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentPillarIndex < questions.length - 1) {
      setCurrentPillarIndex(currentPillarIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const totalQuestions = questions.reduce((acc, pillar) => 
    acc + pillar.categories.reduce((sum, category) => 
      sum + category.questions.length, 0), 0);

  const currentQuestionNumber = questions.slice(0, currentPillarIndex).reduce((acc, pillar) => 
    acc + pillar.categories.reduce((sum, category) => 
      sum + category.questions.length, 0), 0) + currentQuestionIndex + 1;

  const progress = (currentQuestionNumber / totalQuestions) * 100;

  const isFirstQuestion = currentPillarIndex === 0 && currentQuestionIndex === 0;
  const isLastQuestion = currentPillarIndex === questions.length - 1 && 
    currentQuestionIndex === allQuestions.length - 1;

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
              onStartOver={handleStartOver}
            />
          ) : (
            <AssessmentQuestion
              pillarName={currentPillar.name}
              category={currentQuestion.category}
              questionText={currentQuestion.text}
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
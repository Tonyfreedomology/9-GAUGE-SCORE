import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LikertScale } from "@/components/LikertScale";
import { ScoreCard } from "@/components/ScoreCard";
import { questions, calculatePillarScore } from "@/lib/questions";
import { cn } from "@/lib/utils";

type Answers = Record<string, number>;

const Index = () => {
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

  const calculateOverallScore = () => {
    const pillarScores = questions.map(pillar => calculatePillarScore(pillar, answers));
    return Math.round(pillarScores.reduce((a, b) => a + b, 0) / pillarScores.length);
  };

  if (showResults) {
    const overallScore = calculateOverallScore();
    return (
      <div className="min-h-screen p-6 bg-gradient-soft">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
            Your Freedomology Score
          </h1>
          <ScoreCard
            title="Overall Freedomology Score"
            score={overallScore}
            color="#293230"
            className="mb-8 shadow-lg backdrop-blur-sm bg-white/80"
            isOverallScore={true}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {questions.map((pillar) => (
              <ScoreCard
                key={pillar.name}
                title={pillar.name}
                score={calculatePillarScore(pillar, answers)}
                color={pillar.color}
                className="shadow-lg backdrop-blur-sm bg-white/80 transform transition-all duration-300 hover:scale-105"
              />
            ))}
          </div>
          <Button
            onClick={() => {
              setShowResults(false);
              setCurrentPillarIndex(0);
              setCurrentQuestionIndex(0);
              setAnswers({});
            }}
            className="mx-auto block bg-foreground hover:bg-foreground/90 text-white"
          >
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  const progress = ((currentPillarIndex * allQuestions.length + currentQuestionIndex + 1) / 
    (questions.reduce((acc, pillar) => 
      acc + pillar.categories.reduce((sum, category) => 
        sum + category.questions.length, 0), 0))) * 100;

  return (
    <div className="min-h-screen p-6 bg-gradient-soft">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-center text-foreground">
            {currentPillar.name}
          </h1>
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-foreground rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className={cn(
          "p-8 shadow-lg backdrop-blur-sm bg-white/80 animate-scale-in",
          currentPillar.name === 'Financial' && "border-financial",
          currentPillar.name === 'Health' && "border-health",
          currentPillar.name === 'Relationships' && "border-relationships"
        )}>
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                {currentQuestion.category}
              </h2>
              <p className="text-lg text-foreground/80">
                {currentQuestion.text}
              </p>
            </div>
            
            <LikertScale
              value={answers[currentQuestion.id] || 0}
              onChange={handleAnswer}
              options={currentQuestion.options}
              className="mt-6"
            />
            
            {!currentQuestion.options && (
              <div className="flex justify-between text-sm text-foreground/60 mt-2">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
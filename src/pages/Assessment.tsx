import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LikertScale } from "@/components/LikertScale";
import { ScoreCard } from "@/components/ScoreCard";
import { questions, calculatePillarScore } from "@/lib/questions";
import { cn } from "@/lib/utils";

type Answers = Record<string, number>;

const Assessment = () => {
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const progress = ((currentPillarIndex * allQuestions.length + currentQuestionIndex + 1) / 
    (questions.reduce((acc, pillar) => 
      acc + pillar.categories.reduce((sum, category) => 
        sum + category.questions.length, 0), 0))) * 100;

  const handleImageError = () => {
    console.error("Failed to load Freedomology logo");
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log("Successfully loaded Freedomology logo");
  };

  if (showResults) {
    const overallScore = calculateOverallScore();
    return (
      <div 
        className="min-h-screen p-8 md:p-12 relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541417904950-b855846fe074?q=100&w=3840&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          {!imageError ? (
            <img 
              src="https://static.wixstatic.com/media/af616c_750d594b45cd42a4bb4f3290aad0fa61~mv2.png" 
              alt="Freedomology" 
              className="h-24 md:h-28 mx-auto mb-8 transform transition-all duration-300 hover:scale-105"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          ) : (
            <div className="text-2xl font-bold text-center mb-8 text-white">Freedomology</div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-white leading-relaxed">
            Overall Freedomology Score
          </h1>
          <ScoreCard
            title=""
            score={overallScore}
            color="#293230"
            className="mb-12 max-w-2xl mx-auto transform transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm bg-white/90"
            isOverallScore={true}
          />
          <div className="grid gap-8 md:grid-cols-3">
            {questions.map((pillar) => {
              let color;
              switch (pillar.name) {
                case 'Financial':
                  color = '#17BEBB';
                  break;
                case 'Health':
                  color = '#EDB88B';
                  break;
                case 'Relationships':
                  color = '#EF3E36';
                  break;
                default:
                  color = '#293230';
              }
              return (
                <ScoreCard
                  key={pillar.name}
                  title={pillar.name}
                  score={calculatePillarScore(pillar, answers)}
                  color={color}
                  className="transform transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/90"
                />
              );
            })}
          </div>
          <Button
            onClick={() => {
              setShowResults(false);
              setCurrentPillarIndex(0);
              setCurrentQuestionIndex(0);
              setAnswers({});
            }}
            className="mx-auto flex items-center justify-center bg-gradient-to-r from-[#17BEBB] to-[#17BEBB]/80 hover:from-[#17BEBB]/90 hover:to-[#17BEBB]/70 text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-8 md:p-12 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1541417904950-b855846fe074?q=100&w=3840&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      
      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        {!imageError ? (
          <img 
            src="https://static.wixstatic.com/media/af616c_4fdc0e4111304cf4ac2ee10f713c4a96~mv2.png" 
            alt="Freedomology" 
            className="h-20 md:h-24 mx-auto mb-8 transform transition-all duration-300 hover:scale-105"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="text-xl font-bold text-center mb-8 text-white">Freedomology</div>
        )}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
            {currentPillar.name}
          </h1>
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className={cn(
          "p-8 shadow-lg backdrop-blur-sm bg-white/90 animate-scale-in",
          currentPillar.name === 'Financial' && "border-financial",
          currentPillar.name === 'Health' && "border-health",
          currentPillar.name === 'Relationships' && "border-relationships"
        )}>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-foreground/80 to-foreground">
                {currentQuestion.category}
              </h2>
              <p className="text-lg font-normal text-foreground/80">
                {currentQuestion.text}
              </p>
            </div>
            
            <LikertScale
              value={answers[currentQuestion.id] || 0}
              onChange={handleAnswer}
              options={currentQuestion.options}
              className="mt-8"
            />
            
            {!currentQuestion.options && (
              <div className="flex justify-between text-sm font-medium text-foreground/60 mt-4">
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

export default Assessment;
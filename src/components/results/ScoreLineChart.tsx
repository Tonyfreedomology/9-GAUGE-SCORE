
import { useEffect, useState } from 'react';
import { Database } from "@/integrations/supabase/types";

type ScoreLineProps = {
  score: number;
  label: string;
  color: string;
  delay?: number;
};

const ScoreLine = ({ score, label, color, delay = 0 }: ScoreLineProps) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [arrowPosition, setArrowPosition] = useState(0);

  useEffect(() => {
    const scoreTimer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = score / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        if (current < score) {
          current += increment;
          setCurrentScore(Math.min(Math.round(current), score));
          setArrowPosition(Math.min((current / 100) * 100, score));
        } else {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(scoreTimer);
  }, [score, delay]);

  return (
    <div className="relative py-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/80 text-sm">{label}</span>
        <span 
          className="text-3xl font-bold text-white"
          style={{ color }}
        >
          {currentScore}
        </span>
      </div>
      
      <div className="relative">
        {/* Background line */}
        <div className="h-0.5 w-full bg-white/20 rounded-full" />
        
        {/* Score line */}
        <div 
          className="absolute top-0 left-0 h-0.5 rounded-full transition-all duration-300"
          style={{ 
            width: `${arrowPosition}%`,
            backgroundColor: color
          }} 
        />
        
        {/* Arrow */}
        <div 
          className="absolute -bottom-2 w-0 h-0 transition-all duration-300"
          style={{ 
            left: `${arrowPosition}%`,
            transform: 'translateX(-50%)',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `8px solid ${color}`
          }}
        />
      </div>
    </div>
  );
};

type PillarScoresProps = {
  title: string;
  scores: { label: string; score: number; }[];
  color: string;
};

const PillarScores = ({ title, scores, color }: PillarScoresProps) => (
  <div className="space-y-6">
    <h3 className="text-3xl font-heading font-bold text-white tracking-tighter lowercase">{title}</h3>
    <div className="space-y-8">
      {scores.map((score, index) => (
        <ScoreLine
          key={score.label}
          label={score.label}
          score={score.score}
          color={color}
          delay={index * 200}
        />
      ))}
    </div>
  </div>
);

type Category = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

export const ScoreLineChart = ({ answers, categories }: { 
  answers: Record<string, number>;
  categories: Category[];
}) => {
  const groupedCategories = categories.reduce((acc, category) => {
    const pillar = category.display_name;
    if (!acc[pillar]) {
      acc[pillar] = [];
    }
    
    const score = Math.round(
      category.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0) / 
      category.questions.length * 20
    );
    
    acc[pillar].push({
      label: category.display_name,
      score
    });
    
    return acc;
  }, {} as Record<string, { label: string; score: number; }[]>);

  const pillarColors = {
    'Health': '#EDB88B',
    'Financial': '#17BEBB',
    'Relationships': '#EF3E36'
  };

  return (
    <div className="grid gap-16">
      {Object.entries(groupedCategories).map(([pillar, scores]) => (
        <PillarScores
          key={pillar}
          title={pillar}
          scores={scores}
          color={pillarColors[pillar as keyof typeof pillarColors]}
        />
      ))}
    </div>
  );
};

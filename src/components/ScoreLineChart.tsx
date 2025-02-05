
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type Score = {
  name: string;
  value: number;
  pillar: string;
};

type ScoreLineChartProps = {
  scores: Score[];
  color: string;
};

export const ScoreLineChart = ({ scores, color }: ScoreLineChartProps) => {
  const [animatedScores, setAnimatedScores] = useState<number[]>(scores.map(() => 0));
  const [arrowPositions, setArrowPositions] = useState<number[]>(scores.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const targetScores = scores.map(s => s.value);
    let current = scores.map(() => 0);
    
    const timer = setInterval(() => {
      let allDone = true;
      current = current.map((score, i) => {
        if (score < targetScores[i]) {
          allDone = false;
          return score + (targetScores[i] / steps);
        }
        return score;
      });
      
      setAnimatedScores(current.map(score => Math.min(score, 100)));
      setArrowPositions(current.map(score => Math.min((score / 100) * 100, 100)));
      
      if (allDone) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [scores]);

  return (
    <div className="space-y-6">
      {scores.map((score, index) => (
        <div key={score.name} className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-white/80">
              {score.name}
            </span>
            <span 
              className="text-2xl font-bold"
              style={{ color }}
            >
              {Math.round(animatedScores[index])}
            </span>
          </div>
          
          <div className="relative">
            {/* Background line */}
            <div className="h-0.5 bg-white/20 rounded-full" />
            
            {/* Score line */}
            <div 
              className="absolute top-0 left-0 h-0.5 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${arrowPositions[index]}%`,
                backgroundColor: color
              }}
            />
            
            {/* Arrow */}
            <div 
              className="absolute -bottom-3 transform -translate-y-1/2 transition-all duration-1000 ease-out"
              style={{ 
                left: `${arrowPositions[index]}%`,
                transform: `translateX(-50%) translateY(0)`
              }}
            >
              <ChevronDown 
                className="w-4 h-4"
                style={{ color }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";
import { getFeedbackTier } from "@/lib/questions";
import { cn } from "@/lib/utils";

type ScoreCardProps = {
  title: string;
  score: number;
  color: string;
  className?: string;
  isOverallScore?: boolean;
};

export const ScoreCard = ({ title, score, color, className, isOverallScore = false }: ScoreCardProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start animation after a small delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate the score number counting up
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = score / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        if (current < score) {
          current += increment;
          setAnimatedScore(Math.min(Math.round(current), score));
        } else {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [score, isVisible]);

  return (
    <div className={cn(
      "p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-500",
      !isVisible && "opacity-0 translate-y-4",
      isVisible && "opacity-100 translate-y-0",
      className
    )}>
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <div className="space-y-4">
        <div className="flex justify-center">
          <ProgressBar 
            value={isVisible ? score : 0} 
            color={color} 
            variant={isOverallScore ? 'circle' : 'line'}
            size={160}
          />
        </div>
        <div className="flex justify-center">
          <span className="text-sm text-muted-foreground">
            {getFeedbackTier(animatedScore)}
          </span>
        </div>
      </div>
    </div>
  );
};
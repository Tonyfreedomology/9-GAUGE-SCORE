import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";
import { getFeedbackTier } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { PiggyBank, HeartPulse, Heart } from "lucide-react";

type ScoreCardProps = {
  title: string;
  score: number;
  color: string;
  className?: string;
  isOverallScore?: boolean;
  hideSubtext?: boolean;
};

export const ScoreCard = ({ 
  title, 
  score, 
  color, 
  className, 
  isOverallScore = false,
  hideSubtext = false
}: ScoreCardProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
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

  const getIcon = () => {
    switch (title) {
      case 'Financial':
        return <PiggyBank className="w-8 h-8" style={{ color }} />;
      case 'Health':
        return <HeartPulse className="w-8 h-8" style={{ color }} />;
      case 'Relationships':
        return <Heart className="w-8 h-8" style={{ color }} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "p-8 rounded-xl border bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm",
      "shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]",
      "transition-all duration-500 hover:scale-[1.02]",
      !isVisible && "opacity-0 translate-y-4",
      isVisible && "opacity-100 translate-y-0",
      className
    )}>
      <div className="flex items-center justify-center gap-3 mb-8">
        {getIcon()}
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-6">
        <div className="flex justify-center">
          <ProgressBar 
            value={isVisible ? score : 0} 
            color={color} 
            variant={isOverallScore ? 'circle' : 'line'}
            size={isOverallScore ? 200 : 160}
          />
        </div>
        {!hideSubtext && (
          <div className="flex justify-center">
            <span className="text-sm font-medium text-muted-foreground">
              {getFeedbackTier(animatedScore)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
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
};

export const ScoreCard = ({ title, score, color, className, isOverallScore = false }: ScoreCardProps) => {
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
    const iconProps = {
      className: "w-8 h-8 transition-transform duration-300 group-hover:scale-110",
      style: { color }
    };

    switch (title) {
      case 'Financial':
        return <PiggyBank {...iconProps} />;
      case 'Health':
        return <HeartPulse {...iconProps} />;
      case 'Relationships':
        return <Heart {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "group p-8 rounded-xl border bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-md shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
      !isVisible && "opacity-0 translate-y-4",
      isVisible && "opacity-100 translate-y-0",
      className
    )}>
      <div className="flex items-center justify-center gap-4 mb-6">
        {getIcon()}
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
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
        <div className="flex justify-center">
          <span className="text-sm font-medium text-muted-foreground">
            {getFeedbackTier(animatedScore)}
          </span>
        </div>
      </div>
    </div>
  );
};
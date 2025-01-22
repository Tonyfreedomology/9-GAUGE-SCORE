import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";
import { getFeedbackTier } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { getPillarIcon } from "@/lib/getPillarIcon";

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

  const cardClasses = isOverallScore ? cn(
    "p-8 rounded-xl border bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm",
    "shadow-[0_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]",
    "transition-all duration-500 hover:scale-[1.02]",
    !isVisible && "opacity-0 translate-y-4",
    isVisible && "opacity-100 translate-y-0",
    className
  ) : cn(
    "p-4",
    !isVisible && "opacity-0 translate-y-4",
    isVisible && "opacity-100 translate-y-0",
    "transition-all duration-500",
    className
  );

  return (
    <div className={cardClasses}>
      <div className="flex items-center justify-center gap-3 mb-8">
        {getPillarIcon(title)}
        <h3 className={cn(
          "text-xl font-semibold",
          isOverallScore ? "text-foreground" : "text-white"
        )}>
          {title}
        </h3>
      </div>
      <div className="space-y-6">
        <div className="flex justify-center">
          <ProgressBar 
            value={isVisible ? score : 0} 
            color={color} 
            variant="circle"
            size={isOverallScore ? 200 : 160}
          />
        </div>
        {!hideSubtext && (
          <div className="flex justify-center">
            <span className={cn(
              "text-sm font-medium",
              isOverallScore ? "text-muted-foreground" : "text-white/80"
            )}>
              {getFeedbackTier(animatedScore)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
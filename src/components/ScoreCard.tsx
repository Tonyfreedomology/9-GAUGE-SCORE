import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";
import { getFeedbackTier } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { getPillarIcon } from "@/lib/getPillarIcon";
import { hexToRgba } from "@/lib/utils/colorUtils";

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

  const cardClasses = cn(
    "p-4",
    !isVisible && "opacity-0 translate-y-4",
    isVisible && "opacity-100 translate-y-0",
    "transition-all duration-500",
    className
  );

  const scoreClasses = cn(
    "text-7xl font-bold",
    isOverallScore && "text-8xl"
  );

  const glowStyle = {
    color,
    filter: `drop-shadow(0 0 15px ${hexToRgba(color)})`,
    animation: 'glow 2s ease-in-out infinite'
  };

  return (
    <div className={cardClasses}>
      <div className="flex items-center justify-center gap-3 mb-8">
        {getPillarIcon(title)}
        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>
      </div>
      <div className="space-y-6">
        <div className="relative flex justify-center items-center">
          <ProgressBar 
            value={isVisible ? score : 0} 
            color={color} 
            variant="circle"
            size={isOverallScore ? 200 : 160}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span 
              className={scoreClasses}
              style={glowStyle}
            >
              {Math.round(animatedScore)}
            </span>
          </div>
        </div>
        {!hideSubtext && (
          <div className="flex justify-center">
            <span className="text-sm font-medium text-white/80">
              {getFeedbackTier(animatedScore)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
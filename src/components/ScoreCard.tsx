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
  return (
    <div className={cn(
      "p-6 rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}>
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <div className="space-y-4">
        <div className="flex justify-center">
          <ProgressBar 
            value={score} 
            color={color} 
            variant={isOverallScore ? 'circle' : 'line'}
            size={160}
          />
        </div>
        <div className="flex justify-center">
          <span className="text-sm text-muted-foreground">{getFeedbackTier(score)}</span>
        </div>
      </div>
    </div>
  );
};
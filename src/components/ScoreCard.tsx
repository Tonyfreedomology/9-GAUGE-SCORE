import { ProgressBar } from "./ProgressBar";
import { getFeedbackTier } from "@/lib/questions";
import { cn } from "@/lib/utils";

type ScoreCardProps = {
  title: string;
  score: number;
  color: string;
  className?: string;
};

export const ScoreCard = ({ title, score, color, className }: ScoreCardProps) => {
  return (
    <div className={cn(
      "p-6 rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-2">
        <ProgressBar value={score} color={color} />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{getFeedbackTier(score)}</span>
          <span className="font-medium">{Math.round(score)}%</span>
        </div>
      </div>
    </div>
  );
};
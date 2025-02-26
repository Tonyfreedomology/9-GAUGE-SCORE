import { getPillarIcon } from "@/lib/getPillarIcon";
import { ScoreLine } from "./ScoreLine";

type PillarScoresProps = {
  title: string;
  scores: { label: string; score: number; }[];
  color: string;
};

export const PillarScores = ({ title, scores, color }: PillarScoresProps) => (
  <div className="space-y-4 md:space-y-6 px-1">
    <div className="flex items-center justify-center gap-2 md:gap-3">
      {getPillarIcon(title)}
      <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tighter lowercase">{title}</h3>
    </div>
    <div className="space-y-6 md:space-y-8">
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

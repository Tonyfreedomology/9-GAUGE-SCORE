
import { HelpCircle } from "lucide-react";
import { FreedomologyLogo } from "../FreedomologyLogo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const getScoreTagline = (score: number): string => {
  if (score > 80) return "You're crushing it! Your balanced approach to life is paying off.";
  if (score > 70) return "You're building something special. Keep nurturing all areas of your life.";
  if (score > 60) return "You're making progress! Small steps lead to big transformations.";
  if (score > 50) return "You've taken the first step. Let's build your freedom together.";
  return "Your journey to freedom starts here. We're here to help you grow.";
};

export const ResultsHeader = ({ overallScore }: { overallScore: number }) => {
  return (
    <>
      <FreedomologyLogo variant="9gauge" />
      
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter lowercase">
            9-Gauge Score
          </h1>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  type="button"
                  className="hover:opacity-80 transition-opacity"
                >
                  <HelpCircle className="w-6 h-6 text-white/80 hover:text-white transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                align="center"
                className="max-w-xs bg-white text-foreground p-3 rounded-lg shadow-lg"
              >
                <p>Your 9-Gauge Score represents your overall well-being across Financial, Health, and Relationship dimensions. A higher score indicates greater freedom and balance in these key life areas.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xl text-white/90 font-medium">
          {getScoreTagline(overallScore)}
        </p>
      </div>
    </>
  );
};

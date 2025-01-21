import { FreedomologyLogo } from "../FreedomologyLogo";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const AssessmentHeader = () => {
  return (
    <>
      <FreedomologyLogo />
      
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Overall Freedomology Score
          </h1>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="cursor-help">
                  <HelpCircle className="w-6 h-6 text-white/80 hover:text-white transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs bg-white text-gray-900 p-3 rounded-lg shadow-lg">
                <p>Your Freedomology Score represents your overall well-being across financial, health, and relationship dimensions. A higher score indicates greater freedom and balance in these key life areas.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xl text-white/90 font-medium">
          You're on the path to thriving freedom. Keep growing!
        </p>
      </div>
    </>
  );
};
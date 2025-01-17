import { Heart, DollarSign, Users } from "lucide-react";
import { sprintContent, SprintContent } from "@/lib/sprintContent";
import { cn } from "@/lib/utils";

type NextStepsProps = {
  lowestPillar: string;
  onStartOver: () => void;
};

export const NextSteps = ({ lowestPillar, onStartOver }: NextStepsProps) => {
  const content = sprintContent[lowestPillar];
  
  const IconComponent = {
    heart: Heart,
    "dollar-sign": DollarSign,
    users: Users
  }[content.icon];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 space-y-8">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
        Your Next Step
      </h2>
      
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-6">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            {
              "bg-financial-light text-financial": content.color === "financial",
              "bg-health-light text-health": content.color === "health",
              "bg-relationships-light text-relationships": content.color === "relationships",
            }
          )}>
            <IconComponent className="w-8 h-8" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-center">
            {content.heading}
          </h3>
          
          <p className="text-lg text-center max-w-2xl leading-relaxed">
            {content.body}
          </p>
          
          <button
            className={cn(
              "mt-6 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105",
              {
                "bg-financial": content.color === "financial",
                "bg-health": content.color === "health",
                "bg-relationships": content.color === "relationships",
              }
            )}
          >
            {content.cta}
          </button>
        </div>
      </div>
    </div>
  );
};
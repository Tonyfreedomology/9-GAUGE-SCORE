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

  const getLogo = () => {
    switch (lowestPillar) {
      case "Relationships":
        return "https://static.wixstatic.com/media/c32598_2430f4e26a1d4123b1b40978409d938e~mv2.png";
      case "Health":
        return "https://static.wixstatic.com/media/c32598_562d75c90e6646bfb30ae54a5e0267af~mv2.png";
      case "Financial":
        return "https://static.wixstatic.com/media/c32598_42c88deef1e04279ab8800669ac7e634~mv2.png";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 space-y-8">
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
          
          <img 
            src={getLogo()} 
            alt={`${lowestPillar} Program Logo`}
            className="h-24 object-contain"
          />
          
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
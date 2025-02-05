
import { sprintContent } from "@/lib/sprintContent";
import { programs } from "@/lib/programContent";
import { WeekContent } from "./WeekContent";
import { useInView } from "react-intersection-observer";
import { SignupForm } from "./SignupForm";
import { getPillarIcon } from "@/lib/getPillarIcon";

type SprintCardProps = {
  lowestPillar: string;
};

export const SprintCard = ({ lowestPillar }: SprintCardProps) => {
  const capitalizedPillar = lowestPillar.charAt(0).toUpperCase() + lowestPillar.slice(1);
  const content = sprintContent[capitalizedPillar];
  const program = programs[capitalizedPillar];
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const getLogo = () => {
    switch (capitalizedPillar) {
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

  if (!content || !program) return null;

  const splitBody = content.body.split("<p>Here's what we cover:</p>");
  const introText = splitBody[0];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg text-foreground">
      <div className="flex flex-col items-center space-y-6">
        <img src={getLogo()} alt={`${capitalizedPillar} Sprint Logo`} className="h-24 object-contain" />
        <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter lowercase text-foreground">{content.heading}</h2>
        
        <div 
          className="text-lg text-center w-full text-foreground [&>p]:mb-4 last:[&>p]:mb-0" 
          dangerouslySetInnerHTML={{ __html: introText }} 
        />
        
        <div className="flex items-center justify-center space-x-6 mt-8">
          <div className="w-12 h-12 flex items-center justify-center">
            {getPillarIcon(capitalizedPillar)}
          </div>
          <h3 className="text-4xl font-heading font-bold tracking-tighter lowercase text-foreground text-center">
            THE SIX WEEKS
          </h3>
          <div className="w-12 h-12 flex items-center justify-center">
            {getPillarIcon(capitalizedPillar)}
          </div>
        </div>
        
        <div ref={ref} className="w-full space-y-12">
          {program.weeks.map((week, index) => (
            <WeekContent
              key={week.number}
              {...week}
              color={program.color}
              isOpen={true}
              index={index}
            />
          ))}
        </div>

        <div className="w-full max-w-md mx-auto mt-12">
          <SignupForm defaultSprint={capitalizedPillar} />
        </div>
      </div>
    </div>
  );
};

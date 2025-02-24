
import { sprintContent } from "@/lib/sprintContent";
import { programs } from "@/lib/programContent";
import { WeekContent } from "./WeekContent";
import { useInView } from "react-intersection-observer";
import { WaitlistForm } from "./WaitlistForm";
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
        return "https://static.wixstatic.com/media/af616c_6c7bc94cb73e40feb249900ca0af3168~mv2.png";
      case "Health":
        return "https://static.wixstatic.com/media/af616c_3876dd4492b3420c990b2a899ba9d956~mv2.png";
      case "Financial":
        return "https://static.wixstatic.com/media/af616c_3876dd4492b3420c990b2a899ba9d956~mv2.png";
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
        <h2 className="text-2xl md:text-4xl font-heading font-bold tracking-tighter lowercase text-foreground break-words md:break-normal w-full text-center">{content.heading}</h2>
        
        <div 
          className="text-base md:text-lg text-center w-full text-foreground [&>p]:mb-4 last:[&>p]:mb-0" 
          dangerouslySetInnerHTML={{ __html: introText }} 
        />
        
        <div className="flex items-center justify-center space-x-4 md:space-x-6 mt-8">
          <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
            {getPillarIcon(capitalizedPillar)}
          </div>
          <h3 className="text-2xl md:text-4xl font-heading font-bold tracking-tighter lowercase text-foreground text-center break-words md:break-normal">
            THE SIX WEEKS
          </h3>
          <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
            {getPillarIcon(capitalizedPillar)}
          </div>
        </div>
        
        <div ref={ref} className="w-full space-y-8 md:space-y-12">
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
          <WaitlistForm defaultSprint={capitalizedPillar} />
        </div>
      </div>
    </div>
  );
};

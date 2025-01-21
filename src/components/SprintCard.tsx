import { sprintContent } from "@/lib/sprintContent";
import { programs } from "@/lib/programContent";
import { WeekContent } from "./WeekContent";
import { useInView } from "react-intersection-observer";

type SprintCardProps = {
  lowestPillar: string;
};

export const SprintCard = ({ lowestPillar }: SprintCardProps) => {
  const content = sprintContent[lowestPillar];
  const program = programs[lowestPillar];
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
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

  const getLink = () => {
    switch (lowestPillar) {
      case "Relationships":
        return "https://www.freedomology.com/r40";
      case "Health":
        return "https://www.freedomology.com/h40";
      case "Financial":
        return "https://www.freedomology.com/f40";
      default:
        return "#";
    }
  };

  if (!program) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg text-foreground">
      <div className="flex flex-col items-center text-center space-y-6">
        <img src={getLogo()} alt={`${lowestPillar} Sprint Logo`} className="h-24 object-contain" />
        <h2 className="text-3xl font-serif text-foreground">{content.heading}</h2>
        <div className="text-lg max-w-2xl space-y-4 text-foreground" dangerouslySetInnerHTML={{ __html: content.body }} />
        
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

        <a 
          href={getLink()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-[#17BEBB] rounded-lg hover:bg-[#17BEBB]/90 transition-colors"
        >
          {content.cta}
        </a>
      </div>
    </div>
  );
};
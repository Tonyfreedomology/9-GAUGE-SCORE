
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { programs } from "@/lib/programContent";
import { WeekContent } from "./WeekContent";

type ProgramWeeksProps = {
  pillarName: string;
};

export const ProgramWeeks = ({ pillarName }: ProgramWeeksProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const program = programs[pillarName];
  if (!program) return null;

  return (
    <div ref={ref} className="w-full relative z-50">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-2"
      >
        <CollapsibleTrigger className="relative z-50 flex items-center justify-center w-full gap-2 px-8 py-4 text-lg font-medium text-white bg-black/20 rounded-xl hover:bg-black/30 transition-colors">
          Learn More About The Six Weeks
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )} />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-8">
          <div className="bg-[#293230] backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg mt-8">
            <h2 className="text-4xl font-heading text-white mb-12 text-center">The Six Weeks</h2>
            
            <div className="space-y-12">
              {program.weeks.map((week, index) => (
                <WeekContent
                  key={week.title}
                  title={week.title}
                  description={week.description}
                  number={week.number}
                  color={program.color}
                  index={index}
                />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

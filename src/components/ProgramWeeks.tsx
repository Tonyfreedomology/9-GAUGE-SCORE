import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

type WeekContent = {
  number: string;
  title: string;
  description: string;
};

type ProgramContent = {
  weeks: WeekContent[];
  color: string;
};

const programs: Record<string, ProgramContent> = {
  "Financial": {
    color: "financial",
    weeks: [
      {
        number: "01",
        title: "DESIGN",
        description: "Stop playing by everyone else's rules. It's time to design a life that works for you. This week, we'll show you how to re-engineer your time and build an intentional, abundant lifestyle without sacrificing a single goal."
      },
      {
        number: "02",
        title: "REDUCE",
        description: 'Money isn\'t about "deserving"—it\'s about action. This week, we\'re ripping apart the myths holding you back and helping you cut deadweight debts that drown your potential.'
      },
      {
        number: "03",
        title: "INVEST",
        description: "We're not just talking stocks and bonds—we're talking full-spectrum wealth building. This is your deep dive into how money really works and how to make it work for you."
      },
      {
        number: "04",
        title: "CREATE",
        description: "You don't have to wait around for wealth—create it. We'll show you how to generate assets from scratch, even if you're starting with zero."
      },
      {
        number: "05",
        title: "DEVELOP",
        description: "This week, it's all about who you are becoming. We're talking unshakable confidence, an unbreakable attitude, and a vision that'll change everything."
      },
      {
        number: "06",
        title: "PROTECT",
        description: "You've built it—now protect it. This week is all about fortifying your empire, keeping what's yours safe, and setting up protection against the threats most people ignore."
      }
    ]
  },
  "Health": {
    color: "health",
    weeks: [
      {
        number: "01",
        title: "ADAM",
        description: "Become a morning person. It's all about establishing a morning routine that starts your day off the right way. It's simple but incredibly important, and foundational to everything else we're doing."
      },
      {
        number: "02",
        title: "EAT",
        description: "Change your relationship to food. We're going to start to see food as a fuel source, and something that can make us feel great, not just while we're eating, but long after it as well."
      },
      {
        number: "03",
        title: "MOVE",
        description: "Recognize movement as a gift. This is where we start to introduce exercise routines and again, change the way we view ourselves and the movement of our bodies. The big idea here is that exercise and movement isn't something we have to do, it's something we get to do. We're going to help you fall in love with exercise."
      },
      {
        number: "04",
        title: "HAaK",
        description: "Optimize for your body + heal. This week is all about Biohacking. If that's a new term for you, it just means optimizing our physical health at the cellular level. This is where we'll cover supplements and out of the box strategies for optimizing our physical health."
      },
      {
        number: "05",
        title: "FLOW",
        description: "Create spaces you love being in. This week we're going to talk about HOW and WHY your environments are so important to your physical and mental health AND then transform one of your living spaces, or workspaces."
      },
      {
        number: "06",
        title: "REST",
        description: "Get the best night's sleep possible. Sleep isn't just something we do between our healthy habits, sleep is a foundation for our health, and it's important that we get this right. So we're going to show you several ways you can improve the quality of your sleep, and some things you probably haven't tried."
      }
    ]
  },
  "Relationships": {
    color: "relationships",
    weeks: [
      {
        number: "01",
        title: "CONNECT",
        description: "It's all about how we are hardwired for connection and that life isn't meant to be done alone. We believe that people matter more than anything, and that the best part about life is experiencing the world with people you love."
      },
      {
        number: "02",
        title: "REFLECT",
        description: "It's all about reflecting on your relationship with yourself. How you see yourself and what you believe about yourself impacts every other relationship you have. You'll learn how to treat yourself as someone worth caring about, drop limiting beliefs, and transform your self-image."
      },
      {
        number: "03",
        title: "ATTRACT",
        description: "You'll learn how to be a person who has values, and lives by them. To be a person who adds value. It's about becoming an attractive character - someone who serves others, and lives a principled life."
      },
      {
        number: "04",
        title: "CORRECT",
        description: "We talk about why relationships fall apart, what goes wrong and why. You'll learn to spot the ways that you might have contributed to unhealthy patterns in relationships so that you can correct them. It's the week where you'll take a good hard look at yourself and the ways you may have hurt others."
      },
      {
        number: "05",
        title: "RESPECT",
        description: "This week is all about mending fences and being able to treat people with respect, even when they hurt us. Conflict is inevitable in close relationships - it's how you handle it that matters. Every deep relationship has survived conflict and come out the other side stronger. This week, we'll share the secrets to navigating hurts and moving through them."
      },
      {
        number: "06",
        title: "PERFECT",
        description: "You'll learn how living a life of relentless unconditional love is only possible through a relationship with God. We believe that God is perfectly for you and not against you. He is the only one who loves perfectly, and we need to lay on him to be our source of strength. What you believe about God, and more importantly, what you believe God thinks about YOU will transform your entire outlook on life."
      }
    ]
  }
};

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
    <div ref={ref} className="w-full">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-2"
      >
        <CollapsibleTrigger className="flex items-center justify-center w-full gap-2 px-8 py-4 text-lg font-medium text-white bg-black/20 rounded-xl hover:bg-black/30 transition-colors">
          Learn More About The Six Weeks
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )} />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-8">
          <div className="bg-[#293230] backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg mt-8">
            <h2 className="text-4xl font-serif text-white mb-12">The Six Weeks</h2>
            
            <div className="space-y-12">
              {program.weeks.map((week, index) => (
                <div
                  key={week.number}
                  className={cn(
                    "opacity-0 translate-y-4 transition-all duration-700",
                    isOpen && inView && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-6 mb-8">
                    <span className={`text-${program.color}/60 text-xl`}>{week.number}</span>
                    <div>
                      <h3 className="text-white text-xl font-semibold mb-2">{week.title}</h3>
                      <p className="text-white/80 leading-relaxed">{week.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
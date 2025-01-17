import { sprintContent } from "@/lib/sprintContent";
import { cn } from "@/lib/utils";
import { ScrollPrompt } from "./ScrollPrompt";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useInView } from "react-intersection-observer";

type NextStepsProps = {
  lowestPillar: string;
  onStartOver: () => void;
};

const WeekContent = ({ number, title, description }: { number: string, title: string, description: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div 
      ref={ref}
      className={cn(
        "opacity-0 translate-y-4 transition-all duration-700",
        inView && "opacity-100 translate-y-0"
      )}
    >
      <div className="flex gap-6 mb-8">
        <span className="text-relationships/60 text-xl">{number}</span>
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
          <p className="text-white/80 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const NextSteps = ({ lowestPillar, onStartOver }: NextStepsProps) => {
  const [date, setDate] = useState<Date>();
  const content = sprintContent[lowestPillar];
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      sprintType: formData.get('sprintType'),
      startDate: date
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col items-center text-center space-y-6">
          <img src={getLogo()} alt={`${lowestPillar} Sprint Logo`} className="h-24 object-contain" />
          <h2 className="text-3xl font-serif">{content.heading}</h2>
          <p className="text-lg max-w-2xl">{content.body}</p>
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

      <div className="relative h-24 flex items-center justify-center">
        <ScrollPrompt />
      </div>

      <div className="bg-[#293230] backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
        <h2 className="text-4xl font-serif text-white mb-12">The Six Weeks</h2>
        
        <div className="space-y-12">
          <WeekContent 
            number="01"
            title="CONNECT"
            description="It's all about how we are hardwired for connection and that life isn't meant to be done alone. We believe that people matter more than anything, and that the best part about life is experiencing the world with people you love."
          />
          
          <WeekContent 
            number="02"
            title="REFLECT"
            description="It's all about reflecting on your relationship with yourself. How you see yourself and what you believe about yourself impacts every other relationship you have. You'll learn how to treat yourself as someone worth caring about, drop limiting beliefs, and transform your self-image."
          />
          
          <WeekContent 
            number="03"
            title="ATTRACT"
            description="You'll learn how to be a person who has values, and lives by them. To be a person who adds value. It's about becoming an attractive character - someone who serves others, and lives a principled life."
          />
          
          <WeekContent 
            number="04"
            title="CORRECT"
            description="We talk about why relationships fall apart, what goes wrong and why. You'll learn to spot the ways that you might have contributed to unhealthy patterns in relationships so that you can correct them. It's the week where you'll take a good hard look at yourself and the ways you may have hurt others."
          />
          
          <WeekContent 
            number="05"
            title="RESPECT"
            description="This week is all about mending fences and being able to treat people with respect, even when they hurt us. Conflict is inevitable in close relationships - it's how you handle it that matters. Every deep relationship has survived conflict and come out the other side stronger. This week, we'll share the secrets to navigating hurts and moving through them."
          />
          
          <WeekContent 
            number="06"
            title="PERFECT"
            description="You'll learn how living a life of relentless unconditional love is only possible through a relationship with God. We believe that God is perfectly for you and not against you. He is the only one who loves perfectly, and we need to lay on him to be our source of strength. What you believe about God, and more importantly, what you believe God thinks about YOU will transform your entire outlook on life."
          />
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-3xl font-serif font-bold text-center mb-8">
          Sign up for a FREE 40-day Challenge NOW
        </h2>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sprintType">Sprint Type</Label>
            <Select name="sprintType" required>
              <SelectTrigger>
                <SelectValue placeholder="Select your sprint" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="H40">H40 - Health Sprint</SelectItem>
                <SelectItem value="F40">F40 - Financial Sprint</SelectItem>
                <SelectItem value="R40">R40 - Relationships Sprint</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
          >
            Sign Up Now
          </Button>
        </form>
      </div>
    </div>
  );
};

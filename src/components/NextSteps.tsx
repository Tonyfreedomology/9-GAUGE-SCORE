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

type NextStepsProps = {
  lowestPillar: string;
  onStartOver: () => void;
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
    // Here you would typically send this data to your backend
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-6">
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
          
          <a
            href={getLink()}
            target="_blank"
            rel="noopener noreferrer"
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
          </a>
        </div>
      </div>

      <ScrollPrompt />

      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg mt-12">
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
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const SignupForm = () => {
  const [date, setDate] = useState<Date>();

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
  );
};
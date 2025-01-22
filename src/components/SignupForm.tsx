import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import DatePicker from "react-datepicker";
import { useToast } from "./ui/use-toast";
import "react-datepicker/dist/react-datepicker.css";

type SignupFormProps = {
  defaultSprint?: string;
};

export const SignupForm = ({ defaultSprint }: SignupFormProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getDefaultSprintValue = () => {
    switch (defaultSprint) {
      case "Health":
        return "H40";
      case "Financial":
        return "F40";
      case "Relationships":
        return "R40";
      default:
        return undefined;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const formValues = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      sprintType: formData.get('sprintType'),
      startDate: date?.toISOString()
    };

    setIsLoading(true);
    console.log("Form submission:", formValues);

    try {
      // Replace this URL with your actual Zapier webhook URL
      const response = await fetch("YOUR_ZAPIER_WEBHOOK_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(formValues),
      });

      toast({
        title: "Success!",
        description: "Your registration has been submitted. We'll be in touch soon!",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold">Ready to start?</h2>
        <h3 className="text-2xl font-serif font-bold mt-2">Sign up for FREE now!</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sprintType">Sprint Type</Label>
            <Select name="sprintType" defaultValue={getDefaultSprintValue()} required>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select your sprint" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="H40">H40 - Health Sprint</SelectItem>
                <SelectItem value="F40">F40 - Financial Sprint</SelectItem>
                <SelectItem value="R40">R40 - Relationships Sprint</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="startDate">Start Date</Label>
            <DatePicker
              id="startDate"
              selected={date}
              onChange={(date: Date) => setDate(date)}
              className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholderText="Pick a date"
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#17BEBB] hover:bg-[#17BEBB]/90 text-white rounded-full"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Sign Up Now"}
        </Button>
      </form>
    </div>
  );
};
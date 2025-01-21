import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

type SignupFormProps = {
  defaultSprintType?: string;
};

export const SignupForm = ({ defaultSprintType = "F40" }: SignupFormProps) => {
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Starting form submission...");

    try {
      // Fetch the webhook URL from Supabase
      const { data: secretData, error: secretError } = await supabase
        .from('secrets')
        .select('value')
        .eq('name', 'ZAPIER_WEBHOOK_URL')
        .single();

      if (secretError || !secretData) {
        console.error("Error fetching webhook URL:", secretError);
        toast({
          title: "Configuration Error",
          description: "Unable to process your signup. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      const webhookUrl = secretData.value;
      console.log("Retrieved webhook URL:", webhookUrl); // Log the webhook URL

      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        sprintType: formData.get('sprintType'),
        startDate: date?.toISOString(),
        timestamp: new Date().toISOString(),
        source: window.location.origin
      };

      console.log("Submitting data to Zapier:", data);

      // Modified fetch request with better error handling
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(data),
      });

      // Since we're using no-cors, we won't get a response status
      // Instead, we'll assume success if we get here without an error
      console.log("Zapier webhook request completed");
      
      toast({
        title: "Success!",
        description: "You've been signed up for the sprint. Check your email for next steps!",
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
      setDate(undefined);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem signing you up. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-serif font-bold text-center mb-8">
        Ready to start?
        <br />
        Sign up for FREE now!
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <Select name="sprintType" defaultValue={defaultSprintType} required>
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
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
                  "w-full justify-start text-left font-normal bg-white",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="bg-white"
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#17BEBB] hover:bg-[#17BEBB]/90 text-white rounded-full"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up Now"}
        </Button>
      </form>
    </div>
  );
};
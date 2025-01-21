import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FormInput } from "./form/FormInput";
import { SprintTypeSelect } from "./form/SprintTypeSelect";
import { StartDatePicker } from "./form/StartDatePicker";

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
      console.log("Retrieved webhook URL:", webhookUrl);

      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        sprintType: formData.get('sprintType'),
        startDate: date?.toISOString(),
        timestamp: new Date().toISOString(),
        source: window.location.origin
      };

      console.log("Submitting data to Zapier:", data);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(data),
      });

      console.log("Zapier webhook request completed");
      
      toast({
        title: "Success!",
        description: "You've been signed up for the sprint. Check your email for next steps!",
      });

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput id="firstName" label="First Name" required />
          <FormInput id="lastName" label="Last Name" required />
        </div>

        <FormInput id="email" label="Email" type="email" required />
        <FormInput id="phone" label="Phone Number" type="tel" required />
        
        <SprintTypeSelect defaultValue={defaultSprintType} />
        <StartDatePicker date={date} setDate={setDate} />

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
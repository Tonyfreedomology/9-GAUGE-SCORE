import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormInput } from "./form/FormInput";
import { SprintTypeSelect } from "./form/SprintTypeSelect";
import { StartDatePicker } from "./form/StartDatePicker";
import { CheckCircle2 } from "lucide-react";

type SignupFormProps = {
  defaultSprintType?: string;
};

export const SignupForm = ({ defaultSprintType = "F40" }: SignupFormProps) => {
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form submission started");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      sprintType: formData.get("sprintType"),
      startDate: date?.toISOString(),
    };

    console.log("Form data:", data);

    try {
      const webhookUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;
      
      if (!webhookUrl) {
        throw new Error("Zapier webhook URL not configured");
      }

      console.log("Sending request to Zapier webhook");
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Zapier webhook request completed successfully");
      setIsSuccess(true);
      
      toast({
        title: "Success!",
        description: "Your registration has been received. Check your email for next steps.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto text-center space-y-4 p-6 bg-green-50 rounded-lg">
        <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
        <h2 className="text-2xl font-serif font-bold text-green-800">
          Thank you for signing up!
        </h2>
        <p className="text-green-700">
          We've received your registration. Check your email for next steps and information about your sprint.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Name"
          name="name"
          type="text"
          placeholder="Your full name"
          required
        />
        
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        
        <FormInput
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Your phone number"
          required
        />

        <SprintTypeSelect defaultValue={defaultSprintType} />
        
        <StartDatePicker
          selected={date}
          onSelect={setDate}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#17BEBB] to-[#00D4FF] text-white px-8 py-4 rounded-xl
            text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? "Submitting..." : "Start Your Sprint"}
        </button>
      </form>
    </div>
  );
};
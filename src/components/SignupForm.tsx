import { useState } from "react";
import { FormInput } from "./form/FormInput";
import { SprintTypeSelect } from "./form/SprintTypeSelect";
import { StartDatePicker } from "./form/StartDatePicker";
import { useToast } from "@/hooks/use-toast";

type SignupFormProps = {
  defaultSprintType?: string;
};

export const SignupForm = ({ defaultSprintType = "F40" }: SignupFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submission started");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      sprintType: formData.get("sprintType"),
      startDate: startDate.toISOString(),
    };

    try {
      console.log("Sending data to Zapier webhook:", data);
      const response = await fetch(
        "https://hooks.zapier.com/hooks/catch/15559669/3ivp9jj/",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Form submitted successfully");
      toast({
        title: "Thank you for signing up!",
        description: "We'll be in touch soon.",
      });

      // Reset form
      e.currentTarget.reset();
      setStartDate(new Date());
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="First Name"
        name="firstName"
        type="text"
        placeholder="Enter your first name"
        required={true}
      />

      <FormInput
        label="Last Name"
        name="lastName"
        type="text"
        placeholder="Enter your last name"
        required={true}
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        required={true}
      />

      <SprintTypeSelect defaultValue={defaultSprintType} />

      <StartDatePicker
        selected={startDate}
        onSelect={(date) => date && setStartDate(date)}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#3ECF8E] text-white py-3 rounded-md font-semibold hover:bg-[#3ECF8E]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Start Your Sprint"}
      </button>
    </form>
  );
};
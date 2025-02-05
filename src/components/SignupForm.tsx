import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SprintSelect } from "./signup/SprintSelect";
import { EmailInput } from "./signup/EmailInput";
import { Input } from "./ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

type SignupFormProps = {
  defaultSprint?: string;
};

export const SignupForm = ({ defaultSprint }: SignupFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sprint, setSprint] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchWebhookUrl = async () => {
      try {
        const { data, error } = await supabase
          .from("secrets")
          .select("value")
          .eq("name", "ZAPIER_WEBHOOK_URL")
          .single();

        if (error) {
          console.error("Error fetching webhook URL:", error);
          return;
        }

        if (data) {
          setWebhookUrl(data.value);
        }
      } catch (error) {
        console.error("Error in fetchWebhookUrl:", error);
      }
    };

    fetchWebhookUrl();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { firstName, lastName, email, phone, sprint, startDate });

    if (!webhookUrl) {
      console.error("Webhook URL not found");
      toast({
        title: "Error",
        description: "Unable to process signup. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          sprint,
          startDate: startDate ? format(startDate, 'MM/dd/yyyy') : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast({
        title: "Success!",
        description: "You've been signed up successfully.",
        className: "bg-white border border-gray-200",
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setSprint("");
      setStartDate(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Unable to process signup. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-bold tracking-tighter lowercase mb-2">Ready to start?</h2>
        <p className="text-xl">Sign up for a FREE 40-day challenge NOW!</p>
      </div>
      
      <div className="bg-[#f4f4f4] p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name fields row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>

          {/* Contact fields row */}
          <div className="grid grid-cols-2 gap-4">
            <EmailInput 
              value={email}
              onChange={setEmail}
            />

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>

          {/* Sprint and Date row */}
          <div className="grid grid-cols-2 gap-4">
            <SprintSelect 
              defaultSprint={defaultSprint}
              onChange={setSprint}
            />

            <div className="space-y-2">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="MM/dd/yyyy"
                placeholderText="Select a date"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#17BEBB] rounded-full hover:bg-[#14a8a5] transition-colors"
          >
            Start Your Journey
          </button>
        </form>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SprintSelect } from "./signup/SprintSelect";
import { EmailInput } from "./signup/EmailInput";

type SignupFormProps = {
  defaultSprint?: string;
};

export const SignupForm = ({ defaultSprint }: SignupFormProps) => {
  const [email, setEmail] = useState("");
  const [sprint, setSprint] = useState("");
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
    console.log("Form submitted with:", { email, sprint });

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
          email,
          sprint,
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

      setEmail("");
      setSprint("");
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
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <EmailInput 
          value={email}
          onChange={setEmail}
        />
        
        <SprintSelect 
          defaultSprint={defaultSprint}
          onChange={setSprint}
        />

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-[#17BEBB] rounded-md hover:bg-[#14a8a5] transition-colors"
        >
          Start Your Journey
        </button>
      </form>
    </div>
  );
};
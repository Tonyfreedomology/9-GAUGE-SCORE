
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "./ui/input";

type WaitlistFormProps = {
  defaultSprint?: string;
};

export const WaitlistForm = ({ defaultSprint }: WaitlistFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, save to Supabase
      const { error: supabaseError } = await supabase
        .from("waitlist_entries")
        .insert({
          first_name: firstName,
          email,
          source: defaultSprint ? `Waitlist - ${defaultSprint}` : "Waitlist",
        });

      if (supabaseError) {
        throw supabaseError;
      }

      // Then create contact in GHL
      const ghlResponse = await fetch(
        'https://kcuhvqemmkghjauefzdx.supabase.co/functions/v1/create-ghl-contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            email,
            source: defaultSprint ? `Waitlist - ${defaultSprint}` : "Waitlist",
          }),
        }
      );

      if (!ghlResponse.ok) {
        console.error('GHL API Error:', await ghlResponse.json());
        // We don't throw here because the entry is already in Supabase
        toast({
          title: "Partial Success",
          description: "You've been added to the waitlist, but there was an issue with our notification system.",
          className: "bg-white border border-gray-200",
        });
      } else {
        toast({
          title: "Success!",
          description: "You've been added to the waitlist.",
          className: "bg-white border border-gray-200",
        });
      }

      // Reset form
      setFirstName("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Unable to join waitlist. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter lowercase mb-2">Join the waitlist</h2>
        <p className="text-xl">Be the first to know when we launch!</p>
      </div>
      
      <div className="bg-[#f4f4f4] p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-[#17BEBB] rounded-full hover:bg-[#14a8a5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Join Waitlist"}
          </button>
        </form>
      </div>
    </div>
  );
};

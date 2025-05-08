import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "./ui/input";
import { motion } from "framer-motion";

type WaitlistFormProps = {
  defaultSprint?: string;
};

export const WaitlistForm = ({ defaultSprint }: WaitlistFormProps) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Get the appropriate color for the current sprint
  const getSprintColor = () => {
    if (!defaultSprint) return '#17BEBB';
    
    switch (defaultSprint) {
      case 'Health':
        return '#22DFDC';
      case 'Financial':
        return '#00E8A9';
      case 'Relationships':
        return '#FF105F';
      default:
        return '#17BEBB';
    }
  };

  const sprintColor = getSprintColor();

  // Get appropriate text color for contrast against the sprint color
  const getTextColor = () => {
    switch (defaultSprint) {
      case 'Health':
      case 'Financial':
        return '#003A47'; // Darker text for light backgrounds
      case 'Relationships':
        return '#FFFFFF'; // White text for dark backgrounds
      default:
        return '#003A47';
    }
  };

  const textColor = getTextColor();

  useEffect(() => {
    // Create a style element for our animations
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes border-pulse {
        0% { border-color: ${sprintColor}90; box-shadow: 0 0 10px ${sprintColor}40; }
        50% { border-color: ${sprintColor}; box-shadow: 0 0 20px ${sprintColor}60; }
        100% { border-color: ${sprintColor}90; box-shadow: 0 0 10px ${sprintColor}40; }
      }
      
      @keyframes button-glow {
        0% { box-shadow: 0 0 12px ${sprintColor}50; }
        50% { box-shadow: 0 0 25px ${sprintColor}90, 0 0 35px ${sprintColor}50; }
        100% { box-shadow: 0 0 12px ${sprintColor}50; }
      }

      .custom-input:focus {
        border-color: ${sprintColor};
        box-shadow: 0 0 0 3px ${sprintColor}40;
      }
    `;
    
    // Add it to the document head
    document.head.appendChild(style);
    
    // Clean up on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, [sprintColor]);

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

      // Then create contact in GHL using Supabase Edge Function
      const { data: ghlData, error: ghlError } = await supabase.functions.invoke(
        'create-ghl-contact',
        {
          body: JSON.stringify({
            firstName,
            email,
            source: defaultSprint ? `Waitlist - ${defaultSprint}` : "Waitlist",
            action: "waitlist"
          }),
        }
      );

      if (ghlError) {
        console.error('GHL API Error:', ghlError);
        // We don't throw here because the entry is already in Supabase
        toast({
          title: "Partial Success",
          description: "You've been added to the waitlist, but there was an issue with our notification system.",
          className: "bg-white border border-gray-200",
        });
      } else {
        // Instead of showing a toast, redirect to thank you page
        navigate("/assessments/thankyou");
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
        <motion.h2 
          className="text-4xl md:text-5xl font-heading font-extrabold tracking-tighter lowercase mb-3 text-foreground py-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: `linear-gradient(to right, ${sprintColor}, ${sprintColor}AA)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 2px 4px rgba(0,0,0,0.1)`,
            paddingBottom: '0.2em',
            position: 'relative',
            display: 'inline-block',
            lineHeight: '1.3'
          }}
        >
          join the waitlist
        </motion.h2>
        <motion.p 
          className="text-xl text-foreground/80 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Be the first to know when we launch!
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl p-8 rounded-2xl border-2"
        style={{ 
          borderColor: sprintColor,
          boxShadow: `0 15px 30px ${sprintColor}25, 0 8px 20px rgba(0,0,0,0.08)`,
          animation: 'border-pulse 3s infinite ease-in-out'
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Name
            </label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-xl border-gray-300 focus:border-gray-400 focus:ring focus:ring-opacity-50 custom-input"
              style={{ 
                borderRadius: '0.75rem',
                transition: 'all 0.2s ease',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                padding: '0.75rem 1rem',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-gray-300 focus:border-gray-400 focus:ring focus:ring-opacity-50 custom-input"
              style={{ 
                borderRadius: '0.75rem',
                transition: 'all 0.2s ease',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                padding: '0.75rem 1rem',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ 
              background: `linear-gradient(135deg, ${sprintColor} 0%, ${sprintColor}cc 100%)`,
              animation: 'button-glow 2.5s infinite ease-in-out',
              color: textColor
            }}
            className="w-full px-5 py-4 font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="relative z-10 font-bold tracking-wide flex items-center justify-center">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: textColor }}>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Join Waitlist 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: textColor }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${sprintColor}cc 0%, ${sprintColor} 100%)`,
              }}
            />
          </motion.button>
          
          <div className="text-center text-xs text-gray-500 mt-4">
            <p>We respect your privacy. No spam, ever.</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

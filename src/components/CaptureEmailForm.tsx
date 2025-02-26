import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "./ui/input";
import { trackFacebookEvent, FB_EVENTS } from "@/lib/utils/facebookTracking";
import { ArrowRight, CheckCircle, BarChart2, PieChart, Activity } from "lucide-react";

type CaptureEmailFormProps = {
  onComplete: (firstName: string, email: string) => void;
};

export const CaptureEmailForm = ({ onComplete }: CaptureEmailFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Save to Supabase
      const { error: supabaseError } = await supabase
        .from("waitlist_entries")
        .insert({
          first_name: firstName,
          email,
          source: "Assessment",
        });

      if (supabaseError) {
        throw supabaseError;
      }

      // Create contact in GHL using Supabase Edge Function
      const { error: ghlError } = await supabase.functions.invoke(
        'create-ghl-contact',
        {
          body: JSON.stringify({
            firstName,
            email,
            source: "Assessment",
          }),
        }
      );

      if (ghlError) {
        console.error('GHL API Error:', ghlError);
      }

      // Track lead capture event with Meta Pixel
      trackFacebookEvent("Lead", { 
        content_name: "Assessment Email Capture",
        content_category: "Assessment",
        value: 1
      });

      // Complete the form and proceed to results
      onComplete(firstName, email);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Unable to save your information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.1)'
      }}
    >
      {/* Top section with highlight gradient */}
      <div className="relative pt-6 pb-3 px-8 md:px-10">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#23F1EE] via-[#19AFAD] to-[#00805D]"></div>
        <motion.h2 
          className="text-3xl md:text-4xl font-heading font-bold tracking-tighter lowercase mb-1 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Your Results Are Ready!
        </motion.h2>
        
        <motion.p 
          className="text-lg text-center text-gray-600 mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Enter your name and email to see your personalized 9-Gauge Score and recommendations.
        </motion.p>
      </div>
      
      {/* Form section */}
      <div className="px-8 md:px-10 py-6 bg-gray-50/80">
        {error && (
          <div className="p-3 mb-4 bg-red-50 border border-red-100 text-red-700 rounded-lg text-center text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all duration-200"
              style={{ 
                height: '2.75rem',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
              }}
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all duration-200"
              style={{ 
                height: '2.75rem',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
              }}
              required
              disabled={isLoading}
            />
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 mt-2 bg-gradient-to-r from-[#23F1EE] to-[#19AFAD] text-white font-medium text-lg rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden flex items-center justify-center"
            style={{ 
              boxShadow: '0 4px 12px rgba(25,175,173,0.4)'
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Preparing Results
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Show Me My Results
                <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </motion.button>
        </form>
      </div>
      
      {/* Explanation section */}
      <div className="px-8 md:px-10 pt-6 pb-8">
        {/* 9-Gauge Score explanation */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-teal-500 flex-shrink-0">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Your <span className="font-bold">9-Gauge Score</span>
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed pl-8">
            Isn't just a number—it's your report card for life. It actively measures YOUR health (physical + environmental + mental), wealth (income + independence, impact) and happiness (great relationships with others + Self + God).
          </p>
          
          <p className="text-gray-600 text-sm leading-relaxed mt-2 pl-8">
            While the world preaches nonstop hustle, we've learned over 15 years and 11,000+ lives that balance is the real superpower. When your money, wellness, and connections align, everything feels freer, richer, and more fun.
          </p>
        </div>
        
        {/* How we arrive at your score */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-teal-500 flex-shrink-0">
              <PieChart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              So how did we arrive at your score?
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed pl-8">
            Each pillar gets a rating from 0 to 100, based on things like debt, investments, generosity, mental + physical health, and your vibe with those around you (including YOU). 
          </p>
          
          <p className="text-gray-600 text-sm leading-relaxed mt-2 pl-8">
            If any key area lags—say, your mental well-being or generosity—your overall score gets capped. Together, let's redefine what SUCCESS really means!
          </p>
        </div>
        
        {/* Next steps */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-teal-500 flex-shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Boost your score and find balance
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed pl-8">
            Get your score now to receive our tips to improve your life. Whether it's freedom in your health, wealth, or relationships, our 40-day sprints are designed to help you grow where it really counts.
          </p>
          
          <div className="mt-5 pt-4 border-t border-gray-200 flex justify-center">
            <motion.div 
              className="flex gap-2 items-center text-[#19AFAD] text-sm font-medium"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Enter your details above to see your personalized results
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

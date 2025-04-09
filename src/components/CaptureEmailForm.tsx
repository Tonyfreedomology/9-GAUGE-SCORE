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
      console.log(`Attempting to create GHL contact for ${email} with Assessment tag`);
      
      try {
        const { data: ghlData, error: ghlError } = await supabase.functions.invoke(
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
          console.error({
            error_type: 'api_error',
            error_message: ghlError.message || 'Unknown GHL error',
            user_email: email
          });
          
          // We don't throw here to allow the user to continue to results
          // But we do want to track these failures
        } else {
          console.log('Successfully created GHL contact:', ghlData);
        }
      } catch (ghlIntegrationError) {
        // This catches any unexpected errors in the function invocation itself
        console.error('Unexpected GHL integration error:', ghlIntegrationError);
        console.error({
          error_type: 'integration_error',
          error_message: ghlIntegrationError.message || 'Unknown integration error',
          user_email: email
        });
        // Still don't throw, let the user continue to results
      }

      // Complete the form and proceed to results
      // Note: CompleteAssessment is tracked when capture page loads
      // CompleteRegistration will be tracked on the results page
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
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#22DFDC] via-[#19AFAD] to-[#00805D]"></div>
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
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Name
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
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
            className="w-full h-12 mt-2 bg-gradient-to-r from-[#22DFDC] to-[#19AFAD] text-white font-medium text-lg rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden flex items-center justify-center"
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
            Isn't just a number—it's your <strong>report card for life</strong>. It actively measures YOUR <em>health</em> (physical + environmental + mental), <em>wealth</em> (income + independence, impact) and <em>happiness</em> (great relationships with others + Self + God).
          </p>
          
          <p className="text-gray-600 text-sm leading-relaxed mt-2 pl-8">
            While the world preaches <em>nonstop hustle</em>, we've learned over <strong>15 years</strong> and <strong>7,000+ lives</strong> that <u>balance is the real superpower</u>. When your money, wellness, and connections align, everything feels <strong>freer, richer, and more fun</strong>.
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
            Each pillar gets a <strong>rating from 0 to 100</strong>, based on things like <em>debt, investments, generosity, mental + physical health</em>, and your <em>vibe with those around you</em> (including <strong>YOU</strong>). 
          </p>
          
          <p className="text-gray-600 text-sm leading-relaxed mt-2 pl-8">
            If any <em>key area lags</em>—say, your mental well-being or generosity—your <strong>overall score gets capped</strong>. Together, let's <u>redefine what SUCCESS really means</u>!
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
            Get your score now to receive our <strong>tips to improve your life</strong>. Whether it's <em>freedom in your health, wealth, or relationships</em>, our <strong>40-day sprints</strong> are designed to help you <u>grow where it really counts</u>.
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

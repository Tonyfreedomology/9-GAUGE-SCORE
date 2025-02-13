
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { LoginCard } from "@/components/analytics/LoginCard";
import { StatCard } from "@/components/analytics/StatCard";
import { QuestionAnalytics } from "@/components/analytics/QuestionAnalytics";
import { useAnalytics } from "@/hooks/useAnalytics";

const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const { toast } = useToast();
  const { 
    analytics, 
    questions, 
    questionAnalytics, 
    fetchAnalytics, 
    fetchQuestionAnalytics 
  } = useAnalytics();

  const checkPassphrase = async () => {
    const { data, error } = await supabase
      .from('dashboard_config')
      .select('passphrase')
      .maybeSingle();

    if (error) {
      console.error('Error checking passphrase:', error);
      return false;
    }

    if (!data) {
      console.error('No passphrase configuration found');
      return false;
    }

    return data.passphrase === passphrase;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isValid = await checkPassphrase();
      
      if (isValid) {
        setAuthorized(true);
        await fetchAnalytics();
        toast({
          title: "Success",
          description: "Access granted to analytics dashboard",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid passphrase",
        });
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while checking the passphrase",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSelect = (questionId: string) => {
    setSelectedQuestion(questionId);
    fetchQuestionAnalytics(questionId);
  };

  useEffect(() => {
    if (authorized) {
      fetchAnalytics();
    }
  }, [authorized]);

  if (!authorized) {
    return (
      <LoginCard
        loading={loading}
        passphrase={passphrase}
        onPassphraseChange={setPassphrase}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <StatCard
          title="Total Assessments Started"
          description="Number of people who started the assessment"
          value={analytics.totalStarted}
        />
        <StatCard
          title="Completed Assessments"
          description="Number of people who completed the assessment"
          value={analytics.totalCompleted}
        />
      </div>

      <QuestionAnalytics
        questions={questions}
        selectedQuestion={selectedQuestion}
        onQuestionSelect={handleQuestionSelect}
        analytics={questionAnalytics}
      />
    </div>
  );
};

export default Analytics;

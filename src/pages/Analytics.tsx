import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { LoginCard } from "@/components/analytics/LoginCard";
import { StatCard } from "@/components/analytics/StatCard";
import { QuestionDistribution } from "@/components/analytics/QuestionDistribution";

const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [stats, setStats] = useState({
    totalStarted: 0,
    totalCompleted: 0
  });
  const [questions, setQuestions] = useState<Array<{ id: number; question_text: string }>>([]);
  const { toast } = useToast();

  const checkPassphrase = async () => {
    const { data, error } = await supabase
      .from('dashboard_config')
      .select('passphrase')
      .maybeSingle();

    if (error) {
      console.error('Error checking passphrase:', error);
      return false;
    }

    return data?.passphrase === passphrase;
  };

  const fetchBasicStats = async () => {
    try {
      // Get assessment completion stats
      const { data: assessments, error: assessmentError } = await supabase
        .from('assessments')
        .select('completed');

      if (assessmentError) throw assessmentError;

      const totalStarted = assessments?.length || 0;
      const totalCompleted = assessments?.filter(a => a.completed)?.length || 0;

      setStats({ totalStarted, totalCompleted });

      // Fetch questions
      const { data: questionData, error: questionError } = await supabase
        .from('assessment_questions')
        .select('id, question_text')
        .order('id');

      if (questionError) throw questionError;
      setQuestions(questionData || []);

    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load analytics data"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isValid = await checkPassphrase();
      
      if (isValid) {
        setAuthorized(true);
        await fetchBasicStats();
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

  useEffect(() => {
    if (authorized) {
      fetchBasicStats();
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
          value={stats.totalStarted}
        />
        <StatCard
          title="Completed Assessments"
          description="Number of people who completed the assessment"
          value={stats.totalCompleted}
        />
      </div>

      <QuestionDistribution questions={questions} />
    </div>
  );
};

export default Analytics;

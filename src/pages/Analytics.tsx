
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { LoginCard } from "@/components/analytics/LoginCard";
import { StatCard } from "@/components/analytics/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuestionCompletion {
  questionId: number;
  questionText: string;
  totalResponses: number;
  completionRate: number;
}

const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [stats, setStats] = useState({
    totalStarted: 0,
    totalCompleted: 0
  });
  const [questionCompletions, setQuestionCompletions] = useState<QuestionCompletion[]>([]);
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

  const fetchAnalytics = async () => {
    try {
      console.log('Fetching analytics data...');
      
      // Get total assessments started and completed
      const { data: assessments, error: assessmentError } = await supabase
        .from('assessments')
        .select('*');

      if (assessmentError) {
        console.error('Error fetching assessments:', assessmentError);
        throw assessmentError;
      }

      console.log('Assessments data:', assessments);

      const totalStarted = assessments?.length || 0;
      const totalCompleted = assessments?.filter(a => a.completed)?.length || 0;

      setStats({ totalStarted, totalCompleted });

      // Get all responses grouped by question_id
      const { data: responseData, error: responseError } = await supabase
        .rpc('get_question_completion_stats');

      if (responseError) {
        console.error('Error fetching response stats:', responseError);
        throw responseError;
      }

      console.log('Response stats:', responseData);

      // Get all questions for mapping
      const { data: questions, error: questionsError } = await supabase
        .from('assessment_questions')
        .select('id, question_text')
        .order('id');

      if (questionsError) {
        console.error('Error fetching questions:', questionsError);
        throw questionsError;
      }

      // Map questions to completion stats
      const questionStats = questions?.map(question => {
        const stats = responseData?.find(r => r.question_id === question.id);
        return {
          questionId: question.id,
          questionText: question.question_text,
          totalResponses: stats?.response_count || 0,
          completionRate: totalStarted > 0 
            ? Math.round(((stats?.response_count || 0) / totalStarted) * 100)
            : 0
        };
      }) || [];

      console.log('Calculated question stats:', questionStats);

      setQuestionCompletions(questionStats);

    } catch (error) {
      console.error('Error fetching analytics:', error);
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Question Completion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questionCompletions.map((question) => (
              <div key={question.questionId} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Question {question.questionId}</span>
                  <span>{question.totalResponses} responses ({question.completionRate}%)</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${question.completionRate}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">{question.questionText}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;

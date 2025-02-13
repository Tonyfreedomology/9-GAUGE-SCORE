import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionAnalytics {
  totalResponses: number;
  answerDistribution: {
    value: number;
    count: number;
    percentage: number;
    label: string;
  }[];
}

const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState({
    totalResponses: 0,
    questionCompletion: [] as { questionId: string; responses: number }[],
  });
  const [questions, setQuestions] = useState<Array<{ id: number; question_text: string; options: any }>>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [questionAnalytics, setQuestionAnalytics] = useState<QuestionAnalytics | null>(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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

  const fetchAnalytics = async () => {
    try {
      const { data: questionData, error: questionError } = await supabase
        .from('assessment_questions')
        .select('id, question_text, options')
        .order('id');

      if (questionError) throw questionError;

      setQuestions(questionData || []);

      const { data: responseData, error: responseError } = await supabase
        .from('user_responses')
        .select('question_id, answer')
        .order('question_id');

      if (responseError) throw responseError;

      if (responseData) {
        const questionCounts = responseData.reduce((acc: Record<string, number>, curr) => {
          acc[curr.question_id] = (acc[curr.question_id] || 0) + 1;
          return acc;
        }, {});

        const completionData = Object.entries(questionCounts).map(([id, count]) => ({
          questionId: id,
          responses: count
        }));

        setAnalytics({
          totalResponses: responseData.length,
          questionCompletion: completionData
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load analytics data",
      });
    }
  };

  const fetchQuestionAnalytics = async (questionId: string) => {
    try {
      const { data: responses, error } = await supabase
        .from('user_responses')
        .select('answer')
        .eq('question_id', parseInt(questionId)); // Convert string to number here

      if (error) throw error;

      if (responses) {
        const totalResponses = responses.length;
        const answerCounts = responses.reduce((acc: Record<number, number>, curr) => {
          if (curr.answer) {
            acc[curr.answer] = (acc[curr.answer] || 0) + 1;
          }
          return acc;
        }, {});

        const distribution = Object.entries(answerCounts).map(([value, count]) => ({
          value: parseInt(value),
          count,
          percentage: Math.round((count / totalResponses) * 100),
          label: `Option ${value}`
        }));

        setQuestionAnalytics({
          totalResponses,
          answerDistribution: distribution
        });
      }
    } catch (error) {
      console.error('Error fetching question analytics:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load question analytics",
      });
    }
  };

  const handleQuestionSelect = (questionId: string) => {
    setSelectedQuestion(questionId);
    fetchQuestionAnalytics(questionId);
  };

  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Analytics Dashboard Access</CardTitle>
            <CardDescription>Enter the passphrase to view analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter passphrase"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                required
              />
              <Button type="submit" className="w-full text-white" disabled={loading}>
                {loading ? "Checking..." : "Access Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Responses</CardTitle>
            <CardDescription>Number of assessment responses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{analytics.totalResponses}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Question Completion Rates</CardTitle>
            <CardDescription>Number of responses per question</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.questionCompletion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="questionId" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="responses" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Question Analysis</CardTitle>
          <CardDescription>Select a question to view detailed response analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleQuestionSelect} value={selectedQuestion || undefined}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select a question" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {questions.map((question) => (
                <SelectItem key={question.id} value={question.id.toString()}>
                  {question.question_text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {questionAnalytics && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Response Distribution</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4">
                    {questionAnalytics.answerDistribution.map((answer) => (
                      <div key={answer.value} className="flex justify-between items-center">
                        <span>Option {answer.value}</span>
                        <div className="flex items-center gap-4">
                          <div className="w-48 bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${answer.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{answer.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={questionAnalytics.answerDistribution}
                        dataKey="count"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {questionAnalytics.answerDistribution.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;


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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from "@/components/ui/use-toast";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState({
    totalResponses: 0,
    questionCompletion: [] as { questionId: string; responses: number }[],
  });

  const checkPassphrase = async () => {
    try {
      const { data, error } = await supabase
        .from('dashboard_config')
        .select('passphrase')
        .single();

      if (error) {
        console.error('Error checking passphrase:', error);
        return false;
      }

      return data.passphrase === passphrase;
    } catch (error) {
      console.error('Error checking passphrase:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
    setLoading(false);
  };

  const fetchAnalytics = async () => {
    try {
      const { data: questionData } = await supabase
        .from('user_responses')
        .select('question_id, answer')
        .order('question_id');

      if (questionData) {
        const questionCounts = questionData.reduce((acc: Record<string, number>, curr) => {
          acc[curr.question_id] = (acc[curr.question_id] || 0) + 1;
          return acc;
        }, {});

        const completionData = Object.entries(questionCounts).map(([id, count]) => ({
          questionId: id,
          responses: count
        }));

        setAnalytics({
          totalResponses: questionData.length,
          questionCompletion: completionData
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
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
              <Button type="submit" className="w-full" disabled={loading}>
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
      
      <div className="grid gap-6 md:grid-cols-2">
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
    </div>
  );
};

export default Analytics;

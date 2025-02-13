
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [analytics, setAnalytics] = useState({
    totalResponses: 0,
    questionCompletion: [] as { questionId: string; responses: number }[],
    averageScores: [] as any[]
  });

  useEffect(() => {
    const initializeAnalytics = async () => {
      await checkAccess();
      await fetchAnalytics();
    };

    initializeAnalytics();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      navigate('/auth');
    }
  };

  const checkAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.log('No session found, redirecting to auth');
        navigate('/auth');
        return;
      }

      console.log('Checking access for email:', session.user.email);
      
      // Add a small delay to allow the trigger to complete
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { data: accessData, error } = await supabase
        .from('dashboard_access')
        .select('*')
        .eq('email', session.user.email)
        .maybeSingle();

      if (error) {
        console.error('Error checking access:', error);
        navigate('/');
        return;
      }

      if (!accessData) {
        console.log('No dashboard access found for user:', session.user.email);
        navigate('/');
        return;
      }

      console.log('Access granted for user:', session.user.email);
      setAuthorized(true);
      setLoading(false);
    } catch (error) {
      console.error('Error checking access:', error);
      navigate('/');
    }
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

        setAnalytics(prev => ({
          ...prev,
          totalResponses: questionData.length,
          questionCompletion: completionData
        }));
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!authorized) {
    return <div className="flex items-center justify-center min-h-screen">Not authorized</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
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

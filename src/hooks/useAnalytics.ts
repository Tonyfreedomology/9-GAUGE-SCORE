
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Analytics {
  totalStarted: number;
  totalCompleted: number;
  questionCompletion: { questionId: string; responses: number }[];
}

interface QuestionAnalytics {
  totalResponses: number;
  answerDistribution: {
    value: number;
    count: number;
    percentage: number;
    label: string;
  }[];
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalStarted: 0,
    totalCompleted: 0,
    questionCompletion: [],
  });
  const [questions, setQuestions] = useState<Array<{ id: number; question_text: string; options: any }>>([]);
  const [questionAnalytics, setQuestionAnalytics] = useState<QuestionAnalytics | null>(null);
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    try {
      // Fetch questions first
      const { data: questionData, error: questionError } = await supabase
        .from('assessment_questions')
        .select('id, question_text, options')
        .order('id');

      if (questionError) throw questionError;
      setQuestions(questionData || []);

      // Get assessment completion stats
      const { data: assessmentStats, error: assessmentError } = await supabase
        .from('assessments')
        .select('id, completed')
        .order('created_at');

      if (assessmentError) throw assessmentError;

      const totalStarted = assessmentStats?.length || 0;
      const totalCompleted = assessmentStats?.filter(a => a.completed)?.length || 0;

      // Get all completed responses
      const { data: responseData, error: responseError } = await supabase
        .from('user_responses')
        .select('question_id, answer')
        .eq('completed', true)
        .not('answer', 'is', null);

      if (responseError) throw responseError;

      // Process response data
      const questionCounts = responseData?.reduce((acc, response) => {
        const id = response.question_id?.toString();
        if (id) {
          acc[id] = (acc[id] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>) || {};

      const completionData = Object.entries(questionCounts).map(([id, count]) => ({
        questionId: id,
        responses: count
      }));

      setAnalytics({
        totalStarted,
        totalCompleted,
        questionCompletion: completionData
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load analytics data"
      });
    }
  };

  const fetchQuestionAnalytics = async (questionId: string) => {
    try {
      // Get responses for specific question
      const { data: responses, error } = await supabase
        .from('user_responses')
        .select('answer, assessment_id')
        .eq('question_id', parseInt(questionId))
        .eq('completed', true)
        .not('answer', 'is', null);

      if (error) throw error;

      if (responses && responses.length > 0) {
        // Count responses by answer value
        const answerCounts = responses.reduce((acc, response) => {
          const answer = response.answer;
          if (typeof answer === 'number') {
            acc[answer] = (acc[answer] || 0) + 1;
          }
          return acc;
        }, {} as Record<number, number>);

        // Calculate percentages and create distribution
        const totalResponses = responses.length;
        const distribution = Object.entries(answerCounts)
          .map(([value, count]) => {
            const percentage = Math.round((count / totalResponses) * 100);
            return {
              value: parseInt(value),
              count,
              percentage,
              label: `Option ${value}`
            };
          })
          .sort((a, b) => a.value - b.value);

        setQuestionAnalytics({
          totalResponses,
          answerDistribution: distribution
        });
      } else {
        setQuestionAnalytics({
          totalResponses: 0,
          answerDistribution: []
        });
      }
    } catch (error) {
      console.error('Error fetching question analytics:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load question analytics"
      });
    }
  };

  return {
    analytics,
    questions,
    questionAnalytics,
    fetchAnalytics,
    fetchQuestionAnalytics,
  };
};

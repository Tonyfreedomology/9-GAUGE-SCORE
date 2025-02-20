
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
      // Log the start of analytics fetching
      console.log('Starting analytics fetch...');

      const { data: questionData, error: questionError } = await supabase
        .from('assessment_questions')
        .select('id, question_text, options')
        .order('id');

      if (questionError) throw questionError;
      
      console.log('Questions fetched:', questionData?.length, 'questions found');
      setQuestions(questionData || []);

      const { data: assessmentStats, error: assessmentError } = await supabase
        .from('assessments')
        .select('id, completed')
        .order('created_at');

      if (assessmentError) throw assessmentError;
      
      console.log('Assessment stats:', {
        total: assessmentStats?.length,
        completed: assessmentStats?.filter(a => a.completed)?.length
      });
      
      const totalStarted = assessmentStats?.length || 0;
      const totalCompleted = assessmentStats?.filter(a => a.completed)?.length || 0;

      const { data: responseData, error: responseError } = await supabase
        .from('user_responses')
        .select('*')
        .eq('completed', true);

      if (responseError) throw responseError;

      console.log('Response data structure:', {
        totalResponses: responseData?.length,
        sampleResponse: responseData?.[0],
        uniqueQuestions: [...new Set(responseData?.map(r => r.question_id) || [])]
      });

      const questionCounts: Record<string, number> = {};
      responseData?.forEach(response => {
        questionCounts[response.question_id] = (questionCounts[response.question_id] || 0) + 1;
      });

      const completionData = Object.entries(questionCounts).map(([id, count]) => ({
        questionId: id,
        responses: count
      }));

      console.log('Processed analytics:', {
        totalStarted,
        totalCompleted,
        questionCompletionSample: completionData.slice(0, 3)
      });

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
      console.log('Fetching analytics for question:', questionId);

      const { data: responses, error } = await supabase
        .from('user_responses')
        .select('answer, completed')
        .eq('question_id', parseInt(questionId))
        .eq('completed', true)
        .not('answer', 'is', null);

      if (error) throw error;

      console.log('Question response data:', {
        questionId,
        totalResponses: responses?.length,
        responseValues: responses?.map(r => r.answer),
        completedOnly: responses?.filter(r => r.completed)?.length
      });

      if (responses && responses.length > 0) {
        const totalResponses = responses.length;
        const answerCounts: Record<number, number> = {};
        
        responses.forEach(response => {
          answerCounts[response.answer] = (answerCounts[response.answer] || 0) + 1;
        });

        const distribution = Object.entries(answerCounts)
          .map(([value, count]) => ({
            value: parseInt(value),
            count,
            percentage: Math.round((count / totalResponses) * 100),
            label: `Option ${value}`
          }))
          .sort((a, b) => a.value - b.value);

        console.log('Processed question analytics:', {
          totalResponses,
          distribution,
          answerCounts
        });

        setQuestionAnalytics({
          totalResponses,
          answerDistribution: distribution
        });
      } else {
        console.log('No responses found for question:', questionId);
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


import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface Response {
  value: number;
  count: number;
  percentage: number;
}

interface QuestionDistributionProps {
  questions: Array<{ id: number; question_text: string }>;
}

export const QuestionDistribution = ({ questions }: QuestionDistributionProps) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [responses, setResponses] = useState<Response[]>([]);

  const fetchResponseDistribution = async (questionId: string) => {
    const { data, error } = await supabase
      .from('user_responses')
      .select('answer')
      .eq('question_id', parseInt(questionId))
      .eq('completed', true)
      .not('answer', 'is', null);

    if (error) {
      console.error('Error fetching responses:', error);
      return;
    }

    // Count responses
    const answerCounts: { [key: number]: number } = {};
    data.forEach(response => {
      if (response.answer) {
        answerCounts[response.answer] = (answerCounts[response.answer] || 0) + 1;
      }
    });

    // Calculate percentages
    const totalResponses = data.length;
    const distribution = Object.entries(answerCounts).map(([value, count]) => ({
      value: parseInt(value),
      count,
      percentage: Math.round((count / totalResponses) * 100)
    })).sort((a, b) => a.value - b.value);

    setResponses(distribution);
  };

  const handleQuestionChange = (value: string) => {
    setSelectedQuestionId(value);
    fetchResponseDistribution(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question Response Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select value={selectedQuestionId} onValueChange={handleQuestionChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a question" />
            </SelectTrigger>
            <SelectContent>
              {questions.map((question) => (
                <SelectItem key={question.id} value={question.id.toString()}>
                  {question.question_text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {responses.length > 0 && (
            <div className="mt-4 space-y-3">
              {responses.map((response) => (
                <div key={response.value} className="flex items-center space-x-4">
                  <div className="w-24">Option {response.value}:</div>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${response.percentage}%` }}
                    />
                  </div>
                  <div className="w-20 text-right">
                    {response.count} ({response.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

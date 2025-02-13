
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Question {
  id: number;
  question_text: string;
  options: any;
}

interface QuestionDistribution {
  value: number;
  count: number;
  percentage: number;
  label: string;
}

interface QuestionAnalyticsProps {
  questions: Question[];
  selectedQuestion: string | null;
  onQuestionSelect: (questionId: string) => void;
  analytics: {
    totalResponses: number;
    answerDistribution: QuestionDistribution[];
  } | null;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const QuestionAnalytics = ({ 
  questions, 
  selectedQuestion, 
  onQuestionSelect, 
  analytics 
}: QuestionAnalyticsProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Question Analysis</CardTitle>
        <CardDescription>Select a question to view detailed response analytics</CardDescription>
      </CardHeader>
      <CardContent>
        <Select onValueChange={onQuestionSelect} value={selectedQuestion || undefined}>
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

        {analytics && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Response Distribution</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4">
                  {analytics.answerDistribution.map((answer) => (
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
                      data={analytics.answerDistribution}
                      dataKey="count"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {analytics.answerDistribution.map((_, index) => (
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
  );
};

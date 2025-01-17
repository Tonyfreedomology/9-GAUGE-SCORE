import { Category } from '../../types/assessment';

export const impactGenerosityCategory: Category = {
  name: 'Impact & Generosity',
  weight: 0.15,
  questions: [
    { 
      id: 'f15', 
      text: 'How often do you give money (beyond small amounts) to causes you care about?', 
      category: 'Impact & Generosity', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Often' },
        { value: 5, label: 'Regularly' }
      ]
    },
    { 
      id: 'f16', 
      text: 'In a typical month, how many hours do you spend helping your community?', 
      category: 'Impact & Generosity', 
      pillar: 'financial',
      options: [
        { value: 1, label: '0 hrs' },
        { value: 2, label: '1-2 hrs' },
        { value: 3, label: '3-5 hrs' },
        { value: 4, label: '6-10 hrs' },
        { value: 5, label: '10+ hrs' }
      ]
    },
    { 
      id: 'f17', 
      text: 'How comfortable are you with financially supporting causes that matter most to you?', 
      category: 'Impact & Generosity', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Not comfortable at all' },
        { value: 2, label: 'Uncomfortable' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Somewhat comfortable' },
        { value: 5, label: 'Very comfortable' }
      ]
    },
  ],
};
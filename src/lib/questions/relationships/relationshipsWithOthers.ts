
import { Category } from '../../types/assessment';

export const relationshipsWithOthersCategory: Category = {
  name: 'Relationships with Others',
  weight: 0.30,
  questions: [
    { 
      id: 'r4', 
      text: 'How supported do you feel by the people closest to you?', 
      category: 'Relationships with Others', 
      pillar: 'relationships',
      options: [
        { value: 1, label: 'Not at all' },
        { value: 2, label: 'Slightly' },
        { value: 3, label: 'Moderately' },
        { value: 4, label: 'Very' },
        { value: 5, label: 'Extremely' }
      ]
    },
    { 
      id: 'r5', 
      text: 'How comfortable are you having tough or vulnerable conversations?', 
      category: 'Relationships with Others', 
      pillar: 'relationships',
      options: [
        { value: 1, label: 'Very uncomfortable' },
        { value: 2, label: 'Uncomfortable' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Comfortable' },
        { value: 5, label: 'Very comfortable' }
      ]
    },
    { 
      id: 'r6', 
      text: 'When disagreements happen, do they get resolved respectfully?', 
      category: 'Relationships with Others', 
      pillar: 'relationships',
      options: [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Usually' },
        { value: 5, label: 'Always' }
      ]
    },
    { 
      id: 'r7', 
      text: 'How often do you spend meaningful time with your closest loved ones?', 
      category: 'Relationships with Others', 
      pillar: 'relationships',
      options: [
        { value: 1, label: 'Rarely' },
        { value: 2, label: 'Monthly' },
        { value: 3, label: 'Weekly' },
        { value: 4, label: 'Several times/week' },
        { value: 5, label: 'Daily' }
      ]
    },
  ],
};

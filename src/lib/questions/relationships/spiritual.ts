
import { Category } from '../../types/assessment';

export const spiritualCategory: Category = {
  name: 'Relationship with God',
  weight: 0.15,
  questions: [
    { 
      id: 'r12', 
      text: 'Do you feel guided by a higher purpose or spiritual belief?', 
      category: 'Relationship with God', 
      pillar: 'relationships',
      options: [
        { value: 1, label: 'Not at all' },
        { value: 2, label: 'Slightly' },
        { value: 3, label: 'Moderately' },
        { value: 4, label: 'Significantly' },
        { value: 5, label: 'Completely' }
      ]
    },
    { 
      id: 'r13', 
      text: 'How often do you engage in spiritual or faith-based practices (prayer, meditation, gathering)?', 
      category: 'Relationship with God', 
      pillar: 'relationships',
      options: [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Often' },
        { value: 5, label: 'Daily' }
      ]
    },
    { 
      id: 'r14', 
      text: 'Does your spiritual life bring you peace or comfort in tough times?', 
      category: 'Relationship with God', 
      pillar: 'relationships',
      options: [
        { value: 1, label: 'Not at all' },
        { value: 2, label: 'Slightly' },
        { value: 3, label: 'Moderately' },
        { value: 4, label: 'Significantly' },
        { value: 5, label: 'Completely' }
      ]
    },
  ],
};

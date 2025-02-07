import { Category } from '../../types/assessment';

export const independenceFlexibilityCategory: Category = {
  name: 'Independence',
  weight: 0.25,
  questions: [
    { 
      id: 'f8', 
      text: 'If you wanted to take a 7-day trip overseas next month, how financially possible would that be?', 
      category: 'Independence', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Impossible' },
        { value: 2, label: 'Very difficult' },
        { value: 3, label: 'Challenging' },
        { value: 4, label: 'Possible with planning' },
        { value: 5, label: 'Easily possible' }
      ]
    },
    { 
      id: 'f9', 
      text: 'If you had to miss 3-4 weeks of work unpaid, could you handle it financially?', 
      category: 'Independence', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Not at all' },
        { value: 2, label: 'With great difficulty' },
        { value: 3, label: 'With some strain' },
        { value: 4, label: 'Fairly easily' },
        { value: 5, label: 'Easily' }
      ]
    },
    { 
      id: 'f10', 
      text: 'How often do you make major life decisions driven by passion rather than finances?', 
      category: 'Independence', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Often' },
        { value: 5, label: 'Always' }
      ]
    },
    { 
      id: 'f11', 
      text: 'Could you reduce/change your work hours without stressing about covering your bills?', 
      category: 'Independence', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Not at all' },
        { value: 2, label: 'Probably not' },
        { value: 3, label: 'Maybe' },
        { value: 4, label: 'Probably' },
        { value: 5, label: 'Definitely' }
      ]
    },
  ],
};

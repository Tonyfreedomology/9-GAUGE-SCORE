import { Category } from '../../types/assessment';

export const investmentGrowthCategory: Category = {
  name: 'Investment & Growth',
  weight: 0.15,
  questions: [
    { 
      id: 'f12', 
      text: 'Do you regularly invest (like retirement accounts, stocks, real estate)?', 
      category: 'Investment & Growth', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Most months' },
        { value: 5, label: 'Every month' }
      ]
    },
    { 
      id: 'f13', 
      text: 'How confident are you in your plan to grow your wealth over time?', 
      category: 'Investment & Growth', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Not at all' },
        { value: 2, label: 'Slightly' },
        { value: 3, label: 'Moderately' },
        { value: 4, label: 'Very' },
        { value: 5, label: 'Extremely' }
      ]
    },
    { 
      id: 'f14', 
      text: 'Is your money spread out (stocks, real estate) or mostly in one thing (savings)?', 
      category: 'Investment & Growth', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'All in one place' },
        { value: 2, label: 'Mostly one place' },
        { value: 3, label: 'Some diversity' },
        { value: 4, label: 'Well spread' },
        { value: 5, label: 'Very diversified' }
      ]
    },
  ],
};
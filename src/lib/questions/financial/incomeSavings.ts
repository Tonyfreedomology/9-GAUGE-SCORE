
import { Category } from '../../types/assessment';

export const incomeSavingsCategory: Category = {
  name: 'Income & Savings',
  weight: 0.25,
  questions: [
    { 
      id: 'f1', 
      text: 'How confident are you that you could cover an unexpected $3,000 expense without taking on new debt?', 
      category: 'Income', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Not confident at all' },
        { value: 2, label: 'Low level of confidence' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Somewhat confident' },
        { value: 5, label: 'Very confident' }
      ]
    },
    { 
      id: 'f2', 
      text: 'Roughly what % of your monthly income do you save or invest?', 
      category: 'Income', 
      pillar: 'financial',
      options: [
        { value: 1, label: '0%' },
        { value: 2, label: '1-5%' },
        { value: 3, label: '6-10%' },
        { value: 4, label: '11-20%' },
        { value: 5, label: '20%+' }
      ]
    },
    { 
      id: 'f3', 
      text: 'How often do you rely on credit cards or loans to cover everyday bills or expenses?', 
      category: 'Income', 
      pillar: 'financial',
      options: [
        { value: 5, label: 'Never' },
        { value: 4, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 2, label: 'Often' },
        { value: 1, label: 'Always' }
      ]
    },
    { 
      id: 'f4', 
      text: 'How stable do you feel your main source of income will be for the next 12 months?', 
      category: 'Income', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Very unstable' },
        { value: 2, label: 'Somewhat unstable' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Somewhat stable' },
        { value: 5, label: 'Very stable' }
      ]
    },
  ],
};

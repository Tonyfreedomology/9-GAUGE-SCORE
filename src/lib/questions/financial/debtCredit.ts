import { Category } from '../../types/assessment';

export const debtCreditCategory: Category = {
  name: 'Debt & Credit',
  weight: 0.20,
  questions: [
    { 
      id: 'f5', 
      text: 'What percentage of your monthly income is used to pay off high-interest debts, such as credit cards?', 
      category: 'Debt & Credit', 
      pillar: 'financial',
      options: [
        { value: 5, label: '0%' },
        { value: 4, label: '1-10%' },
        { value: 3, label: '11-20%' },
        { value: 2, label: '21-30%' },
        { value: 1, label: '30%+' }
      ]
    },
    { 
      id: 'f6', 
      text: 'What portion of your debt is tied to assets that grow in value (like a house or business) versus consumer expenses?', 
      category: 'Debt & Credit', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'All consumer expenses' },
        { value: 2, label: 'Mostly consumer expenses' },
        { value: 3, label: 'Mix consumer & Investments' },
        { value: 4, label: 'Mostly investments' },
        { value: 5, label: 'All investments' }
      ]
    },
    { 
      id: 'f7', 
      text: 'How confident are you that you could qualify for a good loan rate if needed?', 
      category: 'Debt & Credit', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Not confident at all' },
        { value: 2, label: 'Not very confident' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Somewhat confident' },
        { value: 5, label: 'Very confident' }
      ]
    },
  ],
};
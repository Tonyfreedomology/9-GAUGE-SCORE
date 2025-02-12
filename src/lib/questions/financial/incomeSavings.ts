
import { Category } from '../../types/assessment';

export const incomeSavingsCategory: Category = {
  name: 'Income',
  weight: 0.35,
  questions: [
    { 
      id: 'f1', 
      text: 'I have enough income to cover my needs and some wants comfortably.', 
      category: 'Income', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Strongly Disagree – I struggle to afford basic necessities.' },
        { value: 2, label: 'Disagree – I can cover basics, but extra expenses are very difficult.' },
        { value: 3, label: 'Neutral – I meet my basic needs, but have little left over.' },
        { value: 4, label: 'Agree – I comfortably cover all essential needs and some non-essentials.' },
        { value: 5, label: 'Strongly Agree – I have plenty of income to cover needs and discretionary spending.' }
      ]
    },
    { 
      id: 'f2', 
      text: 'What percentage of your monthly income is used to pay off high-interest debts, such as credit cards?', 
      category: 'Income', 
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
      id: 'f3', 
      text: 'What percentage of your income do you regularly save or invest?', 
      category: 'Income', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'None (0%)' },
        { value: 2, label: '1–5%' },
        { value: 3, label: '6–10%' },
        { value: 4, label: '11–20%' },
        { value: 5, label: '20%+' }
      ]
    },
    { 
      id: 'f4', 
      text: 'Do you regularly invest (like retirement accounts, stocks, real estate)?', 
      category: 'Income', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Most months' },
        { value: 5, label: 'Every month' }
      ]
    },
  ],
};

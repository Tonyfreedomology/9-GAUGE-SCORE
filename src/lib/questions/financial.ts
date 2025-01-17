import { Pillar } from '../types/assessment';

export const financialPillar: Pillar = {
  name: 'Financial',
  color: '#84A98C',
  categories: [
    {
      name: 'Income & Savings',
      weight: 0.25,
      questions: [
        { 
          id: 'f1', 
          text: 'If you had an unexpected $3,000 expense, how sure are you you could cover it without new debt?', 
          category: 'Income & Savings', 
          pillar: 'financial',
          options: [
            { value: 1, label: 'Not at all sure' },
            { value: 2, label: 'Somewhat unsure' },
            { value: 3, label: 'Neutral' },
            { value: 4, label: 'Somewhat sure' },
            { value: 5, label: 'Very sure' }
          ]
        },
        { 
          id: 'f2', 
          text: 'Roughly what % of your monthly income do you save or invest?', 
          category: 'Income & Savings', 
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
          text: 'How often do you rely on credit cards or loans to cover normal bills?', 
          category: 'Income & Savings', 
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
          text: 'How steady is your main source of income for the next year?', 
          category: 'Income & Savings', 
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
    },
    {
      name: 'Debt & Credit',
      weight: 0.20,
      questions: [
        { 
          id: 'f5', 
          text: 'What % of your monthly income goes to high-interest debts (credit cards)?', 
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
          text: 'How much of your debt is tied to things that grow in value (house, business) vs. consumer stuff?', 
          category: 'Debt & Credit', 
          pillar: 'financial',
          options: [
            { value: 1, label: 'All consumer debt' },
            { value: 2, label: 'Mostly consumer' },
            { value: 3, label: 'Mixed' },
            { value: 4, label: 'Mostly investment' },
            { value: 5, label: 'All investment' }
          ]
        },
        { 
          id: 'f7', 
          text: 'How confident are you you\'d get a good loan rate if needed?', 
          category: 'Debt & Credit', 
          pillar: 'financial',
          options: [
            { value: 1, label: 'Not at all' },
            { value: 2, label: 'Slightly' },
            { value: 3, label: 'Moderately' },
            { value: 4, label: 'Very' },
            { value: 5, label: 'Extremely' }
          ]
        },
      ],
    },
    {
      name: 'Independence & Flexibility',
      weight: 0.25,
      questions: [
        { 
          id: 'f8', 
          text: 'If you wanted a 7-day trip overseas next month, how possible is that financially?', 
          category: 'Independence & Flexibility', 
          pillar: 'financial',
          options: [
            { value: 1, label: 'Impossible' },
            { value: 2, label: 'Very difficult' },
            { value: 3, label: 'Possible with planning' },
            { value: 4, label: 'Fairly easy' },
            { value: 5, label: 'Very easy' }
          ]
        },
        { 
          id: 'f9', 
          text: 'If you had to miss 3-4 weeks of work unpaid, could you handle it financially?', 
          category: 'Independence & Flexibility', 
          pillar: 'financial',
          options: [
            { value: 1, label: 'Not at all' },
            { value: 2, label: 'With great difficulty' },
            { value: 3, label: 'With some strain' },
            { value: 4, label: 'Fairly well' },
            { value: 5, label: 'Easily' }
          ]
        },
        { 
          id: 'f10', 
          text: 'How often do you make big life choices based on passion, not just money?', 
          category: 'Independence & Flexibility', 
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
          text: 'Could you reduce/change your work hours without stressing about bills?', 
          category: 'Independence & Flexibility', 
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
    },
    {
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
    },
    {
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
          text: 'How able do you feel to financially support the causes that really matter to you?', 
          category: 'Impact & Generosity', 
          pillar: 'financial',
          options: [
            { value: 1, label: 'Not at all' },
            { value: 2, label: 'Barely' },
            { value: 3, label: 'Somewhat' },
            { value: 4, label: 'Mostly' },
            { value: 5, label: 'Fully' }
          ]
        },
      ],
    },
  ],
};
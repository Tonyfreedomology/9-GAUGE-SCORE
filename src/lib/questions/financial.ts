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
          text: 'How confident are you that you could cover an unexpected $3,000 expense without taking on new debt?', 
          category: 'Income & Savings', 
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
          text: 'How often do you rely on credit cards or loans to cover everyday bills or expenses?', 
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
          text: 'How stable do you feel your main source of income will be for the next 12 months?', 
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
    },
    {
      name: 'Independence & Flexibility',
      weight: 0.25,
      questions: [
        { 
          id: 'f8', 
          text: 'If you wanted to take a 7-day trip overseas next month, how financially possible would that be?', 
          category: 'Independence & Flexibility', 
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
          category: 'Independence & Flexibility', 
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
          text: 'Could you reduce/change your work hours without stressing about covering your bills?', 
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
    },
  ],
};

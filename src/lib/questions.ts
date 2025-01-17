export type Question = {
  id: string;
  text: string;
  category: string;
  pillar: 'financial' | 'health' | 'relationships';
  options?: { value: number; label: string }[];
};

export type Category = {
  name: string;
  weight: number;
  questions: Question[];
};

export type Pillar = {
  name: string;
  categories: Category[];
  color: string;
};

export const questions: Pillar[] = [
  {
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
  },
  {
    name: 'Health',
    color: '#17BEBB',
    categories: [
      {
        name: 'Mental',
        weight: 0.35,
        questions: [
          { 
            id: 'h1', 
            text: 'When you wake up, do you usually feel rested or exhausted?', 
            category: 'Mental', 
            pillar: 'health',
            options: [
              { value: 1, label: 'Very exhausted' },
              { value: 2, label: 'Somewhat tired' },
              { value: 3, label: 'Neutral' },
              { value: 4, label: 'Somewhat rested' },
              { value: 5, label: 'Very rested' }
            ]
          },
          { 
            id: 'h2', 
            text: 'How stressed do you feel most days?', 
            category: 'Mental', 
            pillar: 'health',
            options: [
              { value: 1, label: 'Extremely' },
              { value: 2, label: 'Very' },
              { value: 3, label: 'Moderately' },
              { value: 4, label: 'Slightly' },
              { value: 5, label: 'Not at all' }
            ]
          },
          { 
            id: 'h3', 
            text: 'How often do you set aside time for journaling, prayer, or meditation?', 
            category: 'Mental', 
            pillar: 'health',
            options: [
              { value: 1, label: 'Never' },
              { value: 2, label: 'Rarely' },
              { value: 3, label: 'Sometimes' },
              { value: 4, label: 'Often' },
              { value: 5, label: 'Daily' }
            ]
          },
          { 
            id: 'h4', 
            text: 'Over the past week, how would you rate your mood overall?', 
            category: 'Mental', 
            pillar: 'health',
            options: [
              { value: 1, label: 'Very poor' },
              { value: 2, label: 'Poor' },
              { value: 3, label: 'Fair' },
              { value: 4, label: 'Good' },
              { value: 5, label: 'Excellent' }
            ]
          },
        ],
      },
      {
        name: 'Physical',
        weight: 0.35,
        questions: [
          { 
            id: 'h5', 
            text: 'How often do you eat mostly whole foods (fruit, veggies, lean meats) in a typical meal?', 
            category: 'Physical', 
            pillar: 'health',
            options: [
              { value: 1, label: 'Rarely' },
              { value: 2, label: 'Sometimes' },
              { value: 3, label: 'Often' },
              { value: 4, label: 'Most meals' },
              { value: 5, label: 'Almost always' }
            ]
          },
          { 
            id: 'h6', 
            text: 'How often do you eat fast food or heavily processed meals?', 
            category: 'Physical', 
            pillar: 'health',
            options: [
              { value: 5, label: 'Never' },
              { value: 4, label: 'Rarely' },
              { value: 3, label: '1-2 times/week' },
              { value: 2, label: '3-4 times/week' },
              { value: 1, label: '5+ times/week' }
            ]
          },
          { 
            id: 'h7', 
            text: 'How many days per week do you get at least 30 min of exercise?', 
            category: 'Physical', 
            pillar: 'health',
            options: [
              { value: 1, label: '0 days' },
              { value: 2, label: '1-2 days' },
              { value: 3, label: '3-4 days' },
              { value: 4, label: '5-6 days' },
              { value: 5, label: 'Every day' }
            ]
          },
          { 
            id: 'h8', 
            text: 'If you could snap your fingers, would you add a lot more muscle, a little more, or are you fine?', 
            category: 'Physical', 
            pillar: 'health',
            options: [
              { value: 1, label: 'Need a lot more' },
              { value: 2, label: 'Need some more' },
              { value: 3, label: 'Could use a little' },
              { value: 4, label: 'Mostly satisfied' },
              { value: 5, label: 'Completely satisfied' }
            ]
          },
        ],
      },
      {
        name: 'Environmental',
        weight: 0.30,
        questions: [
          { 
            id: 'h9', 
            text: 'Is your home peaceful or chaotic?', 
            category: 'Environmental', 
            pillar: 'health',
            options: [
              { value: 1, label: 'Very chaotic' },
              { value: 2, label: 'Somewhat chaotic' },
              { value: 3, label: 'Neutral' },
              { value: 4, label: 'Somewhat peaceful' },
              { value: 5, label: 'Very peaceful' }
            ]
          },
          { 
            id: 'h10', 
            text: 'How stressful is your main work area?', 
            category: 'Environmental', 
            pillar: 'health',
            options: [
              { value: 1, label: 'Extremely' },
              { value: 2, label: 'Very' },
              { value: 3, label: 'Moderately' },
              { value: 4, label: 'Slightly' },
              { value: 5, label: 'Not at all' }
            ]
          },
          { 
            id: 'h11', 
            text: 'How often do you feel overwhelmed by mess?', 
            category: 'Environmental', 
            pillar: 'health',
            options: [
              { value: 1, label: 'Always' },
              { value: 2, label: 'Often' },
              { value: 3, label: 'Sometimes' },
              { value: 4, label: 'Rarely' },
              { value: 5, label: 'Never' }
            ]
          },
          { 
            id: 'h12', 
            text: 'How often do you spend time outdoors/in sunlight?', 
            category: 'Environmental', 
            pillar: 'health',
            options: [
              { value: 1, label: 'Rarely' },
              { value: 2, label: '1-2 times/week' },
              { value: 3, label: '3-4 times/week' },
              { value: 4, label: '5-6 times/week' },
              { value: 5, label: 'Daily' }
            ]
          },
          { 
            id: 'h13', 
            text: 'Do you feel safe and relaxed at home?', 
            category: 'Environmental', 
            pillar: 'health',
            options: [
              { value: 1, label: 'Never' },
              { value: 2, label: 'Rarely' },
              { value: 3, label: 'Sometimes' },
              { value: 4, label: 'Usually' },
              { value: 5, label: 'Always' }
            ]
          },
        ],
      },
    ],
  },
  {
    name: 'Relationships',
    color: '#EF3E36',
    categories: [
      {
        name: 'Relationship with Self',
        weight: 0.30,
        questions: [
          { 
            id: 'r1', 
            text: 'How do you typically feel about yourself—confident or unsure?', 
            category: 'Relationship with Self', 
            pillar: 'relationships',
            options: [
              { value: 1, label: 'Very unsure' },
              { value: 2, label: 'Somewhat unsure' },
              { value: 3, label: 'Neutral' },
              { value: 4, label: 'Somewhat confident' },
              { value: 5, label: 'Very confident' }
            ]
          },
          { 
            id: 'r2', 
            text: 'How often do you consciously do things that nurture your mind/body/soul?', 
            category: 'Relationship with Self', 
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
            id: 'r3', 
            text: 'Do you recognize and manage your emotions well?', 
            category: 'Relationship with Self', 
            pillar: 'relationships',
            options: [
              { value: 1, label: 'Very poorly' },
              { value: 2, label: 'Poorly' },
              { value: 3, label: 'Moderately' },
              { value: 4, label: 'Well' },
              { value: 5, label: 'Very well' }
            ]
          },
        ],
      },
      {
        name: 'Close Relationships',
        weight: 0.30,
        questions: [
          { 
            id: 'r4', 
            text: 'How supported do you feel by the people closest to you?', 
            category: 'Close Relationships', 
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
            category: 'Close Relationships', 
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
            category: 'Close Relationships', 
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
            category: 'Close Relationships', 
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
      },
      {
        name: 'Community & Social Circle',
        weight: 0.25,
        questions: [
          { 
            id: 'r8', 
            text: 'How strong is your social support network beyond family?', 
            category: 'Community & Social Circle', 
            pillar: 'relationships',
            options: [
              { value: 1, label: 'Very weak' },
              { value: 2, label: 'Weak' },
              { value: 3, label: 'Moderate' },
              { value: 4, label: 'Strong' },
              { value: 5, label: 'Very strong' }
            ]
          },
          { 
            id: 'r9', 
            text: 'How often do you meet or engage with friends or groups that bring you joy?', 
            category: 'Community & Social Circle', 
            pillar: 'relationships',
            options: [
              { value: 1, label: 'Rarely' },
              { value: 2, label: 'Monthly' },
              { value: 3, label: 'Weekly' },
              { value: 4, label: 'Several times/week' },
              { value: 5, label: 'Daily' }
            ]
          },
          { 
            id: 'r10', 
            text: 'Do you feel part of a community or circle that cares about you?', 
            category: 'Community & Social Circle', 
            pillar: 'relationships',
            options: [
              { value: 1, label: 'Not at all' },
              { value: 2, label: 'Slightly' },
              { value: 3, label: 'Moderately' },
              { value: 4, label: 'Very much' },
              { value: 5, label: 'Completely' }
            ]
          },
          { 
            id: 'r11', 
            text: 'Do you actively contribute to your community or social groups?', 
            category: 'Community & Social Circle', 
            pillar: 'relationships',
            options: [
              { value: 1, label: 'Never' },
              { value: 2, label: 'Rarely' },
              { value: 3, label: 'Sometimes' },
              { value: 4, label: 'Often' },
              { value: 5, label: 'Very often' }
            ]
          },
        ],
      },
      {
        name: 'Spiritual/Higher Power',
        weight: 0.15,
        questions: [
          { 
            id: 'r12', 
            text: 'Do you feel guided by a higher purpose or spiritual belief?', 
            category: 'Spiritual/Higher Power', 
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
            category: 'Spiritual/Higher Power', 
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
            category: 'Spiritual/Higher Power', 
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
      },
    ],
  },
];

export const getFeedbackTier = (score: number): string => {
  if (score >= 85) return "Thriving";
  if (score >= 70) return "Strong";
  if (score >= 50) return "Building";
  return "Struggling";
};

export const calculatePillarScore = (pillar: Pillar, answers: Record<string, number>): number => {
  const categoryScores = pillar.categories.map(category => {
    const categoryQuestions = category.questions;
    const categoryAnswers = categoryQuestions.map(q => {
      const answer = answers[q.id] || 0;
      // Convert 1-5 scale to 0-100
      return ((answer - 1) / 4) * 100;
    });
    const categoryScore = categoryAnswers.reduce((a, b) => a + b, 0) / categoryQuestions.length;
    return categoryScore * category.weight;
  });

  let pillarScore = categoryScores.reduce((a, b) => a + b, 0);

  // Apply capping logic for Financial pillar
  if (pillar.name === 'Financial') {
    const impactCategory = pillar.categories.find(c => c.name === 'Impact & Generosity');
    if (impactCategory) {
      const impactQuestions = impactCategory.questions;
      const impactScore = impactQuestions.map(q => answers[q.id] || 0)
        .reduce((a, b) => a + b, 0) / impactQuestions.length;
      const normalizedImpactScore = ((impactScore - 1) / 4) * 100;
      if (normalizedImpactScore < 60) {
        pillarScore = Math.min(pillarScore, 75);
      }
    }
  }

  // Apply capping logic for Relationships pillar
  if (pillar.name === 'Relationships') {
    const selfCategory = pillar.categories.find(c => c.name === 'Relationship with Self');
    if (selfCategory) {
      const selfQuestions = selfCategory.questions;
      const selfScore = selfQuestions.map(q => answers[q.id] || 0)
        .reduce((a, b) => a + b, 0) / selfQuestions.length;
      const normalizedSelfScore = ((selfScore - 1) / 4) * 100;
      if (normalizedSelfScore < 40) {
        pillarScore = Math.min(pillarScore, 70);
      }
    }
  }

  return Math.round(pillarScore);
};
export type Question = {
  id: string;
  text: string;
  category: string;
  pillar: 'financial' | 'health' | 'relationships';
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
          { id: 'f1', text: 'I consistently save a portion of my income', category: 'Income & Savings', pillar: 'financial' },
          { id: 'f2', text: 'I have a stable source of income', category: 'Income & Savings', pillar: 'financial' },
          { id: 'f3', text: 'I have an emergency fund that covers at least 3 months of expenses', category: 'Income & Savings', pillar: 'financial' },
        ],
      },
      {
        name: 'Debt & Credit',
        weight: 0.20,
        questions: [
          { id: 'f4', text: 'I pay my bills on time', category: 'Debt & Credit', pillar: 'financial' },
          { id: 'f5', text: 'I have a good credit score', category: 'Debt & Credit', pillar: 'financial' },
          { id: 'f6', text: 'I manage my debt responsibly', category: 'Debt & Credit', pillar: 'financial' },
        ],
      },
      {
        name: 'Independence & Flexibility',
        weight: 0.25,
        questions: [
          { id: 'f7', text: 'I have multiple sources of income', category: 'Independence & Flexibility', pillar: 'financial' },
          { id: 'f8', text: 'I can work from anywhere', category: 'Independence & Flexibility', pillar: 'financial' },
          { id: 'f9', text: 'I have control over my work schedule', category: 'Independence & Flexibility', pillar: 'financial' },
        ],
      },
      {
        name: 'Investment & Growth',
        weight: 0.15,
        questions: [
          { id: 'f10', text: 'I regularly invest for my future', category: 'Investment & Growth', pillar: 'financial' },
          { id: 'f11', text: 'I understand my investment strategy', category: 'Investment & Growth', pillar: 'financial' },
          { id: 'f12', text: 'My investments are diversified', category: 'Investment & Growth', pillar: 'financial' },
        ],
      },
      {
        name: 'Impact & Generosity',
        weight: 0.15,
        questions: [
          { id: 'f13', text: 'I regularly donate to causes I care about', category: 'Impact & Generosity', pillar: 'financial' },
          { id: 'f14', text: 'I help others financially when I can', category: 'Impact & Generosity', pillar: 'financial' },
          { id: 'f15', text: 'I use my money to create positive impact', category: 'Impact & Generosity', pillar: 'financial' },
        ],
      },
    ],
  },
  {
    name: 'Health',
    color: '#A8DADC',
    categories: [
      {
        name: 'Mental',
        weight: 0.35,
        questions: [
          { id: 'h1', text: 'I manage stress effectively', category: 'Mental', pillar: 'health' },
          { id: 'h2', text: 'I maintain a positive mindset', category: 'Mental', pillar: 'health' },
          { id: 'h3', text: 'I practice mindfulness or meditation', category: 'Mental', pillar: 'health' },
        ],
      },
      {
        name: 'Physical',
        weight: 0.35,
        questions: [
          { id: 'h4', text: 'I exercise regularly', category: 'Physical', pillar: 'health' },
          { id: 'h5', text: 'I maintain a healthy diet', category: 'Physical', pillar: 'health' },
          { id: 'h6', text: 'I get enough quality sleep', category: 'Physical', pillar: 'health' },
        ],
      },
      {
        name: 'Environmental',
        weight: 0.30,
        questions: [
          { id: 'h7', text: 'I spend time in nature', category: 'Environmental', pillar: 'health' },
          { id: 'h8', text: 'My living space is clean and organized', category: 'Environmental', pillar: 'health' },
          { id: 'h9', text: 'I minimize exposure to toxins and pollution', category: 'Environmental', pillar: 'health' },
        ],
      },
    ],
  },
  {
    name: 'Relationships',
    color: '#E8A598',
    categories: [
      {
        name: 'Relationship with Self',
        weight: 0.30,
        questions: [
          { id: 'r1', text: 'I practice self-compassion', category: 'Relationship with Self', pillar: 'relationships' },
          { id: 'r2', text: 'I know my values and live by them', category: 'Relationship with Self', pillar: 'relationships' },
          { id: 'r3', text: 'I make time for self-care', category: 'Relationship with Self', pillar: 'relationships' },
        ],
      },
      {
        name: 'Close Relationships',
        weight: 0.30,
        questions: [
          { id: 'r4', text: 'I have deep, meaningful relationships', category: 'Close Relationships', pillar: 'relationships' },
          { id: 'r5', text: 'I communicate effectively with loved ones', category: 'Close Relationships', pillar: 'relationships' },
          { id: 'r6', text: 'I maintain healthy boundaries', category: 'Close Relationships', pillar: 'relationships' },
        ],
      },
      {
        name: 'Community & Social Circle',
        weight: 0.25,
        questions: [
          { id: 'r7', text: 'I feel connected to my community', category: 'Community & Social Circle', pillar: 'relationships' },
          { id: 'r8', text: 'I have a supportive social network', category: 'Community & Social Circle', pillar: 'relationships' },
          { id: 'r9', text: 'I contribute to my community', category: 'Community & Social Circle', pillar: 'relationships' },
        ],
      },
      {
        name: 'Spiritual/Higher Power',
        weight: 0.15,
        questions: [
          { id: 'r10', text: 'I feel connected to something greater than myself', category: 'Spiritual/Higher Power', pillar: 'relationships' },
          { id: 'r11', text: 'I make time for spiritual practices', category: 'Spiritual/Higher Power', pillar: 'relationships' },
          { id: 'r12', text: 'My spiritual beliefs guide my actions', category: 'Spiritual/Higher Power', pillar: 'relationships' },
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
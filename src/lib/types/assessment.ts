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
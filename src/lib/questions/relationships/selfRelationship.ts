import { Category } from '../../types/assessment';

export const selfRelationshipCategory: Category = {
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
      text: 'How well do you recognize and manage your emotions?', 
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
};
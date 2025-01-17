import { Category } from '../../types/assessment';

export const communitySocialCategory: Category = {
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
};
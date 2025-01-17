import { Pillar } from '../types/assessment';

export const relationshipsPillar: Pillar = {
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
};
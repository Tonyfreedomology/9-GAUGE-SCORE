import { Pillar } from '../types/assessment';

export const healthPillar: Pillar = {
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
};
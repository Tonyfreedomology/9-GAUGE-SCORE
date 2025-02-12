
import { Category } from '../../types/assessment';

export const selfRelationshipCategory: Category = {
  name: 'Relationship with Self',
  weight: 0.30,
  questions: [
    { 
      id: 'r1', 
      text: 'I have a clear understanding of my own strengths and weaknesses.', 
      category: 'Relationship with Self', 
      pillar: 'Relationships',
      options: [
        { value: 1, label: 'Strongly Disagree – I often feel unsure about my strengths and weaknesses.' },
        { value: 2, label: 'Disagree – I have some self-awareness, but not a deep understanding.' },
        { value: 3, label: 'Neutral – I recognize some abilities and flaws but could improve my awareness.' },
        { value: 4, label: 'Agree – I have a good grasp of my strengths and areas for growth.' },
        { value: 5, label: 'Strongly Agree – I am very self-aware and know both my strengths and weaknesses.' }
      ]
    },
    { 
      id: 'r2', 
      text: 'I actively work on improving myself, such as learning new skills or developing better habits.', 
      category: 'Relationship with Self', 
      pillar: 'Relationships',
      options: [
        { value: 1, label: "Never – I don't focus on self-improvement at all." },
        { value: 2, label: "Rarely – I occasionally think about personal growth but don't take much action." },
        { value: 3, label: 'Sometimes – I work on improving myself off and on, but not consistently.' },
        { value: 4, label: 'Often – I frequently invest time in learning and self-improvement.' },
        { value: 5, label: 'Always – I am constantly learning, growing, and refining my habits.' }
      ]
    },
    { 
      id: 'r3', 
      text: 'I feel that my life has a clear sense of purpose or meaning.', 
      category: 'Relationship with Self', 
      pillar: 'Relationships',
      options: [
        { value: 1, label: 'Strongly Disagree – I often feel lost or without direction.' },
        { value: 2, label: "Disagree – I sometimes have purpose, but it's not always clear." },
        { value: 3, label: "Neutral – I have some sense of meaning but don't always feel deeply connected to it." },
        { value: 4, label: 'Agree – I usually feel that my life has direction and meaning.' },
        { value: 5, label: "Strongly Agree – I have a strong sense of purpose and clarity about my life's direction." }
      ]
    },
    { 
      id: 'r4', 
      text: 'I feel comfortable expressing my true self in most situations.', 
      category: 'Relationship with Self', 
      pillar: 'Relationships',
      options: [
        { value: 1, label: 'Never – I rarely feel comfortable being my true self.' },
        { value: 2, label: 'Rarely – I often feel pressure to act differently than I really am.' },
        { value: 3, label: "Sometimes – I'm authentic in some situations but not all." },
        { value: 4, label: 'Often – I usually feel free to be my true self.' },
        { value: 5, label: 'Always – I consistently feel comfortable being exactly who I am.' }
      ]
    }
  ]
};

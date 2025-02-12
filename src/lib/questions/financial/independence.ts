
import { Category } from '../../types/assessment';

export const independenceFlexibilityCategory: Category = {
  name: 'Independence',
  weight: 0.35,
  questions: [
    { 
      id: 'f8', 
      text: 'How often do you feel financial stress about covering basic expenses?', 
      category: 'Independence', 
      pillar: 'Financial',
      options: [
        { value: 1, label: 'Always – I constantly stress about bills and expenses.' },
        { value: 2, label: 'Often – I frequently feel financial pressure.' },
        { value: 3, label: 'Sometimes – I worry about money occasionally but manage okay.' },
        { value: 4, label: 'Rarely – I sometimes think about money, but not in a stressful way.' },
        { value: 5, label: 'Never – I feel financially stable and rarely worry about expenses.' }
      ]
    },
    { 
      id: 'f9', 
      text: 'If you wanted to change careers tomorrow, could you survive for 90 days financially without tapping retirement savings?', 
      category: 'Independence', 
      pillar: 'Financial',
      options: [
        { value: 1, label: 'Impossible – I would be in serious trouble without my current income.' },
        { value: 2, label: 'Very difficult – I would struggle but might find a way.' },
        { value: 3, label: 'Challenging – I could make a move, but it would require adjustments.' },
        { value: 4, label: "Possible with planning – I have some flexibility, but I'd need a plan." },
        { value: 5, label: 'Easily possible – I have enough financial freedom to make a move anytime.' }
      ]
    },
    { 
      id: 'f10', 
      text: 'I have the financial flexibility to make choices about my lifestyle and career that reflect my wants, rather than needs', 
      category: 'Independence', 
      pillar: 'Financial',
      options: [
        { value: 1, label: 'Strongly Disagree – I feel very constrained and unable to pursue my ideal path.' },
        { value: 2, label: 'Disagree – Significant barriers prevent me from pursuing my goals.' },
        { value: 3, label: 'Neutral – I have some freedom, but also notable limitations.' },
        { value: 4, label: "Agree – I'm largely able to choose my career and lifestyle with minor limitations." },
        { value: 5, label: 'Strongly Agree – I have full freedom to live how I want.' }
      ]
    },
    { 
      id: 'f11', 
      text: 'I have control over how I spend my time each day and who I spend it with.', 
      category: 'Independence', 
      pillar: 'Financial',
      options: [
        { value: 1, label: 'Strongly Disagree – My schedule is completely dictated by obligations.' },
        { value: 2, label: "Disagree – I often don't have a choice in how I spend my time." },
        { value: 3, label: 'Neutral – I control some of my time, but not all.' },
        { value: 4, label: 'Agree – I mostly have the freedom to decide my schedule.' },
        { value: 5, label: 'Strongly Agree – I have full control over my daily time and social interactions.' }
      ]
    },
  ],
};

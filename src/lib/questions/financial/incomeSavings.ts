
import { Category } from '../../types/assessment';

export const incomeSavingsCategory: Category = {
  name: 'Income',
  weight: 0.35,
  questions: [
    { 
      id: 'f1', 
      text: 'I have enough income to cover my needs and some wants comfortably.', 
      category: 'Income', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Strongly Disagree – I struggle to afford basic necessities.' },
        { value: 2, label: 'Disagree – I can cover basics, but extra expenses are very difficult.' },
        { value: 3, label: 'Neutral – I meet my basic needs, but have little left over.' },
        { value: 4, label: 'Agree – I comfortably cover all essential needs and some non-essentials.' },
        { value: 5, label: 'Strongly Agree – I have plenty of income to cover needs and discretionary spending.' }
      ]
    },
    { 
      id: 'f2', 
      text: 'I could handle a major unexpected expense (like a large car repair) without financial strain.', 
      category: 'Income', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Never – An emergency expense would be devastating to my finances.' },
        { value: 2, label: 'Rarely – I would struggle significantly to cover it.' },
        { value: 3, label: 'Sometimes – I could manage it, but it would require cutting back elsewhere.' },
        { value: 4, label: 'Often – I have savings or resources that would cover it with little stress.' },
        { value: 5, label: 'Always – I am fully prepared for emergencies financially.' }
      ]
    },
    { 
      id: 'f3', 
      text: 'What percentage of your income do you regularly save or invest?', 
      category: 'Income', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'None (0%)' },
        { value: 2, label: '1–5%' },
        { value: 3, label: '6–10%' },
        { value: 4, label: '11–20%' },
        { value: 5, label: '20%+' }
      ]
    },
    { 
      id: 'f4', 
      text: 'I feel in control of my financial situation, rather than feeling controlled by money.', 
      category: 'Income', 
      pillar: 'financial',
      options: [
        { value: 1, label: 'Strongly Disagree – I feel very out of control; money problems dominate my life.' },
        { value: 2, label: 'Disagree – I often worry about money and feel constrained by it.' },
        { value: 3, label: 'Neutral – I sometimes feel in control, other times not.' },
        { value: 4, label: 'Agree – I mostly feel on top of my finances, with occasional stress.' },
        { value: 5, label: 'Strongly Agree – I feel fully in control of my financial life.' }
      ]
    },
  ],
};

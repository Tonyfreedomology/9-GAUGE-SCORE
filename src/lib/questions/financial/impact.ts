
import { Category } from '../../types/assessment';

export const impactGenerosityCategory: Category = {
  name: 'Impact',
  weight: 0.30,
  questions: [
    { 
      id: 'f15', 
      text: 'I regularly volunteer or dedicate time to help my community or causes I care about.', 
      category: 'Impact', 
      pillar: 'Financial',
      options: [
        { value: 1, label: 'Never – I do not volunteer or contribute time.' },
        { value: 2, label: 'Rarely – I help occasionally but not consistently.' },
        { value: 3, label: 'Sometimes – I contribute a few times a year.' },
        { value: 4, label: 'Often – I frequently dedicate time to causes.' },
        { value: 5, label: 'Always – I regularly invest time in community or charitable efforts.' }
      ]
    },
    { 
      id: 'f16', 
      text: 'When I see someone in need or a problem I can help with, I take action if possible.', 
      category: 'Impact', 
      pillar: 'Financial',
      options: [
        { value: 1, label: "Strongly Disagree – I usually don't get involved." },
        { value: 2, label: "Disagree – I sometimes think about helping but don't act." },
        { value: 3, label: 'Neutral – I help sometimes, but not consistently.' },
        { value: 4, label: 'Agree – I usually step in when I see a need.' },
        { value: 5, label: 'Strongly Agree – When I see a way to help, I do so.' }
      ]
    },
    { 
      id: 'f17', 
      text: 'I find a sense of purpose in contributing to something bigger than myself.', 
      category: 'Impact', 
      pillar: 'Financial',
      options: [
        { value: 1, label: "Strongly Disagree – I don't find meaning in contributing beyond my own needs." },
        { value: 2, label: 'Disagree – I rarely feel a sense of purpose from contributing.' },
        { value: 3, label: 'Neutral – I sometimes feel purpose in my contributions.' },
        { value: 4, label: 'Agree – I often feel that helping others gives my life meaning.' },
        { value: 5, label: 'Strongly Agree – I deeply believe that contributing is central to my purpose.' }
      ]
    },
    { 
      id: 'f18', 
      text: 'I am proud of the positive impact I have on the world.', 
      category: 'Impact', 
      pillar: 'Financial',
      options: [
        { value: 1, label: "Strongly Disagree – I don't feel I have a positive impact." },
        { value: 2, label: 'Disagree – I rarely feel proud of making a difference.' },
        { value: 3, label: "Neutral – I make some impact, but it doesn't feel significant." },
        { value: 4, label: 'Agree – I see ways I contribute positively and it feels good.' },
        { value: 5, label: 'Strongly Agree – I make a meaningful difference and feel proud of it.' }
      ]
    },
  ],
};

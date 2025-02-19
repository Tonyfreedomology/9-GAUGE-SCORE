
import { Category } from '../../types/assessment';

export const spiritualCategory: Category = {
  name: 'Relationship with God',
  weight: 0.15,
  questions: [
    { 
      id: 'r12', 
      text: 'I feel a connection with God in my life.', 
      category: 'Relationship with God', 
      pillar: 'Relationships',
      options: [
        { value: 1, label: 'Strongly Disagree – I do not feel any connection with God or a higher power.' },
        { value: 2, label: 'Disagree – I rarely feel spiritually connected.' },
        { value: 3, label: "Neutral – I sometimes feel a connection, but it's not very strong." },
        { value: 4, label: 'Agree – I often feel connected to God or a higher presence.' },
        { value: 5, label: 'Strongly Agree – I feel a deep and constant connection with God.' }
      ]
    },
    { 
      id: 'r13', 
      text: 'My faith or spiritual practice gives me guidance and strength in daily life.', 
      category: 'Relationship with God', 
      pillar: 'Relationships',
      options: [
        { value: 1, label: 'Strongly Disagree – My faith does not play a role in my daily life.' },
        { value: 2, label: 'Disagree – My spiritual beliefs occasionally help, but not consistently.' },
        { value: 3, label: "Neutral – My faith gives me guidance sometimes, but I don't rely on it much." },
        { value: 4, label: 'Agree – My spiritual beliefs regularly provide me with strength and clarity.' },
        { value: 5, label: 'Strongly Agree – My faith is a major source of guidance in my life.' }
      ]
    },
    { 
      id: 'r14', 
      text: 'How often do you talk to God?', 
      category: 'Relationship with God', 
      pillar: 'Relationships',
      options: [
        { value: 1, label: "Never – I don't talk to God at all." },
        { value: 2, label: 'Rarely – In crisis, I sometimes ask God for help.' },
        { value: 3, label: 'Sometimes – I talk to God a few times a week.' },
        { value: 4, label: 'Daily – I talk to God every day.' },
        { value: 5, label: 'Ongoing – I talk with God regularly, throughout my day.' }
      ]
    },
    {
      id: 'r15',
      text: 'I strive to live in alignment with my core values and principles in my daily actions.',
      category: 'Relationship with God',
      pillar: 'Relationships',
      options: [
        { value: 1, label: "Strongly Disagree – I don't think about my spiritual values in daily life." },
        { value: 2, label: "Disagree – I occasionally consider my values, but my actions don't always align." },
        { value: 3, label: "Neutral – I try to follow my values sometimes, but I'm not very consistent." },
        { value: 4, label: 'Agree – I make a solid effort to live according to my spiritual values.' },
        { value: 5, label: 'Strongly Agree – I consistently live in alignment with my religious/spiritual principles.' }
      ]
    }
  ],
};

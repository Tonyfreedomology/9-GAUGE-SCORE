
import { Category } from '../../types/assessment';

export const relationshipsWithOthersCategory: Category = {
  name: 'Relationships with Others',
  weight: 0.30,
  questions: [
    { 
      id: 'r4', 
      text: 'I feel comfortable sharing my thoughts and feelings with those close to me.', 
      category: 'Relationships with Others', 
      pillar: 'relationships',
      options: [
        { value: 1, label: 'Never – I rarely express my true thoughts and feelings.' },
        { value: 2, label: 'Rarely – I struggle to be open in important conversations.' },
        { value: 3, label: "Sometimes – I'm open about some things, but not always." },
        { value: 4, label: 'Often – I usually share my thoughts and feelings with those I care about.' },
        { value: 5, label: 'Always – I consistently communicate honestly and openly in my relationships.' }
      ]
    },
    { 
      id: 'r5', 
      text: 'I feel a sense of belonging and connection with my community or social circle.', 
      category: 'Relationships with Others', 
      pillar: 'relationships',
      options: [
        { value: 1, label: 'Strongly Disagree – I often feel isolated or disconnected.' },
        { value: 2, label: "Disagree – I sometimes feel like I don't really belong anywhere." },
        { value: 3, label: "Neutral – I have some connections but don't always feel included." },
        { value: 4, label: 'Agree – I generally feel accepted and like I belong.' },
        { value: 5, label: 'Strongly Agree – I feel deeply connected and part of a supportive community.' }
      ]
    },
    { 
      id: 'r6', 
      text: 'I regularly make time for experiences with friends or family.', 
      category: 'Relationships with Others', 
      pillar: 'relationships',
      options: [
        { value: 1, label: 'Never – I rarely put effort into maintaining relationships.' },
        { value: 2, label: 'Rarely – I check in with people occasionally but not consistently.' },
        { value: 3, label: 'Sometimes – I try to stay in touch, but not as often as I should.' },
        { value: 4, label: 'Often – I frequently make time for friends and family.' },
        { value: 5, label: 'Always – I actively and regularly invest time in my relationships.' }
      ]
    },
    { 
      id: 'r7', 
      text: 'I have built myself into the kind of person who is ready for a strong, lasting relationship.', 
      category: 'Relationships with Others', 
      pillar: 'relationships',
      options: [
        { value: 1, label: "Strongly Disagree – I don't feel prepared for a deep, committed relationship." },
        { value: 2, label: "Disagree – I have made some progress, but I'm not sure I'm ready." },
        { value: 3, label: "Neutral – I think I could be a good partner, but I'm not fully confident." },
        { value: 4, label: "Agree – I've put in the work to be a great partner." },
        { value: 5, label: "Strongly Agree – I know I'm fully ready for (or have) a deep, committed relationship." }
      ]
    }
  ]
};

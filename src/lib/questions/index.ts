import { financialPillar } from './financial';
import { healthPillar } from './health';
import { relationshipsPillar } from './relationships';
import { Pillar } from '../types/assessment';

export const questions: Pillar[] = [
  financialPillar,
  healthPillar,
  relationshipsPillar,
];

export const getFeedbackTier = (score: number): string => {
  if (score >= 85) return "Exceptional Score";
  if (score >= 70) return "Above Average";
  if (score >= 50) return "Room for Growth";
  return "Needs Attention";
};

export const calculatePillarScore = (pillar: Pillar, answers: Record<string, number>): number => {
  const categoryScores = pillar.categories.map(category => {
    const categoryQuestions = category.questions;
    const categoryAnswers = categoryQuestions.map(q => {
      const answer = answers[q.id] || 0;
      // Convert 1-5 scale to 0-100
      return ((answer - 1) / 4) * 100;
    });
    const categoryScore = categoryAnswers.reduce((a, b) => a + b, 0) / categoryQuestions.length;
    return categoryScore * category.weight;
  });

  let pillarScore = categoryScores.reduce((a, b) => a + b, 0);

  // Apply capping logic for Financial pillar
  if (pillar.name === 'Financial') {
    const impactCategory = pillar.categories.find(c => c.name === 'Impact & Generosity');
    if (impactCategory) {
      const impactQuestions = impactCategory.questions;
      const impactScore = impactQuestions.map(q => answers[q.id] || 0)
        .reduce((a, b) => a + b, 0) / impactQuestions.length;
      const normalizedImpactScore = ((impactScore - 1) / 4) * 100;
      if (normalizedImpactScore < 60) {
        pillarScore = Math.min(pillarScore, 75);
      }
    }
  }

  // Apply capping logic for Relationships pillar
  if (pillar.name === 'Relationships') {
    const selfCategory = pillar.categories.find(c => c.name === 'Relationship with Self');
    if (selfCategory) {
      const selfQuestions = selfCategory.questions;
      const selfScore = selfQuestions.map(q => answers[q.id] || 0)
        .reduce((a, b) => a + b, 0) / selfQuestions.length;
      const normalizedSelfScore = ((selfScore - 1) / 4) * 100;
      if (normalizedSelfScore < 40) {
        
        pillarScore = Math.min(pillarScore, 70);
      }
    }
  }

  return Math.round(pillarScore);
};
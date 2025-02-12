
import { Pillar } from '../types/assessment';
import { incomeSavingsCategory } from './financial/incomeSavings';
import { independenceFlexibilityCategory } from './financial/independenceFlexibility';
import { impactGenerosityCategory } from './financial/impactGenerosity';

export const financialPillar: Pillar = {
  name: 'Financial',
  color: '#84A98C',
  categories: [
    incomeSavingsCategory,
    independenceFlexibilityCategory,
    impactGenerosityCategory,
  ],
};

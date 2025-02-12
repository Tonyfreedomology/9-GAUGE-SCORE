
import { Pillar } from '../types/assessment';
import { incomeSavingsCategory } from './financial/income';
import { independenceFlexibilityCategory } from './financial/independence';
import { impactGenerosityCategory } from './financial/impact';

export const financialPillar: Pillar = {
  name: 'Financial',
  color: '#84A98C',
  categories: [
    incomeSavingsCategory,
    independenceFlexibilityCategory,
    impactGenerosityCategory,
  ],
};

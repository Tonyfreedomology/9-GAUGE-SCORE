import { Pillar } from '../types/assessment';
import { incomeSavingsCategory } from './financial/incomeSavings';
import { debtCreditCategory } from './financial/debtCredit';
import { independenceFlexibilityCategory } from './financial/independenceFlexibility';
import { investmentGrowthCategory } from './financial/investmentGrowth';
import { impactGenerosityCategory } from './financial/impactGenerosity';

export const financialPillar: Pillar = {
  name: 'Financial',
  color: '#84A98C',
  categories: [
    incomeSavingsCategory,
    debtCreditCategory,
    independenceFlexibilityCategory,
    investmentGrowthCategory,
    impactGenerosityCategory,
  ],
};
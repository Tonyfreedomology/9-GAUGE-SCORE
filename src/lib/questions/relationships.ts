import { Pillar } from '../types/assessment';
import { selfRelationshipCategory } from './relationships/selfRelationship';
import { closeRelationshipsCategory } from './relationships/closeRelationships';
import { communitySocialCategory } from './relationships/communitySocial';
import { spiritualCategory } from './relationships/spiritual';

export const relationshipsPillar: Pillar = {
  name: 'Relationships',
  color: '#EF3E36',
  categories: [
    selfRelationshipCategory,
    closeRelationshipsCategory,
    communitySocialCategory,
    spiritualCategory,
  ],
};
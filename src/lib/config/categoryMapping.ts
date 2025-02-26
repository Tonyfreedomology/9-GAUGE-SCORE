export const categoryToPillarMapping: Record<string, { pillar: string; displayName: string }> = {
  'Mental Health': { pillar: 'Health', displayName: 'Mental Health' },
  'Physical Health': { pillar: 'Health', displayName: 'Physical Health' },
  'Environmental Health': { pillar: 'Health', displayName: 'Environmental Health' },
  'Income': { pillar: 'Financial', displayName: 'Income' },
  'Independence': { pillar: 'Financial', displayName: 'Independence' },
  'Impact': { pillar: 'Financial', displayName: 'Impact' },
  'Relationships with Others': { pillar: 'Relationships', displayName: 'Relationships with Others' },
  'Relationship with Self': { pillar: 'Relationships', displayName: 'Relationship with Self' },
  'Relationship with God': { pillar: 'Relationships', displayName: 'Relationship with God' }
};

export const pillarColors = {
  'Health': '#23F1EE',
  'Financial': '#00805D',
  'Relationships': '#FF105F'
} as const;

export const pillarOrder = ['Health', 'Financial', 'Relationships'] as const;

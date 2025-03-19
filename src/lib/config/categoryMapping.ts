
export const categoryToPillarMapping: Record<string, { pillar: string; displayName: string }> = {
  // Health subcategories
  'Mental Health': { pillar: 'Health', displayName: 'Mental Health' },
  'Physical Health': { pillar: 'Health', displayName: 'Physical Health' },
  'Environmental Health': { pillar: 'Health', displayName: 'Environmental Health' },
  
  // Financial subcategories
  'Income': { pillar: 'Financial', displayName: 'Income' },
  'Independence': { pillar: 'Financial', displayName: 'Independence' },
  'Impact': { pillar: 'Financial', displayName: 'Impact' },
  
  // Relationships subcategories
  'Relationships with Others': { pillar: 'Relationships', displayName: 'Relationships with Others' },
  'Relationship with Self': { pillar: 'Relationships', displayName: 'Relationship with Self' },
  'Relationship with God': { pillar: 'Relationships', displayName: 'Relationship with God' },
  
  // Add fallback mappings for generic category names and variations
  'Health': { pillar: 'Health', displayName: 'Health' },
  'Finance': { pillar: 'Financial', displayName: 'Finance' },
  'Financial': { pillar: 'Financial', displayName: 'Financial' },
  'Relationships': { pillar: 'Relationships', displayName: 'Relationships' },
  'Mental': { pillar: 'Health', displayName: 'Mental Health' },
  'Physical': { pillar: 'Health', displayName: 'Physical Health' },
  'Environmental': { pillar: 'Health', displayName: 'Environmental Health' },
  'Self': { pillar: 'Relationships', displayName: 'Relationship with Self' },
  'Others': { pillar: 'Relationships', displayName: 'Relationships with Others' },
  'God': { pillar: 'Relationships', displayName: 'Relationship with God' }
};

export const pillarColors = {
  'Health': '#1BEBE7',
  'Financial': '#22EDB6',
  'Relationships': '#FF105F'
} as const;

export const pillarOrder = ['Health', 'Financial', 'Relationships'] as const;

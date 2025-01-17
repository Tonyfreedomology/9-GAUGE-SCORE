export type SprintContent = {
  heading: string;
  body: string;
  cta: string;
  icon: 'heart' | 'dollar-sign' | 'users';
  color: string;
};

export const sprintContent: Record<string, SprintContent> = {
  "Health": {
    heading: "Your Health Matters",
    body: "Your health is the foundation of your freedom. We've noticed this area could use some attention. Consider joining H40, our 40-day sprint designed to help you build lasting health habits and increase your energy levels. We believe life is best when all three areas—health, finances, and relationships—are thriving.",
    cta: "Join H40",
    icon: "heart",
    color: "health"
  },
  "Financial": {
    heading: "Financial Freedom Awaits",
    body: "Your finances could use some improvement, but that's okay! Consider joining F40, our 40-day sprint to financial freedom. We've designed this program to help you take control of your money and build wealth-building habits. Remember, true freedom comes when health, finances, and relationships work together.",
    cta: "Join F40",
    icon: "dollar-sign",
    color: "financial"
  },
  "Relationships": {
    heading: "Transform Every Relationship in Your Life",
    body: "R40 is designed to transform your relationships in three key areas: with others, yourself, and your Creator. Over six transformative weeks, you'll learn to CONNECT with those around you, REFLECT on your self-relationship, ATTRACT positive connections, CORRECT unhealthy patterns, show RESPECT in challenging situations, and discover PERFECT unconditional love. This 40-day journey will revolutionize how you approach relationships and help you build deeper, more meaningful connections in every area of your life.",
    cta: "Join R40",
    icon: "users",
    color: "relationships"
  }
};
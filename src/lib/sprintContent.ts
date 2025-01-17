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
    heading: "Strengthen Your Relationships",
    body: "Relationships are at the core of a fulfilling life, and we see room for growth here. Join R40, our 40-day sprint focused on building stronger connections. This program will help you develop the skills needed for lasting relationships. When your relationships, health, and finances align, that's when true freedom happens.",
    cta: "Join R40",
    icon: "users",
    color: "relationships"
  }
};
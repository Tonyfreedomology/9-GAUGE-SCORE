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
    body: `Looks like your finances could use some improvement, but that's okay! We built something just for you!

<p>We've created a FREE 40-day challenge called <strong>F40</strong> to help people improve their finances and start down the path to financial freedom.</p>

<p>Sign up below, and each day for 40 days, you'll get an email and one video micro-lesson (10 mins or less) on an aspect of wealth creation. We'll show you the exact steps you need to take to start increasing your income, your independence and ultimately, your impact.</p>

<p>Here's what we cover:</p>`,
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
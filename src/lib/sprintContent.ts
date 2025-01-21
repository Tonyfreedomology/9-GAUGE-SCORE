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
    body: `Looks like your finances could use some improvement, <strong>but that's okay!</strong> We built something just for you!

<p>Consider joining <strong>F40</strong>, our <strong>40-day roadmap to financial freedom</strong>. We believe that financial freedom is possible for everyone, and that life is better when you're not stressed about money.</p>

<p>We've designed this program to help you take control of your money and build wealth-building habits, and it's completely <strong>FREE</strong> so you have <strong>nothing to lose</strong>.</p>

<p>The commitment is simple:</p>

<p>Each day for 40 days, you'll get an email and one video micro-lesson (10 mins or less) on some aspect of wealth creation.</p>

<p>Every video is designed to be thought-provoking, relevant, and practical so that you can start applying what you're learning right away.</p>

<p>Over the course of the 40 days, you will build entirely new habits that set you on the path to financial freedom.</p>

<p>Here's what we cover in the 6 weeks:</p>`,
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
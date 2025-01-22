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
    body: "It looks like your health has some room for improvement, but that's okay! We have something that might help.\n\n\
We've built a FREE 40-day challenge called <strong>H40</strong> that's designed to completely transform both your physical and mental health. We've had over 5000 people go through H40 and have seen <strong><em>incredible</em></strong> results.\n\n\
It's super easy. Sign up below, and each day for 40 days, you'll get an email and one video micro-lesson (10 mins or less) on an aspect of health. We'll show you the exact steps you need to take to increase your energy, build muscle, lose fat AND improve your mental health.",
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
    body: "It looks like your relationships have some room for growth, but that's okay! We have something that might help.\n\n\
We've built a FREE 40-day challenge called <strong>R40</strong> that's designed to transform and improve every relationship in your life.\n\n\
It's super easy. Just sign up below, and each day for 40 days, you'll get an email and one video micro-lesson (10 mins or less) about an aspect of relationships. We'll show you the exact steps you need to take to become more attractive, build deeper, more meaningful connections, and improve your relationship with yourself.\n\n\
Here's what we cover:",
    cta: "Join R40",
    icon: "users",
    color: "relationships"
  }
};
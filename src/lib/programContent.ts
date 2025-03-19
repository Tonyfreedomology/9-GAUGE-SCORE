
import { SprintType } from "@/types";
import { ReactNode } from "react";

export type WeekContent = {
  number: string;
  title: string;
  description: string;
  color?: SprintType; // Added as optional in case it's needed
};

export type ProgramContent = {
  weeks: WeekContent[];
  color: SprintType;
  icon?: ReactNode;
};

export const programs: Record<string, ProgramContent> = {
  "Financial": {
    color: "financial",
    weeks: [
      {
        number: "1",
        title: "design",
        description: `Stop playing by everyone else's rules. It's time to <strong>design a life that works for you</strong>. This week, we'll show you how to re-engineer your time and build an intentional, abundant lifestyle <em>without sacrificing</em> a single goal.`
      },
      {
        number: "2",
        title: "create",
        description: `<strong>The fastest way to wealth is by creating it</strong>. We'll show you how to create IPA's (income producing assets) that work 24/7 even when you don't. <u>Businesses, Real Estate, Intellectual Property</u> - it's all covered.`
      },
      {
        number: "3",
        title: "invest",
        description: `We're not just talking stocks and bonds—we're talking <strong>full-spectrum wealth building</strong>. This is your deep dive into how money really works and how to make it work for you.`
      },
      {
        number: "4",
        title: "reduce",
        description: `Money isn't a currency of worth — it's a <strong>currency of action</strong>. This week, we're <em>ripping apart the myths holding you back</em> and helping you cut deadweight debts that drown your potential.`
      },
      {
        number: "5",
        title: "develop",
        description: `This week, it's all about who you are becoming. We're talking <strong>unshakable confidence, an unbreakable attitude, and a vision</strong> that'll change everything.`
      },
      {
        number: "6",
        title: "protect",
        description: `You've built it—<em>now protect it</em>. This week is all about fortifying your empire, keeping what's yours safe, and setting up protection against the threats most people ignore. <strong>It's not how much you make it's how much you keep.</strong>`
      }
    ]
  },
  "Health": {
    color: "health",
    weeks: [
      {
        number: "1",
        title: "adam",
        description: `Become a morning person. It's all about establishing a morning routine that lets you attack the day instead of letting the day attack you. It's simple but incredibly important, and <strong>foundational to everything else we're doing</strong>.`
      },
      {
        number: "2",
        title: "eat",
        description: `Change your relationship to food. We're going to start to see food as a fuel source, and something that can make us feel great, not just while we're eating, but long after it as well. <strong>And we'll show you how healthy = delicious</strong>.`
      },
      {
        number: "3",
        title: "move",
        description: `Build <strong>MUSCLE</strong> and gain <strong>ENERGY</strong> through the right movements. If you don't have 3 hours a day to spend at the gym then you're going to love this!`
      },
      {
        number: "4",
        title: "rest",
        description: `<strong>Get the best night's sleep possible</strong>. Sleep isn't just something we do between our healthy habits, <em>sleep is a foundation for our health</em>, and it's important that we get this right. So we're going to show you several ways you can improve the quality of your sleep, and some things you probably haven't tried.`
      },
      {
        number: "5",
        title: "haak",
        description: `This week is all about <em>Biohacking</em>, optimizing our physical and mental health at the cellular level. This is where we'll cover new ideas, science, and supplements for optimizing our total health.`
      },
      {
        number: "6",
        title: "flow",
        description: `<strong>Create spaces you love being in</strong>. This week we're going to talk about HOW and WHY our <em>environments</em> are so important to our physical and mental health AND then <em>transform one of your spaces</em>.`
      }
    ]
  },
  "Relationships": {
    color: "relationships",
    weeks: [
      {
        number: "1",
        title: "connect",
        description: `It's all about how we are <em>hardwired for connection</em> and that life isn't meant to be done alone. We believe that people matter more than anything, and that the best part about life is <strong>experiencing the world with people you love</strong>.`
      },
      {
        number: "2",
        title: "reflect",
        description: `It's all about reflecting on your <em>relationship with yourself</em>. How you see yourself and what you believe about yourself impacts every other relationship you have. You'll learn how to treat <em>yourself</em> as someone worth caring about, drop limiting beliefs, and transform <strong>your self-image</strong>.`
      },
      {
        number: "3",
        title: "attract",
        description: `You'll learn how to be a person who <strong>has values, and lives by them</strong>. To be a person who <strong>adds value to everyone that matters</strong>. It's about becoming an attractive character - someone who serves others, and lives a principled life.`
      },
      {
        number: "4",
        title: "correct",
        description: `We talk about <em>why relationships fall apart</em>, what goes wrong and why. You'll learn to spot the ways that you might have contributed to unhealthy patterns in relationships so that you can <em>correct them</em>. It's the week where you'll take a good hard look at yourself and the ways you may have hurt others.`
      },
      {
        number: "5",
        title: "respect",
        description: `This week is all about mending fences and being able to <strong>treat people with respect</strong>, even when they hurt us. Conflict is inevitable in close relationships - <em>it's how you handle it that matters</em>. Every deep relationship has survived conflict and <em>come out the other side stronger</em>. This week, we'll share the secrets to navigating hurts and moving through them.`
      },
      {
        number: "6",
        title: "perfect",
        description: `You'll learn how living a life of relentless unconditional love is only possible through a relationship with God. <em>We believe that God is perfectly for you and not against you</em>. He is the only one who loves perfectly, and we need to lay on him to be our source of strength. What you believe about God, and more importantly, <strong>what you believe God thinks about YOU</strong> will transform your entire outlook on life.`
      }
    ]
  }
};

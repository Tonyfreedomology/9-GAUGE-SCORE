import { ScrollPrompt } from "./ScrollPrompt";
import { SprintCard } from "./SprintCard";
import { WeekContent } from "./WeekContent";
import { SignupForm } from "./SignupForm";

type NextStepsProps = {
  lowestPillar: string;
  onStartOver: () => void;
};

export const NextSteps = ({ lowestPillar, onStartOver }: NextStepsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 space-y-8">
      <SprintCard lowestPillar={lowestPillar} />

      <div className="relative h-24 flex items-center justify-center">
        <ScrollPrompt />
      </div>

      <div className="bg-[#293230] backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
        <h2 className="text-4xl font-serif text-white mb-12">The Six Weeks</h2>
        
        <div className="space-y-12">
          <WeekContent 
            number="01"
            title="CONNECT"
            description="It's all about how we are hardwired for connection and that life isn't meant to be done alone. We believe that people matter more than anything, and that the best part about life is experiencing the world with people you love."
          />
          
          <WeekContent 
            number="02"
            title="REFLECT"
            description="It's all about reflecting on your relationship with yourself. How you see yourself and what you believe about yourself impacts every other relationship you have. You'll learn how to treat yourself as someone worth caring about, drop limiting beliefs, and transform your self-image."
          />
          
          <WeekContent 
            number="03"
            title="ATTRACT"
            description="You'll learn how to be a person who has values, and lives by them. To be a person who adds value. It's about becoming an attractive character - someone who serves others, and lives a principled life."
          />
          
          <WeekContent 
            number="04"
            title="CORRECT"
            description="We talk about why relationships fall apart, what goes wrong and why. You'll learn to spot the ways that you might have contributed to unhealthy patterns in relationships so that you can correct them. It's the week where you'll take a good hard look at yourself and the ways you may have hurt others."
          />
          
          <WeekContent 
            number="05"
            title="RESPECT"
            description="This week is all about mending fences and being able to treat people with respect, even when they hurt us. Conflict is inevitable in close relationships - it's how you handle it that matters. Every deep relationship has survived conflict and come out the other side stronger. This week, we'll share the secrets to navigating hurts and moving through them."
          />
          
          <WeekContent 
            number="06"
            title="PERFECT"
            description="You'll learn how living a life of relentless unconditional love is only possible through a relationship with God. We believe that God is perfectly for you and not against you. He is the only one who loves perfectly, and we need to lay on him to be our source of strength. What you believe about God, and more importantly, what you believe God thinks about YOU will transform your entire outlook on life."
          />
        </div>
      </div>

      <SignupForm />
    </div>
  );
};
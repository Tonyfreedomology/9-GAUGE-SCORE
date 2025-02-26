export type SprintContent = {
  heading: string;
  body: string;
  cta: string;
  icon: 'health' | 'financial' | 'relationships';
  color: string;
};

export const sprintContent: Record<string, SprintContent> = {
  "Health": {
    heading: "your health matters",
    body: `
<p class="text-xl font-bold text-center mb-6">Your <strong style="color: #23F1EE;">health</strong> drives <em>everything</em>, and we have something that'll help <u>you</u> get even stronger.</p>

<p class="text-center mb-4">We created a 6 week challenge called <strong style="font-size: 1.25rem; background: linear-gradient(90deg, #23F1EE, #60f5f5, #b0fcfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">H40</strong> that's designed to completely transform both your physical and mental health.</p>

<div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px 20px; margin: 16px auto; display: flex; align-items: center; max-width: 85%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);">
  <span style="font-size: 1.5rem; margin-right: 12px;">🔥</span>
  <p style="margin: 0;">We've had over <strong>5,000+</strong> people go through H40 with <em>incredible</em> results!</p>
</div>

<div class="flex justify-center flex-wrap gap-2 my-6">
  <span class="inline-block px-4 py-2 bg-white bg-opacity-15 rounded-full font-semibold text-white border border-white border-opacity-20 shadow-sm">Fat gone</span>
  <span class="inline-block px-4 py-2 bg-white bg-opacity-15 rounded-full font-semibold text-white border border-white border-opacity-20 shadow-sm">Weight down</span>
  <span class="inline-block px-4 py-2 bg-white bg-opacity-15 rounded-full font-semibold text-white border border-white border-opacity-20 shadow-sm">Muscle up</span>
  <span class="inline-block px-4 py-2 bg-white bg-opacity-25 rounded-full font-bold text-white border border-white border-opacity-30 shadow-sm transform scale-105">Energy through the roof</span>
</div>

<div style="background: rgba(0, 0, 0, 0.1); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center; position: relative; border: 1px solid rgba(255, 255, 255, 0.1);">
  <p style="text-decoration: line-through; opacity: 0.7; font-size: 1rem; color: rgba(255, 255, 255, 0.8); margin-bottom: 8px;">$197 value</p>
  <p class="text-xl font-bold">FREE for you and a friend</p>
  <p style="font-size: 0.9rem; opacity: 0.9; margin-top: 12px;">Get immediate access to the program that's changing thousands of lives. Plus, bring a friend or small group at no additional cost!</p>
</div>

<p class="text-lg text-center">Join the waitlist below, and you'll get an email as soon as we launch. We'll show you the exact steps you need to take to:</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 my-4">
  <div class="flex items-center"><span style="margin-right: 10px; color: white; font-weight: bold;">✓</span> Increase your daily energy</div>
  <div class="flex items-center"><span style="margin-right: 10px; color: white; font-weight: bold;">✓</span> Build sustainable muscle</div>
  <div class="flex items-center"><span style="margin-right: 10px; color: white; font-weight: bold;">✓</span> Lose stubborn fat</div>
  <div class="flex items-center"><span style="margin-right: 10px; color: white; font-weight: bold;">✓</span> Improve your mental health</div>
</div>`,
    cta: "Join H40",
    icon: "health",
    color: "health"
  },
  "Financial": {
    heading: "financial freedom for everyone",
    body: `
<p class="text-xl font-bold text-center mb-6">We live in a world where <strong style="color: #00805D;">financial freedom</strong> is an incredible gift. We can help you get there <u>faster</u>!</p>

<p class="text-center mb-4">We created a 6 week challenge called <strong style="font-size: 1.25rem; background: linear-gradient(90deg, #00805D, #00A57D, #00C896); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">F40</strong> that's designed to completely transform your income, independence, and impact.</p>

<div style="background: rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 12px 20px; margin: 16px auto; display: flex; align-items: center; max-width: 85%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid rgba(255, 255, 255, 0.2);">
  <span style="font-size: 1.5rem; margin-right: 12px;">💰</span>
  <p style="margin: 0;">We've had over <strong>5,000+</strong> people go through F40 with <em>remarkable</em> results!</p>
</div>

<div class="flex justify-center flex-wrap gap-2 my-6">
  <span class="inline-block px-4 py-2 rounded-full font-semibold text-gray-800 border shadow-sm" style="background: rgba(0, 255, 186, 0.3); border-color: rgba(0, 255, 186, 0.5);">Stress GONE</span>
  <span class="inline-block px-4 py-2 rounded-full font-semibold text-gray-800 border shadow-sm" style="background: rgba(0, 255, 186, 0.3); border-color: rgba(0, 255, 186, 0.5);">Expenses DOWN</span>
  <span class="inline-block px-4 py-2 rounded-full font-semibold text-gray-800 border shadow-sm" style="background: rgba(0, 255, 186, 0.3); border-color: rgba(0, 255, 186, 0.5);">Income UP</span>
  <span class="inline-block px-4 py-2 rounded-full font-bold text-gray-800 border shadow-md transform scale-105" style="background: rgba(0, 255, 186, 0.4); border-color: rgba(0, 255, 186, 0.6);">Freedom through the roof</span>
</div>

<div style="background: linear-gradient(135deg, rgba(0, 255, 186, 0.1), rgba(0, 255, 186, 0.2)); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center; position: relative; border: 1px solid rgba(0, 255, 186, 0.25); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);">
  <p style="text-decoration: line-through; font-size: 1rem; color: rgba(30, 30, 30, 0.9); margin-bottom: 8px; font-weight: 600; background: rgba(255, 255, 255, 0.4); display: inline-block; padding: 2px 8px; border-radius: 4px;">$197 value</p>
  <p class="text-xl font-bold">FREE for you and a friend</p>
  <p style="font-size: 0.9rem; margin-top: 12px; color: rgba(0, 0, 0, 0.8);">Get immediate access to the program that's transforming thousands of financial futures. Plus, bring a friend or small group at no additional cost!</p>
</div>

<p class="text-lg text-center mb-4">Join the waitlist below, and you'll get an email as soon as we launch. We'll show you the exact steps to:</p>

<div class="grid grid-cols-2 gap-3 mt-4" style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 16px; border: 1px solid rgba(0, 255, 186, 0.2);">
  <div class="flex items-center"><span style="margin-right: 10px; color: #00FFBA; font-weight: bold;">✓</span> Increase your monthly income</div>
  <div class="flex items-center"><span style="margin-right: 10px; color: #00FFBA; font-weight: bold;">✓</span> Build financial independence</div>
  <div class="flex items-center"><span style="margin-right: 10px; color: #00FFBA; font-weight: bold;">✓</span> Create lasting impact</div>
  <div class="flex items-center"><span style="margin-right: 10px; color: #00FFBA; font-weight: bold;">✓</span> Secure your financial future</div>
</div>`,
    cta: "Join F40",
    icon: "financial",
    color: "financial" 
  },
  "Relationships": {
    heading: "transform every relationship in your life",
    body: `
<p class="text-xl font-bold text-center mb-6">The <strong style="color: #D10045;">KEY</strong> to happiness? <u>Relationships</u> - with others, yourself, and God. Strengthen everyone that matters.</p>

<p class="text-center mb-4">We created a 6 week challenge called <strong style="font-size: 1.25rem; background: linear-gradient(90deg, #D10045, #9E0030, #780032); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">R40</strong> that's designed to completely transform ALL your relationships.</p>

<div style="background: rgba(209, 0, 69, 0.12); border-radius: 8px; padding: 12px 20px; margin: 16px auto; display: flex; align-items: center; max-width: 85%; box-shadow: 0 4px 12px rgba(120, 0, 50, 0.08); border: 1px solid rgba(209, 0, 69, 0.2);">
  <span style="font-size: 1.5rem; margin-right: 12px;">❤️</span>
  <p style="margin: 0;">We've had over <strong>5,000+</strong> people go through R40 with <em>life-changing</em> results!</p>
</div>

<div class="flex justify-center flex-wrap gap-2 my-6">
  <span class="inline-block px-4 py-2 rounded-full font-semibold text-gray-800 border shadow-sm" style="background: rgba(255, 105, 135, 0.3); border-color: rgba(255, 105, 135, 0.5);">Happiness UP</span>
  <span class="inline-block px-4 py-2 rounded-full font-semibold text-gray-800 border shadow-sm" style="background: rgba(255, 105, 135, 0.3); border-color: rgba(255, 105, 135, 0.5);">Fear DOWN</span>
  <span class="inline-block px-4 py-2 rounded-full font-semibold text-gray-800 border shadow-sm" style="background: rgba(255, 105, 135, 0.3); border-color: rgba(255, 105, 135, 0.5);">Connection DEEP</span>
  <span class="inline-block px-4 py-2 rounded-full font-bold text-gray-800 border shadow-sm" style="background: rgba(255, 105, 135, 0.4); border-color: rgba(255, 105, 135, 0.6); transform: scale(1.05);">Joy through the ROOF</span>
</div>

<div style="background: linear-gradient(135deg, rgba(255, 105, 135, 0.18), rgba(255, 105, 135, 0.22)); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center; position: relative; border: 1px solid rgba(255, 105, 135, 0.25); box-shadow: 0 6px 16px rgba(120, 0, 50, 0.12);">
  <p style="text-decoration: line-through; font-size: 1rem; color: rgba(30, 30, 30, 0.9); margin-bottom: 8px; font-weight: 600; background: rgba(255, 255, 255, 0.4); display: inline-block; padding: 2px 8px; border-radius: 4px;">$197 value</p>
  <p class="text-xl font-bold">FREE for you and a friend</p>
  <p style="font-size: 0.9rem; opacity: 0.9; margin-top: 12px;">Get immediate access to the program that's healing relationships worldwide. Plus, bring a friend or small group at no additional cost!</p>
</div>

<p class="text-lg text-center">Join the waitlist below, and you'll get an email as soon as we launch. We'll show you the exact steps to:</p>

<div class="grid grid-cols-2 gap-3 mt-4" style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 16px; border: 1px solid rgba(255, 105, 135, 0.2);">
  <div class="flex items-center"><span style="margin-right: 10px; color: #FF69B4; font-weight: bold;">✓</span> Deepen your most important connections</div>
  <div class="flex items-center"><span style="margin-right: 10px; color: #FF69B4; font-weight: bold;">✓</span> Heal damaged relationships</div>
  <div class="flex items-center"><span style="margin-right: 10px; color: #FF69B4; font-weight: bold;">✓</span> Build lasting trust</div>
  <div class="flex items-center"><span style="margin-right: 10px; color: #FF69B4; font-weight: bold;">✓</span> Discover new ways to live and love</div>
</div>`,
    cta: "Join R40",
    icon: "relationships",
    color: "relationships" 
  }
};

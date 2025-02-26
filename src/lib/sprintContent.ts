export type SprintContent = {
  heading: string;
  body: string;
  cta: string;
  icon: 'health' | 'financial' | 'relationships';
  color: string;
  description?: string;
};

export const sprintContent: Record<string, SprintContent> = {
  "Health": {
    heading: "your health matters",
    description: "A 6-week journey to transform your physical and mental wellbeing",
    body: `
<div class="relative z-10 mb-8">
  <h2 class="text-2xl md:text-3xl font-bold mb-2 text-center">Your <span class="text-[#1BEBE7] font-extrabold">health</span> drives <em>everything</em>, and we have something that'll help <u>you</u> get even stronger.</h2>
  
  <div class="text-center my-6">
    <p class="text-lg mb-3">We created a 6 week challenge called <span class="font-bold text-xl text-[#1BEBE7]">H40</span> that's designed to completely transform both your physical and mental health.</p>
  </div>

  <div class="bg-gradient-to-r from-[#F5FFFE] to-[#E4FFFE] p-4 rounded-xl border border-[#1BEBE7]/20 shadow-sm mb-8 text-center">
    <p class="flex items-center justify-center gap-2 text-lg"><span class="text-[#1BEBE7] text-2xl">🔥</span> We've had over <span class="font-bold">5,000+</span> people go through H40 with <span class="italic font-semibold">incredible</span> results!</p>
  </div>
</div>

<div id="health-benefits-container" class="my-8"></div>

<div class="relative overflow-hidden bg-gradient-to-br from-[#F5FFFE] via-[#E4FFFE] to-[#D6FFFC] rounded-xl p-6 my-8 text-center border border-[#1BEBE7]/30 shadow-md">
  <div class="absolute top-1 right-2 -rotate-12 scale-110">
    <div class="bg-[#1BEBE7] text-white px-2 py-0.5 rounded-sm text-xs uppercase font-bold tracking-wider">Special</div>
  </div>
  <p class="inline-block relative mb-2">
    <span class="text-gray-700 font-medium relative">
      <span class="absolute left-0 right-0 top-1/2 h-0.5 bg-[#1BEBE7]/70 -rotate-6"></span>
      $197 value
    </span>
  </p>
  <h3 class="text-2xl font-extrabold mb-2 text-gray-800">FREE for you and a friend</h3>
  <p class="text-gray-700 mb-0">Get immediate access to the program that's changing thousands of lives. Plus, bring a friend or small group at no additional cost!</p>
  <div class="absolute -bottom-12 -right-12 w-32 h-32 bg-[#1BEBE7]/5 rounded-full blur-xl pointer-events-none"></div>
  <div class="absolute -top-12 -left-12 w-32 h-32 bg-[#1BEBE7]/5 rounded-full blur-xl pointer-events-none"></div>
</div>

<p class="text-lg text-center font-medium">Join the waitlist below, and you'll get an email as soon as we launch. We'll show you the exact steps you need to take to:</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-[#1BEBE7]/20 shadow-sm">
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#1BEBE7] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#1BEBE7] transition-colors duration-300">Increase your daily energy</span>
  </div>
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#1BEBE7] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#1BEBE7] transition-colors duration-300">Build sustainable muscle</span>
  </div>
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#1BEBE7] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#1BEBE7] transition-colors duration-300">Lose stubborn fat</span>
  </div>
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#1BEBE7] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#1BEBE7] transition-colors duration-300">Improve your mental health</span>
  </div>
</div>`,
    cta: "Join H40",
    icon: "health",
    color: "health"
  },
  "Financial": {
    heading: "financial freedom awaits",
    description: "A 6-week journey to financial freedom and abundance",
    body: `
<div class="relative z-10 mb-8">
  <h2 class="text-2xl md:text-3xl font-bold mb-2 text-center">Your <span class="text-[#00FFBA] font-extrabold">financial</span> freedom is <em>closer</em> than you think, and we have something that'll help <u>you</u> get there.</h2>
  
  <div class="text-center my-6">
    <p class="text-lg mb-3">We created a 6 week challenge called <span class="font-bold text-xl text-[#00FFBA]">F40</span> that's designed to completely transform your financial situation and mindset.</p>
  </div>

  <div class="bg-gradient-to-r from-[#F5FFF9] to-[#E4FFF4] p-4 rounded-xl border border-[#00FFBA]/20 shadow-sm mb-8 text-center">
    <p class="flex items-center justify-center gap-2 text-lg"><span class="text-[#00FFBA] text-2xl">🔥</span> We've had over <span class="font-bold">5,000+</span> people go through F40 with <span class="italic font-semibold">incredible</span> results!</p>
  </div>
</div>

<div id="financial-benefits-container" class="my-8"></div>

<div class="relative overflow-hidden bg-gradient-to-br from-[#F5FFF9] via-[#E4FFF4] to-[#D6FFEA] rounded-xl p-6 my-8 text-center border border-[#00FFBA]/30 shadow-md">
  <div class="absolute top-1 right-2 -rotate-12 scale-110">
    <div class="bg-[#00FFBA] text-white px-2 py-0.5 rounded-sm text-xs uppercase font-bold tracking-wider">Special</div>
  </div>
  <p class="inline-block relative mb-2">
    <span class="text-gray-700 font-medium relative">
      <span class="absolute left-0 right-0 top-1/2 h-0.5 bg-[#00FFBA]/70 -rotate-6"></span>
      $197 value
    </span>
  </p>
  <h3 class="text-2xl font-extrabold mb-2 text-gray-800">FREE for you and a friend</h3>
  <p class="text-gray-700 mb-0">Get immediate access to the program that's transforming thousands of financial futures. Plus, bring a friend or small group at no additional cost!</p>
  <div class="absolute -bottom-12 -right-12 w-32 h-32 bg-[#00FFBA]/5 rounded-full blur-xl pointer-events-none"></div>
  <div class="absolute -top-12 -left-12 w-32 h-32 bg-[#00FFBA]/5 rounded-full blur-xl pointer-events-none"></div>
</div>

<p class="text-lg text-center font-medium">Join the waitlist below, and you'll get an email as soon as we launch. We'll show you the exact steps to:</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-[#00FFBA]/20 shadow-sm">
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#00FFBA] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#00FFBA] transition-colors duration-300">Increase your monthly income</span>
  </div>
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#00FFBA] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#00FFBA] transition-colors duration-300">Build financial independence</span>
  </div>
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#00FFBA] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#00FFBA] transition-colors duration-300">Create lasting impact</span>
  </div>
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#00FFBA] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#00FFBA] transition-colors duration-300">Secure your financial future</span>
  </div>
</div>`,
    cta: "Join F40",
    icon: "financial",
    color: "financial" 
  },
  "Relationships": {
    heading: "transform every relationship in your life",
    description: "Connect deeper, resolve conflicts, and build lasting bonds",
    body: `
<div class="relative z-10 mb-8">
  <h2 class="text-2xl md:text-3xl font-bold mb-2 text-center">The <span class="text-[#D10045] font-extrabold">KEY</span> to happiness? <span class="relative inline-block"><span class="underline decoration-[#D10045] decoration-2 underline-offset-4">Relationships</span><span class="absolute inset-x-0 bottom-0 h-[2px] bg-[#D10045] overflow-hidden"><span class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-70" style="width: 200%; animation: shine 2s linear infinite;"></span></span></span></h2>
  <p class="text-center text-gray-800 mb-6">- with others, yourself, and God. Strengthen everyone that matters.</p>
  
  <div class="text-center my-6">
    <p class="text-lg mb-3">We created a 6 week challenge called <span class="font-bold text-xl text-[#D10045]">R40</span> that's designed to completely transform ALL your relationships.</p>
  </div>

  <div class="bg-gradient-to-r from-[#FFEFF5] to-[#FFE4ED] p-4 rounded-xl border border-[#D10045]/20 shadow-sm mb-8 text-center">
    <p class="flex items-center justify-center gap-2 text-lg"><span class="text-[#D10045] text-2xl">❤️</span> We've had over <span class="font-bold">5,000+</span> people go through R40 with <span class="italic font-semibold">life-changing</span> results!</p>
  </div>
</div>

<div id="relationships-benefits-container" class="my-8"></div>

<div class="relative overflow-hidden bg-gradient-to-br from-[#FFF5F8] via-[#FFE0E9] to-[#FFD6E1] rounded-xl p-6 my-8 text-center border border-[#D10045]/30 shadow-md">
  <div class="absolute top-1 right-2 -rotate-12 scale-110">
    <div class="bg-[#D10045] text-white px-2 py-0.5 rounded-sm text-xs uppercase font-bold tracking-wider">Special</div>
  </div>
  <p class="inline-block relative mb-2">
    <span class="text-gray-700 font-medium relative">
      <span class="absolute left-0 right-0 top-1/2 h-0.5 bg-[#D10045]/70 -rotate-6"></span>
      $197 value
    </span>
  </p>
  <h3 class="text-2xl font-extrabold mb-2 text-gray-800">FREE for you and a friend</h3>
  <p class="text-gray-700 mb-0">Get immediate access to the program that's healing relationships worldwide. Plus, bring a friend or small group at no additional cost!</p>
  <div class="absolute -bottom-12 -right-12 w-32 h-32 bg-[#D10045]/5 rounded-full blur-xl pointer-events-none"></div>
  <div class="absolute -top-12 -left-12 w-32 h-32 bg-[#D10045]/5 rounded-full blur-xl pointer-events-none"></div>
</div>

<p class="text-lg text-center font-medium">Join the waitlist below, and you'll get an email as soon as we launch. We'll show you the exact steps to:</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-[#D10045]/20 shadow-sm">
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#D10045] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#D10045] transition-colors duration-300">Deepen your most important connections</span>
  </div>
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#D10045] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#D10045] transition-colors duration-300">Heal damaged relationships</span>
  </div>
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#D10045] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#D10045] transition-colors duration-300">Build lasting trust</span>
  </div>
  <div class="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-[#D10045] text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span class="text-gray-800 group-hover:text-[#D10045] transition-colors duration-300">Discover new ways to live and love</span>
  </div>
</div>`,
    cta: "Join R40",
    icon: "relationships",
    color: "relationships" 
  }
};

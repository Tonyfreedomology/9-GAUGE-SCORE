
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import "../styles/landingAnimations.css";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const Index = () => {
  const navigate = useNavigate();
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden" style={{
      backgroundImage: "url('https://static.wixstatic.com/media/af616c_493e2c122a7049cf84997445a1c30517~mv2.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* Ambient light effects */}
      <div className="ambient-light w-96 h-96 bg-[#22DFDC] top-[-10%] left-[-5%]" />
      <div className="ambient-light w-80 h-80 bg-[#22EDB6] bottom-[10%] right-[-5%]" />
      <div className="ambient-light w-60 h-60 bg-[#FF105F] bottom-[-10%] left-[20%]" />
      
      {/* Main content container */}
      <div 
        ref={parallaxRef}
        className="parallax-container relative z-10 w-full max-w-3xl mx-auto p-4 md:p-8 text-center space-y-8 md:space-y-10 pt-12 md:pt-16"
      >
        {/* Enhanced heading with normal question mark (no gradient) */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-heading tracking-tighter lowercase text-white drop-shadow-lg">
          How Free Are You?
        </h1>

        {/* Category icons moved back up */}
        <div className="flex justify-center space-x-8 md:space-x-20 relative">
          <div className="category-icon flex flex-col items-center space-y-2 relative">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(35,241,238,0.4)_0%,rgba(35,241,238,0)_70%)] animate-pulse" />
              <img src="https://static.wixstatic.com/media/af616c_f62b572d573e46df91187a19b34fe8c8~mv2.png" alt="Health icon" className="w-10 h-10 md:w-12 md:h-12 object-contain relative z-10" />
              <div className="icon-description absolute z-50">Physical & Mental Wellbeing</div>
            </div>
            <span className="text-sm md:text-base font-heading font-bold tracking-tighter lowercase text-white drop-shadow">health</span>
          </div>
          
          <div className="category-icon flex flex-col items-center space-y-2 relative">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(0,255,186,0.4)_0%,rgba(0,255,186,0)_70%)] animate-pulse" />
              <img src="https://static.wixstatic.com/media/af616c_ea23e3c04acd44cfb52510865397e02a~mv2.png" alt="Financial icon" className="w-10 h-10 md:w-12 md:h-12 object-contain relative z-10" />
              <div className="icon-description absolute z-50">Financial Freedom & Growth</div>
            </div>
            <span className="text-sm md:text-base font-heading font-bold tracking-tighter lowercase text-white drop-shadow">finances</span>
          </div>
          
          <div className="category-icon flex flex-col items-center space-y-2 relative">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(255,16,95,0.4)_0%,rgba(255,16,95,0)_70%)] animate-pulse" />
              <img src="https://static.wixstatic.com/media/af616c_2da59b3c020c49e396d0a151b69b6c17~mv2.png" alt="Relationships icon" className="w-10 h-10 md:w-12 md:h-12 object-contain relative z-10" />
              <div className="icon-description absolute z-50">Deeper Relationships & Connections</div>
            </div>
            <span className="text-sm md:text-base font-heading font-bold tracking-tighter lowercase text-white drop-shadow">relationships</span>
          </div>
        </div>

        {/* Story section - moved from cards to above the fold */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 md:p-8 text-left shadow-lg border border-white/30">
          <p className="text-base mb-4">
            Your health, finances, and relationships shape the life you live. But how do you measure real freedom?
          </p>
          
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">We've worked with over 7,000 people</h3>
            <p className="text-base">Coaching them to improve their health, financial independence, and relationships. The 9-Gauge Score is built on this experience and designed in collaboration with <strong>Dr. Morgan Carter, PhD in Neuroscience</strong>, our lead scientific advisor.</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Get clarity in just 9 minutes</h3>
            <p className="text-base">You'll receive a personalized freedom score — a clear, measurable look at where you stand in health, wealth, and relationships, plus actionable steps to improve.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">This isn't just another personality test</h3>
            <p className="text-base">The 9-Gauge Score <strong>helps you take control</strong>, showing you exactly where you're thriving, where you're stuck, and how to create more freedom in every part of your life.</p>
          </div>
        </div>

        {/* Freedom Score Preview */}
        <div className="freedom-gauge">
          <div className="gauge-bg"></div>
          <div className="gauge-fill"></div>
          <div className="gauge-center">
            <span>Your Score?</span>
          </div>
        </div>

        {/* CTA button - moved up for better conversion */}
        <button 
          onClick={() => {
            console.log("Starting assessment");
                // Prevent ViewContent from firing on next page load
                // window.skipViewContent = true;

            // Use dataLayer push instead of direct Facebook pixel call
            // window.dataLayer?.push({
            //   event: 'StartAssessment'
            // });
            
            navigate("/assessments");
          }} 
          className="cta-button"
        >
          <span className="relative z-10 flex items-center gap-2">
            Find Out Your Score
            <ArrowRight className="h-5 w-5" />
          </span>
        </button>
        
        {/* Social proof */}
        <div className="text-white/90 text-base mt-2">
          Join over <span className="font-bold text-white">7,000+</span> people who have discovered their freedom potential
        </div>

        {/* Simplified benefit cards - just emoji, headline and a short sentence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="value-card text-center py-6">
            <div className="text-4xl mb-3">🔬</div>
            <h3 className="text-lg font-bold mb-2">Backed by Science</h3>
            <p className="text-base">Created in collaboration with Dr. Morgan Carter, PhD in Neuroscience</p>
          </div>
          
          <div className="value-card text-center py-6">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg font-bold mb-2">9-Minute Assessment</h3>
            <p className="text-base">Get your personalized freedom score quickly</p>
          </div>
          
          <div className="value-card text-center py-6">
            <div className="text-4xl mb-3">🌱</div>
            <h3 className="text-lg font-bold mb-2">Actionable Growth</h3>
            <p className="text-base">Practical steps to improve every area of your life</p>
          </div>
        </div>
        
        {/* Logo with improved styling */}
        <img 
          src="https://static.wixstatic.com/media/af616c_750d594b45cd42a4bb4f3290aad0fa61~mv2.png" 
          alt="9 Gauge Logo" 
          className="h-16 md:h-20 mx-auto mb-8 mt-auto filter drop-shadow-md"
          style={{ animation: 'floatAnimation 6s ease-in-out infinite' }}
        />
      </div>
    </div>
  );
};

export default Index;

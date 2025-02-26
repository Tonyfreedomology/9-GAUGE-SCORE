import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import "../styles/landingAnimations.css";

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
      <div className="ambient-light w-96 h-96 bg-[#23F1EE] top-[-10%] left-[-5%]" />
      <div className="ambient-light w-80 h-80 bg-[#00FFBA] bottom-[10%] right-[-5%]" />
      <div className="ambient-light w-60 h-60 bg-[#FF105F] bottom-[-10%] left-[20%]" />
      
      {/* Main content container */}
      <div 
        ref={parallaxRef}
        className="parallax-container relative z-10 w-full max-w-3xl mx-auto p-4 md:p-8 text-center space-y-8 md:space-y-10 pt-12 md:pt-16"
      >
        {/* Enhanced heading with normal question mark (no gradient) */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-heading tracking-tighter lowercase text-white drop-shadow-lg">
          how free are you?
        </h1>

        {/* Category icons */}
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

        {/* Value proposition cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="value-card">
            <div className="text-3xl mb-3 text-[#17BEBB]">🔬</div>
            <h3 className="text-lg font-bold mb-2">Neuroscience-Backed</h3>
            <p className="text-sm">Discover insights powered by cutting-edge brain science from Dr. Morgan Carter, PhD.</p>
          </div>
          
          <div className="value-card">
            <div className="text-3xl mb-3 text-[#17BEBB]">⚡</div>
            <h3 className="text-lg font-bold mb-2">Quick Assessment</h3>
            <p className="text-sm">Just 10 minutes to unlock your personalized freedom score and growth path.</p>
          </div>
          
          <div className="value-card">
            <div className="text-3xl mb-3 text-[#17BEBB]">🌱</div>
            <h3 className="text-lg font-bold mb-2">Actionable Growth</h3>
            <p className="text-sm">Get tailored insights to improve your health, finances, and relationships.</p>
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

        {/* CTA button */}
        <button 
          onClick={() => {
            console.log("Starting assessment");
            navigate("/assessment");
          }} 
          className="cta-button"
        >
          <span className="relative z-10 flex items-center gap-2">
            Find Out Your Score
            <ArrowRight className="h-5 w-5" />
          </span>
        </button>
        
        {/* Social proof */}
        <div className="text-white/90 text-sm mt-2">
          Join over <span className="font-bold text-white">5,000+</span> people who have discovered their freedom potential
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
  );
};

export default Index;


import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  console.log("Rendering welcome page");
  return <div className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden" style={{
    backgroundImage: "url('https://static.wixstatic.com/media/af616c_493e2c122a7049cf84997445a1c30517~mv2.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }}>
      <div className="relative z-10 w-full max-w-3xl mx-auto p-4 md:p-8 text-center space-y-6 md:space-y-8 pt-12 md:pt-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-heading tracking-tighter lowercase text-white">
          how free are you?
        </h1>

        <div className="flex justify-center space-x-6 md:space-x-16">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(0,255,186,0.3)_0%,rgba(0,255,186,0)_70%)] animate-pulse" />
              <img src="https://static.wixstatic.com/media/af616c_29340f0ac2544ea0b413a7d67075a5a2~mv2.png" alt="Financial icon" className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10" />
            </div>
            <span className="text-sm md:text-base font-heading font-bold tracking-tighter lowercase text-[#242424]">finances</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(35,241,238,0.3)_0%,rgba(35,241,238,0)_70%)] animate-pulse" />
              <img src="https://static.wixstatic.com/media/af616c_b6f5c191747244d3bd07ab3fce1bcf94~mv2.png" alt="Health icon" className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10" />
            </div>
            <span className="text-sm md:text-base font-heading font-bold tracking-tighter lowercase text-[#242424]">health</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(255,16,95,0.3)_0%,rgba(255,16,95,0)_70%)] animate-pulse" />
              <img src="https://static.wixstatic.com/media/af616c_4a5f9c62983540fb8acb46d96c216469~mv2.png" alt="Relationships icon" className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10" />
            </div>
            <span className="text-sm md:text-base font-heading font-bold tracking-tighter lowercase text-[#242424]">relationships</span>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6 text-base md:text-lg lg:text-xl font-light leading-relaxed px-2 md:px-0 text-[#242424] md:bg-transparent bg-white/70 backdrop-blur-sm rounded-lg p-4 md:p-0">
          <p>Discover your 9 Gauge Score™ – a comprehensive measure of your freedom across financial, health, and relationship dimensions backed by science.</p>
          <p>
            Take our quick 10-minute assessment to understand where you stand and identify areas for growth in your journey to true freedom.
          </p>
        </div>

        <button onClick={() => {
          console.log("Starting assessment");
          navigate("/assessment");
        }} className="relative inline-flex items-center justify-center bg-[#23F1EE] text-white text-base md:text-lg px-8 py-4 rounded-full 
            before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-[#23F1EE] before:opacity-50 before:blur-2xl 
            hover:scale-105 transition-transform duration-300 overflow-hidden
            after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-gradient-to-r 
            after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer">
          <span className="relative z-10 flex items-center gap-2">
            Find Out Your Score
            <ArrowRight className="h-5 w-5" />
          </span>
        </button>
      </div>

      <img src="https://static.wixstatic.com/media/af616c_750d594b45cd42a4bb4f3290aad0fa61~mv2.png" alt="9 Gauge Logo" className="h-16 md:h-20 mx-auto mb-8 mt-auto" />
    </div>;
};

export default Index;

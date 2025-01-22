import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  console.log("Rendering welcome page");

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('https://static.wixstatic.com/media/af616c_236c8c1137ba4146a1d6fbd7874561ed~mv2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
      
      <div className="relative z-10 w-full max-w-3xl mx-auto p-4 md:p-8 text-center space-y-8 md:space-y-12 bg-black/40 backdrop-blur-sm rounded-3xl m-4">
        <img 
          src="https://static.wixstatic.com/media/af616c_750d594b45cd42a4bb4f3290aad0fa61~mv2.png" 
          alt="Freedomology Logo" 
          className="h-16 md:h-20 mx-auto mb-4"
        />
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-league-spartan text-white leading-tight px-2 md:px-4">
          How Free Are You?
        </h1>

        <div className="flex justify-center space-x-6 md:space-x-16">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(23,190,187,0.3)_0%,rgba(23,190,187,0)_70%)] animate-pulse" />
              <img 
                src="https://static.wixstatic.com/media/af616c_29340f0ac2544ea0b413a7d67075a5a2~mv2.png"
                alt="Financial icon"
                className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10"
              />
            </div>
            <span className="text-sm md:text-base text-white font-medium">Finances</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(237,184,139,0.3)_0%,rgba(237,184,139,0)_70%)] animate-pulse" />
              <img 
                src="https://static.wixstatic.com/media/af616c_b6f5c191747244d3bd07ab3fce1bcf94~mv2.png"
                alt="Health icon"
                className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10"
              />
            </div>
            <span className="text-sm md:text-base text-white font-medium">Health</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(239,62,54,0.3)_0%,rgba(239,62,54,0)_70%)] animate-pulse" />
              <img 
                src="https://static.wixstatic.com/media/af616c_4a5f9c62983540fb8acb46d96c216469~mv2.png"
                alt="Relationships icon"
                className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10"
              />
            </div>
            <span className="text-sm md:text-base text-white font-medium">Relationships</span>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6 text-base md:text-lg lg:text-xl font-light text-white/90 leading-relaxed px-2 md:px-0">
          <p>
            Discover your Freedomology Score™ – a comprehensive measure of your freedom across financial, health, and relationship dimensions.
          </p>
          <p>
            Take our quick 10-minute assessment to understand where you stand and identify areas for growth in your journey to true freedom.
          </p>
        </div>

        <button
          onClick={() => {
            console.log("Starting assessment");
            navigate("/assessment");
          }}
          className="relative inline-flex items-center justify-center bg-[#17BEBB] text-white text-base md:text-lg px-8 py-4 rounded-full animate-pulse-glow before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-[#17BEBB] before:opacity-50 before:blur-2xl before:animate-pulse-glow hover:scale-105 transition-transform duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Find Out Your Score
            <ArrowRight className="h-5 w-5" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Index;
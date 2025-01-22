import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Heart, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  console.log("Rendering welcome page");

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('https://static.wixstatic.com/media/af616c_3c24b4e9154642ab91d2d95694114f6e~mv2.png')"
      }}
    >
      {/* Lighter gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
      
      <div className="relative z-10 w-full max-w-3xl mx-auto p-4 md:p-8 text-center space-y-8 md:space-y-12 bg-black/40 backdrop-blur-sm rounded-3xl m-4">
        <img 
          src="https://static.wixstatic.com/media/af616c_750d594b45cd42a4bb4f3290aad0fa61~mv2.png" 
          alt="Freedomology Logo" 
          className="h-16 md:h-20 mx-auto mb-4"
        />
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-serif px-2 md:px-4">
          How Free Are You?
        </h1>

        <div className="flex justify-center space-x-6 md:space-x-16">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-2 md:p-3 rounded-full bg-financial text-white">
              <Wallet className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <span className="text-sm md:text-base text-white font-medium">Finances</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-2 md:p-3 rounded-full bg-health text-white">
              <Heart className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <span className="text-sm md:text-base text-white font-medium">Health</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-2 md:p-3 rounded-full bg-relationships text-white">
              <Users className="h-5 w-5 md:h-6 md:w-6" />
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

        <Button
          onClick={() => {
            console.log("Starting assessment");
            navigate("/assessment");
          }}
          className="bg-[#17BEBB] hover:bg-[#17BEBB]/90 text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          Start Your Assessment
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
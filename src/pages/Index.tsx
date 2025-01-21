import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Heart, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  console.log("Rendering welcome page");

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1541417904950-b855846fe074?q=100&w=3840&auto=format&fit=crop')"
      }}
    >
      {/* Lighter gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
      
      <div className="relative z-10 w-full max-w-3xl mx-auto p-4 sm:p-8 text-center space-y-8 sm:space-y-12 bg-black/40 backdrop-blur-sm rounded-3xl">
        <img 
          src="https://static.wixstatic.com/media/af616c_750d594b45cd42a4bb4f3290aad0fa61~mv2.png" 
          alt="Freedomology Logo" 
          className="h-16 sm:h-20 mx-auto mb-2 sm:mb-4"
        />
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight font-serif px-2 sm:px-4">
          How Free Are You?
        </h1>

        <div className="flex justify-center space-x-6 sm:space-x-16 px-2">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-2 sm:p-3 rounded-full bg-financial text-white">
              <Wallet className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-sm sm:text-base text-white font-medium">Finances</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-2 sm:p-3 rounded-full bg-health text-white">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-sm sm:text-base text-white font-medium">Health</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-2 sm:p-3 rounded-full bg-relationships text-white">
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-sm sm:text-base text-white font-medium">Relationships</span>
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl font-light text-white/90 leading-relaxed px-2 sm:px-6">
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
          className="bg-[#17BEBB] hover:bg-[#17BEBB]/90 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          Start Your Assessment
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
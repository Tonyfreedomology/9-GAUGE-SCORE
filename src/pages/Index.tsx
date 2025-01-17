import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  console.log("Rendering welcome page");

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1541417904950-b855846fe074?q=100&w=3840&auto=format&fit=crop')"
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 max-w-3xl mx-auto p-8 text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          How Free Are You?
        </h1>
        
        <div className="space-y-6 text-lg md:text-xl text-white/90">
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
          className="bg-white/90 hover:bg-white text-foreground text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          Start Your Assessment
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
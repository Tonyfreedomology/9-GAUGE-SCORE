import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FreedomologyLogo } from "@/components/FreedomologyLogo";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('https://static.wixstatic.com/media/af616c_236c8c1137ba4146a1d6fbd7874561ed~mv2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Darker gradient overlay for better readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/70 to-black/60" />

      <div className="relative z-10 text-center space-y-12 p-8">
        <FreedomologyLogo />
        
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Discover Your Path to Freedom
          </h1>
          <p className="text-xl text-white/90">
            Take our assessment to understand where you are in your journey towards financial, health, and relationship freedom.
          </p>
        </div>

        <Button 
          onClick={() => navigate('/assessment')}
          className="bg-white/10 hover:bg-white/20 text-white text-lg px-8 py-6 rounded-full backdrop-blur-sm"
        >
          Start Assessment
        </Button>
      </div>
    </div>
  );
};

export default Index;
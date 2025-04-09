import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackFacebookEvent } from "@/lib/utils/facebookTracking";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Track Facebook Lead event when the thank you page loads
    trackFacebookEvent('Lead');
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://static.wixstatic.com/media/af616c_493e2c122a7049cf84997445a1c30517~mv2.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 z-[1] bg-black/60" />
      
      {/* Content */}
      <div className="relative z-[2] min-h-screen p-8 md:p-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading tracking-tighter">
            Thank you for taking the first step
          </h1>
          
          <p className="text-xl text-white/90 mb-8">
            Your journey towards freedom and financial independence starts now. We'll be in touch soon with personalized insights and strategies tailored to your assessment results.
          </p>

          <p className="text-lg text-white/80 mb-12">
            In the meantime, why not share this assessment with others who might benefit from understanding their own freedom score?
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              className="relative inline-flex items-center justify-center bg-[#17BEBB] text-white px-8 py-6 rounded-full 
                before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-[#17BEBB] before:opacity-50 before:blur-2xl 
                hover:scale-105 transition-transform duration-300 overflow-hidden
                after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-gradient-to-r 
                after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ArrowLeft className="h-5 w-5" />
                Return Home
              </span>
            </Button>

            <CopyLinkButton />
          </div>
        </div>
      </div>
    </div>
  );
};

// Copy Link Button Component with inline success state
const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("https://9gauge.freedomology.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      className={`relative inline-flex items-center justify-center px-8 py-6 rounded-full 
        before:content-[''] before:absolute before:inset-0 before:rounded-full before:opacity-50 before:blur-2xl 
        hover:scale-105 transition-all duration-300 overflow-hidden
        after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-gradient-to-r 
        after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer
        ${copied ? 'bg-green-500 before:bg-green-500' : 'bg-[#17BEBB] before:bg-[#17BEBB]'}`}
    >
      <span className="relative z-10 flex items-center gap-2 text-white">
        {copied ? (
          <>
            <Check className="h-5 w-5" />
            Link Copied
          </>
        ) : (
          <>
            <Copy className="h-5 w-5" />
            Copy Link
          </>
        )}
      </span>
    </Button>
  );
};

export default ThankYou;

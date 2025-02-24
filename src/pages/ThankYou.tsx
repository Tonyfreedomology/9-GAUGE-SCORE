
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  useEffect(() => {
    // Track lead in Facebook
    if (window.fbq) {
      window.fbq('track', 'Lead');
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
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
      <div className="fixed inset-0 z-[1] bg-black/60" />
      
      <div className="relative z-[2] max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter lowercase">
          Thank you!
        </h1>
        <p className="text-xl md:text-2xl">
          We've received your information and will be in touch soon.
        </p>
        <div className="pt-8">
          <Link
            to="/assessment"
            className="inline-block px-8 py-4 bg-[#17BEBB] text-white rounded-xl 
              text-lg font-heading font-bold tracking-tighter lowercase
              transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Take Assessment Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

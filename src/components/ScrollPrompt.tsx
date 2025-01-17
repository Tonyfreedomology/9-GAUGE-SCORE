import { ChevronDown } from "lucide-react";

export const ScrollPrompt = () => {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToNextSection}
      className="absolute left-1/2 -translate-x-1/2 bottom-4 mt-24 text-white/80 hover:text-white transition-colors duration-300"
      style={{ top: 'auto' }}
    >
      <ChevronDown className="w-8 h-8 animate-bounce" />
    </button>
  );
};
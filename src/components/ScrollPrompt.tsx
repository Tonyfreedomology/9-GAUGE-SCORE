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
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors duration-300"
    >
      <ChevronDown className="w-8 h-8 animate-bounce" />
    </button>
  );
};
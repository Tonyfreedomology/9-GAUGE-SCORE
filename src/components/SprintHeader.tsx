import { motion } from "framer-motion";
import { SprintType } from "@/types";

export const SprintHeader = ({ color, title, description }: { color: SprintType, title: string, description: string }) => {
  // Gradient colors for all elements
  const getGradientColors = () => {
    switch (color) {
      case "health":
        return {
          base: "#23F1EE",
          end: "#19AFAD",
          mid1: "#60F5F3",
          mid2: "#90FCFA",
          accent: "#4ADFDE"
        };
      case "financial":
        return {
          base: "#00805D",
          end: "#00BA88",
          mid1: "#40FFCC",
          mid2: "#00FFBA",
          accent: "#00E8A9"
        };
      case "relationships":
        return {
          base: "#FF105F",
          end: "#FF3A7F",
          mid1: "#FF5E96",
          mid2: "#FFA6C4",
          accent: "#FF3074"
        };
      default:
        return {
          base: "#23F1EE",
          end: "#19AFAD",
          mid1: "#60F5F3",
          mid2: "#90FCFA",
          accent: "#4ADFDE"
        };
    }
  };

  const colors = getGradientColors();
  
  // Generate CSS styles for the gradient background
  const getGradientStyle = () => {
    return {
      background: `linear-gradient(135deg, ${colors.base} 0%, ${colors.mid1} 35%, ${colors.mid2} 70%, ${colors.end} 100%)`,
      backgroundSize: "300% 300%",
      animation: "weekHeadingGradient 6s ease infinite",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    };
  };

  const gradientStyle = getGradientStyle();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full pt-6 pb-4 mb-2 relative"
    >
      {/* Main heading content with animated gradient background */}
      <div className="flex justify-center mb-2">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold text-center lowercase tracking-tighter relative z-10 px-8 py-4 rounded-lg inline-block text-white"
          initial={{ letterSpacing: "-0.08em" }}
          animate={{ letterSpacing: "-0.05em" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={gradientStyle}
        >
          {title}
        </motion.h1>
      </div>
      
      {/* Decorative underscore right after the text */}
      <motion.div 
        className="h-1 w-32 md:w-48 rounded-full mx-auto mt-2"
        style={{
          background: `linear-gradient(to right, ${colors.base}, ${colors.accent})`,
          boxShadow: `0 2px 10px ${colors.accent}80`
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "48px", opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      
      {/* Description text */}
      <p className="text-gray-700 text-center text-lg md:text-xl max-w-2xl mx-auto mt-6 font-medium leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

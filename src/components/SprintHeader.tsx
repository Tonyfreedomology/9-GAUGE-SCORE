import { motion, useScroll, useTransform } from "framer-motion";
import { SprintType } from "@/types";
import { useRef, useState, useEffect } from "react";
import { textMaskVariants } from "@/lib/animations/textEffects";
import { usePerspectiveEffect } from "@/lib/animations/scrollEffects";
import { getSprintBackgroundImage } from "@/lib/imageUtils";
import { BenefitsList } from "./BenefitsList";
import { getBenefits } from "@/lib/benefits";
import { createRoot } from 'react-dom/client';

export const SprintHeader = ({ color, title, description }: { color: SprintType, title: string, description: string }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get perspective effect for 3D hover
  const { elementRef: perspectiveRef, style: perspectiveStyle } = usePerspectiveEffect(5);
  
  // Render benefits in the appropriate container
  useEffect(() => {
    const benefitsContainer = document.getElementById(`${color}-benefits-container`);
    if (benefitsContainer) {
      // Create a temporary div to render our React component into
      const tempDiv = document.createElement('div');
      benefitsContainer.innerHTML = '';
      benefitsContainer.appendChild(tempDiv);
      
      // Use ReactDOM to render the BenefitsList component
      const root = createRoot(tempDiv);
      root.render(
        <BenefitsList 
          benefits={getBenefits(color)} 
          color={color} 
          layout="grid" 
        />
      );
    }
  }, [color]);
  
  // Gradient colors for all elements
  const getGradientColors = () => {
    switch (color) {
      case "health":
        return {
          base: "#1BEBE7",
          end: "#19AFAD",
          mid1: "#23D7D3",
          mid2: "#68DEDC",
          accent: "#1BEBE7"
        };
      case "financial":
        return {
          base: "#00E8A9",
          end: "#00D596",
          mid1: "#00D09A",
          mid2: "#56DCB8",
          accent: "#00E8A9"
        };
      case "relationships":
        return {
          base: "#D10045",
          end: "#9E0030",
          mid1: "#E01050",
          mid2: "#EE4882",
          accent: "#FF105F"
        };
      default:
        return {
          base: "#1BEBE7",
          end: "#19AFAD",
          mid1: "#23D7D3",
          mid2: "#68DEDC",
          accent: "#1BEBE7"
        };
    }
  };

  const colors = getGradientColors();
  
  // Get background image for this sprint type
  const backgroundImage = getSprintBackgroundImage(color);
  
  // Generate CSS styles for the gradient background
  const getGradientStyle = () => {
    return {
      background: `linear-gradient(135deg, ${colors.base} 0%, ${colors.mid1} 35%, ${colors.mid2} 70%, ${colors.end} 100%)`,
      backgroundSize: "200% 200%",
      animation: "weekHeadingGradient 8s ease infinite",
      boxShadow: `0 15px 35px rgba(0,0,0,0.15), 0 5px 15px ${colors.base}40`,
      WebkitBackgroundClip: isHovered ? "text" : "initial",
      WebkitTextFillColor: isHovered ? "transparent" : "initial",
      backgroundClip: isHovered ? "text" : "initial",
      textFillColor: isHovered ? "transparent" : "initial",
      transition: "all 0.4s ease",
    };
  };

  const gradientStyle = getGradientStyle();

  return (
    <motion.div
      ref={headerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full pt-6 pb-4 mb-2 relative"
    >
      {/* Hero background image with overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-xl -mx-4 -my-2">
        <motion.div 
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
          initial={{ scale: 1.1, filter: 'brightness(0.3) saturate(0.4)' }}
          animate={{ 
            scale: 1.05, 
            filter: 'brightness(0.4) saturate(0.6)',
            transition: { duration: 1.5, ease: "easeOut" }
          }}
          style={{ 
            backgroundImage: `url(${backgroundImage.url})`,
            backgroundPosition: backgroundImage.position,
          }}
        />
        <motion.div 
          className="absolute inset-0" 
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0.85, transition: { duration: 1.2, delay: 0.3 } }}
          style={{ 
            background: `linear-gradient(135deg, ${colors.base}99 0%, ${colors.end}80 100%)`,
            mixBlendMode: 'multiply'
          }}
        />
        <div 
          className="absolute bottom-1 right-2 text-xs text-white/50 font-light"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
        >
          Photo: <a href={backgroundImage.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">{backgroundImage.credit}</a>
        </div>
      </div>
      
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 blur-2xl opacity-40 rounded-full z-10"
        style={{ 
          background: `radial-gradient(circle at center, ${colors.mid1} 0%, transparent 70%)`,
          top: "-50%",
          left: "-20%",
          right: "-20%",
          bottom: "-50%"
        }}
      />
      
      {/* Main heading content with animated gradient background */}
      <div className="flex justify-center mb-2 relative z-20">
        <motion.div
          ref={perspectiveRef as React.RefObject<HTMLDivElement>}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={perspectiveStyle}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-center lowercase tracking-tighter relative z-10 px-8 py-4 rounded-lg inline-block text-white overflow-hidden"
            initial={{ letterSpacing: "-0.08em" }}
            animate={{ letterSpacing: "-0.05em" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={gradientStyle}
            variants={textMaskVariants}
            whileHover={{ scale: 1.02 }}
          >
            {title}
            
            {/* Subtle particle overlay */}
            <div 
              className="absolute inset-0 z-20 opacity-30 pointer-events-none"
              style={{
                backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNCIvPgo8L3N2Zz4=')",
                backgroundSize: "20px 20px"
              }}
            />
          </motion.h1>
          
          {/* Shadow reflection */}
          <div 
            className="absolute left-0 right-0 h-10 bottom-0 opacity-20 blur-md scale-x-75 scale-y-50"
            style={{ 
              background: `linear-gradient(to bottom, ${colors.base}, transparent)`,
              transform: 'rotateX(180deg) translateY(15px)',
              transformOrigin: 'center bottom'
            }}
          />
        </motion.div>
      </div>
      
      {/* Decorative underscore right after the text */}
      <motion.div 
        className="h-1.5 rounded-full mx-auto mt-2 relative overflow-hidden z-20"
        style={{
          background: `linear-gradient(to right, ${colors.base}, ${colors.accent})`,
          boxShadow: `0 2px 10px ${colors.accent}80`
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "80px", opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      
      {/* Description text */}
      <p className="text-gray-200 text-center text-lg md:text-xl max-w-2xl mx-auto mt-6 font-medium leading-relaxed relative z-20" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
        {description}
      </p>
    </motion.div>
  );
};

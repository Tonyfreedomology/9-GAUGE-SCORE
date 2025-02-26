import { sprintContent } from "@/lib/sprintContent";
import { programs } from "@/lib/programContent";
import { WeekContent } from "./WeekContent";
import { useInView } from "react-intersection-observer";
import { WaitlistForm } from "./WaitlistForm";
import { SprintHeader } from "./SprintHeader";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParallax } from "@/lib/animations/scrollEffects";
import ParticleBackground from "./ParticleBackground";
import TextHighlight from "./TextHighlight";
import { useRef, useState } from "react";
import { WeekPreview } from "./WeekPreview";
import { shineEffectVariants } from "@/lib/animations/textEffects";

import { SprintType } from "@/types";

type SprintCardProps = {
  lowestPillar: string;
};

export const SprintCard = ({ lowestPillar }: SprintCardProps) => {
  const capitalizedPillar = lowestPillar.charAt(0).toUpperCase() + lowestPillar.slice(1);
  const content = sprintContent[capitalizedPillar];
  const program = programs[capitalizedPillar];
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const getLogo = () => {
    switch (capitalizedPillar) {
      case "Relationships":
        return "https://static.wixstatic.com/media/af616c_6c7bc94cb73e40feb249900ca0af3168~mv2.png";
      case "Health":
        return "https://static.wixstatic.com/media/af616c_3876dd4492b3420c990b2a899ba9d956~mv2.png";
      case "Financial":
        return "https://static.wixstatic.com/media/af616c_671c8d7017224371a68ca6b057793509~mv2.png";
      default:
        return "";
    }
  };

  const getPillarIcon = () => {
    switch (capitalizedPillar) {
      case "Health":
        return "https://static.wixstatic.com/media/af616c_f62b572d573e46df91187a19b34fe8c8~mv2.png";
      case "Financial":
        return "https://static.wixstatic.com/media/af616c_ea23e3c04acd44cfb52510865397e02a~mv2.png";
      case "Relationships":
        return "https://static.wixstatic.com/media/af616c_2da59b3c020c49e396d0a151b69b6c17~mv2.png";
      default:
        return "";
    }
  };

  const getIcon = () => {
    const iconUrl = getPillarIcon();
    return (
      <motion.img 
        src={iconUrl} 
        alt={`${capitalizedPillar} Pillar Icon`} 
        className="h-8 w-8 object-contain"
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5 }}
      />
    );
  };

  const getCardStyle = () => {
    switch (capitalizedPillar) {
      case "Relationships":
        return {
          background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,240,245,0.97) 100%)",
          boxShadow: "0 15px 35px rgba(255,16,95,0.15), 0 5px 15px rgba(0,0,0,0.05)",
          borderTop: "4px solid #FF105F"
        };
      case "Health":
        return {
          background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(235,255,255,0.97) 100%)",
          boxShadow: "0 15px 35px rgba(27,235,231,0.15), 0 5px 15px rgba(0,0,0,0.05)",
          borderTop: "4px solid #1BEBE7"
        };
      case "Financial":
        return {
          background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(230,255,240,0.97) 100%)",
          boxShadow: "0 15px 35px rgba(7,230,190,0.15), 0 5px 15px rgba(0,0,0,0.05)",
          borderTop: "4px solid #07E6BE"
        };
      default:
        return {};
    }
  };

  const getPillColor = () => {
    const colors = getSprintColors(capitalizedPillar);
    return {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      boxShadow: `0 4px 12px rgba(0,0,0,0.2)`
    };
  };

  const getBackgroundTint = () => {
    switch (capitalizedPillar) {
      case "Relationships":
        return "rgba(255,16,95,0.03)"; // Very subtle pink tint
      case "Health":
        return "rgba(27,235,231,0.03)"; // Very subtle cyan tint
      case "Financial":
        return "rgba(0,255,186,0.03)"; // Very subtle green tint
      default:
        return "rgba(255,255,255,0)";
    }
  };

  const getGradientColors = () => {
    switch (capitalizedPillar) {
      case "Relationships":
        return {
          from: "rgba(255,255,255,0.9)",
          to: "rgba(255,240,245,0.85)"
        };
      case "Health":
        return {
          from: "rgba(255,255,255,0.9)",
          to: "rgba(235,255,255,0.85)"
        };
      case "Financial":
        return {
          from: "rgba(255,255,255,0.9)",
          to: "rgba(230,255,240,0.85)"
        };
      default:
        return {
          from: "rgba(255,255,255,0.9)",
          to: "rgba(255,255,255,0.85)"
        };
    }
  };

  const getSprintColors = (pillar: string) => {
    switch (pillar) {
      case "Relationships":
        return {
          primary: "#D10045",
          secondary: "#9E0030",
          darkAccent: "#780032",
          lightAccent: "rgba(209, 0, 69, 0.1)",
        };
      case "Health":
        return {
          primary: "#1BEBE7",
          secondary: "#60F5F3",
          darkAccent: "#00C5C3",
          lightAccent: "rgba(27, 235, 231, 0.1)",
        };
      case "Financial":
        return {
          primary: "#00805D",
          secondary: "#00A57D",
          darkAccent: "#006647",
          lightAccent: "rgba(0, 128, 93, 0.1)",
        };
      default:
        return {
          primary: "#888888",
          secondary: "#AAAAAA",
          darkAccent: "#666666",
          lightAccent: "rgba(136, 136, 136, 0.1)",
        };
    }
  };

  const getPillarBorderColor = () => {
    const colors = getSprintColors(capitalizedPillar);
    return colors.primary;
  };

  const [previewWeek, setPreviewWeek] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set up parallax effect for the background
  const { elementRef: bgParallaxRef, style: bgParallaxStyle } = useParallax({
    speed: 0.1,
    direction: 'up'
  });
  
  // Set up scroll-driven animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress into visual effects
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.4], [0.6, 0.9, 1]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], [20, 0]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.3], [30, 0]);

  if (!content || !program) return null;

  // Safely extract intro text
  const introText = content.body; // Use the whole body as introText if there's no separator

  return (
    <motion.div 
      ref={containerRef}
      className="backdrop-blur-sm rounded-2xl p-6 md:p-8 text-foreground overflow-hidden relative"
      style={getCardStyle()}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Particle background */}
      <ParticleBackground 
        color={program.color as SprintType} 
        intensity="low" 
        className="opacity-40" 
      />
      
      {/* Background parallax effect */}
      <motion.div 
        ref={bgParallaxRef as React.RefObject<HTMLDivElement>}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          ...bgParallaxStyle,
          background: `radial-gradient(circle at center, ${getBackgroundTint()} 0%, rgba(255,255,255,0) 70%)`
        }}
      />
      
      <div className="flex flex-col items-center space-y-6 relative z-10">
        <motion.div 
          ref={headerRef}
          style={{ 
            opacity: headerOpacity,
            scale: headerScale,
            y: headerY
          }}
        >
          <SprintHeader 
            title={content.heading} 
            color={program.color as SprintType}
            description=""  
          />
        </motion.div>
        
        {/* HTML content explaining the sprint with enhanced typography */}
        <motion.div 
          className="text-base md:text-lg text-center w-full text-foreground [&>p]:mb-3 last:[&>p]:mb-0 prose prose-p:my-2 max-w-none" 
          dangerouslySetInnerHTML={{ __html: introText }} 
          style={{ y: contentY }}
        />
        
        {/* Logo */}
        <motion.img 
          src={getLogo()} 
          alt={`${capitalizedPillar} Sprint Logo`} 
          className="h-24 object-contain mx-auto my-4 relative z-10"
        />
        
        {/* The timeline section with 6-weeks pill - clean design instead of wavy background */}
        <div className="w-full relative my-12 overflow-visible" style={{ 
          minHeight: "160px",
          padding: "30px 0"
        }}>
          <div className="absolute inset-0 bg-gray-50/80 rounded-lg" style={{ 
            backgroundColor: getBackgroundTint()
          }}>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 rounded-lg" style={{
              background: `linear-gradient(135deg, ${getGradientColors().from}, ${getGradientColors().to})`,
              opacity: 0.7
            }}></div>
            
            {/* Texture overlay */}
            <div 
              className="absolute inset-0 rounded-lg opacity-10"
              style={{
                backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')",
                backgroundRepeat: "repeat"
              }}
            />
          </div>
          
          {/* Horizontal line through the middle with gradient */}
          <div 
            className="absolute left-[5%] right-[5%] top-1/2 h-0.5 transform -translate-y-1/2 z-10"
            style={{
              background: `linear-gradient(90deg, transparent, ${getPillarBorderColor()}, transparent)`
            }}
          />
          
          {/* Pill with the six weeks text */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div 
              className="px-5 py-2 rounded-full text-white font-medium text-sm flex items-center justify-center"
              style={getPillColor()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 8px 20px rgba(0,0,0,0.2), 0 6px 10px ${getPillarBorderColor()}30`
              }}
            >
              6-Week Program
            </motion.div>
          </div>
            
          {/* Week dots with preview */}
          <div className="absolute left-[10%] right-[10%] top-1/2 flex justify-between transform -translate-y-1/2 z-10">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                onMouseEnter={() => setPreviewWeek(index + 1)}
                onMouseLeave={() => setPreviewWeek(null)}
              >
                <div 
                  className="w-4 h-4 rounded-full bg-white border-2 mb-8 transition-all duration-300" 
                  style={{ 
                    borderColor: getPillarBorderColor(),
                    transform: previewWeek === index + 1 ? 'scale(1.5)' : 'scale(1)',
                    boxShadow: previewWeek === index + 1 ? `0 0 10px ${getPillarBorderColor()}80` : 'none'
                  }}
                />
                <div 
                  className="text-xs font-medium transition-all duration-300" 
                  style={{ 
                    color: getPillarBorderColor(),
                    fontWeight: previewWeek === index + 1 ? 700 : 500
                  }}
                >
                  Week {index + 1}
                </div>
                
                {/* Preview tooltip */}
                {program.weeks[index] && (
                  <WeekPreview
                    title={program.weeks[index].title}
                    content={program.weeks[index].description}
                    week={index + 1}
                    color={program.color}
                    isVisible={previewWeek === index + 1}
                  />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Decorative connecting lines */}
          <svg 
            className="absolute inset-0 w-full h-full z-5 opacity-30 pointer-events-none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lineGradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor={getPillarBorderColor()} stopOpacity="0.1" />
                <stop offset="50%" stopColor={getPillarBorderColor()} stopOpacity="0.5" />
                <stop offset="100%" stopColor={getPillarBorderColor()} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path 
              d="M50,30 Q150,10 250,50 T450,30" 
              fill="none" 
              stroke="url(#lineGradient)" 
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
        
        {/* Enhanced program content with animations */}
        <div className="w-full" ref={ref}>
          {inView && (
            <motion.div 
              className="rounded-xl p-5 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)`,
                backdropFilter: 'blur(8px)',
                boxShadow: `0 10px 25px rgba(0,0,0,0.05), 0 5px 10px ${getPillarBorderColor()}15`
              }}
            >
              <div className="text-center text-xl font-bold mb-4">
                <TextHighlight 
                  text="Here's what we cover:" 
                  color={program.color}
                  element="span"
                  underline={true}
                  animate={true}
                />
              </div>
            </motion.div>
          )}
          
          {/* Program content weeks with enhanced styling */}
          <div className="mt-8 space-y-6">
            {inView && program.weeks.map((week, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
              >
                <WeekContent
                  title={week.title}
                  content={week.description}
                  color={program.color}
                  week={index + 1}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md mx-auto mt-12">
          <WaitlistForm defaultSprint={capitalizedPillar} />
        </div>
      </div>
    </motion.div>
  );
};

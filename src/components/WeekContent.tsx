import { useInView } from "react-intersection-observer";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SprintType } from "@/types";
import { usePerspectiveEffect } from "@/lib/animations/scrollEffects";
import { shineEffectVariants } from "@/lib/animations/textEffects";
import { getWeekIcon } from "@/lib/imageUtils";

type WeekContentProps = {
  title: string;
  content: string;
  color: SprintType;
  week: number;
};

export const WeekContent = ({ title, content, color, week }: WeekContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const { elementRef: perspectiveRef, style: perspectiveStyle } = usePerspectiveEffect(3);
  
  // Scroll-driven animation for content reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress into staggered animation values
  const weekOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [0.08, 0.1, 0.12]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.4], [20, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0.6, 1]);

  const getBorderColor = () => {
    switch (color) {
      case "health":
        return "var(--health-color)";
      case "financial":
        return "var(--financial-color)";
      case "relationships":
        return "var(--relationships-color)";
      default:
        return "var(--brand-blue)";
    }
  };

  const getBackgroundEffect = () => {
    let baseColor = getBorderColor();
    return {
      borderLeft: `4px solid ${baseColor}`,
      background: "linear-gradient(135deg, #ffffff 0%, rgba(251, 251, 251, 0.95) 65%, rgba(248, 248, 248, 0.85) 100%)",
      boxShadow: `0 15px 35px ${baseColor}30, 0 8px 20px rgba(0,0,0,0.06)`,
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    };
  };

  // Get week icon
  const weekIcon = getWeekIcon(color, week);

  // For heading gradient
  const getHeadingColors = () => {
    switch (color) {
      case "relationships":
        return {
          start: "#FF105F",
          mid: "#FF5088", 
          end: "#BA0C45",
          shadowColor: "rgba(255, 16, 95, 0.35)",
          accentLight: "rgba(255, 16, 95, 0.15)"
        };
      case "health":
        return {
          start: "#1BEBE7",
          mid: "#60F5F3", 
          end: "#19AFAD",
          shadowColor: "rgba(27, 235, 231, 0.35)",
          accentLight: "rgba(27, 235, 231, 0.15)"
        };
      case "financial":
        return {
          start: "#00805D",
          mid: "#40FFCC", 
          end: "#00BA88",
          shadowColor: "rgba(0, 255, 186, 0.35)",
          accentLight: "rgba(0, 255, 186, 0.15)"
        };
      default:
        return {
          start: "#1BEBE7",
          mid: "#60F5F3", 
          end: "#19AFAD",
          shadowColor: "rgba(27, 235, 231, 0.35)",
          accentLight: "rgba(27, 235, 231, 0.15)"
        };
    }
  };

  const headingColors = getHeadingColors();

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div 
        ref={ref}
        className={`relative p-8 rounded-xl mb-8 overflow-hidden transition-all duration-300 group ${
          isHovered ? 'transform translate-y-[-8px]' : ''
        }`}
        style={{
          ...getBackgroundEffect(),
          ...(isHovered && { boxShadow: `0 22px 45px ${headingColors.shadowColor}, 0 12px 28px rgba(0,0,0,0.08)` })
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle patterned background */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMC41Ii8+Cjwvc3ZnPg==')",
            backgroundSize: "40px 40px",
            backgroundRepeat: "repeat",
            opacity: isHovered ? 0.08 : 0.05,
            transition: "opacity 0.3s ease"
          }}
        />
        
        {/* Decorative corner accent */}
        <div 
          className="absolute right-0 top-0 w-32 h-32 pointer-events-none transform rotate-45 translate-x-16 -translate-y-16 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${headingColors.accentLight} 0%, transparent 70%)`,
            opacity: isHovered ? 0.9 : 0.5
          }}
        />
        
        <div className="flex flex-col relative z-10">
          {/* Large Heading Section - Full width */}
          <div className="w-full mb-8 overflow-visible">
            <motion.div
              ref={perspectiveRef as React.RefObject<HTMLDivElement>}
              style={perspectiveStyle}
              className="relative group"
            >
              <h3 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter lowercase transform transition-transform duration-300">
                <span 
                  className="week-heading relative px-5 py-3 rounded-lg inline-block text-white overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${headingColors.start}, ${headingColors.mid} 45%, ${headingColors.end} 65%, ${headingColors.start})`,
                    backgroundSize: "300% 300%",
                    boxShadow: `0 6px 22px rgba(0,0,0,0.14), 0 2px 8px ${headingColors.start}80`,
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                    transition: "all 0.3s ease",
                    fontWeight: "900",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span className="inline-flex items-center">
                    <span className="mr-2 text-2xl md:text-3xl" role="img" aria-label={weekIcon.alt}>{weekIcon.icon}</span>
                    WEEK {week}: {title}
                  </span>
                  
                  {/* Shine effect overlay */}
                  <motion.div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                      backgroundSize: '200% 100%'
                    }}
                    variants={shineEffectVariants}
                    initial="initial"
                    animate="animate"
                  />
                </span>
              </h3>
              
              {/* Subtle reflection */}
              <div 
                className="absolute left-0 right-0 h-6 -bottom-6 opacity-30 blur-md scale-x-95 mx-auto hidden md:block"
                style={{ 
                  width: "calc(100% - 20px)",
                  background: `linear-gradient(to bottom, ${headingColors.start}80, transparent)`,
                  transform: 'rotateX(180deg)',
                  transformOrigin: 'center top'
                }}
              />
            </motion.div>
          </div>
          
          {/* Content and Week Number in Flex Row */}
          <div className="flex">
            {/* Content on the left - takes 80% of the space */}
            <motion.div 
              className="w-[80%] pr-8 relative z-10"
              style={{ 
                y: contentY,
                opacity: contentOpacity
              }}
            >
              <div 
                className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-ul:text-gray-700 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-12 after:w-full after:bg-gradient-to-t after:from-white after:to-transparent after:opacity-60"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              
              {/* Week theme indicator */}
              <div className="flex items-center mt-6 text-sm text-gray-500">
                <div 
                  className="flex items-center justify-center w-8 h-8 rounded-full mr-2 text-lg"
                  style={{ 
                    background: `${headingColors.accentLight}`,
                    color: headingColors.start
                  }}
                >
                  {weekIcon.icon}
                </div>
                <span>Focus: <span className="font-medium" style={{ color: headingColors.start }}>{weekIcon.alt}</span></span>
              </div>
              
              {/* Interactive content button for mobile */}
              <div className="mt-4 block md:hidden">
                <motion.button
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    background: headingColors.accentLight,
                    color: headingColors.start,
                    border: `1px solid ${headingColors.start}40`
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Read More
                </motion.button>
              </div>
            </motion.div>
            
            {/* Week Number on the right - takes 20% of the space */}
            <div className="w-[20%] flex items-end justify-end relative">
              <motion.div 
                className="week-number-container select-none"
                style={{
                  color: getBorderColor(),
                  fontSize: "240px", 
                  fontWeight: "900",
                  lineHeight: "0.65",
                  opacity: weekOpacity,
                  marginBottom: "-30px",
                  marginRight: "-20px",
                  textAlign: "right",
                  textShadow: `1px 1px 1px ${headingColors.shadowColor}`,
                  transition: "all 0.3s ease",
                  ...(isHovered && { transform: "scale(1.05)" })
                }}
              >
                {week}
              </motion.div>
              
              {/* Icon floating above the week number */}
              <motion.div
                className="absolute bottom-16 right-12 z-20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: 0.3 
                }}
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
                onMouseEnter={() => setIsIconHovered(true)}
                onMouseLeave={() => setIsIconHovered(false)}
              >
                <div 
                  className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${headingColors.start}, ${headingColors.end})`,
                    boxShadow: `0 8px 32px ${headingColors.shadowColor}, 0 4px 8px rgba(0,0,0,0.1)`
                  }}
                >
                  <span className="text-4xl" role="img" aria-label={weekIcon.alt}>
                    {weekIcon.icon}
                  </span>
                </div>
                
                {/* Tooltip */}
                {isIconHovered && (
                  <motion.div
                    className="absolute -top-10 right-0 bg-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      border: `1px solid ${headingColors.start}30`,
                      boxShadow: `0 4px 12px ${headingColors.shadowColor}40`
                    }}
                  >
                    <div className="text-sm font-medium" style={{ color: headingColors.start }}>
                      {weekIcon.alt}
                    </div>
                    <div 
                      className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white rotate-45"
                      style={{ border: `1px solid ${headingColors.start}30`, borderTop: 'none', borderLeft: 'none' }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

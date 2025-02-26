import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { motion } from "framer-motion";
import { SprintType } from "@/types";

type WeekContentProps = {
  title: string;
  content: string;
  color: SprintType;
  week: number;
};

export const WeekContent = ({ title, content, color, week }: WeekContentProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [isHovered, setIsHovered] = useState(false);

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

  // For heading gradient
  const getHeadingColors = () => {
    switch (color) {
      case "relationships":
        return {
          start: "#FF105F",
          mid: "#FF5088", 
          end: "#BA0C45",
          shadowColor: "rgba(255, 16, 95, 0.35)"
        };
      case "health":
        return {
          start: "#1BEBE7",
          mid: "#60F5F3", 
          end: "#19AFAD",
          shadowColor: "rgba(27, 235, 231, 0.35)"
        };
      case "financial":
        return {
          start: "#00805D",
          mid: "#40FFCC", 
          end: "#00BA88",
          shadowColor: "rgba(0, 255, 186, 0.35)"
        };
      default:
        return {
          start: "#1BEBE7",
          mid: "#60F5F3", 
          end: "#19AFAD",
          shadowColor: "rgba(27, 235, 231, 0.35)"
        };
    }
  };

  const headingColors = getHeadingColors();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div 
        className={`relative p-8 rounded-xl mb-8 overflow-hidden transition-all duration-300 ${
          isHovered ? 'transform translate-y-[-8px]' : ''
        }`}
        style={{
          ...getBackgroundEffect(),
          ...(isHovered && { boxShadow: `0 18px 40px ${headingColors.shadowColor}, 0 10px 25px rgba(0,0,0,0.08)` })
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col">
          {/* Large Heading Section - Full width */}
          <div className="w-full mb-8 overflow-visible">
            <h3 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter lowercase transform transition-transform duration-300">
              <span 
                className="week-heading relative px-5 py-3 rounded-lg inline-block text-white"
                style={{
                  background: `linear-gradient(135deg, ${headingColors.start}, ${headingColors.mid} 45%, ${headingColors.end} 65%, ${headingColors.start})`,
                  backgroundSize: "300% 300%",
                  boxShadow: `0 6px 12px rgba(0,0,0,0.1)`,
                  transform: isHovered ? "scale(1.02)" : "scale(1)",
                  transition: "all 0.3s ease",
                  fontWeight: "900",
                  letterSpacing: "-0.03em",
                }}
              >
                WEEK {week}: {title}
              </span>
            </h3>
          </div>
          
          {/* Content and Week Number in Flex Row */}
          <div className="flex">
            {/* Content on the left - takes 80% of the space */}
            <div className="w-[80%] pr-8 relative z-10">
              <div 
                className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-ul:text-gray-700"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
            
            {/* Week Number on the right - takes 20% of the space */}
            <div className="w-[20%] flex items-end justify-end relative">
              <div 
                className="week-number-container"
                style={{
                  color: getBorderColor(),
                  fontSize: "240px", 
                  fontWeight: "900",
                  lineHeight: "0.65",
                  opacity: "0.12",
                  userSelect: "none",
                  marginBottom: "-30px",
                  marginRight: "-20px",
                  textAlign: "right",
                  transition: "all 0.3s ease",
                  ...(isHovered && { opacity: "0.18", transform: "scale(1.05)" })
                }}
              >
                {week}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

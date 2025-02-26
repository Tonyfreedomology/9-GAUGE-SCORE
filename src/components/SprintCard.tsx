import { sprintContent } from "@/lib/sprintContent";
import { programs } from "@/lib/programContent";
import { WeekContent } from "./WeekContent";
import { useInView } from "react-intersection-observer";
import { WaitlistForm } from "./WaitlistForm";
import { SprintHeader } from "./SprintHeader";
import { motion } from "framer-motion";
import { WavyBackground } from "./ui/wavy-background";
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
          boxShadow: "0 15px 35px rgba(35,241,238,0.15), 0 5px 15px rgba(0,0,0,0.05)",
          borderTop: "4px solid #23F1EE"
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

  const getWavyColors = () => {
    switch (capitalizedPillar) {
      case "Relationships":
        return ["#FF105F", "#FF3A7A", "#FF5088", "#FF77A3", "#FFABC9"];
      case "Health":
        return ["#23F1EE", "#38F3F0", "#60F5F3", "#8AF8F7", "#B0FCFA"];
      case "Financial":
        return ["#00FFBA", "#26FFCD", "#40FFCC", "#73FFD9", "#B0FFEA"];
      default:
        return ["#23F1EE", "#60F5F3", "#B0FCFA"];
    }
  };

  const getIconColor = () => {
    switch (capitalizedPillar) {
      case "Relationships":
        return "#FF105F";
      case "Health":
        return "#23F1EE";
      case "Financial":
        return "#00FFBA";
      default:
        return "white";
    }
  };

  if (!content || !program) return null;

  // Safely extract intro text
  const introText = content.body; // Use the whole body as introText if there's no separator

  return (
    <motion.div 
      className="backdrop-blur-sm rounded-2xl p-6 md:p-8 text-foreground overflow-hidden"
      style={getCardStyle()}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center space-y-6">
        <SprintHeader 
          title={content.heading} 
          color={program.color as SprintType}
          description=""  
        />
        
        {/* HTML content explaining the sprint - after headline and description, but before the logo */}
        <div 
          className="text-base md:text-lg text-center w-full text-foreground [&>p]:mb-3 last:[&>p]:mb-0 prose prose-p:my-2 max-w-none" 
          dangerouslySetInnerHTML={{ __html: introText }} 
        />
        
        {/* Logo - added here between copy text and 6-weeks pill */}
        <motion.img 
          src={getLogo()} 
          alt={`${capitalizedPillar} Sprint Logo`} 
          className="h-24 object-contain mx-auto my-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* The wavy background with 6-weeks pill - after the logo */}
        <div className="w-full relative my-12 overflow-visible" style={{ 
          minHeight: "160px",
          padding: "30px 0"
        }}>
          {/* Extended container for wavy background with fading edges */}
          <div className="absolute inset-0 w-[110%] left-[-5%] overflow-hidden" style={{ 
            top: "-20px", 
            bottom: "-20px", 
            height: "calc(100% + 40px)"
          }}>
            <WavyBackground 
              colors={getWavyColors()} 
              waveOpacity={0.8}
              blur={3}
              backgroundFill="rgba(255,255,255,0)" 
              waveWidth={15}
              speed="slow"
              containerClassName="w-full h-full"
            />
            
            {/* Gradient fades on all edges for smooth transitions */}
            <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-white to-transparent z-10"></div>
            <div className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-white to-transparent z-10"></div>
            <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-white to-transparent z-10"></div>
          </div>
          
          {/* Horizontal line through the middle */}
          <div className="absolute left-[5%] right-[5%] top-1/2 h-0.5 bg-gray-100 transform -translate-y-1/2 z-10"></div>
          
          {/* Pill with the six weeks text */}
          <div className="relative flex items-center justify-center z-20">
            <motion.div 
              className="px-6 py-3 bg-white bg-opacity-90 rounded-full shadow-lg border border-gray-100 flex items-center justify-center space-x-4"
              style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.07), 0 2px 5px rgba(0,0,0,0.05)" }}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-10 h-10 flex items-center justify-center"
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                {getIcon()}
              </motion.div>
              <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tighter lowercase text-foreground text-center">
                the six weeks
              </h3>
              <motion.div 
                className="w-10 h-10 flex items-center justify-center"
                initial={{ rotate: 10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                {getIcon()}
              </motion.div>
            </motion.div>
          </div>
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
                boxShadow: `0 10px 25px rgba(0,0,0,0.05), 0 5px 10px ${getWavyColors()[0]}15`
              }}
            >
              <div className="text-center text-xl font-bold mb-4">Here's what we cover:</div>
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

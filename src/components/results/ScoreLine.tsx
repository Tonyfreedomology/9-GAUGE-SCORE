
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type ScoreLineProps = {
  score: number;
  label: string;
  color: string;
  delay?: number;
};

export const ScoreLine = ({ score, label, color, delay = 0 }: ScoreLineProps) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [arrowPosition, setArrowPosition] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (inView) {
      const scoreTimer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        
        const easeInOutQuad = (t: number) => {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };
        
        let step = 0;
        const timer = setInterval(() => {
          if (step < steps) {
            const progress = easeInOutQuad(step / steps);
            const current = score * progress;
            setCurrentScore(Math.round(current));
            setArrowPosition((current / 100) * 100);
            step++;
          } else {
            clearInterval(timer);
            setCurrentScore(score);
            setArrowPosition(score);
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }, delay);

      return () => clearTimeout(scoreTimer);
    }
  }, [score, delay, inView]);

  return (
    <div className="relative py-6" ref={ref}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-white/80 text-sm md:text-base">{label}</span>
      </div>
      
      <div className="relative pt-10 pb-4">
        {/* Background bar */}
        <div className="h-1 w-full bg-white/20 rounded-full" />
        
        {/* Progress fill */}
        <div 
          className="absolute bottom-4 left-0 h-1 rounded-full transition-all duration-300"
          style={{ 
            width: `${arrowPosition}%`,
            backgroundColor: color
          }} 
        />
        
        {/* Score number */}
        <div 
          className="absolute -top-1 transition-all duration-300 flex flex-col items-center"
          style={{ 
            left: `${arrowPosition}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <span 
            className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap"
            style={{
              textShadow: '0 0 10px rgba(0,0,0,0.5)',
              // Scale down for very high or low values to avoid edge overflow
              transform: arrowPosition < 15 || arrowPosition > 85 ? 'scale(0.85)' : 'scale(1)',
              transformOrigin: arrowPosition < 50 ? 'left center' : 'right center',
            }}
          >
            {currentScore}
          </span>
        </div>

        {/* Triangle Indicator - pointing up to the bar from below */}
        <div 
          className="absolute bottom-2.5 w-0 h-0 transition-all duration-300"
          style={{ 
            left: `${arrowPosition}%`,
            transform: 'translateX(-50%)',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `9px solid ${color}`,
            marginBottom: '0px'
          }}
        />
      </div>
    </div>
  );
};

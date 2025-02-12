
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
        const steps = 100;
        
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
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/80 text-sm">{label}</span>
      </div>
      
      <div className="relative">
        <div className="h-0.5 w-full bg-white/20 rounded-full" />
        
        <div 
          className="absolute top-0 left-0 h-0.5 rounded-full transition-all duration-300"
          style={{ 
            width: `${arrowPosition}%`,
            backgroundColor: color
          }} 
        />
        
        <div 
          className="absolute -top-8 transition-all duration-300"
          style={{ 
            left: `${arrowPosition}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <span className="text-3xl font-bold text-white">{currentScore}</span>
        </div>

        <div 
          className="absolute -bottom-2 w-0 h-0 transition-all duration-300"
          style={{ 
            left: `${arrowPosition}%`,
            transform: 'translateX(-50%)',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `8px solid ${color}`
          }}
        />
      </div>
    </div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SprintType } from '@/types';

type WeekPreviewProps = {
  title: string;
  content: string;
  week: number;
  color: SprintType;
  isVisible: boolean;
};

export const WeekPreview: React.FC<WeekPreviewProps> = ({
  title,
  content,
  week,
  color,
  isVisible
}) => {
  const getColor = () => {
    switch (color) {
      case 'health':
        return {
          primary: '#1BEBE7',
          secondary: '#60F5F3',
          gradientStart: '#60F5F3',
          gradientEnd: '#1BEBE7',
          bg: 'rgba(27, 235, 231, 0.07)',
          accent: 'rgba(27, 235, 231, 0.2)',
          shadow: 'rgba(27, 235, 231, 0.35)'
        };
      case 'financial':
        return {
          primary: '#00E8A9',
          secondary: '#00A57D',
          gradientStart: '#40F0C0',
          gradientEnd: '#00A57D',
          bg: 'rgba(0, 232, 169, 0.07)',
          accent: 'rgba(0, 232, 169, 0.2)',
          shadow: 'rgba(0, 232, 169, 0.35)'
        };
      case 'relationships':
        return {
          primary: '#FF105F',
          secondary: '#D10045',
          gradientStart: '#FF5088',
          gradientEnd: '#D10045',
          bg: 'rgba(255, 16, 95, 0.07)',
          accent: 'rgba(255, 16, 95, 0.2)',
          shadow: 'rgba(255, 16, 95, 0.35)'
        };
      default:
        return {
          primary: '#1BEBE7',
          secondary: '#60F5F3',
          gradientStart: '#60F5F3',
          gradientEnd: '#1BEBE7',
          bg: 'rgba(27, 235, 231, 0.07)',
          accent: 'rgba(27, 235, 231, 0.2)',
          shadow: 'rgba(27, 235, 231, 0.35)'
        };
    }
  };

  const colors = getColor();
  
  // Truncate content to prevent the preview from being too long
  // Strip HTML tags first to get clean text
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  
  const cleanText = typeof window !== 'undefined' ? stripHtml(content) : content.replace(/<[^>]*>?/gm, '');
  const truncatedContent = cleanText.length > 120 
    ? cleanText.substring(0, 120) + '...' 
    : cleanText;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30,
            mass: 1
          }}
          className="absolute z-50 left-1/2 transform -translate-x-1/2 bottom-full mb-3"
          style={{ 
            width: '280px', 
            pointerEvents: 'none',
            filter: `drop-shadow(0 10px 15px ${colors.shadow}30) drop-shadow(0 4px 6px rgba(0,0,0,0.1))`
          }}
        >
          <div className="rounded-lg p-4 relative overflow-hidden" style={{ 
            background: 'white',
            boxShadow: `0 10px 25px rgba(0,0,0,0.08), 0 5px 10px ${colors.primary}25`,
            borderLeft: `4px solid ${colors.primary}`
          }}>
            {/* Decorative corner accent */}
            <div 
              className="absolute right-0 top-0 w-24 h-24 pointer-events-none transform rotate-45 translate-x-12 -translate-y-12"
              style={{
                background: `radial-gradient(circle at center, ${colors.accent} 0%, transparent 70%)`
              }}
            />
            
            {/* Subtle pattern overlay */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMC41Ii8+Cjwvc3ZnPg==')",
                backgroundSize: "20px 20px"
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="flex items-center justify-center rounded-full w-6 h-6 text-xs font-bold text-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
                    boxShadow: `0 2px 4px ${colors.shadow}`
                  }}>
                  {week}
                </div>
                <h4 
                  className="text-sm font-semibold" 
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: `0 1px 1px rgba(255,255,255,0.1)`
                  }}
                >
                  {title}
                </h4>
              </div>
              
              <p className="text-xs text-gray-600 leading-snug">
                {truncatedContent}
              </p>
            </div>
          </div>
          
          {/* Arrow pointing down */}
          <div 
            className="w-4 h-4 rotate-45 absolute left-1/2 transform -translate-x-1/2 -bottom-2"
            style={{ 
              background: 'white',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.08)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WeekPreview;

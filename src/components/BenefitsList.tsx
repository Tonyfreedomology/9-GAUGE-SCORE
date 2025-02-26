import React from 'react';
import { motion } from 'framer-motion';
import { SprintType } from '@/types';

type BenefitProps = {
  benefits: string[];
  color: SprintType;
  layout?: 'grid' | 'list';
};

export const BenefitsList: React.FC<BenefitProps> = ({ 
  benefits, 
  color,
  layout = 'grid'
}) => {
  // Get color based on sprint type
  const getColors = () => {
    switch (color) {
      case 'health':
        return {
          primary: '#1BEBE7',
          text: '#00A5A2',
          bg: 'rgba(27, 235, 231, 0.08)',
          border: 'rgba(27, 235, 231, 0.2)'
        };
      case 'financial':
        return {
          primary: '#00FFBA',
          text: '#00805D',
          bg: 'rgba(0, 255, 186, 0.08)',
          border: 'rgba(0, 255, 186, 0.2)'
        };
      case 'relationships':
        return {
          primary: '#FF105F',
          text: '#D10045',
          bg: 'rgba(255, 16, 95, 0.08)',
          border: 'rgba(255, 16, 95, 0.2)'
        };
      default:
        return {
          primary: '#1BEBE7',
          text: '#00A5A2',
          bg: 'rgba(27, 235, 231, 0.08)',
          border: 'rgba(27, 235, 231, 0.2)'
        };
    }
  };

  const colors = getColors();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className={`w-full ${layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'space-y-2'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          className="flex items-center"
          variants={itemVariants}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <div 
            className="flex items-center p-3 rounded-lg w-full group transition-all duration-300"
            style={{ 
              background: colors.bg,
              border: `1px solid ${colors.border}`
            }}
          >
            <div 
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3"
              style={{ background: colors.primary }}
            >
              <svg 
                className="w-3.5 h-3.5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span 
              className="font-medium"
              style={{ color: colors.text }}
            >
              {benefit}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

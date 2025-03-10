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
          text: '#2D3748',
          border: '#1BEBE7'
        };
      case 'financial':
        return {
          primary: '#00E8A9',
          text: '#2D3748',
          border: '#00E8A9'
        };
      case 'relationships':
        return {
          primary: '#D10045',
          text: '#2D3748',
          border: '#D10045'
        };
      default:
        return {
          primary: '#1BEBE7',
          text: '#2D3748',
          border: '#1BEBE7'
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
              background: 'white',
              border: `1px solid ${colors.border}40`
            }}
          >
            <div 
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3"
              style={{ background: `${colors.primary}20`, border: `1.5px solid ${colors.primary}` }}
            >
              <svg 
                className="w-3 h-3"
                style={{ color: colors.primary }} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2.5" 
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

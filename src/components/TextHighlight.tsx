import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  headingVariants, 
  underlineVariants, 
  fontWeightVariants 
} from '@/lib/animations/textEffects';
import { SprintType } from '@/types';

type TextHighlightProps = {
  text: string;
  color: SprintType;
  element?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  className?: string;
  underline?: boolean;
  weight?: 'light' | 'normal' | 'bold';
  animate?: boolean;
  delay?: number;
  fontSize?: string;
};

export const TextHighlight: React.FC<TextHighlightProps> = ({
  text,
  color,
  element = 'span',
  className = '',
  underline = false,
  weight = 'normal',
  animate = true,
  delay = 0,
  fontSize,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getColor = () => {
    switch (color) {
      case 'health':
        return '#1BEBE7';
      case 'financial':
        return '#00FFBA';
      case 'relationships':
        return '#FF105F';
      default:
        return '#1BEBE7';
    }
  };
  
  const baseStyle = {
    display: 'inline-block',
    position: 'relative' as const,
    color: getColor(),
    fontSize: fontSize,
  };
  
  const Element = motion[element];
  
  // Combine animation effects into separate states
  const getHeadingAnimation = () => {
    if (!animate) return {};
    return {
      variants: headingVariants,
      initial: 'hidden',
      animate: 'visible',
      whileHover: 'highlight',
      custom: delay
    };
  };
  
  const getFontWeightAnimation = () => {
    return {
      variants: fontWeightVariants,
      animate: weight
    };
  };
  
  return (
    <Element
      {...getHeadingAnimation()}
      {...getFontWeightAnimation()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={baseStyle}
    >
      {text}
      
      {underline && (
        <motion.span
          variants={underlineVariants}
          initial="hidden"
          animate={isHovered ? 'visible' : 'hidden'}
          style={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: '2px',
            background: getColor(),
            borderRadius: '1px',
          }}
        />
      )}
    </Element>
  );
};

export default TextHighlight;

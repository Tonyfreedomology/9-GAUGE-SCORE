import { AnimationProps, Variants } from "framer-motion";

export const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + custom * 0.1,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] // Cubic bezier for natural motion
    }
  }),
  highlight: (custom = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1.05,
    transition: {
      delay: custom * 0.05,
      duration: 0.4,
      ease: "easeOut"
    }
  }),
  reset: {
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export const highlightTextProps = {
  initial: "hidden",
  animate: "visible",
  whileHover: "highlight",
  exit: "reset"
};

export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)"
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.1 * custom,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
};

// Underline animation for key phrases
export const underlineVariants: Variants = {
  hidden: {
    width: "0%",
    left: "50%",
    right: "50%"
  },
  visible: {
    width: "100%",
    left: "0%",
    right: "0%",
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

// Mask effect for headers
export const textMaskVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: {
      duration: 0.7,
      ease: [0.165, 0.84, 0.44, 1]
    }
  }
};

// Staggered text animation
export function getStaggerTransition(index: number): AnimationProps["transition"] {
  return {
    duration: 0.5,
    delay: 0.05 * index,
    ease: [0.175, 0.885, 0.32, 1.275]
  };
}

// Variable font animation - to be used with CSS variable font weights
export const fontWeightVariants: Variants = {
  light: {
    fontVariationSettings: "'wght' 300",
    transition: { duration: 0.5 }
  },
  normal: {
    fontVariationSettings: "'wght' 400",
    transition: { duration: 0.5 }
  },
  bold: {
    fontVariationSettings: "'wght' 700",
    transition: { duration: 0.5 }
  }
};

// Shine effect for buttons and images
export const shineEffectVariants: Variants = {
  initial: {
    backgroundPosition: "-200% 0",
  },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 2,
      ease: "linear",
      repeatDelay: 5,
    }
  }
};

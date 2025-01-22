export const keyframes = {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  "fade-in": {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  "fade-out": {
    "0%": { opacity: "1" },
    "100%": { opacity: "0" },
  },
  "scale-in": {
    "0%": { opacity: "0", transform: "scale(0.95)" },
    "100%": { opacity: "1", transform: "scale(1)" },
  },
  "pulse-glow": {
    "0%, 100%": { 
      boxShadow: "0 0 40px rgba(23, 190, 187, 0.8), inset 0 0 40px rgba(23, 190, 187, 0.8)",
      filter: "brightness(1.1)"
    },
    "50%": { 
      boxShadow: "0 0 80px rgba(23, 190, 187, 1), inset 0 0 80px rgba(23, 190, 187, 1)",
      filter: "brightness(1.4)"
    }
  },
  shimmer: {
    "0%": {
      backgroundPosition: "-500px 0",
    },
    "100%": {
      backgroundPosition: "500px 0",
    },
  }
};

export const animations = {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  "fade-in": "fade-in 0.5s ease-out forwards",
  "fade-out": "fade-out 0.5s ease-out forwards",
  "scale-in": "scale-in 0.2s ease-out",
  "pulse-glow": "pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  shimmer: "shimmer 2.5s linear infinite"
};
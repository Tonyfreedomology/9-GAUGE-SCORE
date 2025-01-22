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
  "smooth-glow": {
    "0%, 100%": { 
      boxShadow: "0 0 30px rgba(23, 190, 187, 0.6), 0 0 50px rgba(23, 190, 187, 0.4)"
    },
    "50%": { 
      boxShadow: "0 0 50px rgba(23, 190, 187, 0.8), 0 0 70px rgba(23, 190, 187, 0.6)"
    }
  }
};

export const animations = {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  "fade-in": "fade-in 0.5s ease-out forwards",
  "fade-out": "fade-out 0.5s ease-out forwards",
  "scale-in": "scale-in 0.2s ease-out",
  "smooth-glow": "smooth-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
};
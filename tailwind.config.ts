import type { Config } from "tailwindcss";
import { keyframes, animations } from "./src/lib/config/animations";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        heading: ['Helvetica', 'Arial', 'sans-serif'],
        // Uncomment one of these options to apply it globally:
        // sans: ['Inter', 'system-ui', 'sans-serif'], // Option 1
        // sans: ['Avenir', 'system-ui', 'sans-serif'], // Option 2
        // sans: ['Outfit', 'system-ui', 'sans-serif'], // Option 3
      },
      letterSpacing: {
        'tighter': '-0.05em',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "#242424",
        financial: {
          DEFAULT: "#22EDB6",
          light: "#C8E7E8",
        },
        health: {
          DEFAULT: "#22DFDC",
          light: "#E3FFFE",
        },
        relationships: {
          DEFAULT: "#FF105F",
          light: "#FFE5ED",
        },
        primary: {
          DEFAULT: "#242424",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "#242424",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "#242424",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "#242424",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "#242424",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "#242424",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-soft': 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes,
      animation: animations,
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

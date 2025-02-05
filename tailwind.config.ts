
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
        sans: ['Avenir', 'system-ui', 'sans-serif'],
        heading: ['Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.05em',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "#293230",
        financial: {
          DEFAULT: "#17BEBB",
          light: "#C8E7E8",
        },
        health: {
          DEFAULT: "#EDB88B",
          light: "#F7E4D5",
        },
        relationships: {
          DEFAULT: "#EF3E36",
          light: "#F1C5BC",
        },
        primary: {
          DEFAULT: "#293230",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "#293230",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "#293230",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "#293230",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "#293230",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "#293230",
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

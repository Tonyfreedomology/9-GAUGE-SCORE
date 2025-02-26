import { SprintType } from "@/types";

type BackgroundImageConfig = {
  url: string;
  credit: string;
  creditUrl: string;
  position: string;
};

// Background images for each sprint type
export const getSprintBackgroundImage = (sprintType: SprintType): BackgroundImageConfig => {
  switch (sprintType) {
    case "health":
      return {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
        credit: "Arek Adeoye",
        creditUrl: "https://unsplash.com/@areksan",
        position: "center 30%"
      };
    case "financial":
      return {
        url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop",
        credit: "Towfiqu barbhuiya",
        creditUrl: "https://unsplash.com/@towfiqu999999",
        position: "center 40%"
      };
    case "relationships":
      return {
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop",
        credit: "Priscilla Du Preez",
        creditUrl: "https://unsplash.com/@priscilladupreez",
        position: "center 35%"
      };
    default:
      return {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
        credit: "Arek Adeoye",
        creditUrl: "https://unsplash.com/@areksan",
        position: "center 30%"
      };
  }
};

// Week icons for each sprint type
type WeekIconConfig = {
  icon: string;
  alt: string;
  color: string;
};

export const getWeekIcon = (sprintType: SprintType, weekNumber: number): WeekIconConfig => {
  // Health icons
  const healthIcons: Record<number, WeekIconConfig> = {
    1: { icon: "🧘‍♀️", alt: "Meditation", color: "#1BEBE7" },
    2: { icon: "🥗", alt: "Nutrition", color: "#1BEBE7" },
    3: { icon: "💪", alt: "Strength", color: "#1BEBE7" },
    4: { icon: "🧠", alt: "Mental Health", color: "#1BEBE7" },
    5: { icon: "💤", alt: "Sleep", color: "#1BEBE7" },
    6: { icon: "🌱", alt: "Growth", color: "#1BEBE7" }
  };

  // Financial icons
  const financialIcons: Record<number, WeekIconConfig> = {
    1: { icon: "💰", alt: "Savings", color: "#00FFBA" },
    2: { icon: "📊", alt: "Budgeting", color: "#00FFBA" },
    3: { icon: "📈", alt: "Investing", color: "#00FFBA" },
    4: { icon: "🏠", alt: "Real Estate", color: "#00FFBA" },
    5: { icon: "💳", alt: "Debt Freedom", color: "#00FFBA" },
    6: { icon: "🎯", alt: "Financial Goals", color: "#00FFBA" }
  };

  // Relationship icons
  const relationshipIcons: Record<number, WeekIconConfig> = {
    1: { icon: "❤️", alt: "Self Love", color: "#D10045" },
    2: { icon: "👨‍👩‍👧‍👦", alt: "Family", color: "#D10045" },
    3: { icon: "🤝", alt: "Friendship", color: "#D10045" },
    4: { icon: "💑", alt: "Romantic", color: "#D10045" },
    5: { icon: "🙏", alt: "Spiritual", color: "#D10045" },
    6: { icon: "🌍", alt: "Community", color: "#D10045" }
  };

  // Select the appropriate icon set based on sprint type
  let icons: Record<number, WeekIconConfig>;
  switch (sprintType) {
    case "health":
      icons = healthIcons;
      break;
    case "financial":
      icons = financialIcons;
      break;
    case "relationships":
      icons = relationshipIcons;
      break;
    default:
      icons = healthIcons;
  }

  // Return the icon for the specified week, or a default if not found
  return icons[weekNumber] || { icon: "📝", alt: "Week Content", color: "#888888" };
};

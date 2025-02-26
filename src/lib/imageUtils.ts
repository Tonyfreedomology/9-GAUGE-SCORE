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

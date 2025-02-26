import { SprintType } from "@/types";

export type BenefitData = {
  text: string;
  highlight?: boolean;
};

export const getBenefits = (sprintType: string): string[] => {
  switch (sprintType.toLowerCase()) {
    case 'health':
      return [
        "Fat gone",
        "Weight down",
        "Muscle up",
        "Energy through the roof"
      ];
    case 'financial':
      return [
        "Stress GONE",
        "Debt DOWN",
        "Savings UP",
        "Joy through the ROOF"
      ];
    case 'relationships':
      return [
        "Happiness UP",
        "Fear DOWN",
        "Connection DEEP",
        "Joy through the ROOF"
      ];
    default:
      return [];
  }
};

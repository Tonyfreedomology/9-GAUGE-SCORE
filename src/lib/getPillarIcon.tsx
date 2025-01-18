import { BanknoteIcon, HeartPulse, Users } from "lucide-react";

export const getPillarIcon = (pillarName: string) => {
  switch (pillarName) {
    case 'Financial':
      return <BanknoteIcon className="w-8 h-8 text-[#17BEBB]" />;
    case 'Health':
      return <HeartPulse className="w-8 h-8 text-[#EDB88B]" />;
    case 'Relationships':
      return <Users className="w-8 h-8 text-[#EF3E36]" />;
    default:
      return null;
  }
};
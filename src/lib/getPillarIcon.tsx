import { Heart, Users } from "lucide-react";

export const getPillarIcon = (pillarName: string) => {
  switch (pillarName) {
    case 'Financial':
      return (
        <img 
          src="https://static.wixstatic.com/media/af616c_29340f0ac2544ea0b413a7d67075a5a2~mv2.png"
          alt="Financial icon"
          className="w-8 h-8 object-contain"
        />
      );
    case 'Health':
      return <Heart className="w-8 h-8 text-[#EDB88B]" />;
    case 'Relationships':
      return <Users className="w-8 h-8 text-[#EF3E36]" />;
    default:
      return null;
  }
};
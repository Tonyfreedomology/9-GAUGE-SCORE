
export const getPillarIcon = (pillarName: string) => {
  switch (pillarName) {
    case 'Financial':
      return (
        <img 
          src="https://static.wixstatic.com/media/af616c_eda71941e0a04667a49dd0a12e0ca8ff~mv2.png"
          alt="Financial icon"
          className="w-8 h-8 object-contain"
        />
      );
    case 'Health':
      return (
        <img 
          src="https://static.wixstatic.com/media/af616c_46b69360859246a587f805a9af193e54~mv2.png"
          alt="Health icon"
          className="w-8 h-8 object-contain"
        />
      );
    case 'Relationships':
      return (
        <img 
          src="https://static.wixstatic.com/media/af616c_ee1fdc2818df4973842d2c907d0d4d7e~mv2.png"
          alt="Relationships icon"
          className="w-8 h-8 object-contain"
        />
      );
    default:
      return null;
  }
};

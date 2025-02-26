export const getPillarIcon = (pillarName: string) => {
  switch (pillarName) {
    case 'Financial':
      return (
        <img 
          src="https://static.wixstatic.com/media/af616c_ea23e3c04acd44cfb52510865397e02a~mv2.png"
          alt="Financial icon"
          className="w-8 h-8 object-contain"
        />
      );
    case 'Health':
      return (
        <img 
          src="https://static.wixstatic.com/media/af616c_f62b572d573e46df91187a19b34fe8c8~mv2.png"
          alt="Health icon"
          className="w-8 h-8 object-contain"
        />
      );
    case 'Relationships':
      return (
        <img 
          src="https://static.wixstatic.com/media/af616c_2da59b3c020c49e396d0a151b69b6c17~mv2.png"
          alt="Relationships icon"
          className="w-8 h-8 object-contain"
        />
      );
    default:
      return null;
  }
};

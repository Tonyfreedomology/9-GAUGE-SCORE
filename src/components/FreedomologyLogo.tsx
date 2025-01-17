import { useState } from "react";

export const FreedomologyLogo = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error("Failed to load Freedomology logo");
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log("Successfully loaded Freedomology logo");
  };

  if (imageError) {
    return <div className="text-xl font-bold text-center mb-8 text-white">Freedomology</div>;
  }

  return (
    <img 
      src="https://static.wixstatic.com/media/af616c_750d594b45cd42a4bb4f3290aad0fa61~mv2.png" 
      alt="Freedomology" 
      className="h-20 md:h-24 mx-auto mb-8 transform transition-all duration-300 hover:scale-105"
      onError={handleImageError}
      onLoad={handleImageLoad}
    />
  );
};
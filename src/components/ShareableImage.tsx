
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, Image } from "fabric";

type ShareableImageProps = {
  answers: Record<string, number>;
  onImageGenerated: (dataUrl: string) => void;
  width?: number;
  height?: number;
};

export const ShareableImage = ({ 
  onImageGenerated,
  width = 1200,
  height = 630 
}: ShareableImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    console.log('Initializing canvas...');
    const canvas = new FabricCanvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#293230'
    });

    // Load background image using fabric.Image.fromURL
    Image.fromURL(
      'https://static.wixstatic.com/media/af616c_22e0ac03919447c8adb4424b1dca5fce~mv2.jpg',
      {
        crossOrigin: 'anonymous',
        signal: new AbortController().signal,
        onload: (img) => {
          console.log('Background image loaded successfully');
          
          // Set image properties
          img.scaleX = width / 1200;
          img.scaleY = height / 630;
          img.opacity = 0.85;
          
          // Add image to canvas as background
          canvas.backgroundImage = img;
          canvas.renderAll();
          
          // Generate image
          const dataUrl = canvas.toDataURL({
            format: "png",
            quality: 1,
            multiplier: 2
          });
          
          console.log('Image generated successfully');
          onImageGenerated(dataUrl);
          canvas.dispose();
        }
      }
    );

  }, [onImageGenerated, width, height]);

  return (
    <canvas 
      ref={canvasRef}
      className="hidden"
    />
  );
};

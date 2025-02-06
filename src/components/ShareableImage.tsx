
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
        signal: new AbortController().signal
      }
    ).then((img) => {
      console.log('Background image loaded successfully');
      
      // Calculate scaling to fit image within canvas while maintaining aspect ratio
      const scaleX = width / img.width!;
      const scaleY = height / img.height!;
      const scale = Math.min(scaleX, scaleY);
      
      // Set image properties
      img.set({
        scaleX: scale,
        scaleY: scale,
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0
      });
      
      // Set background image directly using the property
      canvas.backgroundImage = img;
      canvas.renderAll();
      
      // Generate image with higher multiplier for better resolution
      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2  // Increased from 1 to 2 for higher resolution
      });
      
      console.log('Image generated successfully');
      onImageGenerated(dataUrl);
      canvas.dispose();
    });

  }, [onImageGenerated, width, height]);

  return (
    <canvas 
      ref={canvasRef}
      className="hidden"
    />
  );
};

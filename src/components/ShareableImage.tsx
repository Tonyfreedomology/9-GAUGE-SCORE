
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas } from "fabric";

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

    // Load background image
    canvas.setBackgroundImage(
      'https://static.wixstatic.com/media/af616c_22e0ac03919447c8adb4424b1dca5fce~mv2.jpg',
      () => {
        console.log('Background image loaded successfully');
        // Generate image
        const dataUrl = canvas.toDataURL({
          format: "png",
          quality: 1,
          multiplier: 2
        });
        
        console.log('Image generated successfully');
        onImageGenerated(dataUrl);
        canvas.dispose();
      },
      {
        crossOrigin: 'anonymous',
        scaleX: width / 1200,
        scaleY: height / 630,
        opacity: 0.85
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

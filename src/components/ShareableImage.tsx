import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { calculateScores } from "@/lib/utils/scoreUtils";
import { createImageLayout } from "./shareable/ImageLayout";

type ShareableImageProps = {
  answers: Record<string, number>;
  onImageGenerated: (dataUrl: string) => void;
  width?: number;
  height?: number;
};

export const ShareableImage = ({ 
  answers, 
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

    // Calculate scores
    const { pillarScores, overallScore } = calculateScores(answers);
    console.log('Calculated scores:', { pillarScores, overallScore });

    // Create layout
    createImageLayout(canvas, overallScore, pillarScores, width, height)
      .then(() => {
        // Generate image
        const dataUrl = canvas.toDataURL({
          format: "png",
          quality: 1,
          multiplier: 2
        });
        
        console.log('Image generated successfully');
        onImageGenerated(dataUrl);
      })
      .catch(error => {
        console.error('Error generating image:', error);
      })
      .finally(() => {
        canvas.dispose();
      });
  }, [answers, onImageGenerated, width, height]);

  return (
    <canvas 
      ref={canvasRef}
      className="hidden"
    />
  );
};
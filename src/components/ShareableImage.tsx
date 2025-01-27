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

    const canvas = new FabricCanvas(canvasRef.current, {
      width,
      height
    });

    // Calculate scores
    const { pillarScores, overallScore } = calculateScores(answers);

    // Create layout
    createImageLayout(canvas, overallScore, pillarScores, width, height);

    // Generate image
    const dataUrl = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2
    });
    
    onImageGenerated(dataUrl);
    canvas.dispose();
  }, [answers, onImageGenerated, width, height]);

  return (
    <canvas 
      ref={canvasRef}
      className="hidden"
    />
  );
};
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { questions, calculatePillarScore } from "@/lib/questions";

type ShareableImageProps = {
  answers: Record<string, number>;
  onImageGenerated: (dataUrl: string) => void;
};

export const ShareableImage = ({ answers, onImageGenerated }: ShareableImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 1200,
      height: 630, // Twitter card size
      backgroundColor: "#293230"
    });

    // Calculate scores
    const pillarScores = questions.map(pillar => ({
      name: pillar.name,
      score: calculatePillarScore(pillar, answers)
    }));

    const overallScore = Math.round(
      pillarScores.reduce((acc, pillar) => acc + pillar.score, 0) / pillarScores.length
    );

    // TODO: Replace with actual template image once provided by designer
    // For now, create a placeholder design
    canvas.add(new fabric.Text("Freedomology Assessment", {
      left: 600,
      top: 100,
      fontSize: 48,
      fill: "#FFFFFF",
      fontFamily: "League Spartan",
      originX: "center",
      textAlign: "center"
    }));

    // Add overall score
    canvas.add(new fabric.Text(`${overallScore}`, {
      left: 600,
      top: 200,
      fontSize: 120,
      fill: "#17BEBB",
      fontFamily: "League Spartan",
      originX: "center",
      textAlign: "center"
    }));

    // Add pillar scores
    pillarScores.forEach((pillar, index) => {
      const x = 300 + (index * 300);
      canvas.add(new fabric.Text(pillar.name, {
        left: x,
        top: 400,
        fontSize: 24,
        fill: "#FFFFFF",
        fontFamily: "League Spartan",
        originX: "center",
        textAlign: "center"
      }));

      canvas.add(new fabric.Text(`${pillar.score}`, {
        left: x,
        top: 450,
        fontSize: 64,
        fill: getPillarColor(pillar.name),
        fontFamily: "League Spartan",
        originX: "center",
        textAlign: "center"
      }));
    });

    // Generate image and cleanup
    const dataUrl = canvas.toDataURL({
      format: "png",
      quality: 1
    });
    onImageGenerated(dataUrl);
    canvas.dispose();
  }, [answers, onImageGenerated]);

  const getPillarColor = (pillarName: string): string => {
    switch (pillarName) {
      case "Financial":
        return "#17BEBB";
      case "Health":
        return "#EDB88B";
      case "Relationships":
        return "#EF3E36";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <canvas 
      ref={canvasRef}
      className="hidden" // Hide the canvas element as we only need it for generation
    />
  );
};
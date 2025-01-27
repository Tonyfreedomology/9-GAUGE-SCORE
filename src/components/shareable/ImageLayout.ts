import { Canvas as FabricCanvas } from "fabric";
import { createTextElement } from "./TextElement";
import { getPillarColor } from "@/lib/utils/scoreUtils";

export const createImageLayout = (
  canvas: FabricCanvas,
  overallScore: number,
  pillarScores: Array<{ name: string; score: number }>
) => {
  // Add title
  canvas.add(createTextElement({
    text: "Freedomology Assessment",
    options: {
      left: 600,
      top: 100,
      fontSize: 48,
      fill: "#FFFFFF"
    }
  }));

  // Add overall score
  canvas.add(createTextElement({
    text: `${overallScore}`,
    options: {
      left: 600,
      top: 200,
      fontSize: 120,
      fill: "#17BEBB"
    }
  }));

  // Add pillar scores
  pillarScores.forEach((pillar, index) => {
    const x = 300 + (index * 300);
    
    canvas.add(createTextElement({
      text: pillar.name,
      options: {
        left: x,
        top: 400,
        fontSize: 24,
        fill: "#FFFFFF"
      }
    }));

    canvas.add(createTextElement({
      text: `${pillar.score}`,
      options: {
        left: x,
        top: 450,
        fontSize: 64,
        fill: getPillarColor(pillar.name)
      }
    }));
  });
};
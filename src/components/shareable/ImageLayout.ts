import { Canvas as FabricCanvas, Text } from "fabric";
import { createTextElement } from "./TextElement";
import { getPillarColor } from "@/lib/utils/scoreUtils";

export const createImageLayout = (
  canvas: FabricCanvas,
  overallScore: number,
  pillarScores: Array<{ name: string; score: number }>
) => {
  console.log('Creating image layout with scores:', { overallScore, pillarScores });

  // Constants for layout
  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 630;
  const CENTER_X = CANVAS_WIDTH / 2;
  
  // Add logo/branding
  canvas.add(createTextElement({
    text: "Freedomology",
    options: {
      left: CENTER_X,
      top: 80,
      fontSize: 64,
      fontFamily: 'League Spartan',
      fill: "#FFFFFF",
      originX: 'center',
      fontWeight: '600'
    }
  }));

  // Add overall score
  canvas.add(createTextElement({
    text: "Overall Score",
    options: {
      left: CENTER_X,
      top: 180,
      fontSize: 32,
      fontFamily: 'Avenir',
      fill: "#FFFFFF",
      originX: 'center'
    }
  }));

  canvas.add(createTextElement({
    text: `${overallScore}`,
    options: {
      left: CENTER_X,
      top: 230,
      fontSize: 120,
      fontFamily: 'League Spartan',
      fill: "#17BEBB",
      originX: 'center',
      fontWeight: '700'
    }
  }));

  // Add pillar scores in a row
  const PILLAR_Y = 400;
  const PILLAR_SPACING = 300;
  const SCORE_OFFSET_Y = 50;

  pillarScores.forEach((pillar, index) => {
    const x = CENTER_X + (index - 1) * PILLAR_SPACING;
    
    // Pillar name
    canvas.add(createTextElement({
      text: pillar.name,
      options: {
        left: x,
        top: PILLAR_Y,
        fontSize: 28,
        fontFamily: 'Avenir',
        fill: "#FFFFFF",
        originX: 'center'
      }
    }));

    // Pillar score
    canvas.add(createTextElement({
      text: `${pillar.score}`,
      options: {
        left: x,
        top: PILLAR_Y + SCORE_OFFSET_Y,
        fontSize: 64,
        fontFamily: 'League Spartan',
        fill: getPillarColor(pillar.name),
        originX: 'center',
        fontWeight: '700'
      }
    }));
  });

  // Add footer text
  canvas.add(createTextElement({
    text: "Take the assessment at freedomology.com",
    options: {
      left: CENTER_X,
      top: CANVAS_HEIGHT - 80,
      fontSize: 24,
      fontFamily: 'Avenir',
      fill: "#FFFFFF",
      originX: 'center'
    }
  }));

  console.log('Image layout created successfully');
};
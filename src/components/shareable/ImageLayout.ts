import { Canvas as FabricCanvas, Text, Rect, Image } from "fabric";
import { createTextElement } from "./TextElement";
import { getPillarColor } from "@/lib/utils/scoreUtils";

export const createImageLayout = (
  canvas: FabricCanvas,
  overallScore: number,
  pillarScores: Array<{ name: string; score: number }>,
  canvasWidth = 1200,
  canvasHeight = 630
) => {
  console.log('Creating image layout with scores:', { overallScore, pillarScores });

  // Constants for layout
  const CENTER_X = canvasWidth / 2;
  
  // Set background image using the proper Fabric.js v6 method
  Image.fromURL('public/lovable-uploads/ce6f8dfa-3fae-4a43-9e79-9efc3e745359.png', {
    crossOrigin: 'anonymous',
  }).then((img) => {
    img.scaleToWidth(canvasWidth);
    img.scaleToHeight(canvasHeight);
    canvas.backgroundImage = img;
    canvas.renderAll();
  });

  // Scale factors for responsive layout
  const scaleFactor = Math.min(canvasWidth / 1200, canvasHeight / 630);
  
  // Add "Freedomology Score" text at the top
  canvas.add(createTextElement({
    text: "Freedomology Score",
    options: {
      left: CENTER_X,
      top: 80 * scaleFactor,
      fontSize: 48 * scaleFactor,
      fontFamily: 'League Spartan',
      fill: "#FFFFFF",
      originX: 'center',
      fontWeight: '600'
    }
  }));

  // Add overall score below the title
  canvas.add(createTextElement({
    text: `${overallScore}`,
    options: {
      left: CENTER_X,
      top: 150 * scaleFactor,
      fontSize: 96 * scaleFactor,
      fontFamily: 'League Spartan',
      fill: "#FFFFFF",
      originX: 'center',
      fontWeight: '700'
    }
  }));

  // Add pillar scores in translucent boxes
  const BOX_WIDTH = 280 * scaleFactor;
  const BOX_HEIGHT = 200 * scaleFactor;
  const BOX_Y = 350 * scaleFactor;
  const BOX_SPACING = 320 * scaleFactor;
  const SCORE_OFFSET_Y = 70 * scaleFactor;

  pillarScores.forEach((pillar, index) => {
    const x = CENTER_X + (index - 1) * BOX_SPACING;
    
    // Add translucent box
    const box = new Rect({
      left: x - BOX_WIDTH / 2,
      top: BOX_Y,
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      fill: 'rgba(255, 255, 255, 0.1)',
      rx: 20, // rounded corners
      ry: 20
    });
    canvas.add(box);
    
    // Pillar name
    canvas.add(createTextElement({
      text: pillar.name,
      options: {
        left: x,
        top: BOX_Y + 40 * scaleFactor,
        fontSize: 28 * scaleFactor,
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
        top: BOX_Y + SCORE_OFFSET_Y,
        fontSize: 64 * scaleFactor,
        fontFamily: 'League Spartan',
        fill: "#FFFFFF",
        originX: 'center',
        fontWeight: '700'
      }
    }));
  });

  // Add footer text
  canvas.add(createTextElement({
    text: "How free are YOU? | freedomology-scorecard.lovable.app",
    options: {
      left: CENTER_X,
      top: canvasHeight - 50 * scaleFactor,
      fontSize: 24 * scaleFactor,
      fontFamily: 'League Spartan',
      fill: "#FFFFFF",
      originX: 'center'
    }
  }));

  console.log('Image layout created successfully');
};
import { Canvas as FabricCanvas, Text, Image } from "fabric";
import { createTextElement } from "./TextElement";

export const createImageLayout = (
  canvas: FabricCanvas,
  overallScore: number,
  pillarScores: Array<{ name: string; score: number }>,
  canvasWidth = 1200,
  canvasHeight = 630
) => {
  console.log('Creating image layout with scores:', { overallScore, pillarScores });

  // Load background image using the proper Fabric.js v6 method
  Image.fromURL('/lovable-uploads/01d825b5-d5ab-452c-b2d5-cee2a8cd87de.png', {
    crossOrigin: 'anonymous',
  }).then((img) => {
    // Scale image to canvas size
    img.scaleToWidth(canvasWidth);
    img.scaleToHeight(canvasHeight);
    
    // Set as background using the correct v6 property
    canvas.backgroundImage = img;
    canvas.renderAll();

    // Scale factors for responsive layout
    const scaleFactor = Math.min(canvasWidth / 1200, canvasHeight / 630);
    
    // Add overall score
    canvas.add(createTextElement({
      text: `${overallScore}`,
      options: {
        left: canvasWidth / 2,
        top: 150 * scaleFactor,
        fontSize: 96 * scaleFactor,
        fontFamily: 'League Spartan',
        fill: "#FFFFFF",
        originX: 'center',
        fontWeight: '700'
      }
    }));

    // Add pillar scores
    const BOX_Y = 350 * scaleFactor;
    const BOX_SPACING = 320 * scaleFactor;

    pillarScores.forEach((pillar, index) => {
      const x = (canvasWidth / 2) + (index - 1) * BOX_SPACING;
      
      // Pillar score
      canvas.add(createTextElement({
        text: `${pillar.score}`,
        options: {
          left: x,
          top: BOX_Y,
          fontSize: 64 * scaleFactor,
          fontFamily: 'League Spartan',
          fill: "#FFFFFF",
          originX: 'center',
          fontWeight: '700'
        }
      }));
    });

    console.log('Image layout created successfully');
  });
};
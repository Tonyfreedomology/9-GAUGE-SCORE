import { Canvas as FabricCanvas, Image } from "fabric";
import { createTextElement } from "./TextElement";

export const createImageLayout = (
  canvas: FabricCanvas,
  overallScore: number,
  pillarScores: Array<{ name: string; score: number }>,
  canvasWidth = 1200,
  canvasHeight = 630
) => {
  console.log('Creating image layout with scores:', { overallScore, pillarScores });

  // Set background image using the new Fabric.js v6 API
  Image.fromURL(
    'https://static.wixstatic.com/media/af616c_62a4381d8580414faf04da933f2286ee~mv2.jpg',
    { crossOrigin: 'anonymous' }
  ).then((img) => {
    // Scale the image after it's loaded
    img.scaleX = canvasWidth / 1200;
    img.scaleY = canvasHeight / 630;
    
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

    canvas.renderAll();
    console.log('Image layout created successfully');
  }).catch(error => {
    console.error('Error loading background image:', error);
  });
};

import { Canvas as FabricCanvas, Image, Text, Rect } from "fabric";
import { createTextElement } from "./TextElement";
import { getPillarColor } from "@/lib/utils/scoreUtils";

export const createImageLayout = async (
  canvas: FabricCanvas,
  overallScore: number,
  pillarScores: Array<{ name: string; score: number }>,
  canvasWidth = 1200,
  canvasHeight = 630
) => {
  console.log('Starting image layout creation...', { overallScore, pillarScores });
  
  // Clear any existing content
  canvas.clear();
  
  // Load background image
  return new Promise<void>((resolve) => {
    Image.fromURL('https://static.wixstatic.com/media/af616c_22e0ac03919447c8adb4424b1dca5fce~mv2.jpg', {
      crossOrigin: 'anonymous'
    }).then((img) => {
      console.log('Background image loaded successfully');
      
      // Scale and position the background image
      const scaleX = canvasWidth / img.width!;
      const scaleY = canvasHeight / img.height!;
      const scale = Math.max(scaleX, scaleY);
      
      img.set({
        scaleX: scale,
        scaleY: scale,
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        originX: 'center',
        originY: 'center',
        opacity: 0.85
      });
      
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

      addCanvasElements();
      
    }).catch(error => {
      console.error('Error loading background image:', error);
      // Set a fallback background color and continue with the layout
      canvas.backgroundColor = '#293230';
      canvas.renderAll();
      
      addCanvasElements();
    });

    function addCanvasElements() {
      // Scale factor for responsive layout
      const scaleFactor = Math.min(canvasWidth / 1200, canvasHeight / 630);
      
      // Add overall score
      const overallScoreText = createTextElement({
        text: `${Math.round(overallScore)}`,
        options: {
          left: canvasWidth / 2,
          top: 120 * scaleFactor,
          fontSize: 120 * scaleFactor,
          fill: "#FFFFFF",
          fontWeight: '700',
          fontFamily: 'Helvetica',
        }
      });

      // Add "Overall Score" label
      const overallLabel = createTextElement({
        text: "OVERALL SCORE",
        options: {
          left: canvasWidth / 2,
          top: 200 * scaleFactor,
          fontSize: 24 * scaleFactor,
          fill: "#FFFFFF",
          fontWeight: '500',
          fontFamily: 'Helvetica'
        }
      });

      canvas.add(overallScoreText, overallLabel);

      // Add pillar scores with score boxes
      const BOX_Y = 400 * scaleFactor;
      const BOX_SPACING = 320 * scaleFactor;
      const BOX_WIDTH = 250 * scaleFactor;
      const BOX_HEIGHT = 150 * scaleFactor;

      pillarScores.forEach((pillar, index) => {
        const x = (canvasWidth / 2) + (index - 1) * BOX_SPACING;
        const pillarColor = getPillarColor(pillar.name);
        
        // Score box with glassmorphism effect
        const scoreBox = new Rect({
          left: x - BOX_WIDTH / 2,
          top: BOX_Y,
          width: BOX_WIDTH,
          height: BOX_HEIGHT,
          fill: '#FFFFFF',
          opacity: 0.1,
          rx: 10,
          ry: 10
        });

        // Pillar score
        const scoreText = createTextElement({
          text: `${Math.round(pillar.score)}`,
          options: {
            left: x,
            top: BOX_Y + 40 * scaleFactor,
            fontSize: 64 * scaleFactor,
            fill: pillarColor,
            fontWeight: '700',
            fontFamily: 'Helvetica'
          }
        });

        // Pillar name
        const nameText = createTextElement({
          text: pillar.name,
          options: {
            left: x,
            top: BOX_Y + 110 * scaleFactor,
            fontSize: 24 * scaleFactor,
            fill: "#FFFFFF",
            fontWeight: '500',
            fontFamily: 'Helvetica'
          }
        });

        canvas.add(scoreBox, scoreText, nameText);
      });

      canvas.renderAll();
      resolve();
    }
  });
};

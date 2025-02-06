
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, Image, Line, Text } from "fabric";
import { calculateCategoryScore } from "@/lib/services/assessmentService";

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

    // Load background image using fabric.Image.fromURL
    Image.fromURL(
      'https://static.wixstatic.com/media/af616c_22e0ac03919447c8adb4424b1dca5fce~mv2.jpg',
      {
        crossOrigin: 'anonymous',
        signal: new AbortController().signal
      }
    ).then((img) => {
      console.log('Background image loaded successfully');
      
      // Calculate scaling to fit image within canvas while maintaining aspect ratio
      const scaleX = width / img.width!;
      const scaleY = height / img.height!;
      const scale = Math.min(scaleX, scaleY);
      
      // Set image properties
      img.set({
        scaleX: scale,
        scaleY: scale,
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0
      });
      
      // Set background image
      canvas.backgroundImage = img;

      // Define pillar colors and layout configuration
      const pillars = [
        { name: 'HEALTH', color: '#EDB88B', categories: ['Mental', 'Physical', 'Environmental'] },
        { name: 'FINANCES', color: '#17BEBB', categories: ['Income', 'Independence', 'Impact'] },
        { name: 'RELATIONSHIPS', color: '#EF3E36', categories: ['Others', 'Self', 'God'] }
      ];

      // Layout configuration
      const startY = 180;
      const lineWidth = 200;
      const pillarSpacing = 350;
      const categorySpacing = 100;
      const startX = (width - (pillarSpacing * 2 + lineWidth)) / 2;

      // Add pillar titles and score lines
      pillars.forEach((pillar, pillarIndex) => {
        const x = startX + pillarIndex * pillarSpacing;

        // Add pillar title
        const titleText = new Text(pillar.name, {
          left: x,
          top: startY - 60,
          fontSize: 36,
          fontFamily: 'Arial',
          fill: 'white',
          fontWeight: 'bold'
        });
        canvas.add(titleText);

        // Add score lines and labels for each category
        pillar.categories.forEach((category, categoryIndex) => {
          const y = startY + categoryIndex * categorySpacing;
          
          // Calculate score based on the category
          const categoryPrefix = category.toLowerCase();
          const categoryAnswers = Object.entries(answers).filter(([key]) => 
            key.toLowerCase().startsWith(categoryPrefix)
          );
          
          let score = 0;
          if (categoryAnswers.length > 0) {
            const total = categoryAnswers.reduce((sum, [_, value]) => sum + value, 0);
            score = Math.round((total / categoryAnswers.length / 5) * 100);
          }

          // Add score line
          const line = new Line([0, 0, lineWidth, 0], {
            stroke: pillar.color,
            strokeWidth: 4,
            left: x,
            top: y
          });

          // Add score label
          const scoreText = new Text(score.toString(), {
            left: x + lineWidth + 10,
            top: y - 15,
            fontSize: 28,
            fontFamily: 'Arial',
            fill: 'white',
            fontWeight: 'bold'
          });

          // Add category label
          const categoryText = new Text(category, {
            left: x,
            top: y + 10,
            fontSize: 20,
            fontFamily: 'Arial',
            fill: 'white'
          });

          // Add triangle marker
          const triangleSize = 8;
          const triangle = new Text('▲', {
            left: x + (lineWidth * score / 100) - triangleSize/2,
            top: y - triangleSize,
            fontSize: triangleSize * 2,
            fontFamily: 'Arial',
            fill: 'white'
          });

          canvas.add(line, scoreText, categoryText, triangle);
        });
      });

      canvas.renderAll();
      
      // Generate image with higher multiplier for better resolution
      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2
      });
      
      console.log('Image generated successfully');
      onImageGenerated(dataUrl);
      canvas.dispose();
    });

  }, [onImageGenerated, width, height, answers]);

  return (
    <canvas 
      ref={canvasRef}
      className="hidden"
    />
  );
};

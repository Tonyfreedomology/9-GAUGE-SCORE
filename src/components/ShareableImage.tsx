
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, Image, Line, Text, Rect } from "fabric";
import { calculateCategoryScore } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { fetchAssessmentData } from "@/lib/services/assessmentService";

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
  
  const { data: assessmentData } = useQuery({
    queryKey: ['assessment'],
    queryFn: fetchAssessmentData
  });

  useEffect(() => {
    if (!canvasRef.current || !assessmentData) return;

    console.log('Initializing canvas...');
    const canvas = new FabricCanvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#293230'
    });

    Image.fromURL(
      'https://static.wixstatic.com/media/af616c_22e0ac03919447c8adb4424b1dca5fce~mv2.jpg',
      {
        crossOrigin: 'anonymous',
        signal: new AbortController().signal
      }
    ).then((img) => {
      console.log('Background image loaded successfully');
      
      const scaleX = width / img.width!;
      const scaleY = height / img.height!;
      const scale = Math.min(scaleX, scaleY);
      
      img.set({
        scaleX: scale,
        scaleY: scale,
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0
      });
      
      canvas.backgroundImage = img;

      const pillars = [
        { name: 'HEALTH', color: '#EDB88B', categories: ['Mental', 'Physical', 'Environmental'] },
        { name: 'FINANCES', color: '#17BEBB', categories: ['Income', 'Independence', 'Impact'] },
        { name: 'RELATIONSHIPS', color: '#EF3E36', categories: ['Others', 'Self', 'God'] }
      ];

      const startY = 180;
      const lineWidth = 200;
      const pillarSpacing = 350;
      const categorySpacing = 100;
      const startX = (width - (pillarSpacing * 2 + lineWidth)) / 2;

      // Add panel backgrounds for each pillar
      pillars.forEach((pillar, pillarIndex) => {
        const x = startX + pillarIndex * pillarSpacing - 40; // Wider than content
        const panelWidth = lineWidth + 80; // Add padding
        const panelHeight = categorySpacing * 3 + 60; // Cover all categories plus padding
        
        // Add subtle panel background
        const panel = new Rect({
          left: x,
          top: startY - 20,
          width: panelWidth,
          height: panelHeight,
          rx: 8, // Rounded corners
          ry: 8,
          fill: 'rgba(255, 255, 255, 0.03)',
          stroke: 'rgba(255, 255, 255, 0.1)',
          strokeWidth: 1,
          shadow: new fabric.Shadow({
            color: 'rgba(0, 0, 0, 0.3)',
            blur: 15,
            offsetX: 0,
            offsetY: 4
          })
        });
        canvas.add(panel);
      });

      pillars.forEach((pillar, pillarIndex) => {
        const x = startX + pillarIndex * pillarSpacing;

        // Centered pillar title with Helvetica
        const titleWidth = 200; // Approximate width for centering
        const titleText = new Text(pillar.name.toLowerCase(), {
          left: x - (titleWidth - lineWidth) / 2,
          top: startY - 60,
          fontSize: 36,
          fontFamily: 'Helvetica',
          fill: 'white',
          fontWeight: 'bold',
          charSpacing: -50,
          width: titleWidth,
          textAlign: 'center',
          shadow: new fabric.Shadow({
            color: 'rgba(0, 0, 0, 0.5)',
            blur: 4,
            offsetX: 0,
            offsetY: 2
          })
        });
        canvas.add(titleText);

        pillar.categories.forEach((categoryName, categoryIndex) => {
          const y = startY + categoryIndex * categorySpacing;
          
          const category = assessmentData.find(c => 
            c.display_name.toLowerCase().includes(categoryName.toLowerCase())
          );
          
          const score = category 
            ? calculateCategoryScore(category.questions, answers)
            : 0;

          // Create gradient line effect
          const gradientLine = new Line([0, 0, lineWidth, 0], {
            stroke: pillar.color,
            strokeWidth: 4,
            left: x,
            top: y,
            shadow: new fabric.Shadow({
              color: `${pillar.color}40`,
              blur: 4,
              offsetX: 0,
              offsetY: 2
            })
          });

          // Score text with shadow
          const scoreText = new Text(score.toString(), {
            left: x + lineWidth + 10,
            top: y - 15,
            fontSize: 28,
            fontFamily: 'Helvetica',
            fill: 'white',
            fontWeight: 'bold',
            shadow: new fabric.Shadow({
              color: 'rgba(0, 0, 0, 0.5)',
              blur: 4,
              offsetX: 0,
              offsetY: 2
            })
          });

          // Category text with shadow
          const categoryText = new Text(categoryName, {
            left: x,
            top: y + 10,
            fontSize: 20,
            fontFamily: 'Avenir',
            fill: 'white',
            shadow: new fabric.Shadow({
              color: 'rgba(0, 0, 0, 0.5)',
              blur: 4,
              offsetX: 0,
              offsetY: 2
            })
          });

          const triangleSize = 8;
          const triangle = new Text('▲', {
            left: x + (lineWidth * score / 100) - triangleSize/2,
            top: y - triangleSize,
            fontSize: triangleSize * 2,
            fontFamily: 'Arial',
            fill: 'white',
            shadow: new fabric.Shadow({
              color: 'rgba(0, 0, 0, 0.3)',
              blur: 3,
              offsetX: 0,
              offsetY: 1
            })
          });

          canvas.add(gradientLine, scoreText, categoryText, triangle);
        });
      });

      canvas.renderAll();
      
      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2
      });
      
      console.log('Image generated successfully');
      onImageGenerated(dataUrl);
      canvas.dispose();
    });

  }, [onImageGenerated, width, height, answers, assessmentData]);

  return (
    <canvas 
      ref={canvasRef}
      className="hidden"
    />
  );
};

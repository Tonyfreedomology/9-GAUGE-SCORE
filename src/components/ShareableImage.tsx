import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, Image, Line, Text, Rect, Shadow } from "fabric";
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

      const startY = 70; // Moved up further from 120
      const lineWidth = 200;
      const pillarSpacing = 350;
      const categorySpacing = 100;
      const startX = (width - (pillarSpacing * 2 + lineWidth)) / 2 + 120; // Increased offset from 40 to 120
      const panelHeight = categorySpacing * 3;
      const headingOffset = 100;

      pillars.forEach((pillar, pillarIndex) => {
        const x = startX + pillarIndex * pillarSpacing - 40;
        const panelWidth = lineWidth + 80;
        
        // Add semi-transparent dark panel background
        const panel = new Rect({
          left: x,
          top: startY - 30,
          width: panelWidth,
          height: panelHeight + 20,
          rx: 12,
          ry: 12,
          fill: 'rgba(0, 0, 0, 0.9)', // Made panels even darker
          stroke: 'rgba(255, 255, 255, 0.1)',
          strokeWidth: 1,
          shadow: new Shadow({
            color: 'rgba(0, 0, 0, 0.5)',
            blur: 25,
            offsetX: 0,
            offsetY: 10
          })
        });
        canvas.add(panel);

        // Centered pillar title
        const pillarName = pillar.name.toLowerCase();
        const titleText = new Text(pillarName, {
          left: x + (panelWidth / 2),
          top: startY - headingOffset,
          fontSize: 42,
          fontFamily: 'Helvetica',
          fill: 'white',
          fontWeight: '800',
          charSpacing: -50,
          originX: 'center',
          textAlign: 'center',
          shadow: new Shadow({
            color: 'rgba(0, 0, 0, 0.6)',
            blur: 5,
            offsetX: 0,
            offsetY: 3
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
            strokeWidth: 6,
            left: x + 40,
            top: y + 5,
            shadow: new Shadow({
              color: `${pillar.color}60`,
              blur: 6,
              offsetX: 0,
              offsetY: 2
            })
          });

          // Score text with enhanced positioning
          const scoreText = new Text(score.toString(), {
            left: x + lineWidth + 50, // Moved even more right
            top: y - 15,
            fontSize: 32,
            fontFamily: 'Helvetica',
            fill: 'white',
            fontWeight: 'bold',
            originX: 'left',
            shadow: new Shadow({
              color: 'rgba(0, 0, 0, 0.6)',
              blur: 5,
              offsetX: 0,
              offsetY: 2
            })
          });

          // Category text
          const categoryText = new Text(categoryName, {
            left: x + 40,
            top: y - 25,
            fontSize: 22,
            fontFamily: 'Helvetica',
            fill: 'white',
            fontWeight: '600',
            shadow: new Shadow({
              color: 'rgba(0, 0, 0, 0.6)',
              blur: 4,
              offsetX: 0,
              offsetY: 2
            })
          });

          const triangleSize = 10;
          const triangle = new Text('▲', {
            left: x + 40 + (lineWidth * score / 100) - triangleSize/2,
            top: y - 4,
            fontSize: triangleSize * 2,
            fontFamily: 'Arial',
            fill: 'white',
            shadow: new Shadow({
              color: 'rgba(0, 0, 0, 0.4)',
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

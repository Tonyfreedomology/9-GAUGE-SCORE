
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, Image, Line, Text } from "fabric";
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
  
  // Fetch assessment data to get categories and questions
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

      pillars.forEach((pillar, pillarIndex) => {
        const x = startX + pillarIndex * pillarSpacing;

        const titleText = new Text(pillar.name, {
          left: x,
          top: startY - 60,
          fontSize: 36,
          fontFamily: 'Arial',
          fill: 'white',
          fontWeight: 'bold'
        });
        canvas.add(titleText);

        pillar.categories.forEach((categoryName, categoryIndex) => {
          const y = startY + categoryIndex * categorySpacing;
          
          // Find the matching category from assessment data
          const category = assessmentData.find(c => 
            c.display_name.toLowerCase().includes(categoryName.toLowerCase())
          );
          
          // Calculate score using the assessment service function
          const score = category 
            ? calculateCategoryScore(category.questions, answers)
            : 0;

          console.log(`Category: ${categoryName}, Score: ${score}`);

          const line = new Line([0, 0, lineWidth, 0], {
            stroke: pillar.color,
            strokeWidth: 4,
            left: x,
            top: y
          });

          const scoreText = new Text(score.toString(), {
            left: x + lineWidth + 10,
            top: y - 15,
            fontSize: 28,
            fontFamily: 'Arial',
            fill: 'white',
            fontWeight: 'bold'
          });

          const categoryText = new Text(categoryName, {
            left: x,
            top: y + 10,
            fontSize: 20,
            fontFamily: 'Arial',
            fill: 'white'
          });

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


import { Circle, Text, Shadow } from "fabric";

type OverallScoreRingProps = {
  score: number;
  centerX: number;
  centerY: number;
};

export const createOverallScoreRing = ({ score, centerX, centerY }: OverallScoreRingProps) => {
  const elements = [];
  const radius = 70;

  // Create softer glow effect with transparent circles
  const glowColors = [
    'rgba(23, 190, 187, 0.08)',
    'rgba(23, 190, 187, 0.06)',
    'rgba(23, 190, 187, 0.04)'
  ];

  glowColors.forEach((color, index) => {
    const glowRadius = radius + (index * 4);
    const glowRing = new Circle({
      left: centerX - glowRadius,
      top: centerY - glowRadius,
      radius: glowRadius,
      fill: 'transparent',
      stroke: color,
      strokeWidth: 15,
      strokeDashArray: [Math.PI * glowRadius * 2],
      strokeDashOffset: Math.PI * glowRadius * 2 * (1 - score / 100),
    });
    elements.push(glowRing);
  });

  // Background circle (gray ring)
  const backgroundCircle = new Circle({
    left: centerX - radius,
    top: centerY - radius,
    radius: radius,
    fill: 'transparent',
    stroke: 'rgba(255,255,255,0.2)',
    strokeWidth: 8,
  });
  elements.push(backgroundCircle);

  // Score circle (foreground ring)
  const scoreCircle = new Circle({
    left: centerX - radius,
    top: centerY - radius,
    radius: radius,
    fill: 'transparent',
    stroke: '#17BEBB',
    strokeWidth: 8,
    strokeDashArray: [Math.PI * radius * 2],
    strokeDashOffset: Math.PI * radius * 2 * (1 - score / 100),
  });
  elements.push(scoreCircle);

  // Score text - adjusted positioning and added textAlign
  const scoreText = new Text(Math.round(score).toString(), {
    left: centerX + 4,
    top: centerY + 6,
    fontSize: 72, // Increased from 48 to 72 (50% larger)
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fill: 'white',
    originX: 'center',
    originY: 'center',
    textAlign: 'center',
    shadow: new Shadow({
      color: 'rgba(23, 190, 187, 0.5)',
      blur: 15,
      offsetX: 0,
      offsetY: 0
    })
  });
  elements.push(scoreText);

  return elements;
};

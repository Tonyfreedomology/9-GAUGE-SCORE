
import { Circle, Text, Shadow } from "fabric";

type OverallScoreRingProps = {
  score: number;
  centerX: number;
  centerY: number;
};

export const createOverallScoreRing = ({ score, centerX, centerY }: OverallScoreRingProps) => {
  const elements = [];
  const radius = 70;

  // Add glow effect with multiple rings
  [16, 12, 8].forEach(strokeWidth => {
    const glowRing = new Circle({
      left: centerX - radius,
      top: centerY - radius,
      radius: radius,
      fill: 'transparent',
      stroke: 'rgba(23, 190, 187, 0.15)',
      strokeWidth: strokeWidth,
      strokeDashArray: [Math.PI * radius * 2],
      strokeDashOffset: Math.PI * radius * 2 * (1 - score / 100),
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

  // Score text
  const scoreText = new Text(Math.round(score).toString(), {
    left: centerX,
    top: centerY,
    fontSize: 48,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fill: 'white',
    originX: 'center',
    originY: 'center',
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


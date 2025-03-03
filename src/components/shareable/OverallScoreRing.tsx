
import { Circle, Text, Shadow } from "fabric";

type OverallScoreRingProps = {
  score: number;
  centerX: number;
  centerY: number;
};

export const createOverallScoreRing = ({ score, centerX, centerY }: OverallScoreRingProps) => {
  const elements = [];
  const radius = 70;

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
    stroke: '#22DFDC',
    strokeWidth: 8,
    strokeDashArray: [Math.PI * radius * 2],
    strokeDashOffset: Math.PI * radius * 2 * (1 - score / 100),
    shadow: new Shadow({
      color: 'rgba(35, 241, 238, 0.5)',
      blur: 15,
      offsetX: 0,
      offsetY: 0
    })
  });
  elements.push(scoreCircle);

  // Score text - adjusted positioning and added textAlign
  const scoreText = new Text(Math.round(score).toString(), {
    left: centerX + 4,
    top: centerY + 6,
    fontSize: 72,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fill: 'white',
    originX: 'center',
    originY: 'center',
    textAlign: 'center',
    shadow: new Shadow({
      color: 'rgba(35, 241, 238, 0.5)',
      blur: 15,
      offsetX: 0,
      offsetY: 0
    })
  });
  elements.push(scoreText);

  return elements;
};

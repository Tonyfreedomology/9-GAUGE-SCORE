
import { Line, Text, Shadow } from "fabric";

type ScoreRowProps = {
  categoryName: string;
  score: number;
  x: number;
  y: number;
  lineWidth: number;
  color: string;
};

export const createScoreRow = ({
  categoryName,
  score,
  x,
  y,
  lineWidth,
  color
}: ScoreRowProps) => {
  const elements = [];

  // Create gradient line with new colors
  const gradientLine = new Line([0, 0, lineWidth, 0], {
    stroke: color,
    strokeWidth: 6,
    left: x + 40,
    top: y + 5,
    shadow: new Shadow({
      color: `${color}60`,
      blur: 6,
      offsetX: 0,
      offsetY: 2
    })
  });
  elements.push(gradientLine);

  // Score text - moved down to -10
  const scoreText = new Text(score.toString(), {
    left: x + lineWidth + 55,
    top: y - 10,
    fontSize: 25,
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
  elements.push(scoreText);

  // Category text
  const categoryText = new Text(categoryName, {
    left: x + 40,
    top: y - 25,
    fontSize: 22,
    fontFamily: 'Avenir',
    fill: 'white',
    fontWeight: '400',
    shadow: new Shadow({
      color: 'rgba(0, 0, 0, 0.6)',
      blur: 4,
      offsetX: 0,
      offsetY: 2
    })
  });
  elements.push(categoryText);

  // Triangle indicator
  const triangleSize = 10;
  const triangle = new Text('▲', {
    left: x + 40 + (lineWidth * score / 100) - triangleSize/2,
    top: y + 8,
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
  elements.push(triangle);

  return elements;
};

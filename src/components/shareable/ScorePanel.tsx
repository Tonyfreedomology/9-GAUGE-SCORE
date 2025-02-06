
import { Rect, Shadow } from "fabric";

type ScorePanelProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const createScorePanel = ({ x, y, width, height }: ScorePanelProps) => {
  return new Rect({
    left: x - 20, // Split the difference between original and previous adjustment
    top: y,
    width,
    height,
    rx: 12,
    ry: 12,
    fill: 'rgba(0, 0, 0, 0.4)', // Reduced opacity
    stroke: 'rgba(255, 255, 255, 0.1)',
    strokeWidth: 1,
    shadow: new Shadow({
      color: 'rgba(0, 0, 0, 0.5)',
      blur: 25,
      offsetX: 0,
      offsetY: 10
    })
  });
};


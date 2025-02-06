
import { Text, Shadow } from "fabric";

type PillarTitleProps = {
  text: string;
  x: number;
  y: number;
  panelWidth: number;
};

export const createPillarTitle = ({ text, x, y, panelWidth }: PillarTitleProps) => {
  return new Text(text.toLowerCase(), {
    left: x + (panelWidth / 2),
    top: y,
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
};

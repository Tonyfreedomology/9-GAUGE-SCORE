import { Text } from "fabric";

type TextElementProps = {
  text: string;
  options: fabric.ITextOptions;
};

export const createTextElement = ({ text, options }: TextElementProps): Text => {
  return new Text(text, {
    fontFamily: "League Spartan",
    originX: "center",
    textAlign: "center",
    ...options
  });
};
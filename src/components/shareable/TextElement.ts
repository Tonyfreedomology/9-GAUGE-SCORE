import { Text, TOptions } from "fabric";

type TextElementProps = {
  text: string;
  options: TOptions<Text>;
};

export const createTextElement = ({ text, options }: TextElementProps): Text => {
  return new Text(text, {
    fontFamily: "League Spartan",
    originX: "center",
    textAlign: "center",
    ...options
  });
};
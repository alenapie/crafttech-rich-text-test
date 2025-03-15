export enum TOOL {
  MOVE = "move",
  DRAW = "draw",
}

export type Figure = {
  id: string;
  x: number;
  y: number;
  type: "rect";
  text: string;
};

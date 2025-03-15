import { KonvaEventObject } from "konva/lib/Node";
import { FC, useState } from "react";
import { Layer, Stage } from "react-konva";
import { Figure, TOOL } from "../../types";
import Shape from "../shape/Shape";

type Props = {
  tool: TOOL;
};

export const Canvas: FC<Props> = ({ tool }) => {
  const [figures, setFigures] = useState<Figure[]>([]);

  const handleOnClick = (e: KonvaEventObject<MouseEvent>) => {
    if (tool === TOOL.MOVE) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const point = stage.getPointerPosition();
    const stageOffset = stage.absolutePosition();

    if (!point) return;

    setFigures((prev: Figure[]) => [
      ...prev,
      {
        id: Date.now().toString(36),
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
        type: "rect",
        text: "Введите текст",
      },
    ]);
  };

  const handleAddText = (id: string) => (text: string) => {
    setFigures((prev: Figure[]) =>
      prev.map((figure: Figure) => {
        if (figure.id === id) {
          return { ...figure, text };
        }
        return figure;
      })
    );
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
      onClick={handleOnClick}
    >
      <Layer>
        {figures.map((figure) => (
          <Shape
            id={figure.id}
            key={figure.id}
            x={figure.x}
            y={figure.y}
            tool={tool}
            text={figure.text}
            onSave={handleAddText(figure.id)}
          />
        ))}
      </Layer>
    </Stage>
  );
};

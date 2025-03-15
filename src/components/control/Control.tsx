import { FC } from "react";
import { TOOL } from "../../types";

type Props = {
  tool: string;
  onChangeTool: (value: TOOL) => void;
};

export const Control: FC<Props> = ({ tool, onChangeTool }) => {
  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTool(value as TOOL);
  };

  return (
    <div style={{ position: "absolute", top: 0 }}>
      <div>
        <input
          type="radio"
          id="move"
          name="move"
          value="move"
          checked={tool === "move"}
          onChange={handleOnChange}
        />
        <label htmlFor="move">Взаимодействие</label>
      </div>

      <div>
        <input
          type="radio"
          id="draw"
          name="control"
          value="draw"
          checked={tool === "draw"}
          onChange={handleOnChange}
        />
        <label htmlFor="draw">Добавление</label>
      </div>
    </div>
  );
};

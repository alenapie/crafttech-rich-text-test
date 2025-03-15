import Konva from "konva";
import { FC, MutableRefObject, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { Html } from "react-konva-utils";
import { TOOL } from "../../types";
import { EditField } from "../editField/EditField";
import html2canvas from "html2canvas";
import HtmlText from "../htmlText/HtmlText";

const width = 100;
const height = 100;

type Props = {
  x: number;
  y: number;
  tool: TOOL;
  text: string;
  id: string;
  onSave: (text: string) => void;
};

const Shape: FC<Props> = ({ x, y, tool, text, onSave, id }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const groupRef = useRef<Konva.Group>(null);
  const htmlRef = useRef<HTMLDivElement>(null);
  const imageRef: MutableRefObject<Konva.Image | null> = useRef(null);

  const renderImage = async () => {
    const htmltext = htmlRef.current;

    if (!htmltext || !text) {
      return;
    }

    const canvas = await html2canvas(htmltext, {
      backgroundColor: "transparent",
    });

    const shape = new Konva.Image({
      x: 0,
      y: height / 2,
      scaleX: 1 / window.devicePixelRatio,
      scaleY: 1 / window.devicePixelRatio,
      image: canvas,
    });
    console.log(shape);
    groupRef.current?.add(shape);
    imageRef.current = shape;
  };

  const handleClick = () => {
    if (tool === TOOL.DRAW) {
      return;
    }

    setIsEditing((prev) => !prev);

    if (!imageRef.current) {
      return;
    }

    if (isEditing) {
      imageRef.current.show();
    } else {
      imageRef.current.destroy();
    }
  };

  const handleEditSave = (html: string) => {
    setIsEditing(false);
    onSave(html);

    if (htmlRef.current) {
      htmlRef.current.innerHTML = html;
      renderImage();
    }
  };

  return (
    <Group x={x} y={y} ref={groupRef} draggable={tool === TOOL.MOVE}>
      <Rect
        onClick={handleClick}
        onTap={handleClick}
        fill="transparent"
        stroke="black"
        width={width}
        height={height}
      />

      {isEditing && (
        <Html>
          <div>
            <EditField text={text} onSave={handleEditSave} />
          </div>
        </Html>
      )}

      <Html>
        <HtmlText ref={htmlRef} id={id} />
      </Html>
    </Group>
  );
};

export default Shape;

import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faBold,
  faChevronDown,
  faChevronUp,
  faHighlighter,
  faItalic,
  faStrikethrough,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { DraftBlockType, EditorState, RichUtils } from "draft-js";

import s from "./styles.module.scss";

const tools = [
  {
    label: "bold",
    style: "BOLD",
    icon: <FontAwesomeIcon icon={faBold} />,
    method: "inline",
  },
  {
    label: "italic",
    style: "ITALIC",
    icon: <FontAwesomeIcon icon={faItalic} />,
    method: "inline",
  },
  {
    label: "underline",
    style: "UNDERLINE",
    icon: <FontAwesomeIcon icon={faUnderline} />,
    method: "inline",
  },
  {
    label: "highlight",
    style: "HIGHLIGHT",
    icon: <FontAwesomeIcon icon={faHighlighter} />,
    method: "inline",
  },
  {
    label: "strike-through",
    style: "STRIKETHROUGH",
    icon: <FontAwesomeIcon icon={faStrikethrough} />,
    method: "inline",
  },
  {
    label: "Uppercase",
    style: "UPPERCASE",
    icon: <FontAwesomeIcon icon={faChevronUp} transform="grow-3" />,
    method: "inline",
  },
  {
    label: "lowercase",
    style: "LOWERCASE",
    icon: <FontAwesomeIcon icon={faChevronDown} transform="grow-3" />,
    method: "inline",
  },
  {
    label: "Left",
    style: "leftAlign",
    icon: <FontAwesomeIcon icon={faAlignLeft} transform="grow-2" />,
    method: "block",
  },
  {
    label: "Center",
    style: "centerAlign",
    icon: <FontAwesomeIcon icon={faAlignCenter} transform="grow-2" />,
    method: "block",
  },
  {
    label: "Right",
    style: "rightAlign",
    icon: <FontAwesomeIcon icon={faAlignRight} transform="grow-2" />,
    method: "block",
  },
];

type Props = {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
};

const Toolbar: FC<Props> = ({ editorState, setEditorState }) => {
  const applyStyle = (e: Event, style: DraftBlockType, method: string) => {
    e.preventDefault();

    if (method === "block") {
      setEditorState(RichUtils.toggleBlockType(editorState, style));
      return;
    }

    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = (style: DraftBlockType, method: string) => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  return (
    <div className={s.toolbar}>
      {tools.map((item, idx) => (
        <button
          style={{
            color: isActive(item.style, item.method)
              ? "rgba(0, 0, 0, 1)"
              : "rgba(0, 0, 0, 0.3)",
          }}
          key={`${item.label}-${idx}`}
          title={item.label}
          onClick={(e) => applyStyle(e, item.style, item.method)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {item.icon || item.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;

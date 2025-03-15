import {
  ContentBlock,
  ContentState,
  convertFromHTML,
  convertFromRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import { FC, useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar";

import s from "./styles.module.scss";
import { styleMap } from "./constants";
import { stateToHTML } from "draft-js-export-html";

type Props = {
  text?: string;
  onSave: (value: string) => void;
};

const myBlockStyleFn = (contentBlock: ContentBlock): string => {
  const type = contentBlock.getType();
  switch (type) {
    case "blockQuote":
      return "superFancyBlockquote";
    case "leftAlign":
      return "leftAlign";
    case "rightAlign":
      return "rightAlign";
    case "centerAlign":
      return "centerAlign";
    case "justifyAlign":
      return "justifyAlign";
    default:
      return "";
  }
};

export const EditField: FC<Props> = ({ text = "", onSave }) => {
  const blocksFromHTML = convertFromHTML(text);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(contentState)
  );

  const getHTML = (): string => {
    const contentState = editorState.getCurrentContent();
    return stateToHTML(contentState);
  };

  const handleSave = () => {
    const htmlContent = getHTML();
    onSave(htmlContent);
  };

  const editor = useRef<Editor>(null);

  const focusEditor = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  useEffect(() => {
    focusEditor();

    // return () => onSave("");
  }, []);

  return (
    <div className={s.wrapper} onClick={focusEditor}>
      <Toolbar editorState={editorState} setEditorState={setEditorState} />
      <Editor
        ref={editor}
        placeholder="Введите текст:"
        handleKeyCommand={handleKeyCommand}
        editorState={editorState}
        customStyleMap={styleMap}
        blockStyleFn={myBlockStyleFn}
        onChange={setEditorState}
      />
      <button onClick={handleSave} style={{ marginTop: "10px" }}>
        Сохранить
      </button>
    </div>
  );
};

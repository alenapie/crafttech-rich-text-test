import { forwardRef, Ref } from "react";

const HtmlText = forwardRef(
  ({ id }: { id: string }, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        id={`htmltext_${id}`}
        style={{
          position: "fixed",
          overflow: "hidden",
          left: "100000px",
          top: "100000px",
        }}
        ref={ref}
      ></div>
    );
  }
);

export default HtmlText;

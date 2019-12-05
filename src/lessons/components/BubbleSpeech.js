import React from "react";

export default function BubbleSpeech(props) {
  return (
    <div
      style={{
        position: props.position,
        width: props.width,
        height: props.height,
        left: props.left,
        border: `2px solid ${props.borderColor || "black"}`,
        padding: "1px",
        background: props.background || "",
        WebkitBorderRadius: props.borderRadius,
        MozBorderRadius: props.borderRadius,
        borderRadius: props.borderRadius,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        "&:after": {
          content: "",
          position: "absolute",
          borderStyle: "solid",
          borderWidth: "20px 0 20px 20px",
          borderColor: "transparent #CF5858",
          display: "block",
          width: "0",
          zIndex: "1",
          right: "-20px",
          top: "43px"
        }
      }}
    >
      {typeof props.content === "object"
        ? props.content.map((item, i) => (
            <li key={i} style={{ listStyleType: "none" }}>
              <strong>{i + 1}.</strong> {item}
            </li>
          ))
        : props.content}
    </div>
  );
}

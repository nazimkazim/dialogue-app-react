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
        webkitBorderRadius: props.borderRadius,
        mozBorderRadius: props.borderRadius,
        borderRadius: props.borderRadius,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
      }}
    >
      {props.content}
    </div>
  );
}

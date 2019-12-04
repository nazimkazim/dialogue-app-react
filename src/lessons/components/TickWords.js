import React from "react";
//import styled from "styled-components";
import { Checkbox } from "semantic-ui-react";

export default function TickWords(props) {
  console.log(props);

  return (
    <ul
      style={{
        listStyleType: "none",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: "15px"
      }}
    >
      {props.list &&
        props.list.map((item, i) => (
          <li
            key={i}
            style={{
              minWidth: "300px",
              minHeight: "10px",
              /* backgroundColor: "blue", */
              marginTop: "5px",
              display: "flex"
            }}
          >
            <span>
              <Checkbox
                style={{
                  display: "flex",
                  marginTop: "2px"
                }}
              />
            </span>{" "}
            <span
              style={{
                marginLeft: "10px",
                display: "flex"
              }}
            >
              {item}
            </span>
          </li>
        ))}
    </ul>
  );
}

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  min-height: 150px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  border-right: 2px solid green;
  border-top: 2px solid green;
`;

const List = styled.ul`
  margin-left: 30px;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 400;
`;

export default function SideNote(props) {
  //console.log(props.aims);
  const notes =
    typeof props.notes === "object"
      ? props.notes.map((note, i) => (
          <li key={i} style={{ listStyleType: "none" }}>
            {note}
          </li>
        ))
      : props.notes;
  return (
    <Container>
      <List>{notes}</List>
    </Container>
  );
}

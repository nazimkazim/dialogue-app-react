import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  min-height: 150px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  border-right: 2px solid green;
`;

const Plate = styled.span`
  width: 100%;
  height: 30px;
  display: block;
  display: flex;
  padding-left: 10px;
  align-items: center;
  background: green;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const Li = styled.ul`
  margin-left: 30px;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 400;
`;

export default function AimsComponent(props) {
  //console.log(props.aims);
  return (
    <Container>
      <Plate>In this lesson</Plate>
      <Li>
        {props.aims && props.aims.map((aim, i) => <li key={i}>{aim}</li>)}
      </Li>
    </Container>
  );
}

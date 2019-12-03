import React from "react";
import styled from "styled-components";

const Container = styled.div`
  color: #fff;
  width: 100%;
  min-height: 150px;
  align-items: center;
`;

const H1 = styled.span`
  font-size: 60px;
  margin-top: 10px;
  padding: 10px;
  display: block;
  color: white;
  font-weight: bold;
`;

const Plate = styled.span`
  font-size: 30px;
  color: white;
  font-weight: 300;
  display: block;
  margin-top: 10px;
  margin-top: 10px;
  padding: 10px;
`;

export default function Banner(props) {
  return (
    <Container style={{ background: props.color }}>
      <H1>{props.number}</H1>
      <Plate>{props.name}</Plate>
    </Container>
  );
}

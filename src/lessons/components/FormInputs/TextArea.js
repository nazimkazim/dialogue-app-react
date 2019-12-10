import React from "react";
import { Form } from "semantic-ui-react";

export default function TextArea() {
  return (
    <Form>
      <Form.TextArea width={8} placeholder="Write your answer here" />
      <Form.Group>
        <Form.Button>Submit answer</Form.Button>
        <Form.Button>Go to Forum</Form.Button>
      </Form.Group>
    </Form>
  );
}

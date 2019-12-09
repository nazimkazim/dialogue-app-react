import React, { Component } from "react";
import { Checkbox, Label } from "semantic-ui-react";

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleInstruction: true
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      toggleInstruction: !prevState.toggleInstruction
    }));
  }
  render() {
    return (
      <>
        {this.props.label ? (
          <Label>
            {this.state.toggleInstruction
              ? this.props.engInstruction
              : this.props.rusInstruction}
          </Label>
        ) : (
          <span>
            {this.state.toggleInstruction
              ? this.props.engInstruction
              : this.props.rusInstruction}
          </span>
        )}

        <span style={{ display: "block", marginTop: "5px" }}>
          <Checkbox slider onClick={this.toggle} />
        </span>
      </>
    );
  }
}

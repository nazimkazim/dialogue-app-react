import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class ButtonComponent extends Component {
  constructor(props) {
    super(props);
    this.handleTextShow = this.handleTextShow.bind(this);
  }

  handleTextShow(evt) {
    this.props.showText(evt);
  }
  render() {
    return (
      <React.Fragment>
        <Button color="twitter" size="big" style={{marginBottom:this.props.margin}} onClick={this.handleTextShow}>
          show text
        </Button>
      </React.Fragment>
    );
  }
}

export default ButtonComponent;

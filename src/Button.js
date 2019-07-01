import React, { Component } from 'react';

class Button extends Component {
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
        <button className="grow_box" onClick={this.handleTextShow}>
          show text
        </button>
      </React.Fragment>
    );
  }
}

export default Button;

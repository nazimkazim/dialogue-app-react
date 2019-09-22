import React, { Component } from 'react'
import {Checkbox, Segment} from 'semantic-ui-react'

export default class Instructions extends Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     toggleInstruction: true
                   };
                   this.toggle = this.toggle.bind(this)
                 }

                 toggle() {
                   this.setState(prevState => ({
                     toggleInstruction: !prevState.toggleInstruction
                   }));
                 }
                 render() {
                   return (
                     <div>
                       {this.state.toggleInstruction
                         ? this.props.engInstruction
                         : this.props.rusInstruction}
                       <Segment compact>
                         <Checkbox slider onClick={this.toggle} />
                       </Segment>
                     </div>
                   );
                 }
               }

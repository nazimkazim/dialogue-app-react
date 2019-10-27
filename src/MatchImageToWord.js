import React, { Component } from "react";
import { Grid, Image, Segment, List, Input } from "semantic-ui-react";

class MatchImageToWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      set: [],
      inputAnswer: "",
      score: 0
    };
  }

  componentDidMount() {
    //console.log(this.props);
    this.setState({
      set: this.props
    });
  }
  render() {
    //console.log(this.state.set.lines);
    const data =
      this.state.set.lines &&
      this.state.set.lines.map(item =>
        item.parts.map(i => (
          <Grid.Column>
            <Segment>
              <Image
                src={i.image}
                label={{
                  as: "a",
                  color: "blue",
                  content: `${i.id}`,
                  icon: "clone",
                  ribbon: true
                }}
              />
            </Segment>
          </Grid.Column>
        ))
      );

    const words =
      this.state.set.lines &&
      this.state.set.lines.map(item =>
        item.parts.map(i => (
          <List.Item>
            {i.word}
            <Input />
          </List.Item>
        ))
      );
    //console.log(data);
    return (
      <Grid>
        <Grid.Column width={4}>
          <List>{words}</List>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid>
            <Grid.Row relaxed columns={4}>
              {data}
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

export default MatchImageToWord;

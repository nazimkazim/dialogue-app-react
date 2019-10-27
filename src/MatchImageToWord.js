import React, { Component } from "react";
import { Grid, Image, Segment, List, Input } from "semantic-ui-react";
const _ = require("lodash");

class MatchImageToWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      set: [],
      shuffledWords: [],
      inputAnswer: "",
      score: 0
    };
  }

  componentDidMount() {
    //console.log(this.props);

    const shuffledWords = this.props.lines.map(item => {
      return item.parts.map(i => {
        return {
          word: i.word,
          id: i.id
        };
      });
    });

    //console.log(shuffledWords);
    this.setState({
      set: this.props,
      shuffledWords: _.shuffle(shuffledWords[0])
    });
  }
  render() {
    //console.log(this.state.set.lines);
    console.log(this.state.shuffledWords);
    const data =
      this.state.set.lines &&
      this.state.set.lines.map(item =>
        item.parts.map(i => (
          <Grid.Column key={i.id}>
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
          <List.Item key={i.word}>
            <span style={{ display: "inline", marginRight: "5px" }}>
              {i.word}
            </span>
            <Input style={{ width: "40px" }} />
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
            <Grid.Row relaxed="true" columns={4}>
              {data}
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

export default MatchImageToWord;

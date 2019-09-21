import React, { Component } from "react";
import { MdDoneAll } from "react-icons/md";
import { Grid, List, Button, Input } from "semantic-ui-react";
const uuidv1 = require("uuid/v1");

export default class DialogueShuffleFrame2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffledArray: [],
      inputAnswer: "",
      score: 0
    };
    this.writeSomething = this.writeSomething.bind(this);
  }

  componentDidMount() {
    const shuffle = a => {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    };

    let shuffledArray =
      this.props.lines[0].parts &&
      this.props.lines[0].parts.map(obj => {
        return {
          id: uuidv1(),
          parts: {
            speaker: obj.speaker,
            words: shuffle(obj.words.split(" ")),
            showTick: false,
            isDisabled: false
          },
          correctAnswer: obj.words
        };
      });

    this.setState({
      shuffledArray
    });
  }

  writeSomething(e) {
    e.preventDefault();
    this.setState({
      inputAnswer: e.target.value
    });
  }

  checkLines(str, obj) {
    obj.map(item => {
      //console.log(item.correctAnswer)
      if (item.correctAnswer === str.trim()) {
        //console.log('correct')
        this.setState({
          score: this.state.score + 80,
          inputAnswer: ""
        });
        item.parts.showTick = true;
        item.parts.isDisabled = true;
      }
      return true;
    });
  }

  render() {
    //console.log(this.state.shuffledArray);
    const shuffles =
      this.state.shuffledArray &&
      this.state.shuffledArray.map(item => (
        <List.Item key={item.id}>
          <List.Content floated="right">
            <Button
              color="primary"
              disabled={item.parts.isDisabled}
              onClick={() => {
                this.checkLines(
                  this.state.inputAnswer,
                  this.state.shuffledArray
                );
              }}
              size="small"
            >
              Check
            </Button>
          </List.Content>
          <List.Content>{item.parts.speaker}</List.Content>
          <List.Content>
            <Input
              onChange={this.writeSomething}
              disabled={item.parts.isDisabled}
            />
          </List.Content>

          {item.parts.showTick && <MdDoneAll style={{ color: "blue" }} />}

          {item.parts.words.map((word, index) => (
            <span key={index}>{`${word} `}</span>
          ))}
        </List.Item>
      ));
    return (
      <Grid textAlign="right" columns={12}>
        <Grid.Row>
          <Grid.Column>
            <List divided verticalAlign="middle">
              {shuffles}
            </List>
            {this.state.score}
          </Grid.Column>
          
        </Grid.Row>
      </Grid>
    );
  }
}

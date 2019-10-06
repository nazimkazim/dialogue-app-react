import React, { Component } from "react";
import {
  Grid,
  Image,
  Button,
  Input,
  Card,
  Label,
  Icon,
  Statistic,
  Sticky
} from "semantic-ui-react";
const uuidv1 = require("uuid/v1");

export default class RiddleWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffledWord: [],
      inputAnswer: "",
      score: 0
    };
    this.writeSomething = this.writeSomething.bind(this);
    this.checkLines = this.checkLines.bind(this);
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

    const isMultipleWord = str => {
      const splitWord = str.split(" ");
      console.log(splitWord);
      if (splitWord.length > 1) {
        return true;
      }
    };

    let shuffledWord =
      this.props.lines[0].parts &&
      this.props.lines[0].parts.map(obj => {
        return {
          id: uuidv1(),
          parts: {
            word: isMultipleWord(obj.wordToRiddle)
              ? shuffle(obj.wordToRiddle.split(" "))
              : shuffle(obj.wordToRiddle.split("")),
            definition: obj.definition,
            showTick: false,
            isDisabled: false
          },
          correctAnswer: obj.wordToRiddle
        };
      });

    this.setState({
      shuffledWord
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
        console.log("correct");
        this.setState({
          score: this.state.score + 80,
          inputAnswer: ""
        });
        item.parts.showTick = true;
        item.parts.isDisabled = true;
      }
      return true;
    });
    console.log(obj, str);
  }

  render() {
    const shuffledWord =
      this.state.shuffledWord &&
      this.state.shuffledWord.map(item => (
        <div key={item.id}>
          {item.parts.word &&  (
            <span>{item.parts.word.map((w, index)=> (
                <Label key={index} color='yellow'>{w}{" "}</Label>
            ))}</span>
          )}
          {"-"}
          {item.parts.definition && <span>{item.parts.definition}</span>}
          <Input
            onChange={this.writeSomething}
            disabled={item.parts.isDisabled}
          />
          <Button
            color="twitter"
            size="big"
            disabled={item.parts.isDisabled}
            onClick={() => {
              this.checkLines(this.state.inputAnswer, this.state.shuffledWord);
            }}
          >
            {item.parts.showTick ? <Icon name="thumbs up outline" /> : "Check"}
          </Button>
        </div>
      ));
    //console.log(this.state.shuffledWord)
    return (
      <div>
        {this.state.score} {shuffledWord}
      </div>
    );
  }
}

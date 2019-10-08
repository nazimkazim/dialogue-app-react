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
import axios from "axios";
import Instructions from "./Instructions";
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
    const getTranslations = word => {
      const set = [];
      axios
        .get(
          `https://api.mymemory.translated.net/get?q=${word}&langpair=en|rus`
        )
        .then(res => {
          return res.data.matches.length > 0
            ? res.data.matches.map(item => {
                set.push(item.translation);
              })
            : res.data.matches.translation;
        });
      return set;
    };

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
      //console.log(splitWord);
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
            definitionWordsTtranslated: obj.definition.split(" ").map(word => {
              return {
                targetWord: word,
                translatedWord: getTranslations(word)
              };
            }),
            showTick: false,
            isDisabled: false
          },
          correctAnswer: obj.wordToRiddle
        };
      });

    console.log(shuffledWord);

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
          {item.parts.word && (
            <span>
              {item.parts.word.map((w, index) => (
                <Label key={index} color="yellow">
                  {w}{" "}
                </Label>
              ))}
            </span>
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
        <Instructions
          engInstruction="Write a verb without to"
          rusInstruction="Напишите глагол без to"
        />
        {this.state.score} {shuffledWord}
      </div>
    );
  }
}

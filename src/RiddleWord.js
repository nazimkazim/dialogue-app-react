import React, { Component } from "react";
import {
  Grid,
  Image,
  Button,
  Input,
  Popup,
  Label,
  Icon,
  List,
  Modal,
  Statistic,
  Sticky,
  Segment,
  Checkbox
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
      score: 0,
      turnedPrompts: false,
      modalOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.writeSomething = this.writeSomething.bind(this);
    this.checkLines = this.checkLines.bind(this);
    this.formatString = this.formatString.bind(this);
  }

  componentDidMount() {
    const getTranslations = word => {
      const set = [];
      const keyAPI =
        "trnsl.1.1.20191009T070833Z.ae8dcd5c86e84378.31b471ecd7adf0d1bc0e20b4405abd6c1af7dc17";
      axios
        .get(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyAPI}&text=${word}&lang=ru`
        )
        .then(res => {
          //console.log(res.data.text);

          const words =
            res.data.text.length > 0
              ? res.data.text.map(item => {
                  return isRussianWord(item.toLowerCase())
                    ? set.push(item.toLowerCase())
                    : set.push("");
                })
              : res.data.text;
          return words;
        });
      return set;
    };

    const isRussianWord = word => {
      var rforeign = /[а-яА-ЯЁё]/;
      if (rforeign.test(word)) {
        return true;
      } else {
        return false;
      }
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
          correctAnswer: isMultipleWord(obj.wordToRiddle)
            ? obj.wordToRiddle.split(" ")
            : obj.wordToRiddle.split("")
        };
      });

    console.log(shuffledWord);

    this.setState({
      shuffledWord
    });
  }

  formatString(obj) {
    return obj.map(item => (
      <>
        <span style={{ position: "relative" }}>
          {item.targetWord && (
            <Popup
              trigger={
                <span
                  style={{
                    borderBottom: "2px grey dashed",
                    cursor: "pointer",
                    marginRight: "0.5em"
                  }}
                  name={item.targetWord}
                >
                  {item.targetWord}
                </span>
              }
              content={
                item.translatedWord &&
                item.translatedWord.map(
                  (w, i) =>
                    this.state.turnedPrompts && (
                      <List.Item key={i}>{w}</List.Item>
                    )
                )
              }
              position="top left"
            />
          )}
        </span>{" "}
      </>
    ));
  }

  writeSomething(e) {
    e.preventDefault();
    this.setState({
      inputAnswer: e.target.value
    });
  }

  toggle() {
    this.setState(prevState => ({
      turnedPrompts: !prevState.turnedPrompts
    }));
  }

  showLetter(e) {
    console.log(e.target.childNodes[0].className === "hidden");
    if (e.target.childNodes[0].className === "hidden") {
      e.target.childNodes[0].classList.remove("hidden");
    } else {
      console.log("the letter is alreay shown");
    }
    console.log(e.target.childNodes[0].className);
  }

  checkLines(str, obj) {
    obj.map(item => {
      //console.log(item.correctAnswer)
      if (
        item.correctAnswer.join(" ") === str.trim() ||
        item.correctAnswer.join("") === str.trim()
      ) {
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
          <br></br>
          {item.correctAnswer && (
            <span>
              {item.correctAnswer.map((w, index) => (
                <Label
                  key={index}
                  color="blue"
                  style={{ minHeight: "20px" }}
                  onClick={this.showLetter}
                >
                  <span className="hidden">{w} </span>
                </Label>
              ))}
            </span>
          )}
          {"-"}
          {item.parts.definitionWordsTtranslated && (
            <span>
              {this.formatString(item.parts.definitionWordsTtranslated)}
            </span>
          )}
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
            {item.parts.showTick ? (
              <Icon color="red" name="thumbs up outline" />
            ) : (
              "Check"
            )}
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
        <div>
          {!this.state.turnedPrompts ? "prompts are off" : "prompts are on"}
        </div>
        <Checkbox slider onClick={this.toggle} />
        {this.state.score} {shuffledWord}
      </div>
    );
  }
}

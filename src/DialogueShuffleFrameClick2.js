import React, { Component } from "react";
import { Button } from "react-bulma-components/full";
import { MdDoneAll } from "react-icons/md";
const uuidv1 = require("uuid/v1");


export default class DialogueShuffleFrame2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffledArray: [],
      inputAnswer: "",
      score:0
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
            showTick:false
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
                score:this.state.score + 80,
                inputAnswer:''
            })
            item.parts.showTick = true
        }
        return true
    })
  }

  render() {
    //console.log(this.state.shuffledArray);
    const shuffles =
      this.state.shuffledArray &&
      this.state.shuffledArray.map(item => (
        
        <li key={item.id}>
          {item.parts.speaker}
          <input onChange={this.writeSomething} />
          {item.parts.showTick && <MdDoneAll style={{color:'blue'}}/>}
          <Button
              color="primary"
              onClick={() => {
                this.checkLines(this.state.inputAnswer, this.state.shuffledArray);
              }}
              size="small"
            >
              Check
            </Button>
          {item.parts.words.map((word, index) => (
            <span key={index}>{`${word} `}</span>
          ))}
        </li>
      ));
    return (
      <div>
        Dialogue 3<ul>{shuffles}</ul>
        {this.state.score}
      </div>
    );
  }
}

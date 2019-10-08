/* import React, { Component } from "react";
//var nlp = require('compromise')
import Sketch from "react-p5";

export default class App extends Component {
  x = 50;
  y = 50;

  setup = (p5, parent) => {
    p5.createCanvas(500, 500).parent(parent);
  };
  draw = p5 => {
    p5.background(0);
    p5.ellipse(this.x, this.y, 70, 70);
    this.x++;
  };

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />;
  }
} */

/* 
import { RiString } from 'rita';
var rita = require('rita');

var stringData = "I have been using this software for 5 years. And I am very satisfied";

  const process = (str) => {
    let obj = {
      arr:null   
    }

    const rs = new RiString(str)
    const partOfSpeech = rs.analyze(str)

    
    obj = {
      arr:partOfSpeech
    }
    return obj
  }

  const result = process(stringData)

  console.log(result)

  /* var str = nlp('London is calling. But I called yesterday. And I will call you')
  var result = str.verbs().conjugation()
  console.log(result)

export default function Rita() {
  return (
    <div>
      <p>{result}</p>
    </div>
  )
} */

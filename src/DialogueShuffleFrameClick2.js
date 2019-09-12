import React, { Component } from 'react'
const uuidv1 = require('uuid/v1');

export default class DialogueShuffleFrame2 extends Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     shuffledArray: [],
                     inputAnswer:''
                   };
                   this.writeSometihng = this.writeSometihng.bind(this);
                 }


                 writeSometihng(e) {
                    e.preventDefault();
                    this.setState(
                      {
                        inputAnswer: (e.target.value)
                      }
                    );
                  }

                 componentDidMount() {
                   /* let shuffledArray = {
                     id: "1",
                     parts: [
                       {
                         speaker: "Speaker1",
                         words: ["how", "are", "you", "Hello"]
                       },
                       {
                         speaker: "Speaker2",
                         words: ["am", "thanks", "fine", "I"]
                       }
                     ]
                   }; */

                   //let shuffledArray = {}
                   const shuffle = (a) => {
                    var j, x, i
                    for (i = a.length - 1; i > 0; i--) {
                      j = Math.floor(Math.random() * (i + 1));
                      x = a[i]
                      a[i] = a[j]
                      a[j] = x
                    }
                    return a;
                  }

                   let shuffledArray = this.props.lines[0].parts && this.props.lines[0].parts.map(obj => {
                       return {
                           id:uuidv1(),
                           parts:{speaker:obj.speaker, words:shuffle(obj.words.split(' '))},
                           correctAnswer:obj.words
                       }
                   })

                   this.setState({
                     shuffledArray
                   });
                 }

                 render() {
                   console.log(this.state.shuffledArray);
                   const shuffles = this.state.shuffledArray && this.state.shuffledArray.map(item => (
                    <li>
                      <input onChange={this.writeSometihng}/>
                      {item.parts.words.map(word => (
                        <span>{`${word} `}</span>
                      ))}
                    </li>
                  ));
                   return <div>Dialogue 3<ul>{shuffles}</ul></div>;
                 }
               }

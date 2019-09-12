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
                           speaker:obj.speaker,
                           parts:shuffle(obj.words.split(' '))
                       }
                   })

                   this.setState({
                     shuffledArray
                   });
                 }

                 render() {
                   console.log(this.state.shuffledArray);
                   const shuffles = this.state.shuffledArray.parts && this.state.shuffledArray.parts.map(item => (
                    <li>
                      <input onChange={this.writeSometihng}/>
                      {item.words.map(word => (
                        <span>{`${word} `}</span>
                      ))}
                    </li>
                  ));
                   return <div>Dialogue 2<ul>{shuffles}</ul></div>;
                 }
               }

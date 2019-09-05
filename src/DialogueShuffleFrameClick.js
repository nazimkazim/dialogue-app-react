import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {uid} from 'react-uid';
import { MdDoneAll,MdCake  } from "react-icons/md";
import ReactDOM from 'react-dom';



var pushArr = [];
var points = 0;
class DialogueShuffleFrame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCorrect:false,
            preview:''
        }
        this.writeSometihng = this.writeSometihng.bind(this)
    }
    
    writeSometihng(e) {
        e.preventDefault()
        pushArr.push(e.target.value)
        this.preview(`${pushArr} `)
        //console.log(pushArr)
    }

    checkLines(arr, lines) {
        let joinedStr = arr.join(' ');
        this.preview(joinedStr)
        //console.log(joinedStr);
        lines[0].parts.map((obj) => {
            let line = obj.words
            if (joinedStr === line) {
                this.setState({
                    showCorrect:true
                })
                pushArr = [];
                points += 80;
            } else {
                pushArr = [];
            }
                
        })
    }

    preview(str) {
        this.setState({
            preview:str
        })
    }


    clear = (ref) => {
        const inputElements = ReactDOM.findDOMNode(ref.target).parentNode.getElementsByTagName('input');
        [...inputElements].forEach(el => el.value = '')
      }

    reset() {
        pushArr.length = 0
        this.setState({
            preview:""
        })
        console.log('clicked')
    }

    formatWords(words) {
        const splittedWords = words.split(' ')
        const shuffledArray = this.shuffle(splittedWords)
        return (
            shuffledArray.map((word, index) => (
                <>
                    <input className="word-to-drop-input" id={index} ref="target" onBlur={this.writeSometihng} size={2} />
                    <CopyToClipboard text={word}>
                        <span key={uid(word)} value={word} className="word-to-drop">{word}</span>
                    </CopyToClipboard>
                </>
            ))
        )
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    render() {
        const {lines} = this.props
        const shuffles = lines[0].parts && (
            lines[0].parts.map((element,i) => (
                <>
                    <li className="line" key={i}><span>{element.speaker}{": "}</span><span>{this.formatWords(element.words)}</span></li>
                    <MdDoneAll type="button" onClick={() => {this.checkLines(pushArr, lines)}} style={{color:'white'}}/>
                    <MdCake onClick={this.clear}/>
                </>
            ))
        )

        return (
                <>
                    <h1 className="centered" style={{color:'white'}}>Dialogue shuffle frame</h1>
                    <ul className="lines-container">
                        {shuffles}
                    </ul>
                    {<div className="reactangular">{this.state.showCorrect ? 'Correct' : 'Incorrect'}</div>} 
                    <div>{points}</div> 
                    <div className="reactangular" onClick={() => this.reset()}>Reset</div>
                    <div className="preview">{this.state.preview}</div>
                </>
        )
    }
}

export default DialogueShuffleFrame;
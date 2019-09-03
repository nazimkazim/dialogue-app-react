import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {uid} from 'react-uid';


const pushArr = [];
class DialogueShuffleFrame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushArr:[]
        }
        this.writeSometihng = this.writeSometihng.bind(this)
    }
    
    writeSometihng(e) {
        e.preventDefault()
        pushArr.push(e.target.value)
        console.log(pushArr)
    }

    checkLines(arr, lines) {
        let joinedStr = arr.join(' ');
        //console.log(joinedStr);
        lines[0].parts.map((obj) => {
            let line = obj.words
            console.log(joinedStr == line)
        })
    }

    formatWords(words) {
        const splittedWords = words.split(' ')
        const shuffledArray = this.shuffle(splittedWords)
        return (
            shuffledArray.map((word) => (
                <>
                    <input className="word-to-drop-input" onBlur={this.writeSometihng} size={2} />
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
                    <div type="button" onClick={() => {this.checkLines(pushArr, lines)}} style={{color:'white'}}>check</div>
                </>
            ))
        )

        return (
                <>
                    <h1 className="centered" style={{color:'white'}}>Dialogue shuffle frame</h1>
                    <ul>
                        {shuffles}
                    </ul>
                    <button className="grow_box">Check</button>
                </>
        )
    }
}

export default DialogueShuffleFrame;
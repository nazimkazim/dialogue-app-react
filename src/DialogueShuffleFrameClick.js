import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';


class DialogueShuffleFrame extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value:'car'
        }
    }

    formatWords(words) {
        const splittedWords = words.split(' ')
        const shuffledArray = this.shuffle(splittedWords)
        return (
            shuffledArray.map((word, index) => (
                <>
                    <input className="word-to-drop-input" value={this.state.value} onChange={() => {console.log('clicked')}} />
                    <CopyToClipboard text={word}>
                        <span key={index} value={word} className="word-to-drop">{word}</span>
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
        //console.log(this.props)
        const shuffles = lines[0].parts && (
            lines[0].parts.map((element,i) => (
                    <li className="line" key={i}><span>{element.speaker}{": "}</span><span>{this.formatWords(element.words)}</span></li>
            ))
        )

        return (
            <div>
                <h1 className="centered" style={{color:'white'}}>Dialogue shuffle frame</h1>
                <ul>
                    {shuffles}
                </ul>
            </div>
        )
    }
}

export default DialogueShuffleFrame;
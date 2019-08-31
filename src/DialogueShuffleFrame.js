import React, { Component } from 'react'

class DialogueShuffleFrame extends Component {

    formatWords(words) {
        const splittedWords = words.split(' ')
        const shuffledArray = this.shuffle(splittedWords)
        return (
            shuffledArray.map(word => (
                <span className="word-to-drop">{word}</span>
            ))
        )
        console.log(shuffledArray)
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
            lines[0].parts.map(element => (
                    <li className="line"><span>{element.speaker}{": "}</span><span>{this.formatWords(element.words)}</span></li>
            ))
        )
        console.log(shuffles)
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
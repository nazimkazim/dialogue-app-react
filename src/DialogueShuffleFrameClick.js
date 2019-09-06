import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {uid} from 'react-uid';
import { MdDoneAll,MdCake  } from "react-icons/md";
import ReactDOM from 'react-dom';



class DialogueShuffleFrame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCorrect:false,
            preview:'',
            pushArr:[],
            points:0
        }
        this.writeSometihng = this.writeSometihng.bind(this)
    }
    
    writeSometihng(e) {
        e.preventDefault()

        this.setState({
            pushArr:this.state.pushArr.concat(e.target.value)
            
        },function () {
            this.preview(this.state.pushArr.join(' '))
            console.log(this.state.pushArr)
        })
        
        
        
        
    }

    checkLines(arr, lines) {
        let joinedStr = arr.join(' ');
        console.log(joinedStr);
        lines[0].parts.map((obj) => {
            let line = obj.words
            if (joinedStr.trim() === line) {
                
                this.setState({
                    showCorrect:true,
                    pushArr:[],
                    points:this.state.points + 80
                })
                
            } else {
                this.setState({
                    pushArr:[]
                })
            }

            return false
                
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
        this.setState({
            pushArr:[]
        })
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
                    <MdDoneAll type="button" onClick={() => {this.checkLines(this.state.pushArr, lines)}} style={{color:'white'}}/>
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
                    {this.state.showCorrect && <div className="reactangular">Correct</div>} 
                    <div>{this.state.points}</div> 
                    <div className="reactangular" onClick={() => this.reset()}>Reset</div>
                    <div className="preview">{this.state.preview}</div>
                </>
        )
    }
}

export default DialogueShuffleFrame;
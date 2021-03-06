import React, { Component } from 'react';
import {SortableContainer, SortableElement,arrayMove} from 'react-sortable-hoc';
//import data from './dialogueShuffleData/inputData';


const SortableItem = SortableElement(({value}) => <span className="word-to-drop">{value}</span>);

class DialogueShuffleFrame extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //items:data
        }
    }

    formatWords(words) {
        const splittedWords = words.split(' ')
        const shuffledArray = this.shuffle(splittedWords)
        return (
            shuffledArray.map((word, index) => (
                <SortableItem key={`item-${word}`} onSortEnd={this.onSortEnd} index={index} value={word} />
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

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
          items: arrayMove(items, oldIndex, newIndex),
        }));
      };

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

export default SortableContainer(DialogueShuffleFrame);
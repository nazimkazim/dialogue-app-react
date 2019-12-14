import React, { Component } from "react";
import { getTranslations } from "./getTranslationWithPOS";
import { List, Popup, Checkbox } from "semantic-ui-react";
import Speech from "react-speech";
import {
  isNounPlural,
  singularizedNoun,
  infinitivizeVerb,
  isVerbPastTense
} from "./nlpHelperFunctions";
var nlp = require("compromise");

//import { RiString } from 'rita';
//var rita = require('rita');

export default class Rita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsObj: "",
      turnedPrompts: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const text = `Alice's Adventures in Wonderland (commonly shortened to Alice in Wonderland) is an 1865 novel written by English author Charles Lutwidge Dodgson under the pseudonym Lewis Carroll It tells of a young girl named Alice falling through a rabbit hole into a fantasy world populated by peculiar, anthropomorphic creatures The tale plays with logic, giving the story lasting popularity with adults as well as with children It is considered to be one of the best examples of the literary nonsense genre One of the best-known and most popular works of English-language fiction, its narrative course, structure, characters, and imagery have been enormously influential in both popular culture and literature, especially in the fantasy genre The work has never been out of print, and it has been translated into at least 97 languages Its ongoing legacy encompasses many adaptations for stage, screen, radio, art, theme parks, board games, and video games`;
    var str = nlp(text);
    //console.log(str.tagger().list[0].terms);
    const terms = str.tagger().list[0].terms;
    const obj = terms.map(term => {
      let obj = {};
      let word = term._text && term._text;
      let wordForTranlsation = term.normal;

      if (isNounPlural(wordForTranlsation)) {
        wordForTranlsation = singularizedNoun(wordForTranlsation);
      }

      if (isVerbPastTense(wordForTranlsation)) {
        wordForTranlsation = infinitivizeVerb(wordForTranlsation);
      }
      //console.log(isVerbPastTense("impeached"));
      //console.log(infinitivizeVerb("impeached"));
      let posList = Object.keys(term.tags);
      //console.log(posList);

      let translatedList = getTranslations(wordForTranlsation, posList);
      obj.pos = posList;
      obj.word = word;
      obj.translation = translatedList;
      //console.log(obj);
      return obj;
    });
    this.setState({
      wordsObj: obj
    });
  }

  toggle() {
    this.setState(prevState => ({
      turnedPrompts: !prevState.turnedPrompts
    }));
  }

  formatString(obj) {
    return (
      obj &&
      obj.map((item, i) => (
        <>
          <>
            {item.word && (
              <Popup
                trigger={
                  <span
                    style={{
                      wordWrap: "break-word",
                      cursor: "pointer",
                      marginRight: "0.5em"
                    }}
                    name={item.word}
                  >
                    <Speech
                      text={item.word}
                      textAsButton={true}
                      voice="Google UK English Male"
                    />
                  </span>
                }
                content={
                  item.translation.translatedWordArr &&
                  item.translation.translatedWordArr.slice(0, 3).map(
                    (w, i) =>
                      this.state.turnedPrompts && (
                        <>
                          <List.Item key={i}>{w}</List.Item>
                          <span>
                            {item.translation && item.translation.transcript}
                          </span>
                        </>
                      )
                  )
                }
                position="top left"
              />
            )}
          </>
        </>
      ))
    );
  }

  render() {
    console.log(this.state.wordsObj && this.state.wordsObj);

    return (
      <div style={{ maxWidth: "800px", height: "100%" }}>
        <div>
          {!this.state.turnedPrompts ? "prompts are off" : "prompts are on"}
        </div>
        <Checkbox slider onClick={this.toggle} />
        {this.formatString(this.state.wordsObj)}
      </div>
    );
  }
}

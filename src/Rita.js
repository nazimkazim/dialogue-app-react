import React, { Component } from "react";
import { getTranslations } from "./getTranslationWithPOS";
import { List, Popup, Checkbox } from "semantic-ui-react";
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
    const text =
      "A fiercely divided House Judiciary Committee approved two articles of impeachment against President Trump on Friday, setting up a historic vote before the full House that would make him only the third president to be impeached The impeachment articles, passed over fierce Republican protests, accused the president of abusing the power of his office and obstructing Congress. The votes and a fractious two-day debate preceding them reflected the realities of the hyperpartisan divisions in American politics that have grown wider during Mr. Trump’s three years in office. With back-to-back votes shortly after 10 a.m., the Democratic-controlled committee recommended that the House ratify the articles of impeachment against the 45th president, over howls of Republican protest. Each passed, 23 to 17, along strictly partisan lines.";
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
                    {item.word}
                  </span>
                }
                content={
                  item.translation.translatedWordArr &&
                  item.translation.translatedWordArr.slice(0, 3).map(
                    (w, i) =>
                      this.state.turnedPrompts && (
                        <>
                          <List.Item key={i}>{w}</List.Item>
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

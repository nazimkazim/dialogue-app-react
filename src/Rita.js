import React, { Component } from "react";
import { getTranslations } from "./getTranslationWithPOS";
import { strText } from "./Text";
import axios from "axios";

import { Menu, Segment, Sidebar, Icon, List } from "semantic-ui-react";
import Speech from "react-speech";
import {
  isNounPlural,
  singularizedNoun,
  infinitivizeVerb,
  isVerbPastTense
} from "./nlpHelperFunctions";
var nlp = require("compromise");
var keyword_extractor = require("keyword-extractor");
//var natural = require("natural");
//var NGrams = natural.NGrams;

//import { RiString } from 'rita';
//var rita = require('rita');

export default class Rita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsObj: "",
      isDrawerOpen: false,
      visible: false,
      clickedWord: "",
      vacabBank: ""
    };
    this.toggle = this.toggle.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
  }

  componentDidMount() {
    let str = nlp(strText);

    /* let ngramsArr = NGrams.bigrams(strText);
    //console.log(str.tagger().list[0].terms);
    let arr = [];
    ngramsArr.map(item => {
      //console.log(`${item[0]} ${item[1]}`);

      // Push ngram phrases into arr
      arr.push(`${item[0]} ${item[1]}`);
      //console.log(arr);
      return true;
    }); */

    /* let validNgramPhrases = [];

    arr.map(word => {
      let tranlsatedWord = getTranslations(word);
      if (!"no word exist") {
        validNgramPhrases.push(tranlsatedWord);
      }
      //console.log(tranlsatedWord);
      return true;
    });

    console.log(validNgramPhrases); */

    var extraction_result = keyword_extractor.extract(strText, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: true,
      return_chained_words: true,
      return_max_ngrams: 3
    });

    let twoThreeNgrams = [];

    extraction_result.map(ngram => {
      let trimmed = ngram.replace(/-/g, "");
      trimmed.split(" ").length > 1 && twoThreeNgrams.push(trimmed);

      return true;
    });

    const getTranslation = word => {
      const set = [];
      const keyAPI =
        "trnsl.1.1.20191009T070833Z.ae8dcd5c86e84378.31b471ecd7adf0d1bc0e20b4405abd6c1af7dc17";
      axios
        .get(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyAPI}&text=${word}&lang=ru`
        )
        .then(res => {
          //console.log(res.data.text);

          const words =
            res.data.text.length > 0
              ? res.data.text.map(item => {
                  return isRussianWord(item.toLowerCase())
                    ? set.push(item.toLowerCase())
                    : set.push("");
                })
              : res.data.text;
          return words;
        });
      return set;
    };

    const isRussianWord = word => {
      var rforeign = /[а-яА-ЯЁё]/;
      if (rforeign.test(word)) {
        return true;
      } else {
        return false;
      }
    };

    const vocabBankTranslated = twoThreeNgrams.map(phrase => {
      return {
        translatedWord: getTranslation(phrase),
        originalWord: phrase
      };
    });

    this.setState({
      vocabBank: vocabBankTranslated
    });

    console.log(twoThreeNgrams);

    const terms = str.tagger().list[0].terms;
    const obj = terms.map(term => {
      let obj = {};
      let word = term._text && term._text;
      let wordForTranlsation = term.normal && term.normal.replace(/,/g, "");

      if (isNounPlural(wordForTranlsation)) {
        wordForTranlsation = singularizedNoun(wordForTranlsation);
      }

      if (isVerbPastTense(wordForTranlsation)) {
        wordForTranlsation = infinitivizeVerb(wordForTranlsation);
      }
      //console.log(isVerbPastTense("earn"));
      //console.log(infinitivizeVerb("earn"));
      let posList = Object.keys(term.tags);
      //console.log(posList);

      let translatedList = getTranslations(wordForTranlsation, posList);
      obj.pos = posList;
      //obj.person = term.people();
      obj.word = word;
      obj.translation = translatedList;
      //console.log(term);
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

  showDrawer(e) {
    e.preventDefault();
    let word = e.target.textContent;
    //console.log("clicked");
    console.log(word);
    this.setState(prevState => ({
      isDrawerOpen: !prevState.isDrawerOpen,
      visible: !prevState.visible,
      clickedWord: word
    }));
  }

  showWordDetails(obj, word) {
    //const result = obj.filter(item => item.word === word);
    /* for (var key in obj) {
      console.log(obj[key].word === word);
    }
    console.log(obj, word);
    //console.log(result); */
    const array = Object.entries(obj);
    const result = array.filter(item => item[1].word === word);
    if (result.length > 0) {
      let res = result[0][1];
      console.log(res);
      return (
        <>
          <Menu.Item as="a">
            <Icon name="add circle" />
            <Speech
              text={res.word}
              textAsButton={true}
              voice="Google UK English Male"
            />
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="play" />
            {res.translation.transcription}
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="language" />
            {res.translation.translatedWordArr &&
              res.translation.translatedWordArr.map(word => (
                <List>{word}</List>
              ))}
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="exchange" />
            {res.pos && res.pos.map(pos => <List>{pos}</List>)}
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="sidebar" />
            {res.translation.examples &&
              res.translation.examples.map(item =>
                item !== undefined
                  ? item.map(item => (
                      <List divided inverted relaxed>
                        <List.Item>{item.text}</List.Item>
                        <List.Item>{item.tr[0].text}</List.Item>
                        <hr></hr>
                      </List>
                    ))
                  : ""
              )}
          </Menu.Item>
        </>
      );
    }
  }

  showEntireText(obj) {
    return (
      obj &&
      obj.map((item, i) => (
        <>
          <>
            {item.word && (
              <span
                style={{
                  wordWrap: "break-word",
                  cursor: "pointer",
                  marginRight: "0.5em"
                }}
                onClick={e => this.showDrawer(e)}
              >
                <Speech
                  text={item.word}
                  textAsButton={true}
                  voice="Google UK English Male"
                />
              </span>
            )}
          </>
        </>
      ))
    );
  }

  render() {
    //console.log(this.state.wordsObj && this.state.wordsObj);
    const vocab =
      this.state.vocabBank &&
      this.state.vocabBank.map(item => (
        <>
          <List.Item>
            {item.originalWord} -{" "}
            {item.translatedWord ? item.translatedWord[0] : "no definition"}
          </List.Item>
        </>
      ));
    console.log(this.state.vocabBank);
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => this.setState({ visible: false })}
          vertical
          visible={this.state.visible}
        >
          {this.showWordDetails(this.state.wordsObj, this.state.clickedWord)}
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.visible}>
          <div style={{ height: "100%" }}>
            <>
              {this.showEntireText(this.state.wordsObj)}
              <List>{vocab}</List>
            </>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

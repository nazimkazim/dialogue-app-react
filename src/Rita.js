import React, { Component } from "react";
import { getTranslations } from "./getTranslationWithPOS";
import { strText } from "./Text";

import { Menu, Segment, Sidebar, Icon, List } from "semantic-ui-react";
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
      isDrawerOpen: false,
      visible: false,
      clickedWord: ""
    };
    this.toggle = this.toggle.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
  }

  componentDidMount() {
    var str = nlp(strText);
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
      //console.log(infinitivizeVerb("regarded"));
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
            <Icon name="home" />
            {res.word}
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="gamepad" />
            {res.translation.transcription}
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="camera" />
            {res.translation.translatedWordArr &&
              res.translation.translatedWordArr.map(word => (
                <List>{word}</List>
              ))}
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="camera" />
            {res.pos && res.pos.map(pos => <List>{pos}</List>)}
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="camera" />
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
          width="thin"
        >
          {this.showWordDetails(this.state.wordsObj, this.state.clickedWord)}
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.visible}>
          <div style={{ height: "100vh" }}>
            <>{this.showEntireText(this.state.wordsObj)}</>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

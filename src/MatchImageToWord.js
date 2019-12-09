import React, { Component } from "react";
//import ttsStyle from "./ttsStyle";
import {
  Grid,
  Image,
  Segment,
  List,
  Input,
  Button,
  Popup,
  Checkbox
} from "semantic-ui-react";
import { getTranslations } from "./getTranslation";
import Speech from "react-speech";
const getItRight =
  "https://res.cloudinary.com/nzmai/video/upload/v1575606316/level-win_hytllh.wav";
const _ = require("lodash");

let answerArr = [];

class MatchImageToWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      set: [],
      shuffledWords: [],
      inputAnswer: [],
      score: 0,
      turnedPrompts: false,
      isCorrect: false,
      isWrong: false
    };
    this.audio = new Audio(getItRight);
    this.writeAnswer = this.writeAnswer.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    //console.log(this.props);

    const shuffledWords =
      this.props.lines &&
      this.props.lines.map(item => {
        return item.parts.map(i => {
          return {
            word: i.word,
            id: i.id,
            isCorrect: false,
            translation: getTranslations(i.word)
          };
        });
      });

    //console.log(shuffledWords);
    this.setState({
      set: this.props,
      shuffledWords: _.shuffle(shuffledWords[0])
    });
  }

  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  }

  checkAnswers(inputAnswer, shuffledObj) {
    let answersArray = [];
    shuffledObj.forEach(item => {
      answersArray.push(item.id);
    });

    if (this.arraysEqual(inputAnswer, answersArray)) {
      this.setState({
        isCorrect: true
      });
      this.audio.play();
    } else {
      this.setState({
        isWrong: true
      });
      setTimeout(() => {
        this.setState({ isWrong: false });
      }, 5000);
    }
    //console.log(answersArray, inputAnswer);
  }

  toggle() {
    this.setState(prevState => ({
      turnedPrompts: !prevState.turnedPrompts
    }));
  }

  writeAnswer(i, e) {
    e.preventDefault();
    answerArr.splice(i, 1, e.target.value);
    //console.log(answerArr);
  }

  render() {
    //console.log(this.state.set.lines);
    //console.log(this.state.shuffledWords);
    //console.log(this.state.names);

    const data =
      this.state.set.lines &&
      this.state.set.lines.map(item =>
        item.parts.map(i => (
          <Grid.Column key={i.id}>
            <Segment>
              <Image
                src={i.image}
                label={{
                  as: "a",
                  color: "blue",
                  content: `${i.id}`,
                  icon: "clone",
                  ribbon: true
                }}
              />
            </Segment>
          </Grid.Column>
        ))
      );

    const words =
      this.state.shuffledWords &&
      this.state.shuffledWords.map((item, i) => (
        <List.Item key={item.word}>
          <List.Content floated="right">
            <Input
              style={{ width: "40px" }}
              onChange={this.writeAnswer.bind(null, i)}
            />
          </List.Content>
          <List.Content style={{ marginLeft: "10px" }}>
            {item.word && (
              <>
                <Popup
                  trigger={
                    <span
                      style={{
                        borderBottom: "2px grey dashed",
                        cursor: "pointer",
                        marginRight: "0.5em"
                      }}
                      name={item.word}
                    >
                      <Speech
                        text={item.word}
                        textAsButton={true}
                        voice="Google UK English Female"
                      />
                    </span>
                  }
                  content={
                    item.translation.translatedWordArr &&
                    item.translation.translatedWordArr.map(
                      (w, i) =>
                        this.state.turnedPrompts && (
                          <List.Item key={i}>
                            {item.translation.translatedWordArr.indexOf(w) ===
                            0 ? (
                              <strong>{w}</strong>
                            ) : (
                              w
                            )}
                          </List.Item>
                        )
                    )
                  }
                  position="top left"
                />
              </>
            )}
            {item.translation.transcription}
          </List.Content>
        </List.Item>
      ));
    //console.log(data);
    return (
      <Grid padded>
        <Grid.Column width={4}>
          {!this.state.turnedPrompts ? "prompts are off" : "prompts are on"}
          <Checkbox slider onClick={this.toggle} />
          <List divided>{words}</List>
          <div>
            <Button
              color="twitter"
              size="big"
              onClick={() => {
                this.checkAnswers(answerArr, this.state.shuffledWords);
              }}
            >
              Check
            </Button>
            {this.state.isCorrect && (
              <span>
                Perfect
                <i class="em em-first_place_medal" />
                <i class="em em-fire" />
              </span>
            )}
            {this.state.isWrong && (
              <span>
                Try again <i className="em em-angry" />
              </span>
            )}
          </div>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid padded>
            <Grid.Row relaxed="true" columns={3}>
              {data}
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

export default MatchImageToWord;

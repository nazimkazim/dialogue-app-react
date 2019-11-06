import React, { Component } from "react";
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
      turnedPrompts: false
    };
    this.writeAnswer = this.writeAnswer.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    //console.log(this.props);

    const shuffledWords = this.props.lines.map(item => {
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
      console.log("huuurayy");
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
    console.log(answerArr);
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
                      {item.word}
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
      <Grid>
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
          </div>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid>
            <Grid.Row relaxed="true" columns={4}>
              {data}
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

export default MatchImageToWord;

import React, { Component } from "react";
import { Grid, Image, Segment, List, Input, Button } from "semantic-ui-react";
import axios from "axios";
const _ = require("lodash");

class MatchImageToWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      set: [],
      shuffledWords: [],
      inputAnswer: "",
      score: 0,
      names: {}
    };
    this.writeAnswer = this.writeAnswer.bind(this);
  }

  componentDidMount() {
    //console.log(this.props);
    const getTranslations = word => {
      let translatedWordArr = [];
      let obj = {};
      const keyAPI =
        "dict.1.1.20191101T105247Z.e4967bda9fba183c.2e2703fc28b2d4f5283bb48a004dcb2327b4ba72";
      axios
        .get(
          `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${keyAPI}&lang=en-ru&text=${word}`
        )
        .then(res => {
          //console.log(res);

          if (res.data.def.length > 0) {
            let translatedWord = res.data.def[0].tr;
            let pronunciation = res.data.def[0].ts;

            translatedWord.forEach(word => {
              translatedWordArr.push(word.text);
            });

            obj.translatedWordArr = translatedWordArr;
            obj.pronunciation = pronunciation;
          } else {
            console.log("no word exist");
          }
        });

      return obj;
    };

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

  checkAnswers(arg1, arg2) {
    console.log(arg1, arg2);
  }

  writeAnswer(e) {
    e.preventDefault();
    this.setState({ inputAnswer: e.target.value });
    //console.log(this.state.name);
  }
  render() {
    //console.log(this.state.set.lines);
    console.log(this.state.shuffledWords);
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
            <Input style={{ width: "40px" }} onChange={this.writeAnswer} />
          </List.Content>
          <List.Content style={{ marginLeft: "10px" }}>
            {item.word}
          </List.Content>
        </List.Item>
      ));
    //console.log(data);
    return (
      <Grid>
        <Grid.Column width={4}>
          <List divided>{words}</List>
          <div>
            <Button
              color="twitter"
              size="big"
              onClick={() => {
                this.checkAnswers(
                  this.state.inputAnswer,
                  this.state.shuffledWords
                );
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

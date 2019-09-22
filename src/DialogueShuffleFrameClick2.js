import React, { Component } from "react";
import { Grid, Image, Button, Input, Card, Label, Icon, Statistic, Sticky} from "semantic-ui-react";
import styled from "styled-components";
const uuidv1 = require("uuid/v1");

const centeredDiv = styled.div`
  max-width: 500px;
  width: 250px;/*NEW*/
  height: 100px;
  background-color: yellow;
  border: 2px solid red;
`;

export default class DialogueShuffleFrame2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffledArray: [],
      inputAnswer: "",
      score: 0
    };
    this.writeSomething = this.writeSomething.bind(this);
  }

  componentDidMount() {
    const shuffle = a => {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    };

    let shuffledArray =
      this.props.lines[0].parts &&
      this.props.lines[0].parts.map(obj => {
        return {
          id: uuidv1(),
          parts: {
            speaker: obj.speaker,
            company:obj.company,
            position:obj.position,
            words: shuffle(obj.words.split(" ")),
            showTick: false,
            isDisabled: false
          },
          correctAnswer: obj.words
        };
      });

    this.setState({
      shuffledArray
    });
  }

  writeSomething(e) {
    e.preventDefault();
    this.setState({
      inputAnswer: e.target.value
    });
  }

  checkLines(str, obj) {
    obj.map(item => {
      //console.log(item.correctAnswer)
      if (item.correctAnswer === str.trim()) {
        //console.log('correct')
        this.setState({
          score: this.state.score + 80,
          inputAnswer: ""
        });
        item.parts.showTick = true;
        item.parts.isDisabled = true;
      }
      return true;
    });
  }

  render() {
    //console.log(this.state.shuffledArray);
    const shuffles =
      this.state.shuffledArray &&
      this.state.shuffledArray.map(item => (
        <Grid.Row key={item.id} style={{marginTop:"20px"}}>
          <Grid.Column width={3}>
            <Card>
      {/*<Image src={item.parts.image ? item.parts.image : 'https://react.semantic-ui.com/images/wireframe/image.png'} wrapped ui={false} />*/}
              <Card.Content>
                <Card.Header>{item.parts.speaker && item.parts.speaker}</Card.Header>
                <Card.Meta>
                  <span className="date">{item.parts.company && item.parts.company}</span>
                </Card.Meta>
                <Card.Description>
                {item.parts.position && item.parts.position}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={6} style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
            <Input
              style={{width:'100%', marginTop:'20px'}}
              onChange={this.writeSomething}
              disabled={item.parts.isDisabled}
              icon="keyboard outline"
              label={{ icon: 'asterisk' }}
              labelPosition="left corner"
              placeholder="Unshuffle the line"
            />
            <centeredDiv style={{marginTop:'20px'}}>
            {item.parts.words.map((word, index) => (
              <Label color='yellow' key={index}>{`${word} `}</Label>
            ))}
            </centeredDiv>
            <centeredDiv style={{marginTop:'20px'}}>
            <Button
              color='twitter'
              size='big'
              disabled={item.parts.isDisabled}
              onClick={() => {
                this.checkLines(
                  this.state.inputAnswer,
                  this.state.shuffledArray
                );
              }}
            >
              {item.parts.showTick ? <Icon name='thumbs up outline'/> : 'Check'}
            </Button>
            </centeredDiv>
          </Grid.Column>
        </Grid.Row>
      ));
    return (
      <Grid columns={1} divided centered>
        <Sticky float='right'>
        <Statistic>
          <Statistic.Value>
            <Image
              src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
              className="circular inline"
            />
            {this.state.score}
          </Statistic.Value>
          <Statistic.Label>points</Statistic.Label>
        </Statistic>
        </Sticky>
        {shuffles}
      </Grid>
    );
  }
}

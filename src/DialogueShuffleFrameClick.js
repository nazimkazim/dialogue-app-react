import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { uid } from "react-uid";
//import { MdDoneAll, MdCake } from "react-icons/md";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Button } from "react-bulma-components/full";

const Container = styled.div`
  display: flex;
  overflow-y: hidden;
  margin: 1em 0;
  padding-top:0;
  color: #fff;
  width:90%;
  height: 500px;
  /* border: 1px solid #333; */
  align-items: center;
`;

const LeftHalf = styled.div`
  /* background-color: #f1f1f1; */
  flex: 5;
  height: 100%;
  overflow-y: scroll;
`;

const RightHalf = styled.div`
  /* background-color: #f1f1f1; */
  flex: 1;
`;

const ListContainer = styled.ul`
  background: white;
`;

const ListItem = styled.div`
  width: 100%;
  display: flex;
  min-height: 80px;
  background: green;
  position: relative;
  margin-top: 10px;
  justify-content: space-between;
`;

const NamePlate = styled.div`
  width: auto;
  height: auto;
  padding: 0.3rem;
  font-size: 14px;
  position: relative;
  background-color:red;
  top: 0;
  left: 0;
`;

const NamePlateContainer = styled.div`
  flex: 2;
  position: relative;
  background-color: blue;
`;

const WordsContainer = styled.div`
  display:flex;
  align-items: center;
  flex-direction:column;
  flex: 8;
  min-height: 100%;
  background-color: pink;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: auto;
`;

const InputContainer = styled.span`
  margin-top:0.5rem;
  display:block;
  width:80%;
  & > input {
    width:100%;
  }
`

const Words = styled.span`
  display:block;
  margin-top:.5rem;
  margin-bottom:.5rem;
`
const WordToDrop = styled.span`
  margin-right: 1rem;
  padding: 0.3rem;
  font-size: 0.9rem;
  display: block;
  border: 1px solid rgb(0, 255, 221);
  background: #2c3e50;
  cursor: pointer;
  display: inline-block;
`;

const ShowContainer = styled.div`
  min-height:50px;
  min-width:50%;
  background-color:blue
`

const ShowText = styled.p`
  display:none;
`

class DialogueShuffleFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCorrect: false,
      preview: "",
      inputAnswer: '',
      points: 0    
    };
    this.writeSometihng = this.writeSometihng.bind(this);
    this.clear = this.clear.bind(this);
    this.showPhrase = this.showPhrase.bind(this);
  }

  writeSometihng(e) {
    e.preventDefault();
    this.setState(
      {
        inputAnswer: (e.target.value)
      },
      function() {
        this.preview(this.state.inputAnswer);
      }
    );
  }

  checkLines(str, lines) {
    lines[0].parts.map(obj => {
      let line = obj.words;
      if (str.trim() === line) {
        this.setState({
          showCorrect: true,
          inputAnswer: "",
          points: this.state.points + 80
        });
      } else {
        this.setState({
          inputAnswer: ''
        });
      }

      return true;
    });
  }

  preview(str) {
    this.setState({
      preview: str
    });
  }

  clear = ref => {
    const inputElements = ReactDOM.findDOMNode(
      ref.target
    ).parentNode.getElementsByTagName("input");
    [...inputElements].forEach(el => (el.value = ""));
    console.log("cl");
  };

  reset() {
    this.setState({
      inputAnswer: ''
    });
    this.setState({
      preview: ""
    });
    console.log("clicked");
  }

  showPhrase(e) {
    console.log(e.target.parentNode.parentNode.children[1].children[2].children[0])
    e.target.parentNode.parentNode.children[1].children[2].children[0].classList.toggle(
      'show'
    )
  }


  formatWords(words) {
    const splittedWords = words.split(" ");
    const shuffledArray = this.shuffle(splittedWords);
    return shuffledArray.map((word) => (
      <>
        <CopyToClipboard text={word}>
          <WordToDrop key={uid(word)} value={word}>
            {word}
          </WordToDrop>
        </CopyToClipboard>
      </>
    ));
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
    const { lines } = this.props;
    const shuffles =
      lines[0].parts &&
      lines[0].parts.map((element, i) => (
        <ListItem key={i}>
          <NamePlateContainer>
            <NamePlate>
              {element.speaker}
              {": "}
            </NamePlate>
          </NamePlateContainer>

          <WordsContainer>
            <InputContainer>
              <input
                className="word-to-drop-input"
                id={i}
                ref="target"
                onChange={this.writeSometihng}
                size={2}
              />
            </InputContainer>
            <Words>{this.formatWords(element.words)}</Words>
            <ShowContainer>
              <ShowText>{element.words}</ShowText>
            </ShowContainer>
          </WordsContainer>

          <ButtonContainer>
            <Button
              color="success"
              onClick={() => {
                this.checkLines(this.state.inputAnswer, lines);
              }}
              size="small"
            >
              Check
            </Button>
            <Button color="warning" onClick={this.clear} size="small">
              Clear
            </Button>
            <Button
              color="success"
              onClick={this.showPhrase}
              size="small"
            >
            Show Phrase
            </Button>
          </ButtonContainer>
        </ListItem>
      ));

    return (
      <>
        <h1 className="centered" style={{ color: "white" }}>
          Dialogue shuffle frame
        </h1>
        <Container>
          <LeftHalf>
            <ListContainer className="lines-container">
              {shuffles}
            </ListContainer>
          </LeftHalf>

          <RightHalf>
            {this.state.showCorrect && (
              <div className="reactangular">Correct</div>
            )}
            <div>{this.state.points}</div>
            <div className="reactangular" onClick={() => this.reset()}>
              Reset
            </div>
            <div className="preview">{this.state.preview}</div>
          </RightHalf>
        </Container>
      </>
    );
  }
}

export default DialogueShuffleFrame;

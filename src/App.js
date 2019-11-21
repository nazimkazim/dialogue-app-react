import React, { Component } from "react";
import BubbleSpeechFrame from "./BubbleSpeechFrame";
import DialogueShuffleFrame from "./DialogueShuffleFrame";
import DialogueShuffleFrameClick from "./DialogueShuffleFrameClick";
import DialogueShuffleFrameClick2 from "./DialogueShuffleFrameClick2";
import MatchImageToWord from "./MatchImageToWord";
import RiddleWord from "./RiddleWord";
import Rita from "./Rita";
import Snake from "./Snake/Snake";
import lines from "./dialoguesData/inputData";
import shuffleLines from "./dialogueShuffleData/inputData";
import riddleWordsLines from "./riddleData/inputData";
import wordImageSet from "./imageWordData/inputData";
import NewDialogueForm from "./NewDialogueForm";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { dialogues: lines };
    this.findDialogue = this.findDialogue.bind(this);
    this.saveDialogue = this.saveDialogue.bind(this);
  }

  findDialogue(id) {
    return this.state.dialogues.find(function(dialogue) {
      return dialogue.id === id;
    });
  }

  saveDialogue(newDialogue) {
    this.setState({ dialogues: [...this.state.dialogues, newDialogue] });
    console.log(this.state.dialogues);
  }

  render() {
    //console.log(this.state.dialogues);
    return (
      <div className="App">
        <div id="cont">
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/dialogue/new"
                render={routeProps => (
                  <NewDialogueForm
                    dialogues={this.state.dialogues}
                    saveDialogue={this.saveDialogue}
                    {...routeProps}
                  />
                )}
              />
              <Route
                exact
                path="/dialogue/:id"
                render={routeProps => (
                  <BubbleSpeechFrame
                    lines={this.findDialogue(routeProps.match.params.id)}
                  />
                )}
              />
              <Route exact path="/rita" render={routeProps => <Rita />} />
              <Route
                exact
                path="/shuffle-dialogue"
                render={routeProps => (
                  <DialogueShuffleFrame lines={shuffleLines} />
                )}
              />
              <Route
                exact
                path="/shuffle-dialogue-click"
                render={routeProps => (
                  <DialogueShuffleFrameClick lines={shuffleLines} />
                )}
              />

              <Route
                exact
                path="/shuffle-dialogue-click2"
                render={routeProps => (
                  <DialogueShuffleFrameClick2 lines={shuffleLines} />
                )}
              />

              <Route
                exact
                path="/riddle-word"
                render={routeProps => <RiddleWord lines={riddleWordsLines} />}
              />

              <Route
                exact
                path="/match-image-to-word"
                render={routeProps => <MatchImageToWord lines={wordImageSet} />}
              />

              <Route exact path="/snake" render={routeProps => <Snake />} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import BubbleSpeechFrame from './BubbleSpeechFrame';
import DialogueShuffleFrame from './DialogueShuffleFrame';
import DialogueShuffleFrameClick from './DialogueShuffleFrameClick';
import lines from './dialoguesData/inputData';
import shuffleLines from './dialogueShuffleData/inputData'
import NewDialogueForm from './NewDialogueForm';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

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
              <Route
                exact
                path="/shuffle-dialogue"
                render={routeProps => (
                  <DialogueShuffleFrame
                    lines={shuffleLines}
                  />
                )}
              />
              <Route
                exact
                path="/shuffle-dialogue-click"
                render={routeProps => (
                  <DialogueShuffleFrameClick
                    lines={shuffleLines}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import BubbleSpeechFrame from './BubbleSpeechFrame';
import lines from './inputData';
import NewDialogueForm from './NewDialogueForm';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { dialogues: lines };
    this.findDialogue = this.findDialogue.bind(this);
  }

  findDialogue(id) {
    return this.state.dialogues.find(function(dialogue) {
      return dialogue.id === id;
    });
  }

  saveDialogue(newDialogue) {
    this.setState({ dialogues: [...this.state.dialogues, newDialogue] });
  }

  render() {
    return (
      <div className="App">
        <div id="cont">
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/dialogue/new/"
                render={routeProps => (
                  <NewDialogueForm
                    saveDialogue={this.saveDialogue}
                    dialogues={this.state.dialogues}
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
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
//import audioFile from './audio/аудио1.mp3';

class BubbleSpeechFrame extends Component {
  constructor(props) {
    super(props);
    this.showText = this.showText.bind(this);
    this.state = {
      show: true
    };
  }

  showText() {
    const currentState = this.state.show;
    this.setState({ show: !currentState });
    console.log('clicked');
  }
  render() {
    const { lines } = this.props;
    const dialogueData = lines.map(line => {
      return (
        <React.Fragment>
          {line.speaker === 1 ? (
            <div className="speaker-1">
              <div className="sound-cont">
                <ReactAudioPlayer src={line.audio} autoPlay controls />
              </div>
              <div className="text-cont">
                <p className={`text ${this.state.show ? '' : 'show'}`}>
                  {line.text}
                </p>
              </div>
              {line.prompt && (
                <div className="prompt-cont">
                  <p className="prompt">{line.prompt}</p>
                </div>
              )}
              <div className="toggle-text">
                <button className="grow_box" onClick={this.showText}>
                  show text
                </button>
              </div>
            </div>
          ) : (
            <div className="speaker-2">
              <div className="sound-cont">
                <ReactAudioPlayer src={line.audio} autoPlay controls />
              </div>
              <div className="text-cont">
                <p className={`text ${this.state.show ? '' : 'show'}`}>
                  {line.text}
                </p>
              </div>
              {line.prompt && (
                <div className="prompt-cont">
                  <p className="prompt">{line.prompt}</p>
                </div>
              )}
              <div className="toggle-text ">
                <button className="grow_box" onClick={this.showText}>
                  show text
                </button>
              </div>
            </div>
          )}
        </React.Fragment>
      );
    });
    return (
      <div>
        <h1>Bubble speech frame</h1>
        {dialogueData}
      </div>
    );
  }
}

export default BubbleSpeechFrame;

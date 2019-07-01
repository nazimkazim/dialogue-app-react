import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Tooltip from './Tooltip';

class BubbleSpeechFrame extends Component {
  constructor(props) {
    super(props);
    this.showText = this.showText.bind(this);
    /* this.state = {
      show: false
    }; */
  }

  showText(e) {
    e.target.parentNode.parentNode.children[1].childNodes[0].classList.toggle(
      'show'
    );
    /* 
    const currentState = this.state.show;
    this.setState({ show: !currentState }); */
  }
  render() {
    const { lines } = this.props;
    const dialogueData = lines.map(line => {
      return (
        <React.Fragment>
          {line.speaker === 1 ? (
            <div className="speaker-1" key={line.id}>
              <div className="sound-cont">
                <ReactAudioPlayer
                  src={line.audio}
                  autoPlay
                  controls
                  controlsList="nodownload"
                />
              </div>
              <div className="text-cont">
                {<p className="text">{line.text}</p>}
              </div>
              {line.prompt && (
                <div className="prompt-cont">
                  <p className="prompt">{line.prompt}</p>
                </div>
              )}
              <div className="toggle-text">
                <button className="grow_box" onClick={e => this.showText(e)}>
                  show text
                </button>
              </div>
              {line.helpers && <Tooltip tips={line.helpers} />}
            </div>
          ) : (
            <div className="speaker-2" key={line.id}>
              <div className="sound-cont">
                <ReactAudioPlayer
                  src={line.audio}
                  autoPlay
                  controls
                  controlsList="nodownload"
                />
              </div>
              <div className="text-cont">
                {<p className="text">{line.text}</p>}
              </div>
              {line.prompt && (
                <div className="prompt-cont">
                  <p className="prompt">{line.prompt}</p>
                </div>
              )}
              <div className="toggle-text ">
                <button className="grow_box" onClick={e => this.showText(e)}>
                  show text
                </button>
              </div>
              {line.helpers && <Tooltip tips={line.helpers} />}
            </div>
          )}
        </React.Fragment>
      );
    });
    return (
      <div>
        <h1 className="centered">Bubble speech frame</h1>
        {dialogueData}
      </div>
    );
  }
}

export default BubbleSpeechFrame;

import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
//import { Grid, Image, Button} from "semantic-ui-react";
import Tooltip from "./Tooltip";
import Translation from "./Translation";
import ButtonComponent from "./Button";
import Instructions from "./Instructions";

class BubbleSpeechFrame extends Component {
  constructor(props) {
    super(props);
    this.showText = this.showText.bind(this);
  }

  showText(e) {
    e.target.parentNode.parentNode.children[1].childNodes[0].classList.toggle(
      "show"
    );
  }
  render() {
    const { lines } = this.props;
    const dialogueData =
      lines &&
      lines.parts.map(part => {
        return (
          <React.Fragment>
            {part.speaker === 1 ? (
              <div className="speaker-1">
                <div className="sound-cont">
                  <ReactAudioPlayer
                    src={part.audio}
                    controls
                    controlsList="nodownload"
                  />
                </div>
                <div className="text-cont">
                  {<p className="text">{part.text}</p>}
                </div>
                {part.prompt && (
                  <div className="prompt-cont">
                    <p className="prompt">{part.prompt}</p>
                  </div>
                )}
                <div className="toggle-text">
                  <ButtonComponent margin="30px" showText={this.showText} />
                </div>
                {part.helpers && <Tooltip tips={part.helpers} />}
                {part.translation && (
                  <Translation translation={part.translation} />
                )}
              </div>
            ) : (
              <div className="speaker-2">
                <div className="sound-cont">
                  <ReactAudioPlayer
                    src={part.audio}
                    controls
                    controlsList="nodownload"
                  />
                </div>

                <div className="text-cont">
                  {<p className="text">{part.text}</p>}
                </div>
                {part.prompt && (
                  <div className="prompt-cont">
                    <p className="prompt">{part.prompt}</p>
                  </div>
                )}
                <div className="toggle-text ">
                  <ButtonComponent margin="30px" showText={this.showText} />
                </div>
                {part.helpers && <Tooltip tips={part.helpers} />}
                {part.translation && (
                  <Translation translation={part.translation} />
                )}
              </div>
            )}
          </React.Fragment>
        );
      });

    return (
      <div>
        <h1 className="centered" style={{ color: "white" }}>
          {lines.name}
        </h1>

        {lines.instructions &&
          lines.instructions.rusInstruction &&
          lines.instructions.engInstruction && (
            <Instructions
              engInstruction={lines.instructions.engInstruction}
              rusInstruction={lines.instructions.rusInstruction}
            />
          )}
        {dialogueData}
      </div>
    );
  }
}

export default BubbleSpeechFrame;

import React from 'react';
import helpIcon from './images/help.svg';
function Tooltip(props) {
  return (
    <div className="tooltip">
      <div className="helpIcon">
        <img src={helpIcon} alt="help icon" />
      </div>
      <div className="tip">
        {props.tips &&
          props.tips.map(tip => (
            <span className="pair-block">
              <span>{tip.word_mother} - </span>
              <span>{tip.word_target}</span>
            </span>
          ))}
      </div>
    </div>
  );
}

export default Tooltip;

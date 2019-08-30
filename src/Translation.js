import React from 'react';
import languageIcon from './images/language.svg';

function Translation(props) {
  return (
    <div className="translation-tip">
      <div className="translationIcon">
        <img src={languageIcon} alt="language icon" />
      </div>
      <div className="tip-translation">
        {props.translation &&
            <p className="pair-block">{props.translation}</p>  
        }
      </div>
    </div>
  );
}

export default Translation;

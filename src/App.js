import React from 'react';
import BubbleSpeechFrame from './BubbleSpeechFrame';
import lines from './inputData';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="cont">
        <BubbleSpeechFrame lines={lines} />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import BubbleSpeechFrame from './BubbleSpeechFrame';
import lines from './inputData';

function App() {
  return (
    <div className="App">
      <div id="cont">
        <h1>Dialogue App</h1>
        <BubbleSpeechFrame lines={lines} />
      </div>
    </div>
  );
}

export default App;

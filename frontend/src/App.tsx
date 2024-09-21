import React from 'react';
import { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import generateQRCodeWeb from './helpers/generateQR'
import { text } from 'stream/consumers';

function App() {

  const [textInput, setTextInput] = useState('')
  const [generatorView, setGeneratorView] = useState<Boolean>(false);

  const QRCanvasRef = useRef<HTMLCanvasElement | null>(null); // Reference to the canvas

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input onChange={e => {
          setTextInput(e.target.value)
          setGeneratorView(true)
          }}></input>
        
        <canvas ref={QRCanvasRef}>Hello</canvas>

        <button onClick={() => generateQRCodeWeb(QRCanvasRef, textInput)}>
          Generate
        </button>

        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

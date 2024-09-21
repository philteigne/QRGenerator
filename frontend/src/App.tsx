import React from 'react';
import { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import QRGenerator from './components/QRGenerator';
import { generateQRCodeWeb, generateQRCodeFile } from './helpers/generateQR'

function App() {

  const [textInput, setTextInput] = useState('')
  const [generatorView, setGeneratorView] = useState<Boolean>(false);

  const QRCanvasRef = useRef<HTMLCanvasElement | null>(null); // Reference to the canvas

  return (
    <div className="App">
        <input onChange={e => {
          setTextInput(e.target.value)
          setGeneratorView(true)
          }}>  
        </input>
        
        <canvas ref={QRCanvasRef}>Hello</canvas>

        <button onClick={() => generateQRCodeWeb(QRCanvasRef, textInput)}>
          Generate
        </button>
        <QRGenerator input={textInput} />
    </div>
  );
}

export default App;

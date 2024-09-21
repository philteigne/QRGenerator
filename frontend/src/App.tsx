import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import QRGenerator from './components/QRGenerator';
import { generateQRCodeWeb, generateQRCodeFile } from './helpers/generateQR'

function App() {

  const [textInput, setTextInput] = useState<string>("")
  const [arrayInput, setArrayInput] = useState<Array<string>>([])

  const [displayQRCode, setDisplayQRCode] = useState<Boolean>(false)

  const QRCanvasRef = useRef<HTMLCanvasElement | null>(null); // Reference to the canvas

  // Given an input string, convert that string to an array
  const handleGeneration = (input: string) => {
    setArrayInput(JSON.parse(input));
  }

  useEffect(() => {
    setDisplayQRCode(!displayQRCode)
  }, [arrayInput])

  return (
    <div className="App">
        <input onChange={e => setTextInput(e.target.value)}></input>
        
        <button onClick={() => handleGeneration(textInput)}>
          Generate
        </button>
        {/* <button onClick={() => generateQRCodeWeb(QRCanvasRef, textInput)}>
          Generate
        </button> */}

        {displayQRCode && 
          arrayInput.map((item: string) => {
            return <QRGenerator input={item}/>
          })
        }
        
        <canvas ref={QRCanvasRef}>Hello</canvas>
    </div>
  );
}

export default App;

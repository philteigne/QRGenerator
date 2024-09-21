import React, { useEffect, useState } from 'react';
import './App.css';

import QRDisplay from './components/QRDisplay';

function App() {

  // current array input must use double quotes to be valid JSON
  const [textInput, setTextInput] = useState<string>("")

  const [arrayInput, setArrayInput] = useState<string[]>([])
  const [displayQRCode, setDisplayQRCode] = useState<Boolean>(false)

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
        
      <button onClick={() => handleGeneration(textInput)}>Generate</button>

      {displayQRCode && 
        arrayInput.map((item: string, index) => {
          return (
            <QRDisplay key={index} input={item} />
          );
        })
      }

    </div>
  );
}

export default App;
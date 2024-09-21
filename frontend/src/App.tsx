import React, { useEffect, useState } from 'react';
import './App.css';

import QRDisplay from './components/QRDisplay';

// basicInput
// textField
// listInput

function App() {

  // current array input must use double quotes to be valid JSON
  const [textInput, setTextInput] = useState<string>("")

  const [arrayInput, setArrayInput] = useState<string[]>([])
  const [displayQRCode, setDisplayQRCode] = useState<Boolean>(false)

  const [inputType, setInputType] = useState<'basicInput' | 'textInput'>('textInput')

  
  const handleGeneration = (input: string, inputType: string) => {
    // Split input string array into array
    if (inputType === 'basicInput') {
      // Replace single quotes with double quotes to create valid JSON object
      input = input.replaceAll("'", '"');
  
      setArrayInput(JSON.parse(input));
      return;
    }

    // TODO: creates empty canvases for trailing semi-colons
    // Split input string into array
    if (inputType === 'textInput') {
      // Remove delimeter trails
      input = input.replaceAll("; ", ";");

      setArrayInput(input.split(';'));
      return;
    }
  }

  return (
    <div className="App">
      <div className='inputTypeSelection'>
        <div
          className='selectorBubble'
          onClick={() => setInputType('basicInput')}
        >
          basicInput
        </div>
        <div
          className='selectorBubble'
          onClick={() => setInputType('textInput')}
        >
          textInput
        </div>
      </div>


      {inputType === 'basicInput' && 
        <input
          onChange={e => setTextInput(e.target.value)}
          placeholder='Enter your array of strings. eg. ["item 1", "item 2", "item 3"]'
        ></input>}
      {inputType === 'textInput' &&
        <input
          onChange={e => setTextInput(e.target.value)}
          placeholder='Enter your list of strings delimited with semi-colons. eg. item 1; item 2; item 3'
        ></input>}
        
      <button onClick={() => handleGeneration(textInput, inputType)}>Generate</button>

      {arrayInput.length > 0 && 
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
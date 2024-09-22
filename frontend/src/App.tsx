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

  const [inputType, setInputType] = useState<'basicInput' | 'textInput'>('basicInput')

  const [appView, setAppView] = useState<'input' | 'output'>('input')

  
  const handleGeneration = (input: string, inputType: string) => {

    // TODO elsif instead of return
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
      // Trim string
      input = input.replaceAll("; ", ";");

      setArrayInput(input.split(';'));
      return;
    }
  }

  return (
    <div className="App">
      <header>
        <h1 id='title'>BulQR</h1>
      </header>

      <div>
        <h2>Add some items to get started.</h2>
      </div>

      <div className='inputTypeSelection'>
        <ul>
          <li
            className='selectorBubble'
            onClick={() => setInputType('basicInput')}
          >
            basicInput
          </li>
          <li
            className='selectorBubble'
            onClick={() => setInputType('textInput')}
          >
            textInput
          </li>
          <li
            onClick={() => setAppView('input')}
          >
            Edit
          </li>
        </ul>
      </div>

      {appView === 'input' &&
        <div className='input'>
          {inputType === 'basicInput' && 
            <textarea
              onChange={e => setTextInput(e.target.value)}
              placeholder='Enter your array of strings. eg. ["item 1", "item 2", "item 3"]'
              className='textField'
            ></textarea>}
          {inputType === 'textInput' &&
            <textarea
              onChange={e => setTextInput(e.target.value)}
              placeholder='Enter your list of strings delimited with semi-colons. eg. item 1; item 2; item 3'
              className='textField'
            ></textarea>}
          
          <div className='formControl'>
            <button
              className="inverse"
              onClick={() => {
                handleGeneration(textInput, inputType)
                setAppView('input')
              }}
            >
              Reset
            </button>
            <button
              onClick={() => {
                handleGeneration(textInput, inputType)
                setAppView('output')
              }}
            >
              Generate
            </button>
          </div>
        </div>
      }
      
      {appView === 'output' && arrayInput.length > 0 && 
        arrayInput.map((item: string, index) => {
          // Don't render empty strings
          if (item.length === 0) {
            return;
          }
          return (
            <QRDisplay key={index} input={item} />
          );
        })
      }

    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import './App.css';

import QRDisplay from './components/QRDisplay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faDownload, faPenToSquare, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'


// basicInput
// textField
// listInput
// ["item1", "item2"]

function App() {

  // current array input must use double quotes to be valid JSON
  const [textInput, setTextInput] = useState<string>("")

  const [arrayInput, setArrayInput] = useState<string[]>([''])

  const [inputType, setInputType] = useState<'listInput' | 'basicInput' | 'textInput'>('listInput')

  const [appView, setAppView] = useState<'input' | 'output'>('input')

  const handleListInputChange = (index: number, newValue: string) => {
    const updatedItems = [...arrayInput];

    updatedItems[index] = newValue;
    setArrayInput(updatedItems);
  }

  const handleListInputAdd = () => {
    const updatedItems = [...arrayInput, '']

    setArrayInput(updatedItems)
  }

  const handleListInputDelete = (index: number) => {
    const updatedItems = [...arrayInput]
    updatedItems.splice(index, 1)
    console.log(index)
    console.log(arrayInput)
    
    setArrayInput(updatedItems)
    console.log(arrayInput)
  }

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

      {appView === 'input' &&
        <div>
          <h2>Add items to get started.</h2>
        </div>
      }
      
        
      {appView === 'output' &&
        <div>
          <h2>Your QR codes are ready.</h2>
          <div className='outputControl'>
            <a className='aButton'><FontAwesomeIcon icon={faPenToSquare} /></a>
            <a className='aButton'><FontAwesomeIcon icon={faDownload} /></a>
          </div>
        </div>
      }

      {appView === 'input' &&
        <div className='inputTypeSelection'>
          <ul>
            <li
              className={inputType === 'listInput' ? 'underline' : ''}
              onClick={() => {
                setInputType('listInput')
                setArrayInput([''])
              }}
            >
              Listed
            </li>
            <li
              className={inputType === 'basicInput' ? 'underline' : ''}
              onClick={() => {
                setInputType('basicInput')
                setArrayInput([''])
              }}
            >
              JSON
            </li>
            <li
              className={inputType === 'textInput' ? 'underline' : ''}
              onClick={() => {
                setInputType('textInput')
                setArrayInput([''])
              }}
            >
              Delimeted
            </li>
          </ul>
        </div>
      }
      {appView === 'input' &&
        <div className='input'>
          {inputType === 'listInput' && 
            <div className='listInputContainer'>
              {arrayInput.map((item, index) => {
                return (
                  <div className='inputContainer'>
                    <input
                      value={item}
                      onChange={(e) => {handleListInputChange(index, e.target.value)}}
                    ></input>
                    <FontAwesomeIcon
                      className='FontAwesomeIcon'
                      icon={faXmark}
                      onClick={() => {handleListInputDelete(index)}}
                    />
                  </div>
                )
              })}
              <div className='inputContainer' onClick={() => handleListInputAdd()}>
                <a className='aButton alt'>
                  <FontAwesomeIcon className='FontAwesomeIcon' icon={faPlus} />
                </a>
              </div>
            </div>
          }
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
                setArrayInput([''])
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
      
      <div className='QRContainer'>
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

    </div>
  );
}

export default App;
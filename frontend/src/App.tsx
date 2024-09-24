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

  const [errorMsg, setErrorMsg] = useState<string>('')

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
    
    setArrayInput(updatedItems)
  }

  const handleGeneration = (input: string, inputType: string) => {

    let error = '';

    if (inputType === 'listInput') {
      // Check for errors
      if (!arrayInput.find(item => item.length > 0)) {
        error = ('Input should include at least one item')
      }

    } else if (inputType === 'basicInput') {

      try {
        setArrayInput(JSON.parse(input));
      } catch(e) {
        error = ('Input is not valid JSON')
      }

    } else if (inputType === 'textInput') {      
      const newInput = input.split(';').map(item => item.trim()).filter((item) => item.length > 0)

      if (!arrayInput.find(item => item.length > 0)) {
        error = ('Input should include at least one character')
      } else if (newInput.find(item => item.length > 2331)) {
        error = ('Input items should each be less than 2332 characters')
      }

      setArrayInput(newInput);
    }

    if (error) {
      setErrorMsg(error);
      return
    }

    setAppView('output');
  }

  return (
    <div className="App">
      <header>
        <h1 id='title'>BulQR</h1>
      </header>

      {appView === 'input' &&
        <div className='output'>
          <h2>Add items to get started.</h2>
        </div>
      }
      
        
      {appView === 'output' &&
        <div className='output'>
          <h2>Your QR codes are ready.</h2>
          <div className='outputControl'>
            <a className='aButton inverse' onClick={() => setAppView('input')}><FontAwesomeIcon icon={faPenToSquare} /></a>
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
                setErrorMsg('')
              }}
            >
              Listed
            </li>
            <li
              className={inputType === 'basicInput' ? 'underline' : ''}
              onClick={() => {
                setInputType('basicInput')
                setArrayInput([''])
                setErrorMsg('')
              }}
            >
              JSON
            </li>
            <li
              className={inputType === 'textInput' ? 'underline' : ''}
              onClick={() => {
                setInputType('textInput')
                setArrayInput([''])
                setErrorMsg('')
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
                setErrorMsg('');
                handleGeneration(textInput, inputType);
                console.log(errorMsg)
              }}
            >
              Generate
            </button>
          </div>
          {errorMsg &&
          <div className='errorDisplay'>
            <h2 className='error'>{errorMsg}</h2>
          </div>}
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
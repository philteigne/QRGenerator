import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark, faGear } from '@fortawesome/free-solid-svg-icons'

import { stateObject } from '../interfaces/StateInterfaces'
import QRSettingsModal from '../components/QRSettingsModal'

const InputRoute = (
  {state, dispatch}:
  {state: stateObject, dispatch: Function}
) => {
  const handleListInputChange = (index: number, newValue: string) => {
    const updatedItems = [...state.arrayInput];

    updatedItems[index] = newValue;
    dispatch({type: "SET_ARRAY_INPUT", payload: updatedItems});
  }

  const handleListInputAdd = () => {
    const updatedItems = [...state.arrayInput, '']

    dispatch({type: "SET_ARRAY_INPUT", payload: updatedItems})
  }

  const handleListInputDelete = (index: number) => {
    const updatedItems = [...state.arrayInput]
    updatedItems.splice(index, 1)
    
    dispatch({type: "SET_ARRAY_INPUT", payload: updatedItems})
  }

  const handleGeneration = (input: string, inputType: string) => {

    let error = '';

    if (inputType === 'listInput') {
      // Check for errors
      if (!state.arrayInput.find(item => item.length > 0)) {
        error = ('Input should include at least one item')
      }

      dispatch({type: "SET_ARRAY_INPUT", payload: state.arrayInput.filter((item: string) => item.length > 0)})

    } else if (inputType === 'basicInput') {

      try {
        dispatch({type: "SET_ARRAY_INPUT", payload: JSON.parse(input).filter((item: string) => item.length > 0)});
      } catch(e) {
        error = ('Input is not valid JSON')
      }

    } else if (inputType === 'textInput') {      
      const newInput = input.split(';').map(item => item.trim()).filter((item: string) => item.length > 0)

      if (!newInput.find(item => item.length > 0)) {
        error = ('Input should include at least one character')
      } else if (newInput.find(item => item.length > 2331)) {
        error = ('Input items should each be less than 2332 characters')
      }

      dispatch({type: "SET_ARRAY_INPUT", payload: newInput});
    }

    if (error) {
      dispatch({type: "SET_ERROR_MSG", payload: error});
      return
    }

    dispatch({type: "SET_APP_VIEW", payload: 'output'});
  }

  const handleInputTypeChange = (inputType: 'listInput' | 'basicInput' | 'textInput') => {
    dispatch({type: "SET_INPUT_TYPE", payload: inputType})
    dispatch({type: "SET_ARRAY_INPUT", payload: ['']})
    dispatch({type: "SET_TEXT_INPUT", payload: ''})
    dispatch({type: "SET_ERROR_MSG", payload: ''})
  }

  return (
    <>
      <div className='output'>
        <h2>Add items to get started.</h2>
      </div>
      <div className='inputTypeSelection'>
        <ul>
          <li
            className={state.inputType === 'listInput' ? 'underline' : ''}
            onClick={() => {
              if (state.inputType !== 'listInput') {
                handleInputTypeChange('listInput')
              }

            }}
            data-testid={'listInputSelector'}
          >
            Listed
          </li>
          <li
            className={state.inputType === 'basicInput' ? 'underline' : ''}
            onClick={() => {
              if (state.inputType !== 'basicInput') {
                handleInputTypeChange('basicInput')
              }

            }}
            data-testid={'basicInputSelector'}
          >
            JSON
          </li>
          <li
            className={state.inputType === 'textInput' ? 'underline' : ''}
            onClick={() => {
              if (state.inputType !== 'textInput') {
                handleInputTypeChange('textInput')
              }

            }}
            data-testid={'textInputSelector'}
          >
            Delimeted
          </li>
        </ul>
        <button
          className='aButton'
          onClick={() => dispatch({type: "TOGGLE_QRSETTINGS_MODAL", payload: true})}
        >
          <FontAwesomeIcon className='FontAwesomeIcon' icon={faGear} />
        </button>
      </div>

      <div className='input'>
        {state.inputType === 'listInput' && 
          <div className='listInputContainer'>
            {state.arrayInput.map((item, index) => {
              return (
                <div className='inputContainer' key={index}>
                  <input
                    value={item}
                    onChange={(e) => {handleListInputChange(index, e.target.value)}}
                    data-testid={'listInputField'}
                  ></input>
                  <FontAwesomeIcon
                    className='FontAwesomeIcon'
                    icon={faXmark}
                    onClick={() => {handleListInputDelete(index)}}
                    data-testid={'listInputDelete'}
                  />
                </div>
              )
            })}
            <div className='inputContainer' onClick={() => handleListInputAdd()} data-testid={'listInputAdd'}>
              <button className='aButton-alt'>
                <FontAwesomeIcon className='FontAwesomeIcon' icon={faPlus} />
              </button>
            </div>
          </div>
        }
        {state.inputType === 'basicInput' && 
          <textarea
            onChange={e => dispatch({type: "SET_TEXT_INPUT", payload: e.target.value})}
            value={state.textInput}
            placeholder='Enter your array of strings. eg. ["item 1", "item 2", "item 3"]'
            className='textField'
            data-testid={'basicInputTextarea'}
          ></textarea>}
        {state.inputType === 'textInput' &&
          <textarea
            onChange={e => dispatch({type: "SET_TEXT_INPUT", payload: e.target.value})}
            value={state.textInput}
            placeholder='Enter your list of strings delimited with semi-colons. eg. item 1; item 2; item 3'
            className='textField'
            data-testid={'textInputTextarea'}
          ></textarea>}
        
        <div className='formControl'>
          <button
            className="inverse"
            onClick={() => {
              handleGeneration(state.textInput, state.inputType)
              dispatch({type: "SET_ARRAY_INPUT", payload: ['']})
              dispatch({type: "SET_TEXT_INPUT", payload: ''})
              dispatch({type: "SET_ERROR_MSG", payload: ''})
              dispatch({type: "SET_APP_VIEW", payload: 'input'})
            }}
            data-testid={'inputReset'}
          >
            Reset
          </button>
          <button
            onClick={() => {
              dispatch({type: "SET_ERROR_MSG", payload: ''})
              handleGeneration(state.textInput, state.inputType);
            }}
            data-testid={'inputGenerate'}
          >
            Generate
          </button>
        </div>
        {state.errorMsg &&
        <div className='errorDisplay' data-testid={'errorMsg'}>
          <h2 className='error'>{state.errorMsg}</h2>
        </div>}
      </div>
      {state.QRSettingsModal && <QRSettingsModal state={state} dispatch={dispatch}/>}
    </>
  )
}

export default InputRoute;
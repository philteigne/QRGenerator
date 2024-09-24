import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

import { stateObject } from '../interfaces/StateInterfaces'

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

    } else if (inputType === 'basicInput') {

      try {
        dispatch({type: "SET_ARRAY_INPUT", payload: JSON.parse(input)});
      } catch(e) {
        error = ('Input is not valid JSON')
      }

    } else if (inputType === 'textInput') {      
      const newInput = input.split(';').map(item => item.trim()).filter((item) => item.length > 0)

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
          >
            Delimeted
          </li>
        </ul>
      </div>

      <div className='input'>
        {state.inputType === 'listInput' && 
          <div className='listInputContainer'>
            {state.arrayInput.map((item, index) => {
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
        {state.inputType === 'basicInput' && 
          <textarea
            onChange={e => dispatch({type: "SET_TEXT_INPUT", payload: e.target.value})}
            value={state.textInput}
            placeholder='Enter your array of strings. eg. ["item 1", "item 2", "item 3"]'
            className='textField'
          ></textarea>}
        {state.inputType === 'textInput' &&
          <textarea
            onChange={e => dispatch({type: "SET_TEXT_INPUT", payload: e.target.value})}
            value={state.textInput}
            placeholder='Enter your list of strings delimited with semi-colons. eg. item 1; item 2; item 3'
            className='textField'
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
          >
            Reset
          </button>
          <button
            onClick={() => {
              console.log(state.textInput)
              dispatch({type: "SET_ERROR_MSG", payload: ''})
              handleGeneration(state.textInput, state.inputType);
              console.log(state.errorMsg)
            }}
          >
            Generate
          </button>
        </div>
        {state.errorMsg &&
        <div className='errorDisplay'>
          <h2 className='error'>{state.errorMsg}</h2>
        </div>}
      </div>
    </>
  )
}

export default InputRoute;
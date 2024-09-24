import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faDownload, faPenToSquare, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

import { stateObject, actionObject } from '../interfaces/StateInterfaces'

const InputRoute = (
  {state, dispatch, handleListInputChange, handleListInputAdd, handleListInputDelete, handleGeneration}:
  {state: stateObject, dispatch: Function, handleListInputChange: Function, handleListInputAdd: Function, handleListInputDelete: Function, handleGeneration: Function}
) => {

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
              dispatch({type: "SET_INPUT_TYPE", payload: 'listInput'})
              dispatch({type: "SET_ARRAY_INPUT", payload: ['']})
              dispatch({type: "SET_ERROR_MSG", payload: ''})
            }}
          >
            Listed
          </li>
          <li
            className={state.inputType === 'basicInput' ? 'underline' : ''}
            onClick={() => {
              dispatch({type: "SET_INPUT_TYPE", payload: 'basicInput'})
              dispatch({type: "SET_ARRAY_INPUT", payload: ['']})
              dispatch({type: "SET_ERROR_MSG", payload: ''})
            }}
          >
            JSON
          </li>
          <li
            className={state.inputType === 'textInput' ? 'underline' : ''}
            onClick={() => {
              dispatch({type: "SET_INPUT_TYPE", payload: 'textInput'})
              dispatch({type: "SET_ARRAY_INPUT", payload: ['']})
              dispatch({type: "SET_ERROR_MSG", payload: ''})
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
            placeholder='Enter your array of strings. eg. ["item 1", "item 2", "item 3"]'
            className='textField'
          ></textarea>}
        {state.inputType === 'textInput' &&
          <textarea
            onChange={e => dispatch({type: "SET_TEXT_INPUT", payload: e.target.value})}
            placeholder='Enter your list of strings delimited with semi-colons. eg. item 1; item 2; item 3'
            className='textField'
          ></textarea>}
        
        <div className='formControl'>
          <button
            className="inverse"
            onClick={() => {
              handleGeneration(state.textInput, state.inputType)
              dispatch({type: "SET_ARRAY_INPUT", payload: ['']})
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
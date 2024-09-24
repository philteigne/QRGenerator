import React, { useEffect, useState } from 'react';
import './App.css';

import InputRoute from './routes/InputRoute';
import OutputRoute from './routes/OutputRoute';

import useApplicationData from './hooks/stateReducer';


function App() {

  const { state, dispatch } = useApplicationData();

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

  return (
    <div className="App">
      <header>
        <h1 id='title'>BulQR</h1>
      </header>

      {state.appView === 'input' && 
        <InputRoute
          state={state}
          dispatch={dispatch}
          handleListInputChange={handleListInputChange}
          handleListInputAdd={handleListInputAdd}
          handleListInputDelete={handleListInputDelete}
          handleGeneration={handleGeneration}
        />
      }

      {state.appView === 'output' && 
        <OutputRoute 
          state={state}
          dispatch={dispatch}
        />
      }

    </div>
  );
}

export default App;
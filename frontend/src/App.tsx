import React, { useEffect, useState } from 'react';
import './App.css';

import InputRoute from './routes/InputRoute';
import OutputRoute from './routes/OutputRoute';

import useApplicationData from './hooks/stateReducer';


function App() {

  const { state, dispatch } = useApplicationData();

  return (
    <div className="App">
      <header>
        <h1 id='title'>BulQR</h1>
      </header>

      {state.appView === 'input' && 
        <InputRoute
          state={state}
          dispatch={dispatch}
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
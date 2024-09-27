import { useReducer } from 'react';
import { stateObject, actionObject } from '../interfaces/StateInterfaces'


const initialState: stateObject = {
  textInput: '',
  arrayInput: [''],
  inputType: 'listInput',
  appView: 'input',
  errorMsg: '',
  QRSettingsModal: false,
  QRSettings: {
    errorCorrection: 'L',
    width: 200,
    margin: 1
  }
};

const reducer = (state:stateObject, action:actionObject): stateObject => {
  switch (action.type) {
    case "SET_TEXT_INPUT":
      return {
        ...state,
        textInput: action.payload,
      }
    case "SET_ARRAY_INPUT":
      return {
        ...state,
        arrayInput: action.payload,
      }
    case "SET_INPUT_TYPE":
      return {
        ...state,
        inputType: action.payload,
      }
    case "SET_APP_VIEW":
      return {
        ...state,
        appView: action.payload,
      }
    case "SET_ERROR_MSG":
      return {
        ...state,
        errorMsg: action.payload,
      }
    case "TOGGLE_QRSETTINGS_MODAL":
      return {
        ...state,
        QRSettingsModal: action.payload
      }
    case "SET_QRSETTINGS":
      return {
        ...state,
        QRSettings: action.payload
      }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {state, dispatch};
}

export default useApplicationData;
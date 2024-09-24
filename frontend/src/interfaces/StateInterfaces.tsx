interface stateObject {
  textInput:string,
  arrayInput:string[],
  inputType:'listInput' | 'basicInput' | 'textInput',
  appView:'input' | 'output',
  errorMsg:string
}

interface actionObject {
  type:string,
  payload:any,
}

export type {stateObject, actionObject}
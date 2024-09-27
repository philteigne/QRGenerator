interface QRSettingsObject {
  errorCorrection:'L' | 'M' | 'Q' | 'H',
  height:number,
  width:number,
  margin:number,
}

interface stateObject {
  textInput:string,
  arrayInput:string[],
  inputType:'listInput' | 'basicInput' | 'textInput',
  appView:'input' | 'output',
  errorMsg:string,
  QRSettingsModal:boolean,
  QRSettings:QRSettingsObject
}

interface actionObject {
  type:string,
  payload:any,
}

export type {stateObject, actionObject, QRSettingsObject}
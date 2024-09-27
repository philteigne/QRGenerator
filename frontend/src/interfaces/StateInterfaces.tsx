interface QRSettingsObject {
  errorCorrection:'L' | 'M' | 'Q' | 'H',
  height:Number,
  width:Number,
  margin:Number,
}

interface stateObject {
  textInput:string,
  arrayInput:string[],
  inputType:'listInput' | 'basicInput' | 'textInput',
  appView:'input' | 'output',
  errorMsg:string,
  QRSettingsModal:Boolean,
  QRSettings:QRSettingsObject
}

interface actionObject {
  type:string,
  payload:any,
}

export type {stateObject, actionObject, QRSettingsObject}
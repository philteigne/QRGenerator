import {useState} from "react"

import { stateObject, QRSettingsObject } from "../interfaces/StateInterfaces";

const QRSettingsModal = (
  {state, dispatch}:
  {state: stateObject, dispatch: Function}
) => {

  const QRSettingsDefault:QRSettingsObject = {
    errorCorrection: 'L',
    height: 200,
    width: 200,
    margin: 1
  }

  const [QRSettingsUpdate, setQRSettingsUpdate] = useState(state.QRSettings);

  const handleClose = () => {
    dispatch({ type: "TOGGLE_QRSETTINGS_MODAL", payload: false });
  };

  return(
    <div className="modal">
      <form>
        <label>Error Correction Level:</label>
        <select
          onChange={e => setQRSettingsUpdate({...QRSettingsUpdate, errorCorrection: e.target.value as 'L' | 'M' | 'Q' | 'H'})}
        >
          <option value={'L'}>Low ~7%</option>
          <option value={'M'}>Medium ~15%</option>
          <option value={'Q'}>Quartile ~25%</option>
          <option value={'H'}>High ~30%</option>
        </select>
        <button
          onClick={() => setQRSettingsUpdate({...QRSettingsUpdate, errorCorrection: QRSettingsDefault.errorCorrection})}
        ></button>

        <label>width (px):</label>
        <input
          type="number"
          onChange={e => setQRSettingsUpdate({...QRSettingsUpdate, width: parseFloat(e.target.value)})}
        />
        <button
          onClick={() => setQRSettingsUpdate({...QRSettingsUpdate, width: QRSettingsDefault.width})}
        ></button>

        <label>height (px):</label>
        <input
          type="number"
          onChange={e => setQRSettingsUpdate({...QRSettingsUpdate, height: parseFloat(e.target.value)})}
        />
        <button
          onClick={() => setQRSettingsUpdate({...QRSettingsUpdate, height: QRSettingsDefault.height})}
        ></button>

        <label>margin (px):</label>
        <input
          type="number"
          onChange={e => setQRSettingsUpdate({...QRSettingsUpdate, height: parseFloat(e.target.value)})}
        />
        <button
          onClick={() => setQRSettingsUpdate({...QRSettingsUpdate, margin: QRSettingsDefault.margin})}
        ></button>
      </form>

      <button
        onClick={() => {
          setQRSettingsUpdate({...state.QRSettings});
          handleClose();
          console.log(state.QRSettingsModal)
        }}
      >
        Cancel
      </button>
      <button
        onClick={() => {
          dispatch({type: "SET_QRSETTINGS", payload: QRSettingsUpdate});
          handleClose();
          console.log(state.QRSettingsModal)
        }}
      >
        Save
      </button>
    </div>
  )
}

export default QRSettingsModal;
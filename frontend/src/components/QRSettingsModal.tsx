import {useState} from "react"

import { stateObject, QRSettingsObject } from "../interfaces/StateInterfaces";
import { faArrowsRotate, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="QRSettingsModal">
      <h2>QR Generation Settings</h2>
      <button className='aButton-alt QRSettingsCloseButton'
        onClick={() => handleClose()}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <form>
        <label>Error Correction Level:</label>
        <div className="QRSettingsInputContainer">
          <select
            className="QRSettingsInput"
            value={QRSettingsUpdate.errorCorrection}
            onChange={e => setQRSettingsUpdate({...QRSettingsUpdate, errorCorrection: e.target.value as 'L' | 'M' | 'Q' | 'H'})}
          >
            <option value={'L'}>Low ~7%</option>
            <option value={'M'}>Medium ~15%</option>
            <option value={'Q'}>Quartile ~25%</option>
            <option value={'H'}>High ~30%</option>
          </select>
          <button
            type="button"
            onClick={() => setQRSettingsUpdate({...QRSettingsUpdate, errorCorrection: state.QRSettings.errorCorrection})}
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>

        <label>Width (px):</label>
        <div className="QRSettingsInputContainer">
          <input
            className="QRSettingsInput"
            type="number"
            value={Number(QRSettingsUpdate.width)}
            placeholder={String(state.QRSettings.width)}
            onChange={e => setQRSettingsUpdate({...QRSettingsUpdate, width: parseFloat(e.target.value)})}
          />
          <button
            type="button"
            onClick={() => setQRSettingsUpdate({...QRSettingsUpdate, width: state.QRSettings.width})}
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>

        <label>Height (px):</label>
        <div className="QRSettingsInputContainer">
          <input
            className="QRSettingsInput"
            type="number"
            value={Number(QRSettingsUpdate.height)}
            placeholder={String(state.QRSettings.height)}
            onChange={e => setQRSettingsUpdate({...QRSettingsUpdate, height: parseFloat(e.target.value)})}
          />
          <button
            type="button"
            onClick={() => setQRSettingsUpdate({...QRSettingsUpdate, height: state.QRSettings.height})}
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>

        <label>Margin (px):</label>
        <div className="QRSettingsInputContainer">
          <input
            className="QRSettingsInput"
            type="number"
            value={Number(QRSettingsUpdate.margin)}
            placeholder={String(state.QRSettings.margin)}
            onChange={e => setQRSettingsUpdate({...QRSettingsUpdate, margin: parseFloat(e.target.value)})}
          />
          <button
            type="button"
            onClick={() => setQRSettingsUpdate({...QRSettingsUpdate, margin: state.QRSettings.margin})}
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>
      </form>

      <div className="QRFormControl">
        <button
          onClick={() => {
            setQRSettingsUpdate({...QRSettingsDefault});
          }}
          className="inverse"
        >
          Reset
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
    </div>
  )
}

export default QRSettingsModal;
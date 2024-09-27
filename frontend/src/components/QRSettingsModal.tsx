import {useState, useEffect} from "react"

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

  const [QRSettingsHeight, setQRSettingsHeight] = useState<'QRSettingsInput' | 'QRSettingsInput inputError'>('QRSettingsInput')
  const [QRSettingsWidth, setQRSettingsWidth] = useState<'QRSettingsInput' | 'QRSettingsInput inputError'>('QRSettingsInput')
  const [QRSettingsMargin, setQRSettingsMargin] = useState<'QRSettingsInput' | 'QRSettingsInput inputError'>('QRSettingsInput')

  const [QRSettingsUpdate, setQRSettingsUpdate] = useState<QRSettingsObject>(state.QRSettings);

  const handleClose = () => {
    dispatch({ type: "TOGGLE_QRSETTINGS_MODAL", payload: false });
  };

  useEffect(() => {
    if (QRSettingsUpdate.height < 50 || isNaN(QRSettingsUpdate.height)) {
      setQRSettingsHeight('QRSettingsInput inputError');
    } else {
      setQRSettingsHeight('QRSettingsInput');
    }
  }, [QRSettingsUpdate.height])

  useEffect(() => {
    if (QRSettingsUpdate.width < 50 || isNaN(QRSettingsUpdate.width)) {
      setQRSettingsWidth('QRSettingsInput inputError');
    } else {
      setQRSettingsWidth('QRSettingsInput');
    }
  }, [QRSettingsUpdate.width])
  
  useEffect(() => {
    if (QRSettingsUpdate.margin < 0) {
      setQRSettingsMargin('QRSettingsInput inputError');
    } else {
      setQRSettingsMargin('QRSettingsInput');
    }
  }, [QRSettingsUpdate.margin])

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

        {QRSettingsWidth === 'QRSettingsInput' ?
          <label>
            Width (px)
          </label>
          :
          <label>
            Width (px) <p className="labelError">Should be 50px or greater</p>
          </label>
        }
        <div className="QRSettingsInputContainer">
          <input
            className={QRSettingsWidth}
            type="number"
            value={QRSettingsUpdate.width}
            placeholder='0'
            onChange={e => setQRSettingsUpdate({...QRSettingsUpdate, width: parseFloat(e.target.value)})}
          />
          <button
            type="button"
            onClick={() => setQRSettingsUpdate({...QRSettingsUpdate, width: state.QRSettings.width})}
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>

        {QRSettingsHeight === 'QRSettingsInput' ?
          <label>
            Height (px)
          </label>
          :
          <label>
            Height (px) <p className="labelError">Should be 50px or greater</p>
          </label>
        }
        <div className="QRSettingsInputContainer">
          <input
            className={QRSettingsHeight}
            type="number"
            value={QRSettingsUpdate.height}
            placeholder='0'
            onChange={e => setQRSettingsUpdate({...QRSettingsUpdate, height: parseFloat(e.target.value)})}
          />
          <button
            type="button"
            onClick={() => setQRSettingsUpdate({...QRSettingsUpdate, height: state.QRSettings.height})}
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>

        {QRSettingsMargin === 'QRSettingsInput' ?
          <label>
            Margin (px)
          </label>
          :
          <label>
            Margin (px) <p className="labelError">Should be 0px or greater</p>
          </label>
        }
        <div className="QRSettingsInputContainer">
          <input
            className={QRSettingsMargin}
            type="number"
            value={QRSettingsUpdate.margin === 0 ? "" : QRSettingsUpdate.margin}
            placeholder='0'
            onChange={e => setQRSettingsUpdate({...QRSettingsUpdate, margin: e.target.value === "" ? 0 : parseFloat(e.target.value)})}
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
            // Pre-Check
            if (QRSettingsHeight === 'QRSettingsInput' && QRSettingsWidth === 'QRSettingsInput' && QRSettingsMargin === 'QRSettingsInput') {
              dispatch({type: "SET_QRSETTINGS", payload: QRSettingsUpdate});
              handleClose();
            }
            
          }}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default QRSettingsModal;
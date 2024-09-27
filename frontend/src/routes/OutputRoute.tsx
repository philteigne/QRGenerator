import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { stateObject } from '../interfaces/StateInterfaces'

import QRDisplay from '../components/QRDisplay';

import { generateQRCodeZip } from '../helpers/generateQR'

const OutputRoute = (
  {state, dispatch}:
  {state: stateObject, dispatch: Function}
) => {
  return (
    <>
      <div className='output'>
        <h2>Your QR codes are ready.</h2>
        <div className='outputControl'>
          <button
            className='aButton-inverse'
            onClick={() => dispatch({type: "SET_APP_VIEW", payload: 'input'})}
            data-testid={'editButton'}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <div>
            <p className='notification'>{state.arrayInput.length > 10 ? '10+' : state.arrayInput.length}</p>
            <button className='aButton' onClick={() => generateQRCodeZip(state.arrayInput)}><FontAwesomeIcon icon={faDownload} /></button>
          </div>
        </div>
      </div>

      <div className='QRContainer'>
        {state.arrayInput.length > 0 &&
          state.arrayInput.map((item: string, index) => {
            // Don't render empty strings
            if (item.length === 0) {
              return null;
            }
            return (
              <QRDisplay key={index} input={item} />
            );
          })
        }
      </div>
    </>
  )
}

export default OutputRoute;
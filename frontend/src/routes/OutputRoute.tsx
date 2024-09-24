import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faDownload, faPenToSquare, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

import { stateObject } from '../interfaces/StateInterfaces'

import QRDisplay from '../components/QRDisplay';

const OutputRoute = (
  {state, dispatch}:
  {state: stateObject, dispatch: Function}
) => {
  return (
    <>
      <div className='output'>
        <h2>Your QR codes are ready.</h2>
        <div className='outputControl'>
          <a className='aButton inverse' onClick={() => dispatch({type: "SET_APP_VIEW", payload: 'input'})}><FontAwesomeIcon icon={faPenToSquare} /></a>
          <a className='aButton'><FontAwesomeIcon icon={faDownload} /></a>
        </div>
      </div>

      <div className='QRContainer'>
        {state.arrayInput.length > 0 &&
          state.arrayInput.map((item: string, index) => {
            // Don't render empty strings
            if (item.length === 0) {
              return;
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
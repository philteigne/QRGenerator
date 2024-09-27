import { useEffect, useRef } from 'react';
import { generateQRCodeWeb } from '../helpers/generateQR';
import { generateQRCodeFile } from '../helpers/generateQR';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

const QRDisplay = ({ input }: { input: string }) => {

  const QRCanvasRef = useRef<HTMLCanvasElement | null>(null); // Reference to the canvas

  // useEffect to wait for DOM
  useEffect(() => {
    if (QRCanvasRef.current) {
      generateQRCodeWeb(QRCanvasRef, input);
    }
  });

  return (
    <div className='QRDisplay' data-testid={'QRDisplayItem'}>
      <canvas className='QRCanvas' ref={QRCanvasRef} data-testid={'QRCanvas'}></canvas>
      <div className='QRInfo'>
        <h3 data-testid={'QRTitle'}>
          {input.length <= 10 ? input : input.slice(0, 9) + '...'}
        </h3>
        <div className='QRControl'>
          <button className='aButton-inverse' onClick={() => generateQRCodeFile(input)} data-testid={'QRDownload'}>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default QRDisplay;

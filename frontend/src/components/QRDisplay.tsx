import React, { useEffect, useRef } from 'react';
import { generateQRCodeWeb } from '../helpers/generateQR';
import { generateQRCodeFile } from '../helpers/generateQR';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faDownload, faPenToSquare, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

{/* <FontAwesomeIcon size='3x' icon={faShareNodes} />
  <FontAwesomeIcon size='3x' icon={faDownload} />
  <FontAwesomeIcon size='3x' icon={faPenToSquare} />
  <FontAwesomeIcon size='3x' icon={faPlus} />
  <FontAwesomeIcon icon={faXmark} /> */}

const QRDisplay = ({ input }: { input: string }) => {

  const QRCanvasRef = useRef<HTMLCanvasElement | null>(null); // Reference to the canvas

  // useEffect to wait for DOM
  useEffect(() => {
    if (QRCanvasRef.current) {
      generateQRCodeWeb(QRCanvasRef, input);
    }
  }, []);

  return (
    <div className='QRDisplay'>
      <canvas className='QRCanvas' ref={QRCanvasRef}></canvas>
      <div className='QRInfo'>
        <h3>{input}</h3>
        <div className='QRControl'>
          <a className='aButton inverse' onClick={() => generateQRCodeFile(input)}>
            <FontAwesomeIcon icon={faShareNodes} />
          </a>
          <a className='aButton inverse' onClick={() => generateQRCodeFile(input)}>
            <FontAwesomeIcon icon={faDownload} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default QRDisplay;

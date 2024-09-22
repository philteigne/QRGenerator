import React, { useEffect, useRef } from 'react';
import { generateQRCodeWeb } from '../helpers/generateQR';
import { generateQRCodeFile } from '../helpers/generateQR';


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
        <div>
          <button onClick={() => generateQRCodeFile(input)}>S</button>
          <button onClick={() => generateQRCodeFile(input)}>D</button>
        </div>
      </div>
    </div>
  );
}

export default QRDisplay;

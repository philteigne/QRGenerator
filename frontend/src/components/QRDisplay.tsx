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
    <div>
      <canvas ref={QRCanvasRef}></canvas>
      <button onClick={() => generateQRCodeFile(input)}>Download</button>
    </div>
  );
}

export default QRDisplay;

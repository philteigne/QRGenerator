import React, { useEffect, useRef } from 'react';
import { generateQRCodeWeb } from '../helpers/generateQR';


const QRDisplay = ({ input }: { input: string }) => {

  const QRCanvasRef = useRef<HTMLCanvasElement | null>(null); // Reference to the canvas

  // useEffect to wait for DOM
  useEffect(() => {
    if (QRCanvasRef.current) {
      generateQRCodeWeb(QRCanvasRef, input);
    }
  }, []); // Run whenever the input changes


  return (
    <canvas ref={QRCanvasRef}></canvas>
  );
}

export default QRDisplay;

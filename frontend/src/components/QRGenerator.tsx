import React, { useState, useEffect } from "react";
import { generateQRCodeFile } from '../helpers/generateQR';

const QRGenerator = ({ input }: { input: string }) => {


  // Given a string, return a link that when clicked downloads an associated QR Code
  return (
    <button onClick={() => generateQRCodeFile(input)}>
      Download
    </button>
  );
};

export default QRGenerator;

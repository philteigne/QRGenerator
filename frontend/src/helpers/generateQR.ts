import JSZip from "jszip";
const QRCode = require('qrcode')


export const generateQRCodeWeb = (
  QRCanvas: React.RefObject<HTMLCanvasElement>,
  input: string,
  errorCorrectionInput: 'L' | 'M' | 'Q' | 'H'
) => {
  if (!QRCanvas.current) {
    return;
  }

  const canvasWidth = QRCanvas.current.clientWidth;

  QRCode.toCanvas(QRCanvas.current, input, {width: canvasWidth, errorCorrectionLevel: errorCorrectionInput}, (error: any) => {
    if (error) {
      console.log(error)
    } else {
      console.log('QR code generated')
    }
  })
}

export const generateQRCodeFile = (
  input: string,
  errorCorrectionInput: 'L' | 'M' | 'Q' | 'H',
  widthInput:number,
  marginInput:number
) => {
  QRCode.toString(input, { type: 'svg', errorCorrectionLevel: errorCorrectionInput, width: widthInput + marginInput, margin: marginInput }, (error: any, svg: string) => {
    if (error) {
      console.log(error);
    } else {
      console.log('QR code SVG generated')
    }

    // Create a Blob from the SVG string
    const blob = new Blob([svg], { type: 'image/svg+xml' });

    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'qrcode';  // Set the file name and extension
    link.click();  // Trigger the download
  })
}

export const generateQRCodeZip = (inputArray: string[]) => {
  const zip = new JSZip();

  for (let item of inputArray) {
    QRCode.toString(item, { type: 'svg' }, (error: any, svg: string) => {
      if (error) {
        console.log(error);
      } else {
        console.log('QR code SVG generate')
      }

      const blob = new Blob([svg], { type: 'image/svg+xml' });
      zip.file(`${item}.svg`, blob);
    })
  }

  zip.generateAsync({ type: 'blob' })
    .then((zip) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zip);
      link.download = 'qrcode.zip';
      link.click();
    })

}

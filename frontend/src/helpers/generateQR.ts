const QRCode = require('qrcode')


export const generateQRCodeWeb = (QRCanvas: React.RefObject<HTMLCanvasElement>, input: string) => {

  if (!QRCanvas.current) {
    return;
  }

  QRCode.toCanvas(QRCanvas.current, input, (error: any) => {
    if (error) {
      console.log(error)
    } else {
      console.log('QR code generated')
    }
  })
}

export const generateQRCodeFile = (input: string) => {
  QRCode.toString(input, { type: 'svg' }, (error: any, svg: string) => {
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
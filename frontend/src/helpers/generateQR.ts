const QRCode = require('qrcode')

const generateQRCode = (QRCanvas: React.RefObject<HTMLCanvasElement>, input: string) => {

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

export default generateQRCode
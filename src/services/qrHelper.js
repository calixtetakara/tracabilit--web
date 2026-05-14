import QRCode from 'qrcode';

export const generateQRCodeDataURL = async (text, width = 200) => {
  try {
    return await QRCode.toDataURL(text, { width, margin: 2 });
  } catch (err) {
    console.error('QR generation error', err);
    return null;
  }
};
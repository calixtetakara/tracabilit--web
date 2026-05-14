// src/components/common/QRCodeDisplay.jsx
import { useEffect, useState } from 'react';  // useRef retiré car inutilisé
import { generateQRCodeDataURL } from '../../services/qrHelper';
import { LucideIcon } from './LucideIcon';

export const QRCodeDisplay = ({ lotId, size = 160, showPrint = false }) => {
  const [qrUrl, setQrUrl] = useState(null);

  useEffect(() => {
    const url = `${window.location.origin}${window.location.pathname}?lot=${lotId}`;
    generateQRCodeDataURL(url, size).then(setQrUrl);
  }, [lotId, size]);

  const printQR = () => {
    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"><title>QR — ${lotId}</title>
      <style>
        *{margin:0;padding:0;box-sizing:border-box;}
        body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#fff;padding:20px;}
        .card{border:2px solid #1e3a1e;border-radius:16px;padding:24px;text-align:center;max-width:320px;}
        .brand{font-size:1.1rem;font-weight:800;color:#1e3a1e;}
        .sub{font-size:0.7rem;color:#2c5e2a;margin-bottom:12px;}
        .qr-img{width:180px;height:180px;margin:12px auto;display:block;}
        .lot-id{background:#eef3e6;padding:4px 12px;border-radius:40px;font-family:monospace;display:inline-block;margin-top:12px;}
      </style>
      </head>
      <body>
        <div class="card">
          <div class="brand">ChainCacao</div>
          <div class="sub">Traçabilité EUDR — Togo</div>
          <img src="${qrUrl}" class="qr-img" alt="QR Code" />
          <div class="lot-id">${lotId}</div>
        </div>
        <script>setTimeout(() => window.print(), 500);</script>
      </body>
      </html>
    `);
    win.document.close();
  };

  if (!qrUrl) return <div className="qr-placeholder">Génération QR...</div>;

  return (
    <div className="qr-box">
      <img src={qrUrl} alt="QR Code" width={size} height={size} />
      {showPrint && (
        <button className="btn btn-outline btn-sm" onClick={printQR}>
          <LucideIcon name="Printer" size={14} /> Imprimer
        </button>
      )}
    </div>
  );
};
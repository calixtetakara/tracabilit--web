import { useState } from 'react';
import { genererRapportEUDR } from '../../services/pdfGenerator';
import { fmtDate } from '../../utils/helpers';
import { LucideIcon } from '../common/LucideIcon';
import { QRCodeDisplay } from '../common/QRCodeDisplay';
import { Timeline } from '../common/Timeline';

export const VerifierLot = ({ lots }) => {
  const [lotId, setLotId] = useState('');
  const [lot, setLot] = useState(null);
  const [error, setError] = useState('');

  const verifier = () => {
    const found = lots.find(l => l.id === lotId);
    if (!found) { setError('Lot introuvable.'); setLot(null); return; }
    setLot(found);
    setError('');
  };

  return (
    <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
      <div className="card-title"><div className="icon-box purple"><LucideIcon name="Scan" /></div>Vérification et traçabilité (EUDR)</div>
      <label>Identifiant du lot</label>
      <div className="input-row">
        <input type="text" value={lotId} onChange={e => setLotId(e.target.value)} placeholder="Ex: CACAO-0001" />
        <button className="btn btn-primary btn-sm" onClick={verifier}><LucideIcon name="Search" /> Vérifier</button>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {lot && (
        <>
          <div className="result-box">
            <div className="row"><span className="key">Identifiant</span><span className="val"><span className="lot-id">{lot.id}</span></span></div>
            <div className="row"><span className="key">Espèce</span><span className="val">{lot.espece}</span></div>
            <div className="row"><span className="key">Producteur</span><span className="val">{lot.producteur}</span></div>
            <div className="row"><span className="key">Coopérative</span><span className="val">{lot.cooperative}</span></div>
            <div className="row"><span className="key">GPS parcelle</span><span className="val">{lot.gpsOrigine}</span></div>
            <div className="row"><span className="key">Date récolte</span><span className="val">{fmtDate(lot.dateRecolte)}</span></div>
            <div className="row"><span className="key">Poids initial</span><span className="val">{lot.poidsInitial} kg</span></div>
            <div className="row"><span className="key">Transformé</span><span className="val">{lot.transformed ? 'Oui' : 'Non'}</span></div>
            <div className="row"><span className="key">Exporté</span><span className="val">{lot.exported ? 'Oui' : 'Non'}</span></div>
          </div>
          <div className="divider">Historique de traçabilité</div>
          <Timeline events={lot.historique} />
          <QRCodeDisplay lotId={lot.id} />
          <button className="btn btn-accent btn-full" style={{ marginTop: 16 }} onClick={() => genererRapportEUDR(lot)}>
            <LucideIcon name="FileText" /> Télécharger le rapport EUDR (PDF)
          </button>
        </>
      )}
    </div>
  );
};
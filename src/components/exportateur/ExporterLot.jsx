import { useState } from 'react';
import { genererRapportEUDR } from '../../services/pdfGenerator';
import { setLots } from '../../services/storage';
import { LotBadge } from '../common/LotBadge';
import { LucideIcon } from '../common/LucideIcon';

export const ExporterLot = ({ user, updateLots, lots }) => {
  const [lotId, setLotId] = useState('');
  const [selectedLot, setSelectedLot] = useState(null);
  const [conteneur, setConteneur] = useState('');
  const [port, setPort] = useState('Port de Lomé');
  const [dest, setDest] = useState('France');
  const [message, setMessage] = useState('');

  const chargerLot = () => {
    const lot = lots.find(l => l.id === lotId);
    if (!lot) { setMessage('Lot introuvable.'); setSelectedLot(null); return; }
    if (!lot.transformed) { setMessage('Lot non encore transformé.'); setSelectedLot(null); return; }
    setSelectedLot(lot);
    setMessage('');
  };

  const validerExport = () => {
    if (!selectedLot || selectedLot.exported) return;
    if (!conteneur) { setMessage('Numéro de conteneur obligatoire.'); return; }
    const historique = [...selectedLot.historique, {
      etape: 'Export maritime',
      acteur: user.nom,
      poids: selectedLot.nouveauPoids || selectedLot.poidsInitial,
      localisation: port,
      date: new Date().toISOString(),
      comment: `Conteneur ${conteneur} — Destination : ${dest}`
    }];
    const updatedLot = { ...selectedLot, exported: true, derniereEtape: user.nom, historique };
    const newLots = lots.map(l => l.id === selectedLot.id ? updatedLot : l);
    setLots(newLots);
    updateLots(newLots);
    setSelectedLot(updatedLot);
    setMessage('Export validé. Génération du rapport EUDR...');
    setTimeout(() => genererRapportEUDR(updatedLot), 300);
  };

  const lotsPrets = lots.filter(l => l.transformed && !l.exported);

  return (
    <div className="grid-2">
      <div className="card">
        <div className="card-title"><div className="icon-box blue"><LucideIcon name="Ship" /></div>Valider un export</div>
        <label>Identifiant du lot</label>
        <div className="input-row">
          <input type="text" value={lotId} onChange={e => setLotId(e.target.value)} placeholder="CACAO-0001" />
          <button className="btn btn-primary btn-sm" onClick={chargerLot}><LucideIcon name="Search" /> Charger</button>
        </div>
        {message && <div className="alert alert-info">{message}</div>}
        {selectedLot && (
          <>
            <div className="result-box">
              <div className="row"><span className="key">Identifiant</span><span className="val">{selectedLot.id}</span></div>
              <div className="row"><span className="key">Producteur</span><span className="val">{selectedLot.producteur}</span></div>
              <div className="row"><span className="key">Espèce</span><span className="val">{selectedLot.espece}</span></div>
              <div className="row"><span className="key">GPS origine</span><span className="val">{selectedLot.gpsOrigine}</span></div>
              <div className="row"><span className="key">Poids transformé</span><span className="val">{selectedLot.nouveauPoids || selectedLot.poidsInitial} kg</span></div>
              <div className="row"><span className="key">Statut</span><span className="val"><LotBadge lot={selectedLot} /></span></div>
            </div>
            {!selectedLot.exported && (
              <div>
                <div className="divider">Informations d'export</div>
                <label>Numéro de conteneur</label>
                <input type="text" value={conteneur} onChange={e => setConteneur(e.target.value)} placeholder="MSCU1234567" />
                <label>Port de départ</label>
                <input type="text" value={port} onChange={e => setPort(e.target.value)} />
                <label>Pays de destination</label>
                <input type="text" value={dest} onChange={e => setDest(e.target.value)} />
                <button className="btn btn-accent" onClick={validerExport}><LucideIcon name="CheckCircle" /> Valider + Rapport EUDR</button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="card">
        <div className="card-title"><div className="icon-box green"><LucideIcon name="PackageCheck" /></div>Lots prêts ({lotsPrets.length})</div>
        {lotsPrets.map(lot => (
          <div key={lot.id} className="lot-item" onClick={() => { setLotId(lot.id); chargerLot(); }}>
            <div><div className="lot-id">{lot.id}</div><div className="lot-meta">{lot.producteur} — {lot.nouveauPoids || lot.poidsInitial} kg</div></div>
            <LucideIcon name="ArrowRight" size={15} />
          </div>
        ))}
        {lotsPrets.length === 0 && <div className="alert alert-success">Tous les lots ont été exportés.</div>}
      </div>
    </div>
  );
};
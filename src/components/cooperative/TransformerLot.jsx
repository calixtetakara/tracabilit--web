import { useState } from 'react';
import {setLots } from '../../services/storage';
import { QRCodeDisplay } from '../common/QRCodeDisplay';
import { LotBadge } from '../common/LotBadge';
import { IconBox } from '../common/IconBox';
import { LucideIcon } from '../common/LucideIcon';

export const TransformerLot = ({ user, updateLots, lots }) => {
  const [lotId, setLotId] = useState('');
  const [selectedLot, setSelectedLot] = useState(null);
  const [poids, setPoids] = useState('');
  const [lieu, setLieu] = useState('Atelier Kloto');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);

  const chargerLot = () => {
    const lot = lots.find(l => l.id === lotId);
    if (!lot) {
      setMessage('Lot introuvable.');
      setSelectedLot(null);
      setQrGenerated(false);
      return;
    }
    setSelectedLot(lot);
    setMessage('');
    setQrGenerated(lot.transformed);
  };

  const validerTransformation = () => {
    if (!selectedLot || selectedLot.transformed) return;
    const newPoids = parseFloat(poids) || selectedLot.poidsInitial;
    const historique = [
      ...selectedLot.historique,
      {
        etape: 'Transformation',
        acteur: user.nom,
        poids: newPoids,
        localisation: lieu,
        date: new Date().toISOString(),
        comment: comment || 'Transformation effectuée',
      },
    ];
    const updatedLot = {
      ...selectedLot,
      transformed: true,
      nouveauPoids: newPoids,
      derniereEtape: user.nom,
      historique,
    };
    const newLots = lots.map(l => (l.id === selectedLot.id ? updatedLot : l));
    setLots(newLots);
    updateLots(newLots);
    setSelectedLot(updatedLot);
    setQrGenerated(true);
    setMessage('Lot transformé. QR code généré.');
  };

  const lotsEnAttente = lots.filter(l => !l.transformed);

  return (
    <div className="grid-2">
      {/* Colonne gauche : recherche et transformation */}
      <div className="card">
        <div className="card-title">
          <IconBox icon="Search" />Rechercher un lot
        </div>
        <label>Identifiant du lot</label>
        <div className="input-row">
          <input
            type="text"
            value={lotId}
            onChange={(e) => setLotId(e.target.value)}
            placeholder="Ex: CACAO-0001"
          />
          <button className="btn btn-primary btn-sm" onClick={chargerLot}>
            <LucideIcon name="Search" size={14} /> Charger
          </button>
        </div>
        {message && <div className="alert alert-info">{message}</div>}

        {selectedLot && (
          <>
            <div className="result-box">
              <div className="row">
                <span className="key">Identifiant</span>
                <span className="val">{selectedLot.id}</span>
              </div>
              <div className="row">
                <span className="key">Espèce</span>
                <span className="val">{selectedLot.espece}</span>
              </div>
              <div className="row">
                <span className="key">Producteur</span>
                <span className="val">{selectedLot.producteur}</span>
              </div>
              <div className="row">
                <span className="key">GPS origine</span>
                <span className="val">{selectedLot.gpsOrigine}</span>
              </div>
              <div className="row">
                <span className="key">Poids initial</span>
                <span className="val">{selectedLot.poidsInitial} kg</span>
              </div>
              <div className="row">
                <span className="key">Statut</span>
                <span className="val"><LotBadge lot={selectedLot} /></span>
              </div>
            </div>

            {!selectedLot.transformed && (
              <div>
                <div className="divider">Paramètres de transformation</div>
                <label>Nouveau poids (kg)</label>
                <input
                  type="number"
                  value={poids}
                  onChange={(e) => setPoids(e.target.value)}
                  placeholder="Laisser vide = poids initial"
                />
                <label>Lieu de transformation</label>
                <input
                  type="text"
                  value={lieu}
                  onChange={(e) => setLieu(e.target.value)}
                />
                <label>Procédé</label>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ex: Fermentation 5j + torréfaction"
                />
                <button className="btn btn-accent" onClick={validerTransformation}>
                  <LucideIcon name="RefreshCw" /> Transformer et générer QR
                </button>
              </div>
            )}

            {qrGenerated && <QRCodeDisplay lotId={selectedLot.id} showPrint />}
          </>
        )}
      </div>

      {/* Colonne droite : liste des lots en attente */}
      <div className="card">
        <div className="card-title">
          <div className="icon-box green">
            <LucideIcon name="List" />
          </div>
          Lots en attente ({lotsEnAttente.length})
        </div>
        {lotsEnAttente.length === 0 ? (
          <div className="alert alert-success">Aucun lot en attente.</div>
        ) : (
          lotsEnAttente.map((lot) => (
            <div
              key={lot.id}
              className="lot-item"
              onClick={() => {
                setLotId(lot.id);
                chargerLot();
              }}
            >
              <div>
                <div className="lot-id">{lot.id}</div>
                <div className="lot-meta">
                  {lot.producteur} — {lot.poidsInitial} kg
                </div>
              </div>
              <LucideIcon name="ArrowRight" size={15} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
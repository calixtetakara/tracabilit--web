import { useState } from 'react';
import { getLots, setLots } from '../../services/storage';
import { LucideIcon } from '../common/LucideIcon';

export const NouvelleRecolte = ({ user, updateLots }) => {
  const [espece, setEspece] = useState('Cacao Forastero');
  const [poids, setPoids] = useState(100);
  const [gps, setGps] = useState('6.1372, 1.2123');
  const [dateRecolte, setDateRecolte] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');
  const [imageSac, setImageSac] = useState(null);
  const [message, setMessage] = useState('');

  const handleGpsCurrent = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setGps(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`),
        () => alert('Impossible d\'obtenir la position.')
      );
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImageSac(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const saveLot = () => {
    if (!poids || poids <= 0) { setMessage('Poids invalide.'); return; }
    const lots = getLots();
    const newId = `CACAO-${String(lots.length + 1).padStart(4, '0')}`;
    const newLot = {
      id: newId,
      espece,
      poidsInitial: poids,
      producteur: `${user.nom} ${user.prenom}`,
      producteurPhone: user.phone,
      cooperative: 'COOPAC Kloto', // à rendre dynamique si besoin
      gpsOrigine: gps,
      dateRecolte,
      imageSac: imageSac || null,
      historique: [{
        etape: 'Création récolte',
        acteur: `${user.nom} ${user.prenom}`,
        poids,
        localisation: gps,
        date: new Date().toISOString(),
        comment: notes || `Récolte ${espece}`
      }],
      transformed: false,
      exported: false,
      derniereEtape: `${user.nom} ${user.prenom}`,
      nouveauPoids: null,
    };
    setLots([...lots, newLot]);
    updateLots([...lots, newLot]);
    setMessage(`Lot enregistré. Identifiant : ${newId} — À noter sur le sac.`);
    setPoids(100);
    setNotes('');
    setImageSac(null);
    // reset image preview
    const fileInput = document.getElementById('lot-image-input');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="content-page" style={{ maxWidth: 600, margin: '0 auto' }}>
      <div className="card">
        <div className="card-title"><div className="icon-box green"><LucideIcon name="Sprout" /></div>Enregistrer une nouvelle récolte</div>
        <label>Espèce</label>
        <select value={espece} onChange={e => setEspece(e.target.value)}>
          <option>Cacao Forastero</option><option>Cacao Criollo</option><option>Café Robusta</option><option>Café Arabica</option>
        </select>
        <label>Poids récolté (kg)</label>
        <input type="number" value={poids} onChange={e => setPoids(parseFloat(e.target.value))} step="0.1" />
        <label>Coordonnées GPS de la parcelle</label>
        <div className="input-row">
          <input type="text" value={gps} onChange={e => setGps(e.target.value)} placeholder="6.1372, 1.2123" />
          <button className="btn btn-outline btn-sm" onClick={handleGpsCurrent}><LucideIcon name="MapPin" size={14} /> Position</button>
        </div>
        <label>Date de récolte</label>
        <input type="date" value={dateRecolte} onChange={e => setDateRecolte(e.target.value)} />
        <label>Photo du sac (optionnel)</label>
        <div className="img-upload-zone" onClick={() => document.getElementById('lot-image-input').click()}>
          <input id="lot-image-input" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          <div className="img-upload-icon"><LucideIcon name="Camera" size={28} /></div>
          <div className="img-upload-text">{imageSac ? 'Photo sélectionnée' : 'Cliquer pour ajouter une photo du sac'}</div>
          {imageSac && <img src={imageSac} alt="aperçu" className="img-preview" style={{ display: 'block', maxHeight: 120 }} />}
        </div>
        <label>Notes (optionnel)</label>
        <textarea rows="3" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Méthode de récolte, conditions météo..." />
        <button className="btn btn-primary" onClick={saveLot}><LucideIcon name="Save" /> Enregistrer le lot</button>
        {message && <div className="alert alert-info">{message}</div>}
      </div>
    </div>
  );
};
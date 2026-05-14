import { useState } from 'react';
import { fmtDate } from '../../utils/helpers';
import { LotBadge } from '../common/LotBadge';
import { Timeline } from '../common/Timeline';
import { LucideIcon } from '../common/LucideIcon';

export const MesLots = ({ user, lots }) => {
  const myLots = lots.filter(l => l.producteurPhone === user.phone);
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="card">
      <div className="card-title"><div className="icon-box"><LucideIcon name="Package" /></div>Mes lots ({myLots.length})</div>
      {myLots.length === 0 && <div className="alert alert-info">Aucun lot enregistré.</div>}
      {myLots.slice().reverse().map(lot => (
        <div key={lot.id}>
          <div className="lot-item" onClick={() => setExpanded(expanded === lot.id ? null : lot.id)}>
            <div>
              <div className="lot-id">{lot.id}</div>
              <div className="lot-meta">{lot.espece} — {lot.poidsInitial} kg — {fmtDate(lot.dateRecolte)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <LotBadge lot={lot} />
              <LucideIcon name="ChevronDown" size={14} />
            </div>
          </div>
          {expanded === lot.id && (
            <div style={{ marginBottom: 16 }}>
              {lot.imageSac && <img src={lot.imageSac} style={{ maxHeight: 160, borderRadius: 12, marginBottom: 8 }} alt="sac" />}
              <div className="result-box">
                <div className="row"><span className="key">GPS origine</span><span className="val">{lot.gpsOrigine}</span></div>
                <div className="row"><span className="key">Coopérative</span><span className="val">{lot.cooperative}</span></div>
                <div className="row"><span className="key">Poids transformé</span><span className="val">{lot.nouveauPoids || lot.poidsInitial} kg</span></div>
              </div>
              <Timeline events={lot.historique} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
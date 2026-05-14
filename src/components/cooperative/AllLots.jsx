import { useState } from 'react';
import { Timeline } from '../common/Timeline';
import { LotBadge } from '../common/LotBadge';
import { fmtDate } from '../../utils/helpers';
import { LucideIcon } from '../common/LucideIcon';
export const AllLots = ({ lots }) => {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="card">
      <div className="card-title"><div className="icon-box green"><LucideIcon name="List" /></div>Tous les lots ({lots.length})</div>
      {lots.slice().reverse().map(lot => (
        <div key={lot.id}>
          <div className="lot-item" onClick={() => setExpanded(expanded === lot.id ? null : lot.id)}>
            <div>
              <div className="lot-id">{lot.id}<span className="lot-meta"> — {lot.producteur}</span></div>
              <div className="lot-meta">{lot.espece} — {lot.poidsInitial} kg — {fmtDate(lot.dateRecolte)}</div>
            </div>
            <LotBadge lot={lot} />
          </div>
          {expanded === lot.id && <Timeline events={lot.historique} />}
        </div>
      ))}
    </div>
  );
};
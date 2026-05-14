import { LucideIcon } from './LucideIcon';
import { fmtDateTime } from '../../utils/helpers';

export const Timeline = ({ events }) => {
  if (!events || events.length === 0) return <p className="text-soft">Aucun historique.</p>;
  return (
    <div className="timeline">
      {events.map((ev, idx) => (
        <div key={idx} className="timeline-event">
          <div className="timeline-step"><span className="badge badge-orange">{ev.etape}</span> — {ev.acteur}</div>
          <div className="timeline-detail">
            <LucideIcon name="Calendar" size={11} /> {fmtDateTime(ev.date)}<br />
            <LucideIcon name="MapPin" size={11} /> {ev.localisation} &nbsp;|&nbsp; <LucideIcon name="Scale" size={11} /> {ev.poids} kg
            {ev.comment && <><br /><LucideIcon name="FileText" size={11} /> {ev.comment}</>}
          </div>
        </div>
      ))}
    </div>
  );
};
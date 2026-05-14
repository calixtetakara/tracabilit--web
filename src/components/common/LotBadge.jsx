import { LucideIcon } from './LucideIcon';

export const LotBadge = ({ lot }) => {
  if (lot.exported) return <span className="badge badge-blue"><LucideIcon name="Ship" size={10} /> Exporté</span>;
  if (lot.transformed) return <span className="badge badge-green"><LucideIcon name="CheckCircle" size={10} /> Transformé</span>;
  return <span className="badge badge-orange"><LucideIcon name="Clock" size={10} /> En attente</span>;
};
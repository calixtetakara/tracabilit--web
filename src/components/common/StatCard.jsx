import { LucideIcon } from './LucideIcon';

export const StatCard = ({ icon, value, label }) => (
  <div className="stat-card">
    <div className="stat-icon"><LucideIcon name={icon} size={22} /></div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);
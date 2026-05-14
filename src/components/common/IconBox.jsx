import { LucideIcon } from './LucideIcon';

export const IconBox = ({ icon, bg = 'accent' }) => (
  <div className={`icon-box ${bg}`}>
    <LucideIcon name={icon} size={15} />
  </div>
);
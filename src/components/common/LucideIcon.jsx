import * as LucideIcons from 'lucide-react';

export const LucideIcon = ({ name, size = 15, className = '' }) => {
  const Icon = LucideIcons[name];
  return Icon ? <Icon size={size} className={className} /> : null;
};
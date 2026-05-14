export const normalizePhone = (p) => p.trim().replace(/[^0-9+]/g, '');

export const fmtDate = (d) => {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString('fr-FR'); } catch { return d; }
};

export const fmtDateTime = (d) => {
  if (!d) return '';
  try { return new Date(d).toLocaleString('fr-FR'); } catch { return d; }
};
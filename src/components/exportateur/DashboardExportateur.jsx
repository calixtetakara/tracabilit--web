import { LotBadge } from '../common/LotBadge';
import { StatCard } from '../common/StatCard';
import { LucideIcon } from '../common/LucideIcon';

export const DashboardExportateur = ({ lots, onNavigate }) => {
  const ready = lots.filter(l => l.transformed && !l.exported);
  const exported = lots.filter(l => l.exported);
  const exportedWeight = exported.reduce((s, l) => s + (l.nouveauPoids || l.poidsInitial), 0);

  return (
    <div className="content-page">
      <div className="stats-grid">
        <StatCard icon="PackageCheck" value={ready.length} label="Prêts à exporter" />
        <StatCard icon="Ship" value={exported.length} label="Lots exportés" />
        <StatCard icon="Scale" value={`${exportedWeight} kg`} label="Poids exporté" />
        <StatCard icon="ShieldCheck" value={exported.length} label="Rapports EUDR" />
      </div>
      <div className="card">
        <div className="card-title"><div className="icon-box green"><LucideIcon name="PackageCheck" /></div>Lots prêts à exporter ({ready.length})</div>
        {ready.length === 0 && <div className="alert alert-info">Aucun lot en attente d'exportation.</div>}
        {ready.slice(0, 5).map(lot => (
          <div key={lot.id} className="lot-item" onClick={() => onNavigate('exporter')}>
            <div><div className="lot-id">{lot.id}</div><div className="lot-meta">{lot.producteur} — {lot.nouveauPoids || lot.poidsInitial} kg</div></div>
            <LotBadge lot={lot} />
          </div>
        ))}
      </div>
    </div>
  );
};
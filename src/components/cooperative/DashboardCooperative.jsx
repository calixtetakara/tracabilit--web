import { StatCard } from '../common/StatCard';
import { LotBadge } from '../common/LotBadge';
import { LucideIcon } from '../common/LucideIcon';
export const DashboardCooperative = ({ lots, onNavigate }) => {
  const totalLots = lots.length;
  const totalWeight = lots.reduce((s, l) => s + l.poidsInitial, 0);
  const transformed = lots.filter(l => l.transformed).length;
  const pending = lots.filter(l => !l.transformed).length;
  const percent = totalLots ? Math.round((transformed / totalLots) * 100) : 0;

  return (
    <div className="content-page">
      <div className="stats-grid">
        <StatCard icon="Package" value={totalLots} label="Lots enregistrés" />
        <StatCard icon="Scale" value={`${totalWeight} kg`} label="Poids total reçu" />
        <StatCard icon="CheckCircle" value={transformed} label="Lots transformés" />
        <StatCard icon="Clock" value={pending} label="En attente" />
      </div>
      <div className="card">
        <div className="card-title"><div className="icon-box green"><LucideIcon name="TrendingUp" /></div>Taux de transformation</div>
        <div className="progress-info"><span>Transformés : <strong>{transformed}</strong> / <strong>{totalLots}</strong></span><span>{percent}%</span></div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${percent}%` }}></div></div>
      </div>
      <div className="card">
        <div className="card-title"><div className="icon-box"><LucideIcon name="Clock" /></div>En attente de transformation ({pending})</div>
        {pending === 0 && <div className="alert alert-success">Tous les lots ont été transformés.</div>}
        {lots.filter(l => !l.transformed).slice(0, 5).map(lot => (
          <div key={lot.id} className="lot-item" onClick={() => onNavigate('transformer')}>
            <div><div className="lot-id">{lot.id}</div><div className="lot-meta">{lot.producteur} — {lot.poidsInitial} kg</div></div>
            <LotBadge lot={lot} />
          </div>
        ))}
      </div>
    </div>
  );
};
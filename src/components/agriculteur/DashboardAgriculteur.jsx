import { fmtDate } from '../../utils/helpers';
import { IconBox } from '../common/IconBox';
import { LotBadge } from '../common/LotBadge';
import { StatCard } from '../common/StatCard';

export const DashboardAgriculteur = ({ user, lots, onNavigate }) => {
  const myLots = lots.filter(l => l.producteurPhone === user.phone);
  const totalWeight = myLots.reduce((s, l) => s + l.poidsInitial, 0);
  const target = 500;
  const percent = Math.min(100, Math.round((totalWeight / target) * 100));

  return (
    <div className="content-page">
      <h2 className="page-title">Bonjour, {user.nom} {user.prenom}</h2>
      <div className="stats-grid">
        <StatCard icon="Package" value={myLots.length} label="Lots enregistrés" />
        <StatCard icon="Scale" value={`${totalWeight} kg`} label="Poids total récolté" />
        <StatCard icon="CheckCircle" value={myLots.filter(l => l.transformed).length} label="Lots transformés" />
        <StatCard icon="Ship" value={myLots.filter(l => l.exported).length} label="Lots exportés" />
      </div>
      <div className="card">
        <div className="card-title"><IconBox icon="Target" bg="green" />Progression saison</div>
        <div className="progress-info"><span>Récolte actuelle : <strong>{totalWeight} kg</strong></span><span>Objectif : <strong>{target} kg</strong></span></div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${percent}%` }}></div></div>
        <div className="progress-percent">{percent}% de l'objectif atteint</div>
      </div>
      <div className="card">
        <div className="card-title"><IconBox icon="Package" />Mes derniers lots</div>
        {myLots.length === 0 ? (
          <div className="alert alert-info">Aucun lot enregistré. <button className="link-btn" onClick={() => onNavigate('new-lot')}>Enregistrer une récolte</button></div>
        ) : (
          myLots.slice(-5).reverse().map(lot => (
            <div key={lot.id} className="lot-item" onClick={() => onNavigate('mes-lots')}>
              <div><div className="lot-id">{lot.id}</div><div className="lot-meta">{lot.espece} — {lot.poidsInitial} kg — {fmtDate(lot.dateRecolte)}</div></div>
              <LotBadge lot={lot} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
// src/components/dashboard/TraçabilitéDashboard.jsx
import { useState, useEffect } from 'react';
import { getLots, setLots as setLotsStorage } from '../../services/storage';
import { DashboardAgriculteur } from '../agriculteur/DashboardAgriculteur';
import { NouvelleRecolte } from '../agriculteur/NouvelleRecolte';
import { MesLots } from '../agriculteur/MesLots';
import { DashboardCooperative } from '../cooperative/DashboardCooperative';
import { TransformerLot } from '../cooperative/TransformerLot';
import { AllLots } from '../cooperative/AllLots';
import { DashboardExportateur } from '../exportateur/DashboardExportateur';
import { ExporterLot } from '../exportateur/ExporterLot';
import { VerifierLot } from '../exportateur/VerifierLot';
import { Guide } from '../Guide';
import { LucideIcon } from '../common/LucideIcon';

export default function TraçabilitéDashboard({ user, onLogout }) {
  // ✅ une seule variable d'état 'lots', utilisée dans toutes les props
  const [lots, setLots] = useState(getLots());
  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setLots(getLots()), 500);
    return () => clearInterval(interval);
  }, []);

  const updateLots = (newLots) => {
    setLotsStorage(newLots);  // sauvegarde dans localStorage
    setLots(newLots);         // met à jour l'état local
  };

  const tabsByRole = {
    agriculteur: [
      { id: 'dash-agri', label: 'Tableau de bord', icon: 'LayoutDashboard', comp: DashboardAgriculteur, props: { user, lots, onNavigate: setCurrentTab } },
      { id: 'new-lot', label: 'Nouvelle récolte', icon: 'Sprout', comp: NouvelleRecolte, props: { user, updateLots } },
      { id: 'mes-lots', label: 'Mes lots', icon: 'Package', comp: MesLots, props: { user, lots } },
      { id: 'guide', label: 'Comment ça marche', icon: 'Info', comp: Guide, props: {} },
    ],
    cooperative: [
      { id: 'dash-coop', label: 'Tableau de bord', icon: 'LayoutDashboard', comp: DashboardCooperative, props: { lots, onNavigate: setCurrentTab } },
      { id: 'transformer', label: 'Transformer un lot', icon: 'RefreshCw', comp: TransformerLot, props: { user, updateLots, lots } },
      { id: 'all-lots', label: 'Tous les lots', icon: 'List', comp: AllLots, props: { lots } },
      { id: 'guide', label: 'Comment ça marche', icon: 'Info', comp: Guide, props: {} },
    ],
    exportateur: [
      { id: 'dash-export', label: 'Tableau de bord', icon: 'LayoutDashboard', comp: DashboardExportateur, props: { lots, onNavigate: setCurrentTab } },
      { id: 'exporter', label: 'Exporter un lot', icon: 'Ship', comp: ExporterLot, props: { user, updateLots, lots } },
      { id: 'verifier', label: 'Vérifier / Tracer', icon: 'Scan', comp: VerifierLot, props: { lots } },
      { id: 'guide', label: 'Comment ça marche', icon: 'Info', comp: Guide, props: {} },
    ],
  };

  const tabs = tabsByRole[user.role];
  const activeId = currentTab || (tabs && tabs[0]?.id);
  const active = tabs?.find(t => t.id === activeId);
  const ActiveComponent = active?.comp;

  if (!tabs) return <div>Rôle non reconnu</div>;

  return (
    <div className="app-screen">
      <div className="topbar">
        <div className="topbar-brand">
          <div className="logo-slot"><img src="/logo.png" alt="ChainCacao" style={{ width: 38, height: 38 }} /></div>
          ChainCacao
        </div>
        <div className="topbar-right">
          <span className="topbar-user">{user.nom} {user.prenom}</span>
          <span className="role-pill">{user.role === 'agriculteur' ? 'Agriculteur' : user.role === 'cooperative' ? 'Coopérative' : 'Exportateur'}</span>
          <button className="topbar-logout" onClick={onLogout}><LucideIcon name="LogOut" size={14} /> Déconnexion</button>
        </div>
      </div>
      <div className="nav-tabs">
        {tabs.map(tab => (
          <div key={tab.id} className={`nav-tab ${activeId === tab.id ? 'active' : ''}`} onClick={() => setCurrentTab(tab.id)}>
            <LucideIcon name={tab.icon} size={15} /> {tab.label}
          </div>
        ))}
      </div>
      <div className="page-content">
        {ActiveComponent && <ActiveComponent {...active.props} />}
      </div>
      <div className="footer">
        <strong>ChainCacao</strong> — Conforme au règlement UE 2025 (EUDR) — Traçabilité géolocalisée — Togo
      </div>
    </div>
  );
}
import { LucideIcon } from './common/LucideIcon';
export const Guide = () => (
  <div className="card" style={{ maxWidth: 780, margin: '0 auto' }}>
    <div className="card-title"><div className="icon-box"><LucideIcon name="Info" /></div>Comment fonctionne ChainCacao ?</div>
    <p style={{ marginBottom: 20 }}>
      ChainCacao trace chaque lot de cacao depuis la parcelle agricole jusqu'à l'exportation vers l'Union Européenne,
      garantissant la conformité au règlement EUDR (UE 2023/1115, applicable 2025).
    </p>
    {steps.map((step, i) => (
      <div key={i} className="guide-step">
        <div className="guide-step-num">{i+1}</div>
        <div className="guide-step-icon"><LucideIcon name={step.icon} /></div>
        <div><div className="guide-step-title">{step.title}</div><div className="guide-step-desc">{step.desc}</div></div>
      </div>
    ))}
    <div className="eudr-banner">
      <div className="eudr-banner-icon"><LucideIcon name="ShieldCheck" /></div>
      <div><div className="eudr-banner-title">Conformité EUDR garantie</div><div className="eudr-banner-desc">GPS d'origine — Horodatage immuable — Historique complet — Rapport PDF certifié</div></div>
    </div>
  </div>
);

const steps = [
  { icon: 'Sprout', title: 'Agriculteur — Enregistrement de la récolte', desc: 'L\'agriculteur enregistre son lot avec GPS, poids, date. Un identifiant unique est généré.' },
  { icon: 'Building2', title: 'Coopérative — Transformation et QR code', desc: 'La coopérative saisit l\'identifiant, transforme et génère un QR code imprimable.' },
  { icon: 'Ship', title: 'Exportateur — Validation et rapport EUDR', desc: 'L\'exportateur vérifie la chaîne, enregistre le conteneur et génère le rapport PDF certifié.' },
  { icon: 'Globe', title: 'Importateur UE — Vérification', desc: 'L\'importateur scanne le QR pour accéder à la traçabilité complète.' },
];
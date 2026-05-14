import { useState } from 'react';
import { getUsers, setUsers } from '../../services/storage';
import { normalizePhone } from '../../utils/helpers';

export const AuthScreen = ({ onLogin, onCancel }) => {
  const [mode, setMode] = useState('login');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regData, setRegData] = useState({ nom: '', prenom: '', phone: '', password: '', role: 'agriculteur' });
  const [error, setError] = useState('');
  const [registerMsg, setRegisterMsg] = useState('');

  const handleLogin = () => {
    const users = getUsers();
    const found = users.find(u => normalizePhone(u.phone) === normalizePhone(loginPhone) && u.password === loginPassword);
    if (!found) { setError('Numéro ou mot de passe incorrect.'); return; }
    onLogin(found);
  };

  const handleRegister = () => {
    const { nom, prenom, phone, password, role } = regData;
    if (!nom || !prenom || !phone || !password) { setRegisterMsg('Tous les champs sont requis.'); return; }
    const users = getUsers();
    if (users.find(u => normalizePhone(u.phone) === normalizePhone(phone))) { setRegisterMsg('Ce numéro est déjà utilisé.'); return; }
    const newUser = { id: Date.now(), phone: normalizePhone(phone), password, nom, prenom, role };
    setUsers([...users, newUser]);
    setRegisterMsg('Compte créé ! Connectez-vous.');
    setTimeout(() => setMode('login'), 1200);
  };

  return (
    <div className="auth-screen">
      <div className="auth-box">
        <div className="auth-logo">
          <div className="logo-slot-auth"><img src="/logo.png" alt="ChainCacao" style={{ width: 56, height: 56 }} /></div>
          <h1>ChainCacao</h1>
          <p>Plateforme de traçabilité EUDR — Togo</p>
        </div>
        <div className="auth-tabs">
          <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>Se connecter</button>
          <button className={`auth-tab ${mode === 'register' ? 'active' : ''}`} onClick={() => setMode('register')}>S'inscrire</button>
        </div>
        {mode === 'login' ? (
          <div>
            <label>Numéro de téléphone</label>
            <input type="tel" value={loginPhone} onChange={e => setLoginPhone(e.target.value)} placeholder="+228 90 123 456" />
            <label>Mot de passe</label>
            <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
            <button className="btn btn-primary" onClick={handleLogin}>Se connecter</button>
            {error && <div className="alert alert-error">{error}</div>}
          </div>
        ) : (
          <div>
            <div className="grid-2">
              <div><label>Nom</label><input type="text" value={regData.nom} onChange={e => setRegData({...regData, nom: e.target.value})} /></div>
              <div><label>Prénom</label><input type="text" value={regData.prenom} onChange={e => setRegData({...regData, prenom: e.target.value})} /></div>
            </div>
            <label>Téléphone</label>
            <input type="tel" value={regData.phone} onChange={e => setRegData({...regData, phone: e.target.value})} />
            <label>Mot de passe</label>
            <input type="password" value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})} />
            <label>Rôle</label>
            <select value={regData.role} onChange={e => setRegData({...regData, role: e.target.value})}>
              <option value="agriculteur">Agriculteur</option>
              <option value="cooperative">Coopérative</option>
              <option value="exportateur">Exportateur</option>
            </select>
            <button className="btn btn-primary" onClick={handleRegister}>Créer mon compte</button>
            {registerMsg && <div className="alert alert-info">{registerMsg}</div>}
          </div>
        )}
        <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={onCancel}>Retour à l'accueil</button>
      </div>
    </div>
  );
};
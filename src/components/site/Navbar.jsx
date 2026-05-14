// src/components/site/Navbar.jsx
import logo from '../../assets/logo.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#">
          <img src={logo} alt="Logo de Chaîne Cacao" />
          <h1>Chaîne Cacao</h1>
        </a>
      </div>
      <div className="nav-links">
        <a href="#"><i className="fas fa-home"></i> Accueil</a>
        <a href="#"><i className="fas fa-link"></i> Traçabilité</a>
        <a href="#"><i className="fas fa-search"></i> Vérifier un lot</a>
       <a href="#" className="btn-outline-nav" onClick={(e) => {
          e.preventDefault();
          window.location.href = '/dashboard.html';  // Redirection vers le dashboard HTML
        }}>
          <i className="fas fa-user-circle"></i> Connexion
        </a>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 5rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(12px);
          padding: 1rem 2rem;
          border-radius: 60px;
          border: 1px solid rgba(255, 215, 140, 0.25);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
          position: static;
        }

        .logo a {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .logo img {
          height: 60px;
          width: 60px;
          object-fit: cover;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .logo h1 {
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(120deg, #FBBF24, #F59E0B);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          letter-spacing: -0.5px;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .nav-links a {
          text-decoration: none;
          font-weight: 600;
          color: #fef7e0;
          transition: 0.3s ease;
          font-size: 1rem;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-links a i {
          font-size: 0.9rem;
        }

        .nav-links a:hover {
          color: #F9B23F;
          transform: translateY(-2px);
        }

        .btn-outline-nav {
          background: transparent;
          border: 1.5px solid #F9B23F;
          padding: 0.5rem 1.2rem;
          border-radius: 40px;
          color: #F9B23F !important;
          transition: all 0.3s;
        }

        .btn-outline-nav:hover {
          background: #F9B23F;
          color: #000 !important;
          border-color: #F9B23F;
        }

        @media (max-width: 800px) {
          .navbar {
            flex-direction: column;
            border-radius: 36px;
            padding: 1.2rem;
            gap: 0.8rem;
          }
          .nav-links {
            gap: 1.2rem;
            justify-content: center;
          }
        }

        @media (max-width: 550px) {
          .nav-links {
            gap: 1rem;
          }
          .nav-links a {
            font-size: 0.85rem;
          }
          .btn-outline-nav {
            padding: 0.4rem 0.9rem;
          }
        }

        .navbar {
          animation: fadeUp 0.7s ease-out;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
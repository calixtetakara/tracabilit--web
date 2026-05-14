// src/components/site/Accueil.jsx
import Navbar from "./Navbar";

const btnBase = {
  flex: '1 1 0',
  minWidth: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  height: '56px',
  padding: '0 1.5rem',
  borderRadius: '48px',
  border: '1.5px solid transparent',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  fontSize: '1rem',
  lineHeight: '1',
  transition: 'all 0.25s ease',
  cursor: 'pointer',
};

const btnPrimary = {
  ...btnBase,
  background: '#F9B23F',
  borderColor: '#F9B23F',
  color: '#1f2a0e',
};

const btnSecondary = {
  ...btnBase,
  background: 'rgba(255,255,245,0.12)',
  borderColor: 'rgba(255,215,140,0.7)',
  color: 'white',
  backdropFilter: 'blur(8px)',
};

export default function Accueil({ onConnexionClick }) {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

      <section className="hero">
        <div className="container">
          <Navbar onConnexionClick={onConnexionClick} />

          <div className="hero-content fade-up" style={{ animationDelay: '0.1s' }}>
            <h2>Traçabilité transparente <br /> <span className="highlight">café & cacao togolais</span></h2>
            <div className="description">
              De la parcelle à l'importateur européen : un historique complet, infalsifiable et accessible à tous.
              Valorisez votre récolte, obtenez vos certifications premium <strong>UE 2025</strong>.
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              alignItems: 'center',
              gap: '1.5rem',
              width: '100%',
              justifyContent: 'center',
            }}>
              <a href="#" style={btnPrimary}>
                <i className="fas fa-clipboard-list" style={{ fontSize: '1rem', lineHeight: 1 }}></i>
                Vérifier un lot
              </a>
              <a href="#" style={btnSecondary}>
                <i className="fas fa-chalkboard-user" style={{ fontSize: '1rem', lineHeight: 1 }}></i>
                Accéder à la plateforme
              </a>
            </div>

            <div className="badge-eu">
              <i className="fas fa-leaf"></i> normes EUDR · blockchain prête · certifiée origine
            </div>
          </div>
        </div>

        <div className="wave-bottom">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="#d4e0c8" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background-color: #f5f6f5;
          overflow-x: hidden;
        }

        .hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: url('https://pouvoirsafrique.com//uploads/imported_images/uploads/2023/09/ivoire-newsroom-cotedivoire-cacao-achat-limite-ccc-barry-callebaut-cargill.png') no-repeat center center/cover;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .hero::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(136, 152, 105, 0.75) 0%, rgba(0, 0, 0, 0.45) 100%);
          backdrop-filter: brightness(0.9);
          z-index: 1;
        }

        .container {
          position: relative;
          z-index: 2;
          width: 90%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .hero-content {
          max-width: 860px;
          margin: 2rem auto 3rem;
          padding: 1rem;
        }

        .hero-content h2 {
          font-size: clamp(2rem, 6vw, 3.8rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: white;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .hero-content .highlight {
          color: #F9B23F;
          border-bottom: 3px solid #F9B23F;
          display: inline-block;
          padding-bottom: 4px;
        }

        .description {
          font-size: 1.125rem;
          line-height: 1.5;
          color: rgba(255, 248, 225, 0.95);
          margin-bottom: 2.2rem;
          font-weight: 400;
          background: rgba(0,0,0,0.4);
          padding: 1rem 1.8rem;
          border-radius: 32px;
          backdrop-filter: blur(4px);
        }

        .badge-eu {
          margin-top: 3rem;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          padding: 0.7rem 1.5rem;
          border-radius: 60px;
          color: #FFDE9E;
          font-size: 0.85rem;
          font-weight: 500;
          border-left: 3px solid #F9B23F;
        }

        .badge-eu i {
          color: #F9B23F;
          font-size: 1.1rem;
        }

        .wave-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          line-height: 0;
          z-index: 2;
        }

        .wave-bottom svg {
          display: block;
          width: 100%;
          height: auto;
        }

        .fade-up {
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
    </>
  );
}
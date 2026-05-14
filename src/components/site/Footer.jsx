// src/components/site/Footer.jsx
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-icon">
              <i className="fas fa-link"></i>
            </div>
            <h3>Chaîne<span>Cacao</span></h3>
            <p>Traçabilité transparente pour le café et cacao togolais.</p>
            <div className="cert-badge">
              <i className="fas fa-check-circle"></i> Certifié EUDR 2025
            </div>
          </div>

          <div className="footer-links-group">
            <div className="footer-links">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#">Accueil</a></li>
                <li><a href="#">Traçabilité</a></li>
                <li><a href="#">Vérifier un lot</a></li>
                <li><a href="#">Plateforme</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Ressources</h4>
              <ul>
                <li><a href="#">Certifications</a></li>
                <li><a href="#">Aide</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Mentions légales</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-contact">
            <h4>Nous joindre</h4>
            <p><i className="fas fa-envelope"></i> hello@chainecacao.com</p>
            <p><i className="fas fa-phone-alt"></i> +228 70 00 00 00</p>
            <div className="socials">
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Chaîne Cacao – Tous droits réservés.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #eef2e7;
          border-top: 1px solid #cdd9c0;
          padding: 2rem 1rem 1rem;
          width: 100%;
          position: relative;
          clear: both;
          margin: 0;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }

        .footer-brand {
          flex: 1;
          min-width: 200px;
        }

        .footer-links-group {
          flex: 1.5;
          display: flex;
          justify-content: space-around;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-links {
          min-width: 120px;
        }

        .footer-contact {
          flex: 1;
          min-width: 180px;
        }

        .brand-icon {
          font-size: 2rem;
          color: #e67e22;
          margin-bottom: 0.5rem;
        }

        .footer-brand h3 {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 0.4rem 0;
        }

        .footer-brand p {
          font-size: 1.1rem;
          line-height: 1.4;
          color: #4a5b3e;
          max-width: 260px;
        }

        .cert-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #fff;
          border-radius: 40px;
          padding: 0.3rem 1rem;
          font-size: 1rem;
          font-weight: 600;
          color: #e67e22;
          margin-top: 0.8rem;
          border: 1px solid #e2e8d0;
        }

        .footer-links h4, .footer-contact h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.8rem;
          letter-spacing: 0.3px;
          color: #2d3e26;
        }

        .footer-links li {
          margin-bottom: 0.5rem;
        }

        .footer-links a {
          font-size: 1rem;
          text-decoration: none;
          color: #4a5b3e;
          transition: 0.2s;
        }

        .footer-contact p {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1rem;
          margin: 0.5rem 0;
          color: #4a5b3e;
        }

        .footer-contact i {
          width: 22px;
          font-size: 1rem;
          color: #e67e22;
        }

        .socials {
          display: flex;
          gap: 0.8rem;
          margin-top: 1rem;
        }

        .socials a {
          background: #e9efdf;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1rem;
          color: #5b6e4a;
          transition: all 0.2s;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 0.8rem;
          border-top: 1px solid #cdd9c0;
          font-size: 1rem;
          font-weight: 500;
          color: #2d3e26;
        }

        .footer-bottom p {
          margin: 0;
          color:#2d3e26;
        }

        @media (max-width: 900px) {
          .footer-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
          }
          .footer-brand p {
            max-width: 100%;
          }
          .footer-links-group {
            justify-content: center;
            text-align: center;
          }
          .footer-contact {
            text-align: center;
          }
          .socials {
            justify-content: center;
          }
          .footer-contact p {
            justify-content: center;
          }
          .cert-badge {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </footer>
  );
}
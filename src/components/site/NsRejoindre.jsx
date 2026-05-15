// src/components/JoinSection.jsx

export default function JoinSection() {
  return (
    <section className="join-section">
      <div className="join-bg">
        <div className="join-overlay"></div>
        <div className="join-container">
          <h2>Rejoindre la chaîne ChainCacao</h2>
          <p>
            Que vous soyez agriculteur, coopérative, transformateur ou exportateur,
            la plateforme vous attend.
          </p>
          <a href="/dashboard.html" className="join-button">
            Choisir mon rôle <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .join-section {
          background-color: #d4e0c8;
          border-radius: 40px;
          margin: 3rem auto;
          max-width: 1200px;
          padding: 16px;
        }

        .join-bg {
          position: relative;
          background-image: url('https://www.civitatis.com/f/republica-dominicana/santo-domingo/tour-cacao-tabaco-grid.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          border-radius: 32px;
          overflow: hidden;
          text-align: center;
          padding: 5rem 1.5rem;
        }

        @media (max-width: 768px) {
          .join-bg {
            background-attachment: scroll;
          }
        }

        .join-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.65);
          z-index: 1;
        }

        .join-container {
          position: relative;
          z-index: 2;
          max-width: 700px;
          margin: 0 auto;
        }

        h2 {
          font-size: 2.2rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1rem;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        p {
          font-size: 1.2rem;
          color: #fef7e0;
          margin-bottom: 2rem;
          line-height: 1.5;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        .join-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f5b642;
          border: none;
          padding: 0.9rem 2rem;
          border-radius: 60px;
          font-weight: 700;
          font-size: 1.1rem;
          color: #1f2a0e;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(245, 182, 66, 0.4);
          text-decoration: none;
        }

        .join-button:hover {
          background: #e6a032;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(245, 182, 66, 0.5);
        }

        .arrow {
          font-size: 1.2rem;
          transition: transform 0.2s;
          display: inline-block;
        }

        .join-button:hover .arrow {
          transform: translateX(5px);
        }

        @media (max-width: 768px) {
          .join-section {
            margin: 2rem 1rem;
            padding: 12px;
          }
          .join-bg {
            padding: 3rem 1rem;
          }
          h2 {
            font-size: 1.8rem;
          }
          p {
            font-size: 1rem;
          }
          .join-button {
            padding: 0.7rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
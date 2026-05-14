import { MapPin, Globe, Cpu } from 'lucide-react';

const Services = () => {

  const services = [
    {
      icon: MapPin,
      title: 'Stratégie Digitale',
      description:
        'Élaboration de stratégies de traçabilité et certifications premium (Bio, commerce équitable).',
    },
    {
      icon: Globe,
      title: 'Développement Web',
      description:
        'Plateforme de vérification pour agriculteurs, coopératives & exportateurs européens.',
    },
    {
      icon: Cpu,
      title: 'Transformation Numérique',
      description:
        'Automatisation de la preuve d’origine et conformité UE 2025 (anti‑déforestation).',
    },
  ];

  // Styles inline complets
  const sectionStyle = {
    backgroundColor: '#d4e0c8',
    paddingTop: '80px',
    paddingBottom: '80px',
    paddingLeft: '16px',
    paddingRight: '16px',
  };

  const containerStyle = {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '64px',
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '16px',
  };

  const subtitleStyle = {
    fontSize: '1.125rem',
    color: '#4b5563',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px', // Padding important pour les cadres
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f3f4f6',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const iconWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  };

  const cardTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#b45309',
    marginBottom: '12px',
  };

  const cardTextStyle = {
    color: '#6b7280',
    lineHeight: 1.5,
  };

  return (
    
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Nos Services</h2>
          <p style={subtitleStyle}>Des solutions sur mesure pour votre réussite</p>
        </div>
        <div style={gridStyle}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} style={cardStyle}>
                <div style={iconWrapperStyle}>
                  <Icon size={48} color="#b45309" />
                </div>
                <h3 style={cardTitleStyle}>{service.title}</h3>
                <p style={cardTextStyle}>{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
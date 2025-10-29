import React from 'react';

export const PeopleCreatorsBlock = ({ config, onUpdate }) => {
  const containerStyle = {
    width: '100%',
    backgroundColor: config.background || '#ffffff',
    paddingTop: `${config.padding?.top || 60}px`,
    paddingBottom: `${config.padding?.bottom || 60}px`,
    paddingLeft: '24px',
    paddingRight: '24px'
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: `${config.title?.size || 36}px`,
    fontWeight: config.title?.weight || 700,
    color: config.title?.color || '#1a1a1a',
    marginBottom: '48px',
    textAlign: 'center'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px',
    justifyContent: 'center'
  };

  const cardStyle = {
    backgroundColor: '#f8f8f8',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {config.title?.show && (
          <h2 style={titleStyle}>{config.title.text}</h2>
        )}
        
        <div style={gridStyle}>
          {config.creators?.map((creator) => (
            <div
              key={creator.id}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img
                src={creator.image}
                alt={creator.name}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '20px',
                  margin: '0 auto 20px'
                }}
              />
              <h3 style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '8px'
              }}>
                {creator.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666666'
              }}>
                {creator.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

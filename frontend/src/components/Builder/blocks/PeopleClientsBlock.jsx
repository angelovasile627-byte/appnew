import React from 'react';

export const PeopleClientsBlock = ({ config, onUpdate }) => {
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '32px',
    justifyContent: 'center'
  };

  const clientCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    borderRadius: '12px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {config.title?.show && (
          <h2 style={titleStyle}>{config.title.text}</h2>
        )}
        
        <div style={gridStyle}>
          {config.clients?.map((client) => (
            <div
              key={client.id}
              style={{
                ...clientCardStyle,
                backgroundColor: client.backgroundColor || '#f8f8f8'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                {client.logo}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 600,
                color: client.textColor || '#1a1a1a',
                margin: 0
              }}>
                {client.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

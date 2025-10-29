import React from 'react';

export const PeopleHiringBlock = ({ config, onUpdate }) => {
  const containerStyle = {
    width: '100%',
    backgroundColor: config.background || '#F8F8F8',
    paddingTop: `${config.padding?.top || 60}px`,
    paddingBottom: `${config.padding?.bottom || 60}px`,
    paddingLeft: '24px',
    paddingRight: '24px'
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  };

  const titleStyle = {
    fontSize: `${config.title?.size || 36}px`,
    fontWeight: config.title?.weight || 700,
    color: config.title?.color || '#1a1a1a',
    marginBottom: '16px'
  };

  const descStyle = {
    fontSize: `${config.description?.size || 16}px`,
    color: config.description?.color || '#666666',
    marginBottom: '32px',
    lineHeight: '1.6'
  };

  const jobCardStyle = {
    borderBottom: '1px solid #e5e5e5',
    paddingTop: '24px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={cardStyle}>
          {config.title?.show && (
            <h2 style={titleStyle}>{config.title.text}</h2>
          )}
          {config.description?.show && (
            <p style={descStyle}>{config.description.text}</p>
          )}
          
          {config.readMoreButton?.show && (
            <button
              style={{
                backgroundColor: config.readMoreButton.color || '#A8F5B8',
                color: config.readMoreButton.textColor || '#2B2B2B',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '24px'
              }}
            >
              {config.readMoreButton.text || 'Read more'}
            </button>
          )}

          {config.jobs?.map((job, index) => (
            <div key={job.id} style={jobCardStyle}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: '8px'
                }}>
                  {job.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  marginBottom: '8px'
                }}>
                  {job.description}
                </p>
                <span style={{
                  fontSize: '12px',
                  color: '#999999'
                }}>
                  {job.type}
                </span>
              </div>
              <button
                style={{
                  backgroundColor: job.buttonColor || '#333333',
                  color: job.buttonTextColor || '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {job.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

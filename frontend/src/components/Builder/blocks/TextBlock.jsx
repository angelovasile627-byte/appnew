import React from 'react';

export const TextBlock = ({ config, onUpdate }) => {
  // Container Style with Solid Background
  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.background?.color || '#FFFFFF',
    paddingTop: `${config.padding?.top || 100}px`,
    paddingBottom: `${config.padding?.bottom || 100}px`,
    paddingLeft: '2rem',
    paddingRight: '2rem'
  };

  // Title Style with Background Clip and Parallax Effect
  const titleStyle = {
    fontSize: `${config.title?.size || 120}px`,
    fontWeight: config.title?.weight || 700,
    color: config.title?.color || '#000000',
    backgroundImage: config.title?.backgroundImage?.value ? `url(${config.title.backgroundImage.value})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: config.title?.parallax !== false ? 'fixed' : 'scroll',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: config.title?.backgroundImage?.value ? 'transparent' : config.title?.color,
    textAlign: 'center',
    marginBottom: '2rem',
    lineHeight: '1.1'
  };

  // Description Style
  const descriptionStyle = {
    fontSize: `${config.description?.size || 16}px`,
    color: config.description?.color || '#333333',
    maxWidth: `${config.description?.maxWidth || 800}px`,
    textAlign: 'center',
    lineHeight: '1.7',
    marginBottom: '2rem'
  };

  // Button Style
  const buttonStyle = {
    display: 'inline-block',
    padding: '1rem 2.5rem',
    backgroundColor: config.button?.color || '#FF6B35',
    color: config.button?.textColor || '#FFFFFF',
    textDecoration: 'none',
    fontSize: `${config.button?.size || 16}px`,
    fontWeight: 600,
    borderRadius: '0.25rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none'
  };

  return (
    <div style={containerStyle}>
      {config.title?.show && (
        <h1 style={titleStyle}>
          {config.title.text}
        </h1>
      )}

      {config.description?.show && (
        <p style={descriptionStyle}>
          {config.description.text}
        </p>
      )}

      {config.button?.show && (
        <a
          href={config.button.link || '#'}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          {config.button.text}
        </a>
      )}
    </div>
  );
};

import React from 'react';
import { Button } from '../../ui/button';

export const ParallaxBlock = ({ config, onUpdate }) => {
  // Hero Section Style with Parallax
  const heroContainerStyle = {
    width: '100%',
    minHeight: config.hero?.height ? `${config.hero.height}vh` : '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: config.hero?.background?.value ? `url(${config.hero.background.value})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: config.hero?.background?.parallax ? 'fixed' : 'scroll',
    textAlign: 'center',
    color: config.hero?.title?.color || '#333333',
    padding: '2rem'
  };

  // Spacer Style
  const spacerStyle = {
    width: '100%',
    minHeight: `${config.spacer?.height || 400}px`,
    backgroundColor: config.spacer?.backgroundColor || '#333333'
  };

  // Cards Section Style with Parallax
  const cardsSectionStyle = {
    width: '100%',
    minHeight: `${config.cardsSection?.height || 1200}px`,
    backgroundImage: config.cardsSection?.background?.value ? `url(${config.cardsSection.background.value})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: config.cardsSection?.background?.parallax ? 'fixed' : 'scroll',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.6rem',
    padding: '2rem',
    flexWrap: 'wrap'
  };

  // Card Style
  const cardStyle = {
    display: 'flex',
    maxWidth: '320px',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '0.5rem',
    boxShadow: '0px 29px 38px -15px rgba(0,0,0,0.43)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const cardImageStyle = {
    width: '90%',
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginTop: '20px',
    borderRadius: '0.3rem'
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Hero Section */}
      <div style={heroContainerStyle}>
        {config.hero?.title?.show && (
          <h1 style={{
            fontSize: `${config.hero.title.size || 48}px`,
            fontWeight: config.hero.title.weight || 700,
            color: config.hero.title.color || '#333333',
            marginBottom: '1rem'
          }}>
            {config.hero.title.text}
          </h1>
        )}
        
        {config.hero?.description?.show && (
          <p style={{
            fontSize: `${config.hero.description.size || 16}px`,
            color: config.hero.description.color || '#333333',
            maxWidth: config.hero.description.maxWidth || '52ch',
            lineHeight: '1.5',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            {config.hero.description.text}
          </p>
        )}
        
        {config.hero?.button?.show && (
          <a
            href={config.hero.button.link || '#'}
            style={{
              display: 'inline-block',
              padding: '1rem 3.5rem',
              backgroundColor: config.hero.button.color || '#333333',
              color: config.hero.button.textColor || '#ffffff',
              textDecoration: 'none',
              textTransform: 'uppercase',
              borderRadius: '0.3rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              fontSize: `${config.hero.button.size || 14}px`
            }}
          >
            {config.hero.button.text}
          </a>
        )}
      </div>

      {/* Blank Spacer */}
      <div style={spacerStyle}></div>

      {/* Cards Section */}
      <div style={cardsSectionStyle}>
        {config.cards && config.cards.map((card, index) => (
          <div key={card.id || index} style={cardStyle}>
            <div
              style={{
                ...cardImageStyle,
                backgroundImage: `url(${card.image})`
              }}
            />
            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{
                fontWeight: 700,
                fontSize: '1.6rem',
                marginTop: '1rem',
                marginBottom: '0.5rem',
                color: '#333333'
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#666666',
                lineHeight: '1.5',
                marginBottom: '1.5rem'
              }}>
                {card.description}
              </p>
              <a
                href={card.link || '#'}
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 2.5rem',
                  backgroundColor: '#333333',
                  color: '#ffffff',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  borderRadius: '0.3rem',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem'
                }}
              >
                {card.linkText || 'Learn more'}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Second Blank Spacer */}
      <div style={spacerStyle}></div>
    </div>
  );
};

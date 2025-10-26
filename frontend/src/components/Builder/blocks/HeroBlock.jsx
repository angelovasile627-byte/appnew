import React from 'react';
import { Button } from '../../ui/button';

export const HeroBlock = ({ config, onUpdate }) => {
  const getBackground = () => {
    if (config.background.type === 'color') {
      return { backgroundColor: config.background.value };
    } else if (config.background.type === 'gradient') {
      return { background: config.background.value };
    } else if (config.background.type === 'image') {
      return {
        backgroundImage: `url(${config.background.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      };
    }
    return {};
  };

  const containerStyle = {
    ...getBackground(),
    minHeight: config.fullScreen ? '100vh' : 'auto',
    paddingTop: `${config.padding.top}px`,
    paddingBottom: `${config.padding.bottom}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
    margin: '0 auto',
    padding: '0 24px'
  };

  // Image-above-text layout
  if (config.layout === 'image-above-text') {
    return (
      <>
        <div style={containerStyle}>
          <div style={contentStyle}>
            {config.heroImage && config.heroImage.show && (
              <div 
                className="hero-image-container"
                style={{ 
                  marginBottom: '48px',
                  borderRadius: `${config.heroImage.borderRadius || 0}px`,
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}>
                <img
                  src={config.heroImage.src}
                  alt={config.heroImage.alt || 'Hero image'}
                  className="hero-image"
                  style={{
                    width: '100%',
                    height: `${config.heroImage.height || 600}px`,
                    objectFit: config.heroImage.objectFit || 'cover',
                    display: 'block'
                  }}
                />
              </div>
            )}
            {config.title.show && (
              <h1
                className="hero-title"
                style={{
                  fontSize: `${config.title.size || 56}px`,
                  fontWeight: config.title.weight || '700',
                  color: config.title.color,
                  textAlign: config.title.align,
                  marginBottom: '24px',
                  lineHeight: '1.2'
                }}
              >
                {config.title.text}
              </h1>
            )}
            {config.description.show && (
              <p
                className="hero-description"
                style={{
                  fontSize: `${config.description.size || 20}px`,
                  color: config.description.color,
                  textAlign: config.description.align,
                  marginBottom: '40px',
                  maxWidth: '800px',
                  margin: config.description.align === 'center' ? '0 auto 40px' : '0 0 40px',
                  lineHeight: '1.6'
                }}
              >
                {config.description.text}
              </p>
            )}
            {config.button.show && (
              <div style={{ textAlign: config.title.align }}>
                <Button
                  className="hero-button"
                  style={{
                    backgroundColor: config.button.color,
                    color: config.button.textColor,
                    padding: '16px 40px',
                    fontSize: `${config.button.size || 18}px`,
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'transform 0.2s',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {config.button.text}
                </Button>
              </div>
            )}
            {config.subtitle.show && config.subtitle.text && (
              <p
                className="hero-subtitle"
                style={{
                  fontSize: '16px',
                  color: config.subtitle.color,
                  textAlign: config.subtitle.align,
                  marginTop: '32px'
                }}
              >
                {config.subtitle.text}
              </p>
            )}
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 768px) {
            .hero-image-container {
              margin-bottom: 32px !important;
            }
            .hero-image {
              height: 300px !important;
            }
            .hero-title {
              font-size: 32px !important;
              margin-bottom: 16px !important;
            }
            .hero-description {
              font-size: 16px !important;
              margin-bottom: 24px !important;
            }
            .hero-button {
              padding: 12px 28px !important;
              font-size: 16px !important;
            }
            .hero-subtitle {
              font-size: 14px !important;
              margin-top: 20px !important;
            }
          }
          
          @media (max-width: 480px) {
            .hero-image-container {
              margin-bottom: 24px !important;
            }
            .hero-image {
              height: 250px !important;
            }
            .hero-title {
              font-size: 28px !important;
              margin-bottom: 12px !important;
            }
            .hero-description {
              font-size: 14px !important;
              margin-bottom: 20px !important;
            }
            .hero-button {
              padding: 10px 24px !important;
              font-size: 14px !important;
            }
          }
        `}</style>
      </>
    );
  }

  // Default layout (background-based)
  return (
    <div style={containerStyle}>
      {config.background.type === 'image' && config.background.overlay && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: config.background.overlayColor || 'rgba(0,0,0,0.5)'
          }}
        />
      )}
      <div style={{ ...contentStyle, position: 'relative', zIndex: 1 }}>
        {config.title.show && (
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '700',
              color: config.title.color,
              textAlign: config.title.align,
              marginBottom: '24px',
              lineHeight: '1.2'
            }}
          >
            {config.title.text}
          </h1>
        )}
        {config.description.show && (
          <p
            style={{
              fontSize: '20px',
              color: config.description.color,
              textAlign: config.description.align,
              marginBottom: '40px',
              maxWidth: '800px',
              margin: config.description.align === 'center' ? '0 auto 40px' : '0 0 40px',
              lineHeight: '1.6'
            }}
          >
            {config.description.text}
          </p>
        )}
        {config.button.show && (
          <div style={{ textAlign: config.title.align }}>
            <Button
              style={{
                backgroundColor: config.button.color,
                color: config.button.textColor,
                padding: '16px 40px',
                fontSize: '18px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {config.button.text}
            </Button>
          </div>
        )}
        {config.subtitle.show && config.subtitle.text && (
          <p
            style={{
              fontSize: '16px',
              color: config.subtitle.color,
              textAlign: config.subtitle.align,
              marginTop: '32px'
            }}
          >
            {config.subtitle.text}
          </p>
        )}
      </div>
    </div>
  );
};
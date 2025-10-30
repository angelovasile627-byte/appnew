import React from 'react';
import { Button } from '../../ui/button';

export const AboutBlock = ({ config, onUpdate }) => {
  // Get background value - handle both direct value and type/value structure
  const getBackgroundValue = () => {
    if (!config.background) return '#ffffff';
    if (config.background.type === 'gradient') return config.background.value;
    return config.background.value || config.background;
  };

  const containerStyle = {
    background: getBackgroundValue(),
    paddingTop: `${config.padding?.top || 100}px`,
    paddingBottom: `${config.padding?.bottom || 100}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    gap: '60px',
    alignItems: 'center',
    flexDirection: config.image?.position === 'right' ? 'row-reverse' : 'row'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Image Section */}
        {config.image?.show && config.image?.src && (
          <div
            style={{
              flex: '0 0 ' + (config.image.width || 500) + 'px',
              maxWidth: config.image.width || 500
            }}
          >
            <img
              src={config.image.src}
              alt={config.image.alt || 'About'}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: `${config.image.borderRadius || 8}px`,
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        )}
        
        {/* Content Section */}
        <div style={{ flex: 1 }}>
          {config.title?.show && (
            <h2
              style={{
                fontSize: `${config.title.size || 48}px`,
                fontWeight: config.title.weight || '700',
                color: config.title.color,
                textAlign: config.title.align,
                marginBottom: '12px'
              }}
            >
              {config.title.text}
            </h2>
          )}
          {config.subtitle?.show && (
            <h3
              style={{
                fontSize: `${config.subtitle.size || 20}px`,
                fontWeight: config.subtitle.weight || '500',
                color: config.subtitle.color,
                textAlign: config.subtitle.align,
                marginBottom: '24px'
              }}
            >
              {config.subtitle.text}
            </h3>
          )}
          {config.description?.show && (
            <p
              style={{
                fontSize: `${config.description.size || 16}px`,
                color: config.description.color,
                textAlign: config.description.align,
                marginBottom: '32px',
                lineHeight: '1.8',
                whiteSpace: 'pre-line'
              }}
            >
              {config.description.text}
            </p>
          )}
          {config.signatureImage?.show && config.signatureImage?.src && (
            <div style={{ marginBottom: '24px' }}>
              <img
                src={config.signatureImage.src}
                alt={config.signatureImage.alt || 'Signature'}
                style={{
                  width: config.signatureImage.width || 150,
                  height: 'auto'
                }}
              />
            </div>
          )}
          {config.button?.show && (
            <div style={{ textAlign: config.title?.align || 'left' }}>
              <Button
                style={{
                  backgroundColor: config.button.color,
                  color: config.button.textColor,
                  padding: '14px 32px',
                  fontSize: `${config.button.size || 16}px`,
                  fontWeight: '600',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onClick={() => window.open(config.button.link, '_blank')}
              >
                {config.button.text}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

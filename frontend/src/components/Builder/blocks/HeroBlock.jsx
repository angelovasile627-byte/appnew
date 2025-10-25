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
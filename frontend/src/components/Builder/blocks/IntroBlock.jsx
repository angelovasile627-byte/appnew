import React from 'react';
import { Button } from '../../ui/button';
import { Play } from 'lucide-react';

export const IntroBlock = ({ config, onUpdate }) => {
  const containerStyle = {
    backgroundColor: config.background.value,
    paddingTop: `${config.padding.top}px`,
    paddingBottom: `${config.padding.bottom}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {config.title.show && (
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              color: config.title.color,
              textAlign: config.title.align,
              marginBottom: '16px'
            }}
          >
            {config.title.text}
          </h2>
        )}
        {config.description.show && (
          <p
            style={{
              fontSize: '18px',
              color: config.description.color,
              textAlign: config.description.align,
              marginBottom: '48px',
              maxWidth: '700px',
              margin: config.description.align === 'center' ? '0 auto 48px' : '0 0 48px'
            }}
          >
            {config.description.text}
          </p>
        )}
        <div
          style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '32px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
          }}
        >
          {config.layout === 'video' && config.video && (
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <img
                src={config.video.thumbnail}
                alt="Video thumbnail"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
              >
                <Play style={{ width: '32px', height: '32px', color: '#1a1a2e', marginLeft: '4px' }} />
              </div>
            </div>
          )}
          {config.layout === 'image' && config.image && (
            <img
              src={config.image.src}
              alt={config.image.alt}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          )}
        </div>
        {config.button.show && (
          <Button
            style={{
              backgroundColor: config.button.color,
              color: config.button.textColor,
              padding: '14px 32px',
              fontSize: '16px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {config.button.text}
          </Button>
        )}
      </div>
    </div>
  );
};
import React from 'react';
import { Button } from '../../ui/button';

export const ArticleBlock = ({ config, onUpdate }) => {
  const containerStyle = {
    backgroundColor: config.background.value,
    paddingTop: `${config.padding.top}px`,
    paddingBottom: `${config.padding.bottom}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
    margin: '0 auto',
    padding: '0 24px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: config.layout === 'centered' ? '1fr' : '1fr 1fr',
    gap: '60px',
    alignItems: 'center'
  };

  const imageContent = (
    <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
      <img
        src={config.image.src}
        alt={config.image.alt}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );

  const textContent = (
    <div>
      {config.title.show && (
        <h2
          style={{
            fontSize: '38px',
            fontWeight: '700',
            color: config.title.color,
            textAlign: config.layout === 'centered' ? 'center' : config.title.align,
            marginBottom: '20px',
            lineHeight: '1.3'
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
            textAlign: config.layout === 'centered' ? 'center' : config.description.align,
            marginBottom: '32px',
            lineHeight: '1.7'
          }}
        >
          {config.description.text}
        </p>
      )}
      {config.button.show && (
        <div style={{ textAlign: config.layout === 'centered' ? 'center' : config.title.align }}>
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
        </div>
      )}
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {config.layout === 'centered' ? (
          <div>
            {textContent}
            <div style={{ marginTop: '48px' }}>{imageContent}</div>
          </div>
        ) : (
          <div style={gridStyle}>
            {config.layout === 'image-left' ? (
              <>
                {imageContent}
                {textContent}
              </>
            ) : (
              <>
                {textContent}
                {imageContent}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
import React from 'react';
import { Button } from '../../ui/button';

export const HeroParallaxBlock = ({ config, onUpdate }) => {
  const getBackgroundStyle = () => {
    if (config.background.type === 'color') {
      return { backgroundColor: config.background.value };
    } else if (config.background.type === 'gradient') {
      return { background: config.background.value };
    } else if (config.background.type === 'image') {
      return {
        backgroundImage: `url(${config.background.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return {};
  };

  const containerStyle = {
    position: 'relative',
    minHeight: config.fullScreen ? '100vh' : 'auto',
    width: '100%',
    overflow: 'hidden',
    ...getBackgroundStyle(),
    paddingTop: !config.fullScreen ? `${config.paddingTop || 4}rem` : '0',
    paddingBottom: !config.fullScreen ? `${config.paddingBottom || 5}rem` : '0'
  };

  const overlayStyle = config.overlay?.show ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: config.overlay.color,
    opacity: config.overlay.opacity,
    zIndex: 1
  } : null;

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
    margin: '0 auto',
    padding: config.fullScreen ? `${config.paddingTop || 4}rem 24px ${config.paddingBottom || 5}rem` : '0 24px',
    textAlign: config.title?.align || 'center'
  };

  return (
    <div style={containerStyle} data-block-type="hero-parallax">
      {/* Overlay Layer */}
      {overlayStyle && <div style={overlayStyle} />}

      {/* Content Layer */}
      <div style={contentWrapperStyle}>
        {config.wrap?.show && (
          <div style={{
            maxWidth: `${config.wrap.width || 800}px`,
            margin: '0 auto',
            padding: '40px',
            borderRadius: '12px',
            backgroundColor: config.wrap.backgroundColor || 'transparent'
          }}>
            {config.title?.show && (
              <h1
                style={{
                  fontSize: `${config.title.size || 64}px`,
                  fontWeight: config.title.weight || 700,
                  color: config.title.color,
                  textAlign: config.title.align,
                  marginBottom: '24px',
                  lineHeight: '1.2'
                }}
              >
                {config.title.text}
              </h1>
            )}
            
            {config.description?.show && (
              <p
                style={{
                  fontSize: `${config.description.size || 20}px`,
                  color: config.description.color,
                  textAlign: config.description.align,
                  marginBottom: '40px',
                  lineHeight: '1.6',
                  maxWidth: '700px',
                  margin: config.description.align === 'center' ? '0 auto 40px' : '0 0 40px'
                }}
              >
                {config.description.text}
              </p>
            )}
            
            {config.button?.show && (
              <div style={{ textAlign: config.title?.align || 'center' }}>
                <Button
                  style={{
                    backgroundColor: config.button.color,
                    color: config.button.textColor,
                    padding: '16px 40px',
                    fontSize: `${config.button.size || 18}px`,
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {config.button.text}
                </Button>
              </div>
            )}
          </div>
        )}

        {!config.wrap?.show && (
          <>
            {config.title?.show && (
              <h1
                style={{
                  fontSize: `${config.title.size || 64}px`,
                  fontWeight: config.title.weight || 700,
                  color: config.title.color,
                  textAlign: config.title.align,
                  marginBottom: '24px',
                  lineHeight: '1.2'
                }}
              >
                {config.title.text}
              </h1>
            )}
            
            {config.description?.show && (
              <p
                style={{
                  fontSize: `${config.description.size || 20}px`,
                  color: config.description.color,
                  textAlign: config.description.align,
                  marginBottom: '40px',
                  lineHeight: '1.6',
                  maxWidth: '700px',
                  margin: config.description.align === 'center' ? '0 auto 40px' : '0 0 40px'
                }}
              >
                {config.description.text}
              </p>
            )}
            
            {config.button?.show && (
              <div style={{ textAlign: config.title?.align || 'center' }}>
                <Button
                  style={{
                    backgroundColor: config.button.color,
                    color: config.button.textColor,
                    padding: '16px 40px',
                    fontSize: `${config.button.size || 18}px`,
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {config.button.text}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Bottom White Space */}
      {config.whiteSpace?.bottom > 0 && (
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${config.whiteSpace.bottom}px`,
            backgroundColor: '#ffffff',
            zIndex: 3
          }}
        />
      )}
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../ui/button';

export const HeroParallaxBlock = ({ config, onUpdate }) => {
  const parallaxRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!config.parallax?.enabled) return;

    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const scrolled = window.pageYOffset;
          setScrollY(scrolled);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [config.parallax?.enabled]);

  const getBackground = () => {
    if (config.background.type === 'color') {
      return { backgroundColor: config.background.value };
    } else if (config.background.type === 'gradient') {
      return { background: config.background.value };
    } else if (config.background.type === 'image') {
      const parallaxSpeed = config.parallax?.speed || 0.5;
      const yOffset = config.parallax?.enabled ? scrollY * parallaxSpeed : 0;
      
      return {
        backgroundImage: `url(${config.background.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: config.parallax?.enabled ? 'scroll' : 'fixed',
        transform: config.parallax?.enabled ? `translateY(${yOffset}px)` : 'none',
        transition: 'transform 0.1s ease-out',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      };
    } else if (config.background.type === 'video') {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      };
    }
    return {};
  };

  const containerStyle = {
    position: 'relative',
    minHeight: config.fullScreen ? '100vh' : '600px',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
    margin: '0 auto',
    padding: `${config.padding.top}px 24px ${config.padding.bottom}px`,
    textAlign: config.title?.align || 'center'
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

  return (
    <div ref={parallaxRef} style={containerStyle} data-block-type="hero-parallax">
      {/* Top White Space */}
      {config.whiteSpace?.top > 0 && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: `${config.whiteSpace.top}px`,
            backgroundColor: '#ffffff',
            zIndex: 3
          }}
        />
      )}

      {/* Background Layer */}
      {config.background.type === 'image' && (
        <div style={getBackground()} />
      )}
      
      {config.background.type === 'video' && config.background.value && (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            objectFit: 'cover'
          }}
        >
          <source src={config.background.value} type="video/mp4" />
        </video>
      )}

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

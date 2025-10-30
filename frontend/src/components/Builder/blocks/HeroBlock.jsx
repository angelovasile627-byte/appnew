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
    paddingTop: `${config.padding?.top || 100}px`,
    paddingBottom: `${config.padding?.bottom || 100}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth || 1000}px`,
    margin: '0 auto',
    padding: '0 24px'
  };

  // Image-above-text layout
  if (config.layout === 'image-above-text') {
    return (
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
    );
  }

  // Particles Hero layout (for Prezentare theme)
  if (config.layout === 'particles-hero') {
    return (
      <div style={{
        ...containerStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Particles.js would be here - simplified for now */}
        {config.particles?.enabled && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-circle(at center, ${config.particles.color}15 0%, transparent 70%)`,
              pointerEvents: 'none'
            }}
          />
        )}
        
        <div style={{ ...contentStyle, position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Profile Image */}
          {config.profileImage?.show && config.profileImage?.src && (
            <div style={{ marginBottom: '32px' }}>
              <img
                src={config.profileImage.src}
                alt={config.profileImage.alt || 'Profile'}
                style={{
                  width: `${config.profileImage.size || 200}px`,
                  height: `${config.profileImage.size || 200}px`,
                  borderRadius: config.profileImage.borderRadius,
                  border: config.profileImage.border,
                  objectFit: 'cover',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                }}
              />
            </div>
          )}
          
          {/* Title */}
          {config.title?.show && (
            <h1
              style={{
                fontSize: `${config.title.size || 64}px`,
                fontWeight: config.title.weight || '700',
                color: config.title.color,
                textAlign: config.title.align,
                marginBottom: '16px',
                lineHeight: '1.2'
              }}
            >
              {config.title.text}
            </h1>
          )}
          
          {/* Subtitle with rotating text */}
          {config.subtitle?.show && (
            <h2
              style={{
                fontSize: `${config.subtitle.size || 24}px`,
                fontWeight: config.subtitle.weight || '400',
                color: config.subtitle.color,
                textAlign: config.subtitle.align,
                marginBottom: '24px'
              }}
            >
              {config.subtitle.text}
            </h2>
          )}
          
          {/* Description */}
          {config.description?.show && (
            <p
              style={{
                fontSize: `${config.description.size || 18}px`,
                color: config.description.color,
                textAlign: config.description.align,
                marginBottom: '40px',
                maxWidth: '700px',
                margin: '0 auto 40px',
                lineHeight: '1.6'
              }}
            >
              {config.description.text}
            </p>
          )}
          
          {/* Multiple Buttons */}
          {config.buttons && config.buttons.length > 0 && (
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {config.buttons.filter(btn => btn.show).map((btn) => (
                <Button
                  key={btn.id}
                  style={{
                    backgroundColor: btn.style === 'outline' ? 'transparent' : btn.color,
                    color: btn.textColor,
                    padding: '14px 36px',
                    fontSize: `${btn.size || 16}px`,
                    borderRadius: '8px',
                    border: btn.style === 'outline' ? `2px solid ${btn.borderColor || btn.textColor}` : 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    boxShadow: btn.style === 'outline' ? 'none' : '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                  onClick={() => window.location.href = btn.link}
                  onMouseEnter={(e) => {
                    if (btn.style === 'outline') {
                      e.currentTarget.style.backgroundColor = btn.textColor + '20';
                    } else {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (btn.style === 'outline') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    } else {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {btn.text}
                </Button>
              ))}
            </div>
          )}
          
          {/* Video Embed (optional) */}
          {config.videoEmbed?.show && config.videoEmbed?.url && (
            <div style={{ marginTop: '60px', maxWidth: '800px', margin: '60px auto 0' }}>
              <div style={{ 
                position: 'relative', 
                paddingBottom: '56.25%', 
                height: 0,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
              }}>
                <iframe
                  src={config.videoEmbed.url}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
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
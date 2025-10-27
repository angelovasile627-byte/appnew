import React from 'react';
import * as Icons from 'lucide-react';

export const FeaturesBlock = ({ config, onUpdate }) => {
  const containerStyle = {
    background: config.background.type === 'gradient' ? config.background.value : config.background.value,
    paddingTop: `${config.padding.top}px`,
    paddingBottom: `${config.padding.bottom}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
    margin: '0 auto',
    padding: '0 24px'
  };

  // Render based on layout type
  const renderLayout = () => {
    const layout = config.layout || 'cards-simple';

    switch (layout) {
      case 'cards-gradient':
        return renderGradientCards();
      case 'cards-with-images':
        return renderCardsWithImages();
      case 'cards-image-side':
        return renderCardsImageSide();
      case 'cards-dark':
        return renderDarkCards();
      default:
        return renderSimpleCards();
    }
  };

  // Simple cards with icons (original)
  const renderSimpleCards = () => {
    // Use the minimum between config.columns and actual items count
    const actualColumns = Math.min(config.columns, config.items.length);
    
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${actualColumns}, 1fr)`,
          gap: '40px'
        }}
      >
      {config.items.map((item, index) => {
        const IconComponent = Icons[item.icon] || Icons.Box;
        return (
          <div
            key={index}
            style={{
              textAlign: 'center',
              padding: '32px',
              borderRadius: '16px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: item.color + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}
            >
              <IconComponent style={{ width: '40px', height: '40px', color: item.color }} />
            </div>
            <h3
              style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#1a1a2e',
                marginBottom: '12px'
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: '16px',
                color: '#5a5a6e',
                lineHeight: '1.6'
              }}
            >
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

  // Gradient cards (4 columns)
  const renderGradientCards = () => {
    const actualColumns = Math.min(config.columns, config.items.length);
    
    return (
      <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
        gap: '30px'
      }}
    >
      {config.items.map((item, index) => {
        const IconComponent = item.icon ? Icons[item.icon] || Icons.Box : null;
        return (
          <div
            key={index}
            style={{
              background: item.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              padding: '40px 30px',
              color: '#ffffff',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {IconComponent && (
              <div style={{ marginBottom: '20px' }}>
                <IconComponent style={{ width: '48px', height: '48px', color: '#ffffff' }} />
              </div>
            )}
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#ffffff'
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                marginBottom: '20px',
                color: 'rgba(255,255,255,0.9)'
              }}
            >
              {item.description}
            </p>
            {item.features && item.features.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                {item.features.map((feature, i) => (
                  <li key={i} style={{ fontSize: '14px', marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0 }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            {item.button && (
              <button
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                }}
              >
                {item.button.text}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  // Cards with images on top
  const renderCardsWithImages = () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
        gap: '40px'
      }}
    >
      {config.items.map((item, index) => (
        <div
          key={index}
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            background: item.cardBackground || '#1a1a2e',
            transition: 'transform 0.3s, box-shadow 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {item.image && (
            <div
              style={{
                width: '100%',
                height: '250px',
                background: `url(${item.image}) center/cover`,
                position: 'relative'
              }}
            >
              {item.imageOverlay && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: item.imageOverlay
                }} />
              )}
            </div>
          )}
          <div style={{ padding: '32px' }}>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '12px',
                color: item.titleColor || '#ffffff'
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                marginBottom: '20px',
                color: item.descColor || 'rgba(255,255,255,0.8)'
              }}
            >
              {item.description}
            </p>
            {item.button && (
              <button
                style={{
                  background: item.button.gradient || 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                {item.button.text}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Cards with image on side
  const renderCardsImageSide = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {config.items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            gap: '40px',
            alignItems: 'center',
            background: item.cardBackground || '#ffffff',
            borderRadius: '20px',
            padding: '40px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(' + (index % 2 === 0 ? '8px' : '-8px') + ')';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {item.image && (
            <div
              style={{
                flex: '0 0 45%',
                height: '300px',
                background: `url(${item.image}) center/cover`,
                borderRadius: '12px'
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            {item.label && (
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: item.labelColor || '#667eea',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '12px'
                }}
              >
                {item.label}
              </span>
            )}
            <h3
              style={{
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '16px',
                color: item.titleColor || '#1a1a2e'
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: item.descColor || '#5a5a6e',
                marginBottom: '24px'
              }}
            >
              {item.description}
            </p>
            {item.button && (
              <button
                style={{
                  background: item.button.color || '#667eea',
                  border: 'none',
                  color: '#ffffff',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {item.button.text}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Dark cards with gradient accents
  const renderDarkCards = () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
        gap: '30px'
      }}
    >
      {config.items.map((item, index) => {
        const IconComponent = item.icon ? Icons[item.icon] || Icons.Box : null;
        return (
          <div
            key={index}
            style={{
              background: item.cardBackground || 'rgba(30, 30, 46, 0.8)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '20px',
              padding: '40px 32px',
              transition: 'all 0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.5)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {item.glowEffect && (
              <div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200px',
                  height: '200px',
                  background: item.glowColor || 'radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                  pointerEvents: 'none'
                }}
              />
            )}
            {IconComponent && (
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  background: item.iconBackground || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}
              >
                <IconComponent style={{ width: '32px', height: '32px', color: '#ffffff' }} />
              </div>
            )}
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '12px',
                color: item.titleColor || '#ffffff'
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                color: item.descColor || 'rgba(255,255,255,0.7)',
                marginBottom: '20px'
              }}
            >
              {item.description}
            </p>
            {item.button && (
              <button
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(102, 126, 234, 0.5)',
                  color: '#667eea',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                  e.currentTarget.style.borderColor = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                }}
              >
                {item.button.text}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {config.title.show && (
          <h2
            style={{
              fontSize: `${config.title.size || 42}px`,
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
              fontSize: `${config.description.size || 18}px`,
              color: config.description.color,
              textAlign: config.description.align,
              marginBottom: '60px',
              maxWidth: '800px',
              margin: config.description.align === 'center' ? '0 auto 60px' : '0 0 60px'
            }}
          >
            {config.description.text}
          </p>
        )}
        {renderLayout()}
      </div>
    </div>
  );
};
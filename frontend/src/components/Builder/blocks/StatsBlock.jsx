import React from 'react';

export const StatsBlock = ({ config, onUpdate }) => {
  // Get background value - handle both direct value and type/value structure
  const getBackgroundValue = () => {
    if (!config.background) return '#ffffff';
    if (config.background.type === 'gradient') return config.background.value;
    return config.background.value || config.background;
  };

  // Get stats items - handle both 'stats' and 'items' property names
  const statsItems = config.stats || config.items || [];
  
  // Get columns - default to auto-calculate based on items count
  const columns = config.columns || Math.min(statsItems.length, 4);

  const containerStyle = {
    background: getBackgroundValue(),
    paddingTop: `${config.padding?.top || 80}px`,
    paddingBottom: `${config.padding?.bottom || 80}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth || 1200}px`,
    margin: '0 auto',
    padding: '0 24px'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {config.title?.show && (
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              color: config.title.color || '#ffffff',
              textAlign: config.title.align || 'center',
              marginBottom: '60px'
            }}
          >
            {config.title.text}
          </h2>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '60px'
          }}
        >
          {statsItems.map((stat, index) => (
            <div
              key={stat.id || index}
              style={{
                textAlign: 'center',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {stat.icon && (
                <div
                  style={{
                    fontSize: '48px',
                    marginBottom: '16px',
                    filter: stat.iconColor ? `drop-shadow(0 0 10px ${stat.iconColor})` : 'none'
                  }}
                >
                  {stat.icon}
                </div>
              )}
              <div
                style={{
                  fontSize: '56px',
                  fontWeight: '900',
                  color: stat.color || '#ffffff',
                  marginBottom: '12px',
                  lineHeight: '1'
                }}
              >
                {stat.number}{stat.suffix || ''}
              </div>
              <p
                style={{
                  fontSize: '18px',
                  color: stat.color || '#ffffff',
                  fontWeight: '500',
                  opacity: 0.9
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
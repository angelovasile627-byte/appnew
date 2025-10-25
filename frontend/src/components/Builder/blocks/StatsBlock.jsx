import React from 'react';

export const StatsBlock = ({ config, onUpdate }) => {
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
              marginBottom: '60px'
            }}
          >
            {config.title.text}
          </h2>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
            gap: '60px'
          }}
        >
          {config.stats.map((stat, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div
                style={{
                  fontSize: '56px',
                  fontWeight: '900',
                  color: stat.color,
                  marginBottom: '12px',
                  lineHeight: '1'
                }}
              >
                {stat.number}
              </div>
              <p
                style={{
                  fontSize: '18px',
                  color: stat.color,
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
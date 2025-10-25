import React from 'react';
import * as Icons from 'lucide-react';

export const FeaturesBlock = ({ config, onUpdate }) => {
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
              marginBottom: '60px',
              maxWidth: '700px',
              margin: config.description.align === 'center' ? '0 auto 60px' : '0 0 60px'
            }}
          >
            {config.description.text}
          </p>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
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
      </div>
    </div>
  );
};
import React from 'react';
import { ExternalLink } from 'lucide-react';

export const TimelineBlock = ({ config, onUpdate }) => {
  // Get background value - handle both direct value and type/value structure
  const getBackgroundValue = () => {
    if (!config.background) return '#f8f9fa';
    if (config.background.type === 'gradient') return config.background.value;
    return config.background.value || config.background;
  };

  const containerStyle = {
    background: getBackgroundValue(),
    paddingTop: `${config.padding?.top || 100}px`,
    paddingBottom: `${config.padding?.bottom || 100}px`,
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
              fontSize: `${config.title.size || 48}px`,
              fontWeight: config.title.weight || '700',
              color: config.title.color,
              textAlign: config.title.align,
              marginBottom: '16px'
            }}
          >
            {config.title.text}
          </h2>
        )}
        {config.description?.show && (
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
        
        <div style={{ position: 'relative' }}>
          {/* Timeline Line */}
          {config.layout === 'vertical' && (
            <div
              style={{
                position: 'absolute',
                left: '24px',
                top: '0',
                bottom: '0',
                width: '2px',
                backgroundColor: config.items?.[0]?.color || '#e0e0e0',
                opacity: 0.3
              }}
            />
          )}
          
          {/* Timeline Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {config.items?.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '24px',
                  position: 'relative'
                }}
              >
                {/* Timeline Dot */}
                <div
                  style={{
                    minWidth: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: item.color || '#667eea',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    flexShrink: 0
                  }}
                >
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt={item.company}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                </div>
                
                {/* Content */}
                <div style={{ flex: 1, paddingTop: '4px' }}>
                  <div
                    style={{
                      fontSize: '14px',
                      color: item.color || '#667eea',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}
                  >
                    {item.period}
                  </div>
                  <h3
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#1a1a1a',
                      marginBottom: '4px'
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '18px',
                        color: item.color || '#667eea',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginBottom: '12px'
                      }}
                    >
                      {item.company}
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <div
                      style={{
                        fontSize: '18px',
                        color: item.color || '#667eea',
                        marginBottom: '12px'
                      }}
                    >
                      {item.company}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: '16px',
                      color: '#6B6B6B',
                      lineHeight: '1.6',
                      marginBottom: '12px',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {item.description}
                  </div>
                  {item.technologies && (
                    <div
                      style={{
                        fontSize: '14px',
                        color: '#888888',
                        fontStyle: 'italic',
                        paddingTop: '8px',
                        borderTop: '1px solid #e0e0e0'
                      }}
                    >
                      <strong>Tehnologii:</strong> {item.technologies}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import * as Icons from 'lucide-react';

export const FooterBlock = ({ config, onUpdate }) => {
  const containerStyle = {
    backgroundColor: config.background?.value || config.background || '#1a1a2e',
    paddingTop: `${config.padding?.top || 60}px`,
    paddingBottom: `${config.padding?.bottom || 60}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: `${config.contentWidth || 1200}px`,
    margin: '0 auto',
    padding: '0 24px'
  };

  // Simple layout (single column with links)
  if (config.layout === 'simple') {
    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={{ textAlign: 'center' }}>
            {config.logo?.show && (
              <h3
                style={{
                  fontSize: `${config.logo.size || 24}px`,
                  fontWeight: '800',
                  color: config.logo.color || '#ffffff',
                  marginBottom: '16px'
                }}
              >
                {config.logo.text}
              </h3>
            )}
            {config.description?.show && (
              <p style={{ 
                color: config.description.color || '#cccccc',
                marginBottom: '24px',
                maxWidth: '600px',
                margin: '0 auto 24px'
              }}>
                {config.description.text}
              </p>
            )}
            {config.links && config.links.length > 0 && (
              <div style={{ 
                display: 'flex', 
                gap: '24px', 
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '24px'
              }}>
                {config.links.map((link, index) => (
                  <a
                    key={link.id || index}
                    href={link.link}
                    style={{
                      color: link.color || '#cccccc',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            )}
            {config.social?.show && config.social?.links && (
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
                {config.social.links.map((social, index) => {
                  const IconComponent = Icons[social.platform.charAt(0).toUpperCase() + social.platform.slice(1)] || Icons.Link;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: social.color || '#ffffff',
                        textDecoration: 'none'
                      }}
                    >
                      <IconComponent style={{ width: '20px', height: '20px' }} />
                    </a>
                  );
                })}
              </div>
            )}
            {config.copyright?.show && (
              <p style={{ 
                color: config.copyright.color || '#888888',
                fontSize: '14px',
                marginTop: '24px'
              }}>
                {config.copyright.text}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Complex layout with columns (original code)
  if (!config.columns || !Array.isArray(config.columns)) {
    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          <p style={{ color: '#ffffff', textAlign: 'center' }}>Footer configuration error</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${config.columns.length + 1}, 1fr)`,
            gap: '48px',
            marginBottom: '48px'
          }}
        >
          {config.logo.show && (
            <div>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  color: config.logo.color,
                  marginBottom: '16px'
                }}
              >
                {config.logo.text}
              </h3>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                {config.social.map((social, index) => {
                  const IconComponent = Icons[social.icon] || Icons.Link;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    >
                      <IconComponent style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
          {config.columns.map((column, index) => (
            <div key={index}>
              <h4
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '20px'
                }}
              >
                {column.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} style={{ marginBottom: '12px' }}>
                    <a
                      href={link.url}
                      style={{
                        fontSize: '15px',
                        color: '#b0b0c0',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0c0'}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {config.copyright.show && (
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '32px',
              textAlign: 'center'
            }}
          >
            <p style={{ fontSize: '14px', color: config.copyright.color }}>{config.copyright.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};
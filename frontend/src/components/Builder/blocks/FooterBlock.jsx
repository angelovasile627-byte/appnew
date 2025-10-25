import React from 'react';
import * as Icons from 'lucide-react';

export const FooterBlock = ({ config, onUpdate }) => {
  const containerStyle = {
    backgroundColor: config.background.value,
    paddingTop: `${config.padding.top}px`,
    paddingBottom: `${config.padding.bottom}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: `${config.contentWidth}px`,
    margin: '0 auto',
    padding: '0 24px'
  };

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
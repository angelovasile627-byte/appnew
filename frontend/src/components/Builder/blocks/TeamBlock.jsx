import React from 'react';
import * as Icons from 'lucide-react';

export const TeamBlock = ({ config, onUpdate }) => {
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
          {config.members.map((member, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 24px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  border: '4px solid #f0f0f0'
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1a1a2e',
                  marginBottom: '8px'
                }}
              >
                {member.name}
              </h3>
              <p style={{ fontSize: '16px', color: '#718096', marginBottom: '16px' }}>{member.role}</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5B4FC9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  >
                    <Icons.Twitter style={{ width: '18px', height: '18px', color: '#1a1a2e' }} />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5B4FC9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  >
                    <Icons.Linkedin style={{ width: '18px', height: '18px', color: '#1a1a2e' }} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
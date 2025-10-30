import React from 'react';

export const SkillsBlock = ({ config, onUpdate }) => {
  const containerStyle = {
    backgroundColor: config.background.value,
    paddingTop: `${config.padding?.top || 100}px`,
    paddingBottom: `${config.padding?.bottom || 100}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: config.contentWidth || 1200,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    gap: '60px',
    alignItems: 'center',
    flexDirection: config.image?.position === 'right' ? 'row-reverse' : 'row'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Image Section */}
        {config.image?.show && config.image?.src && (
          <div
            style={{
              flex: '0 0 ' + (config.image.width || 450) + 'px',
              maxWidth: config.image.width || 450
            }}
          >
            <img
              src={config.image.src}
              alt={config.image.alt || 'Skills'}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        )}
        
        {/* Skills Section */}
        <div style={{ flex: 1 }}>
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
                fontSize: `${config.description.size || 16}px`,
                color: config.description.color,
                textAlign: config.description.align,
                marginBottom: '40px',
                lineHeight: '1.6'
              }}
            >
              {config.description.text}
            </p>
          )}
          
          {/* Skill Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {config.categories?.map((category, catIndex) => (
              <div key={category.id}>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '16px'
                  }}
                >
                  {category.name}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {category.skills?.map((skill) => (
                    <div key={skill.id}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '6px'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#333333'
                          }}
                        >
                          {skill.name}
                        </span>
                        <span
                          style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: skill.color || '#667eea'
                          }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: '#e0e0e0',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: `${skill.level}%`,
                            height: '100%',
                            backgroundColor: skill.color || '#667eea',
                            transition: 'width 0.5s ease',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

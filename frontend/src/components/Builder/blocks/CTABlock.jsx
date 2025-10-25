import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export const CTABlock = ({ config, onUpdate }) => {
  const getBackground = () => {
    if (config.background.type === 'color') {
      return { backgroundColor: config.background.value };
    } else if (config.background.type === 'gradient') {
      return { background: config.background.value };
    }
    return {};
  };

  const containerStyle = {
    ...getBackground(),
    paddingTop: `${config.padding.top}px`,
    paddingBottom: `${config.padding.bottom}px`,
    width: '100%'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {config.title.show && (
          <h2
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: config.title.color,
              textAlign: config.title.align,
              marginBottom: '20px',
              lineHeight: '1.2'
            }}
          >
            {config.title.text}
          </h2>
        )}
        {config.description.show && (
          <p
            style={{
              fontSize: '20px',
              color: config.description.color,
              textAlign: config.description.align,
              marginBottom: '40px',
              maxWidth: '700px',
              margin: config.description.align === 'center' ? '0 auto 40px' : '0 0 40px'
            }}
          >
            {config.description.text}
          </p>
        )}
        {config.form && config.form.show ? (
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Input
                type="email"
                placeholder={config.form.placeholder}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  fontSize: '16px',
                  borderRadius: '10px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#ffffff'
                }}
              />
              <Button
                style={{
                  padding: '16px 32px',
                  fontSize: '16px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  whiteSpace: 'nowrap'
                }}
              >
                {config.form.buttonText}
              </Button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {config.buttons && config.buttons.map((button, index) => (
              button.show && (
                <Button
                  key={index}
                  style={{
                    backgroundColor: button.style === 'outline' ? 'transparent' : button.color,
                    color: button.textColor,
                    padding: '16px 40px',
                    fontSize: '18px',
                    borderRadius: '12px',
                    border: button.style === 'outline' ? `2px solid ${button.textColor}` : 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: button.style === 'outline' ? 'none' : '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {button.text}
                </Button>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
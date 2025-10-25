import React from 'react';
import { Button } from '../../ui/button';

export const MenuBlock = ({ config, onUpdate }) => {
  const getBackgroundStyle = () => {
    let bgStyle = {};
    
    if (config.transparent) {
      bgStyle.backgroundColor = 'transparent';
    } else if (config.background?.type === 'gradient') {
      bgStyle.background = config.background.value;
    } else {
      bgStyle.backgroundColor = config.background?.value || '#ffffff';
    }
    
    if (config.opacity !== undefined) {
      bgStyle.opacity = config.opacity;
    }
    
    return bgStyle;
  };

  const containerStyle = {
    ...getBackgroundStyle(),
    width: '100%',
    position: config.sticky ? 'sticky' : 'relative',
    top: config.sticky ? 0 : 'auto',
    zIndex: config.sticky ? 100 : 'auto',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    boxShadow: config.sticky ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
    margin: '0 auto',
    padding: `${config.padding.top}px 24px ${config.padding.bottom}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: config.align === 'center' ? 'center' : 'space-between',
    gap: '40px'
  };

  const menuContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: config.align === 'center' ? '60px' : '40px',
    flexWrap: 'wrap'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {config.logo.show && config.align !== 'center' && (
          <div
            style={{
              fontSize: `${config.logo.size}px`,
              fontWeight: '800',
              color: config.logo.color,
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {config.logo.text}
          </div>
        )}

        <div style={menuContainerStyle}>
          {config.align === 'center' && config.logo.show && (
            <div
              style={{
                fontSize: `${config.logo.size}px`,
                fontWeight: '800',
                color: config.logo.color,
                cursor: 'pointer'
              }}
            >
              {config.logo.text}
            </div>
          )}

          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {config.menuItems.map((item, index) => (
              item.show && (
                <a
                  key={index}
                  href={item.link}
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: item.color,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  {item.text}
                </a>
              )
            ))}
          </nav>

          {config.button.show && (
            <Button
              style={{
                backgroundColor: config.button.color,
                color: config.button.textColor,
                padding: '12px 28px',
                fontSize: '16px',
                borderRadius: '10px',
                border: config.button.color === 'transparent' ? `2px solid ${config.button.textColor}` : 'none',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'transform 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {config.button.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
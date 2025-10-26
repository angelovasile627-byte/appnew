import React, { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { LogoEditPopover } from '../LogoEditPopover';

export const MenuBlock = ({ config, onUpdate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoEdit, setShowLogoEdit] = useState(false);
  const [logoEditPosition, setLogoEditPosition] = useState({ top: 0, left: 0 });
  const logoRef = useRef(null);

  const handleLogoClick = (e) => {
    e.stopPropagation();
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      setLogoEditPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX
      });
      setShowLogoEdit(true);
    }
  };
  const containerStyle = {
    backgroundColor: config.background.value,
    width: '100%',
    position: config.sticky ? 'sticky' : 'relative',
    top: config.sticky ? 0 : 'auto',
    zIndex: config.sticky ? 100 : 'auto',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
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
        {/* Logo */}
        {config.logo.show && config.align !== 'center' && (
          <div
            style={{
              fontSize: config.logo.image ? 'inherit' : `${config.logo.size}px`,
              fontWeight: '800',
              color: config.logo.color,
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              display: 'flex',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {config.logo.image ? (
              <img 
                src={config.logo.image} 
                alt={config.logo.text || 'Logo'} 
                style={{
                  height: `${config.logo.imageSize || 40}px`,
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            ) : (
              config.logo.text
            )}
          </div>
        )}

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: config.logo.color || '#1a1a2e'
          }}
          className="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div style={menuContainerStyle} className="desktop-menu">
          {config.align === 'center' && config.logo.show && (
            <div
              style={{
                fontSize: config.logo.image ? 'inherit' : `${config.logo.size}px`,
                fontWeight: '800',
                color: config.logo.color,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {config.logo.image ? (
                <img 
                  src={config.logo.image} 
                  alt={config.logo.text || 'Logo'} 
                  style={{
                    height: `${config.logo.imageSize || 40}px`,
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                config.logo.text
              )}
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

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            className="mobile-menu-dropdown"
            style={{
              position: 'fixed',
              top: '60px',
              left: 0,
              right: 0,
              backgroundColor: config.background.value,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              zIndex: 1000,
              display: 'none'
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(0,0,0,0.1)'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.text}
                  </a>
                )
              ))}
              {config.button.show && (
                <a
                  href={config.button.link}
                  style={{
                    backgroundColor: config.button.color,
                    color: config.button.textColor,
                    padding: '12px 28px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: config.button.color === 'transparent' ? `2px solid ${config.button.textColor}` : 'none',
                    fontWeight: '600',
                    textDecoration: 'none',
                    textAlign: 'center',
                    display: 'block',
                    marginTop: '8px'
                  }}
                >
                  {config.button.text}
                </a>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
          .mobile-menu-dropdown {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};
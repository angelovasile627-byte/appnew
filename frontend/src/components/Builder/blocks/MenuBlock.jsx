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
  // Determină background-ul în funcție de setări
  const getBackgroundColor = () => {
    if (config.transparent) {
      return 'transparent';
    }
    return config.background?.value || 'rgba(0,0,0,0.1)';
  };

  // Calculează padding-ul în funcție de collapsed
  const getPadding = () => {
    const basePadding = config.padding || { top: 12, bottom: 12 };
    if (config.collapsed) {
      return {
        top: Math.max(basePadding.top * 0.6, 8),
        bottom: Math.max(basePadding.bottom * 0.6, 8)
      };
    }
    return basePadding;
  };

  const padding = getPadding();

  const containerStyle = {
    backgroundColor: getBackgroundColor(),
    width: '100%',
    position: config.sticky ? 'sticky' : 'relative',
    top: config.sticky ? 0 : 'auto',
    zIndex: config.sticky ? 100 : 'auto',
    borderBottom: config.transparent ? 'none' : '1px solid rgba(0,0,0,0.1)',
    boxShadow: config.transparent ? 'none' : '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease'
  };

  const contentStyle = {
    maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
    margin: '0 auto',
    padding: `${padding.top}px 24px ${padding.bottom}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: config.align === 'center' ? 'center' : 'space-between',
    gap: '32px',
    transition: 'all 0.3s ease'
  };

  const menuContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: config.align === 'center' ? '48px' : '32px',
    flexWrap: 'wrap'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Logo */}
        {config.logo.show && config.align !== 'center' && (
          <div
            ref={logoRef}
            onClick={handleLogoClick}
            style={{
              fontSize: config.logo.image ? 'inherit' : `${config.logo.size}px`,
              fontWeight: '800',
              color: config.logo.color,
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              maxWidth: `${config.logo.logoSize || 120}px`
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            title="Click pentru a edita logo"
          >
            {config.logo.image ? (
              <img 
                src={config.logo.image} 
                alt={config.logo.text || 'Logo'} 
                style={{
                  height: `${config.logo.imageSize || 40}px`,
                  width: 'auto',
                  objectFit: 'contain',
                  maxWidth: '100%'
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
            color: config.hamburger?.color || config.logo?.color || '#1a1a2e'
          }}
          className="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div style={menuContainerStyle} className="desktop-menu">
          {config.align === 'center' && config.logo.show && (
            <div
              ref={logoRef}
              onClick={handleLogoClick}
              style={{
                fontSize: config.logo.image ? 'inherit' : `${config.logo.size}px`,
                fontWeight: '800',
                color: config.logo.color,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                maxWidth: `${config.logo.logoSize || 120}px`
              }}
              title="Click pentru a edita logo"
            >
              {config.logo.image ? (
                <img 
                  src={config.logo.image} 
                  alt={config.logo.text || 'Logo'} 
                  style={{
                    height: `${config.logo.imageSize || 40}px`,
                    width: 'auto',
                    objectFit: 'contain',
                    maxWidth: '100%'
                  }}
                />
              ) : (
                config.logo.text
              )}
            </div>
          )}

          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {config.menuItems.map((item, index) => (
              item.show && (
                <a
                  key={index}
                  href={item.link}
                  style={{
                    fontSize: '15px',
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
              backgroundColor: config.transparent ? 'rgba(255, 255, 255, 0.95)' : config.background?.value || 'rgba(0,0,0,0.1)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              zIndex: 1000,
              display: 'none',
              backdropFilter: config.transparent ? 'blur(10px)' : 'none'
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

      {/* Logo Edit Popover */}
      {showLogoEdit && (
        <LogoEditPopover
          config={config}
          onUpdate={onUpdate}
          position={logoEditPosition}
          onClose={() => setShowLogoEdit(false)}
        />
      )}
    </div>
  );
};
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import { Button } from '../../ui/button';
import { LogoEditPopover } from '../LogoEditPopover';
import { CompactMenuToolbar } from '../CompactMenuToolbar';

export const MenuBlock = ({ config, onUpdate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoEdit, setShowLogoEdit] = useState(false);
  const [logoEditPosition, setLogoEditPosition] = useState({ top: 0, left: 0 });
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const logoRef = useRef(null);

  // Close toolbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectedMenuItem !== null) {
        setSelectedMenuItem(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [selectedMenuItem]);

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

  const handleMenuItemClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setToolbarPosition({
      top: rect.bottom + window.scrollY + 10,
      left: rect.left + rect.width / 2 + window.scrollX
    });
    setSelectedMenuItem(index);
  };

  const handleAddMenuItem = () => {
    const currentItem = config.menuItems[selectedMenuItem];
    const newMenuItems = [
      ...(config.menuItems || []),
      { 
        text: currentItem?.text || 'New Link', 
        link: '#', 
        color: currentItem?.color || config.menuItems[0]?.color || '#ffffff', 
        show: true,
        type: currentItem?.type || 'menu',
        icon: currentItem?.icon || null,
        submenu: []
      }
    ];
    onUpdate({ ...config, menuItems: newMenuItems });
    setSelectedMenuItem(null);
  };

  const handleDeleteMenuItem = () => {
    if (selectedMenuItem !== null) {
      const newMenuItems = config.menuItems.filter((_, i) => i !== selectedMenuItem);
      onUpdate({ ...config, menuItems: newMenuItems });
      setSelectedMenuItem(null);
    }
  };

  const handleUpdateMenuItem = (updatedItem) => {
    const newMenuItems = config.menuItems.map((item, i) =>
      i === selectedMenuItem ? updatedItem : item
    );
    onUpdate({ ...config, menuItems: newMenuItems });
  };

  const handleMoveLeft = () => {
    if (selectedMenuItem > 0) {
      const newMenuItems = [...config.menuItems];
      const temp = newMenuItems[selectedMenuItem];
      newMenuItems[selectedMenuItem] = newMenuItems[selectedMenuItem - 1];
      newMenuItems[selectedMenuItem - 1] = temp;
      onUpdate({ ...config, menuItems: newMenuItems });
      setSelectedMenuItem(selectedMenuItem - 1);
    }
  };

  const handleMoveRight = () => {
    if (selectedMenuItem < config.menuItems.length - 1) {
      const newMenuItems = [...config.menuItems];
      const temp = newMenuItems[selectedMenuItem];
      newMenuItems[selectedMenuItem] = newMenuItems[selectedMenuItem + 1];
      newMenuItems[selectedMenuItem + 1] = temp;
      onUpdate({ ...config, menuItems: newMenuItems });
      setSelectedMenuItem(selectedMenuItem + 1);
    }
  };

  const handleAddSubmenu = () => {
    if (selectedMenuItem !== null) {
      const currentItem = config.menuItems[selectedMenuItem];
      const updatedItem = {
        ...currentItem,
        submenu: [
          ...(currentItem.submenu || []),
          { text: 'Submenu Item', link: '#', color: currentItem.color }
        ]
      };
      handleUpdateMenuItem(updatedItem);
    }
  };

  // Determină background-ul în funcție de setări
  const getBackgroundColor = () => {
    if (config.transparent) {
      const opacity = config.opacity ?? 0.8;
      const bgColor = config.background?.value || '#000000';
      
      // Convert hex to rgba
      const hex = bgColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
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

  // Helper pentru renderizarea logo-ului
  const renderLogo = (additionalStyles = {}) => (
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
        maxWidth: `${config.logo.logoSize || 120}px`,
        ...additionalStyles
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
            height: `${config.logo.imageSize || 32}px`,
            width: 'auto',
            objectFit: 'contain',
            maxWidth: '100%'
          }}
        />
      ) : (
        config.logo.text
      )}
    </div>
  );

  // Helper pentru renderizarea menu items
  const renderMenuItems = (items) => (
    <>
      {items.map((item, index) => {
        const IconComponent = item.icon ? LucideIcons[item.icon] : null;
        
        const getTextStyle = () => {
          const baseStyle = {
            color: item.color,
            textDecoration: 'none',
            transition: 'all 0.2s',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: selectedMenuItem === index ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          };

          switch (item.type) {
            case 'title1':
              return { ...baseStyle, fontSize: '24px', fontWeight: '700' };
            case 'title2':
              return { ...baseStyle, fontSize: '20px', fontWeight: '600' };
            case 'title3':
              return { ...baseStyle, fontSize: '18px', fontWeight: '500' };
            case 'text':
              return { ...baseStyle, fontSize: '14px', fontWeight: '400' };
            default:
              return { ...baseStyle, fontSize: '15px', fontWeight: '500' };
          }
        };

        return item.show && (
          <a
            key={index}
            href={item.link}
            target={item.newWindow ? '_blank' : '_self'}
            rel={item.newWindow ? 'noopener noreferrer' : ''}
            onClick={(e) => handleMenuItemClick(e, index)}
            style={getTextStyle()}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {IconComponent && <IconComponent size={16} />}
            {item.text}
          </a>
        );
      })}
    </>
  );

  // Helper pentru renderizarea butonului
  const renderButton = () => config.button.show && (
    <Button
      style={{
        backgroundColor: config.button.color,
        color: config.button.textColor,
        padding: '10px 24px',
        fontSize: '15px',
        borderRadius: '8px',
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
  );

  // Helper pentru renderizarea social icons
  const renderSocialIcons = () => {
    if (!config.socialIcons?.show || !config.socialIcons?.items?.length) return null;

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: `${config.socialIcons.spacing || 12}px`
      }}>
        {config.socialIcons.items.filter(icon => icon.show).map((iconData, index) => {
          // Try to get icon from both libraries
          const IconComponent = FaIcons[iconData.icon] || Fa6Icons[iconData.icon];
          
          if (!IconComponent) return null;

          return (
            <a
              key={index}
              href={iconData.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: `${(config.socialIcons.size || 18) + 12}px`,
                height: `${(config.socialIcons.size || 18) + 12}px`,
                borderRadius: '6px',
                backgroundColor: iconData.color === 'auto' ? 'rgba(0,0,0,0.1)' : iconData.color,
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.opacity = '1';
              }}
              title={iconData.name}
            >
              <IconComponent 
                size={config.socialIcons.size || 18} 
                color="white"
              />
            </a>
          );
        })}
      </div>
    );
  };

  // Determină layout-ul bazat pe align
  const getLayoutContent = () => {
    const visibleItems = config.menuItems.filter(item => item.show);

    // CENTER LAYOUT - Vertical (Logo sus, menu jos)
    if (config.align === 'center') {
      return (
        <div style={{
          maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
          margin: '0 auto',
          padding: `${padding.top}px 24px ${padding.bottom}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          transition: 'all 0.3s ease'
        }}>
          {/* Logo sus */}
          {config.logo.show && renderLogo()}
          
          {/* Menu items și button jos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {renderMenuItems(visibleItems)}
            {renderButton()}
          </div>
        </div>
      );
    }

    // SPLIT LAYOUT - Logo în mijloc, items împărțite stânga/dreapta
    if (config.align === 'split') {
      const splitCount = config.splitCount || Math.floor(visibleItems.length / 2);
      const leftItems = visibleItems.slice(0, splitCount);
      const rightItems = visibleItems.slice(splitCount);

      return (
        <div style={{
          maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
          margin: '0 auto',
          padding: `${padding.top}px 24px ${padding.bottom}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
          transition: 'all 0.3s ease'
        }}>
          {/* Items în stânga */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {renderMenuItems(leftItems)}
          </nav>

          {/* Logo în mijloc */}
          {config.logo.show && renderLogo()}

          {/* Items în dreapta + button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {renderMenuItems(rightItems)}
            {renderButton()}
          </div>
        </div>
      );
    }

    // DEFAULT LAYOUTS - Left, Right, Space Between
    return (
      <div style={{
        maxWidth: config.fullWidth ? '100%' : `${config.contentWidth}px`,
        margin: '0 auto',
        padding: `${padding.top}px 24px ${padding.bottom}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: config.align === 'right' ? 'flex-end' : config.align === 'space-between' ? 'space-between' : 'flex-start',
        gap: '32px',
        transition: 'all 0.3s ease'
      }}>
        {/* Logo */}
        {config.logo.show && renderLogo()}

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

        {/* Desktop Menu Container */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }} className="desktop-menu">
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {renderMenuItems(visibleItems)}
          </nav>
          {renderButton()}
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle} data-block-type="menu">
      {getLayoutContent()}

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

      {/* Compact Menu Toolbar */}
      {selectedMenuItem !== null && (
        <CompactMenuToolbar
          position={toolbarPosition}
          menuItem={config.menuItems[selectedMenuItem]}
          menuItems={config.menuItems}
          currentIndex={selectedMenuItem}
          onAddItem={handleAddMenuItem}
          onDelete={handleDeleteMenuItem}
          onBack={() => setSelectedMenuItem(null)}
          onSettings={() => setSelectedMenuItem(null)}
          onUpdateMenuItem={handleUpdateMenuItem}
          onMoveLeft={handleMoveLeft}
          onMoveRight={handleMoveRight}
          onAddSubmenu={handleAddSubmenu}
        />
      )}
    </div>
  );
};
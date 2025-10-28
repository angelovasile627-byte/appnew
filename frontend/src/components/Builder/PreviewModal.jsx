import React, { useState, useMemo } from 'react';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';

const DEVICE_SIZES = {
  desktop: { width: '100%', label: 'Desktop', icon: Monitor },
  tablet: { width: '768px', label: 'Tabletă', icon: Tablet },
  mobile: { width: '375px', label: 'Mobil', icon: Smartphone }
};

// Helper function to generate HTML from block config
const generateBlockHTML = (config) => {
  if (!config) return '';

  switch (config.type) {
    case 'menu': {
      // Handle transparent menu with opacity
      const getMenuBgColor = () => {
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
        return config.background?.value || '#ffffff';
      };

      const menuId = `menu-${Math.random().toString(36).substr(2, 9)}`;
      
      return `
        <!-- Hidden checkbox for mobile menu toggle -->
        <input type="checkbox" id="mobile-toggle-${menuId}" style="display: none;" />
        
        <nav id="${menuId}" style="
          background-color: ${getMenuBgColor()};
          width: 100%;
          position: ${config.sticky ? 'sticky' : 'relative'};
          top: ${config.sticky ? '0' : 'auto'};
          z-index: ${config.sticky ? '10' : 'auto'};
          border-bottom: ${config.transparent ? 'none' : '1px solid rgba(0,0,0,0.1)'};
          box-shadow: ${config.transparent ? 'none' : '0 2px 8px rgba(0,0,0,0.05)'};
          backdrop-filter: ${config.transparent ? 'blur(10px)' : 'none'};
        ">
          ${(() => {
            const visibleItems = config.menuItems.filter(item => item.show);
            const hamburgerColor = config.hamburger?.color || config.logo?.color || '#1a1a2e';
            
            const logoHTML = config.logo.show ? `
              <div style="
                ${config.logo.image ? '' : `font-size: ${config.logo.size}px;`}
                font-weight: 800;
                color: ${config.logo.color};
                display: flex;
                align-items: center;
              ">
                ${config.logo.image ? 
                  `<img src="${config.logo.image}" alt="${config.logo.text || 'Logo'}" style="height: ${config.logo.imageSize || 32}px; width: auto; object-fit: contain;" />` 
                  : config.logo.text
                }
              </div>
            ` : '';

            const menuItemsHTML = (items) => `
              <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
                ${items.map(item => `
                  <a href="${item.link}" style="
                    font-size: 15px;
                    font-weight: 500;
                    color: ${item.color};
                    text-decoration: none;
                  ">
                    ${item.text}
                  </a>
                `).join('')}
              </div>
            `;

            const buttonHTML = config.button.show ? `
              <a href="${config.button.link}" style="
                background-color: ${config.button.color};
                color: ${config.button.textColor};
                padding: 10px 24px;
                font-size: 15px;
                border-radius: 8px;
                border: ${config.button.color === 'transparent' ? `2px solid ${config.button.textColor}` : 'none'};
                font-weight: 600;
                text-decoration: none;
                display: inline-block;
                white-space: nowrap;
              ">
                ${config.button.text}
              </a>
            ` : '';

            // Social Icons HTML with inline SVG icons
            const socialIconsHTML = (config.socialIcons?.show && config.socialIcons?.items?.length > 0) ? `
              <div style="display: flex; align-items: center; gap: ${config.socialIcons.spacing || 12}px;">
                ${config.socialIcons.items.filter(icon => icon.show).map(iconData => {
                  // Map React Icons to inline SVG
                  const iconSvg = {
                    'FaFacebookF': '<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>',
                    'FaXTwitter': '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
                    'FaInstagram': '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
                    'FaLinkedinIn': '<path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>',
                    'FaYoutube': '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
                    'FaTiktok': '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>'
                  };
                  
                  const svgPath = iconSvg[iconData.icon] || '';
                  
                  return `
                    <a href="${iconData.link || '#'}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style="
                         display: flex;
                         align-items: center;
                         justify-content: center;
                         width: ${(config.socialIcons.size || 18) + 12}px;
                         height: ${(config.socialIcons.size || 18) + 12}px;
                         border-radius: 6px;
                         background-color: ${iconData.color === 'auto' ? 'rgba(0,0,0,0.1)' : iconData.color};
                         transition: all 0.2s;
                       "
                       title="${iconData.name}">
                      <svg width="${config.socialIcons.size || 18}" 
                           height="${config.socialIcons.size || 18}" 
                           viewBox="0 0 24 24" 
                           fill="white">
                        ${svgPath}
                      </svg>
                    </a>
                  `;
                }).join('')}
              </div>
            ` : '';

            // CENTER LAYOUT - Vertical (Logo sus, menu jos)
            if (config.align === 'center') {
              return `
                <div style="
                  max-width: ${config.fullWidth ? '100%' : config.contentWidth + 'px'};
                  margin: 0 auto;
                  padding: ${config.padding.top}px 24px ${config.padding.bottom}px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 20px;
                  position: relative;
                ">
                  ${logoHTML}
                  
                  <!-- Hamburger Label (works as button) -->
                  <label for="mobile-toggle-${menuId}" class="mobile-menu-toggle-${menuId}" style="
                    display: none;
                    position: absolute;
                    right: 24px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    padding: 8px;
                    color: ${hamburgerColor};
                    z-index: 1000;
                  ">
                    <svg class="hamburger-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                    <svg class="close-icon" style="display: none;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </label>
                  
                  <div class="desktop-menu-${menuId}" style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
                    ${menuItemsHTML(visibleItems)}
                    ${buttonHTML}
                    ${socialIconsHTML}
                  </div>
                </div>
              `;
            }

            // SPLIT LAYOUT - Logo în mijloc, items împărțite stânga/dreapta
            if (config.align === 'split') {
              const splitCount = config.splitCount || Math.floor(visibleItems.length / 2);
              const leftItems = visibleItems.slice(0, splitCount);
              const rightItems = visibleItems.slice(splitCount);

              return `
                <div style="
                  max-width: ${config.fullWidth ? '100%' : config.contentWidth + 'px'};
                  margin: 0 auto;
                  padding: ${config.padding.top}px 24px ${config.padding.bottom}px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 32px;
                  position: relative;
                ">
                  ${menuItemsHTML(leftItems)}
                  ${logoHTML}
                  
                  <!-- Hamburger Label -->
                  <label for="mobile-toggle-${menuId}" class="mobile-menu-toggle-${menuId}" style="
                    display: none;
                    position: absolute;
                    right: 24px;
                    cursor: pointer;
                    padding: 8px;
                    color: ${hamburgerColor};
                    z-index: 1000;
                  ">
                    <svg class="hamburger-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                    <svg class="close-icon" style="display: none;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </label>
                  
                  <div class="desktop-menu-${menuId}" style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
                    ${menuItemsHTML(rightItems)}
                    ${buttonHTML}
                    ${socialIconsHTML}
                  </div>
                </div>
              `;
            }

            // DEFAULT LAYOUTS - Left, Right, Space Between
            return `
              <div style="
                max-width: ${config.fullWidth ? '100%' : config.contentWidth + 'px'};
                margin: 0 auto;
                padding: ${config.padding.top}px 24px ${config.padding.bottom}px;
                display: flex;
                align-items: center;
                justify-content: ${config.align === 'right' ? 'flex-end' : config.align === 'space-between' ? 'space-between' : 'flex-start'};
                gap: 32px;
                position: relative;
              ">
                ${logoHTML}
                
                <!-- Hamburger Label -->
                <label for="mobile-toggle-${menuId}" class="mobile-menu-toggle-${menuId}" style="
                  display: none;
                  position: absolute;
                  right: 24px;
                  cursor: pointer;
                  padding: 8px;
                  color: ${hamburgerColor};
                  z-index: 1000;
                ">
                  <svg class="hamburger-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                  <svg class="close-icon" style="display: none;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </label>
                
                <div class="desktop-menu-${menuId}" style="display: flex; align-items: center; gap: 32px; flex-wrap: wrap;">
                  ${menuItemsHTML(visibleItems)}
                  ${buttonHTML}
                  ${socialIconsHTML}
                </div>
              </div>
            `;
          })()}
          
          <!-- Mobile Menu Dropdown -->
          <div id="mobile-dropdown-${menuId}" class="mobile-menu-dropdown-${menuId}" style="
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: ${getMenuBgColor()};
            backdrop-filter: ${config.transparent ? 'blur(10px)' : 'none'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 999;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
            opacity: 0;
          ">
            <div style="padding: 16px 24px;">
              ${config.menuItems.filter(item => item.show).map(item => `
                <a href="${item.link}" style="
                  display: block;
                  font-size: 15px;
                  font-weight: 500;
                  color: ${item.color};
                  text-decoration: none;
                  padding: 12px 0;
                  border-bottom: 1px solid rgba(0,0,0,0.1);
                ">
                  ${item.text}
                </a>
              `).join('')}
              ${config.button.show ? `
                <a href="${config.button.link}" style="
                  display: inline-block;
                  margin-top: 16px;
                  background-color: ${config.button.color};
                  color: ${config.button.textColor};
                  padding: 10px 24px;
                  font-size: 15px;
                  border-radius: 8px;
                  border: ${config.button.color === 'transparent' ? `2px solid ${config.button.textColor}` : 'none'};
                  font-weight: 600;
                  text-decoration: none;
                  text-align: center;
                  width: 100%;
                  box-sizing: border-box;
                ">
                  ${config.button.text}
                </a>
              ` : ''}
            </div>
          </div>
        </nav>
          
        <!-- Responsive CSS with checkbox toggle -->
        <style>
          /* Hide desktop menu on mobile */
          @media (max-width: 768px) {
            .desktop-menu-${menuId} {
              display: none !important;
            }
            .mobile-menu-toggle-${menuId} {
              display: block !important;
            }
          }
          
          /* Show mobile dropdown when checkbox is checked */
          #mobile-toggle-${menuId}:checked ~ nav .mobile-menu-dropdown-${menuId} {
            display: block !important;
            max-height: 500px !important;
            opacity: 1 !important;
          }
          
          /* Toggle icons when checkbox is checked */
          #mobile-toggle-${menuId}:checked ~ nav .mobile-menu-toggle-${menuId} .hamburger-icon {
            display: none !important;
          }
          
          #mobile-toggle-${menuId}:checked ~ nav .mobile-menu-toggle-${menuId} .close-icon {
            display: block !important;
          }
        </style>
      `;
    }

    case 'hero': {
      // Check if it's the new image-above-text layout
      if (config.layout === 'image-above-text') {
        return `
          <section class="hero-image-above" style="
            background-color: ${config.background.value};
            width: 100%;
            padding: ${config.padding.top}px 24px ${config.padding.bottom}px;
          ">
            <div style="
              max-width: ${config.contentWidth}px;
              margin: 0 auto;
            ">
              ${config.heroImage && config.heroImage.show ? `
                <div class="hero-image-container" style="
                  margin-bottom: 48px;
                  border-radius: ${config.heroImage.borderRadius || 0}px;
                  overflow: hidden;
                  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                ">
                  <img
                    src="${config.heroImage.src}"
                    alt="${config.heroImage.alt || 'Hero image'}"
                    class="hero-image"
                    style="
                      width: 100%;
                      height: ${config.heroImage.height || 600}px;
                      object-fit: ${config.heroImage.objectFit || 'cover'};
                      display: block;
                    "
                  />
                </div>
              ` : ''}
              
              <div class="hero-content" style="text-align: ${config.title.align};">
                ${config.title.show ? `
                  <h1 class="hero-title" style="
                    font-size: ${config.title.size || 56}px;
                    font-weight: ${config.title.weight || 700};
                    color: ${config.title.color};
                    margin-bottom: 24px;
                    line-height: 1.2;
                  ">
                    ${config.title.text}
                  </h1>
                ` : ''}
                
                ${config.description.show ? `
                  <p class="hero-description" style="
                    font-size: ${config.description.size || 20}px;
                    color: ${config.description.color};
                    margin-bottom: 40px;
                    line-height: 1.6;
                    max-width: 800px;
                    margin-left: ${config.description.align === 'center' ? 'auto' : '0'};
                    margin-right: ${config.description.align === 'center' ? 'auto' : '0'};
                  ">
                    ${config.description.text}
                  </p>
                ` : ''}
                
                ${config.button.show ? `
                  <a href="${config.button.link}" class="hero-button" style="
                    background-color: ${config.button.color};
                    color: ${config.button.textColor};
                    padding: 16px 40px;
                    font-size: ${config.button.size || 18}px;
                    border-radius: 12px;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-block;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transition: transform 0.2s;
                  ">
                    ${config.button.text}
                  </a>
                ` : ''}
                
                ${config.subtitle.show && config.subtitle.text ? `
                  <p class="hero-subtitle" style="
                    font-size: 16px;
                    color: ${config.subtitle.color};
                    margin-top: 32px;
                  ">
                    ${config.subtitle.text}
                  </p>
                ` : ''}
              </div>
            </div>
            
            <style>
              @media (max-width: 768px) {
                .hero-image-above {
                  padding: 40px 16px !important;
                }
                .hero-image-container {
                  margin-bottom: 32px !important;
                }
                .hero-image {
                  height: 300px !important;
                }
                .hero-title {
                  font-size: 32px !important;
                  margin-bottom: 16px !important;
                }
                .hero-description {
                  font-size: 16px !important;
                  margin-bottom: 24px !important;
                }
                .hero-button {
                  padding: 12px 28px !important;
                  font-size: 16px !important;
                }
                .hero-subtitle {
                  font-size: 14px !important;
                  margin-top: 20px !important;
                }
              }
              
              @media (max-width: 480px) {
                .hero-image-above {
                  padding: 30px 12px !important;
                }
                .hero-image-container {
                  margin-bottom: 24px !important;
                }
                .hero-image {
                  height: 250px !important;
                }
                .hero-title {
                  font-size: 28px !important;
                  margin-bottom: 12px !important;
                }
                .hero-description {
                  font-size: 14px !important;
                  margin-bottom: 20px !important;
                }
                .hero-button {
                  padding: 10px 24px !important;
                  font-size: 14px !important;
                }
              }
            </style>
          </section>
        `;
      }
      
      // Default layout (background-based)
      const bgStyle = config.background.type === 'image' 
        ? `background-image: url('${config.background.value}'); background-size: cover; background-position: center;`
        : config.background.type === 'gradient'
        ? `background: ${config.background.value};`
        : `background-color: ${config.background.value};`;
      
      const overlay = config.background.overlay ? `
        <div style="
          position: absolute;
          inset: 0;
          background-color: ${config.background.overlayColor || 'rgba(0,0,0,0.5)'};
        "></div>
      ` : '';

      return `
        <section style="
          ${bgStyle}
          width: 100%;
          min-height: ${config.fullScreen ? '100vh' : 'auto'};
          display: flex;
          align-items: center;
          justify-content: center;
          padding: ${config.padding.top}px 24px ${config.padding.bottom}px;
          position: relative;
        ">
          ${overlay}
          <div style="
            max-width: ${config.contentWidth}px;
            text-align: ${config.title.align};
            position: relative;
            z-index: 1;
          ">
            ${config.title.show ? `
              <h1 style="
                font-size: 64px;
                font-weight: 800;
                color: ${config.title.color};
                margin-bottom: 24px;
                line-height: 1.1;
              ">
                ${config.title.text}
              </h1>
            ` : ''}
            
            ${config.description.show ? `
              <p style="
                font-size: 20px;
                color: ${config.description.color};
                margin-bottom: 32px;
                line-height: 1.6;
              ">
                ${config.description.text}
              </p>
            ` : ''}
            
            ${config.button.show ? `
              <a href="${config.button.link}" style="
                background-color: ${config.button.color};
                color: ${config.button.textColor};
                padding: 16px 40px;
                font-size: 18px;
                border-radius: 12px;
                font-weight: 600;
                text-decoration: none;
                display: inline-block;
                margin-bottom: 16px;
              ">
                ${config.button.text}
              </a>
            ` : ''}
            
            ${config.subtitle.show ? `
              <p style="
                font-size: 14px;
                color: ${config.subtitle.color};
                margin-top: 16px;
              ">
                ${config.subtitle.text}
              </p>
            ` : ''}
          </div>
        </section>
      `;
    }

    case 'article': {
      const bgStyle = config.background.type === 'gradient'
        ? `background: ${config.background.value};`
        : `background-color: ${config.background.value};`;

      // NEW ARTICLE LAYOUTS: Grid, Vertical, Split
      if (config.layout === 'grid') {
        // Grid Masonry Layout
        const gridId = `article-grid-${Math.random().toString(36).substr(2, 9)}`;
        return `
          <section class="${gridId}" style="
            ${bgStyle}
            width: 100%;
            padding: ${config.padding?.top || 80}px 24px ${config.padding?.bottom || 80}px;
          ">
            <div style="
              max-width: ${config.fullWidth ? '100%' : (config.contentWidth || 1400) + 'px'};
              margin: 0 auto;
            ">
              ${config.title?.show ? `
                <h2 class="${gridId}-title" style="
                  font-size: ${config.title.size || 32}px;
                  font-weight: 700;
                  color: ${config.title.color};
                  text-align: ${config.title.align || 'left'};
                  margin-bottom: 40px;
                ">
                  ${config.title.text}
                </h2>
              ` : ''}
              
              <div class="${gridId}-grid" style="
                display: grid;
                grid-template-columns: repeat(${config.columns || 3}, 1fr);
                gap: ${config.gap || 24}px;
              ">
                ${(config.elements || []).map(element => `
                  <div class="${gridId}-card" style="
                    width: ${element.width || 100}%;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #ffffff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                    min-height: ${element.minHeight || 400}px;
                    display: flex;
                    flex-direction: column;
                  ">
                    ${element.image?.show ? `
                      <img 
                        src="${element.image.src || ''}" 
                        alt="${element.image.alt || ''}" 
                        style="
                          width: 100%;
                          height: ${element.image.height || 300}px;
                          object-fit: ${element.image.objectFit || 'cover'};
                        "
                      />
                    ` : ''}
                    <div style="padding: 24px;">
                      ${element.tag?.show ? `
                        <span style="
                          display: inline-block;
                          font-size: 12px;
                          font-weight: 600;
                          color: ${element.tag.color};
                          background-color: ${element.tag.bgColor};
                          padding: 4px 12px;
                          border-radius: 4px;
                          margin-bottom: 12px;
                        ">${element.tag.text}</span>
                      ` : ''}
                      ${element.title?.show ? `
                        <h3 class="${gridId}-card-title" style="
                          font-size: ${element.title.size || 24}px;
                          font-weight: ${element.title.weight || 700};
                          color: ${element.title.color};
                          margin-bottom: 12px;
                        ">${element.title.text}</h3>
                      ` : ''}
                      ${element.description?.show ? `
                        <p class="${gridId}-card-desc" style="
                          font-size: ${element.description.size || 16}px;
                          color: ${element.description.color};
                          line-height: 1.6;
                          margin-bottom: 16px;
                        ">${element.description.text}</p>
                      ` : ''}
                      ${element.button?.show ? `
                        <a href="${element.button.link || '#'}" style="
                          display: inline-block;
                          background-color: ${element.button.color};
                          color: ${element.button.textColor};
                          padding: 10px 20px;
                          border-radius: 6px;
                          text-decoration: none;
                          font-weight: 600;
                          font-size: 14px;
                        ">${element.button.text}</a>
                      ` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <style>
              /* Responsive Grid Layout */
              @media (max-width: 1024px) {
                .${gridId} {
                  padding: 60px 20px !important;
                }
                .${gridId}-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                  gap: 20px !important;
                }
                .${gridId}-title {
                  font-size: 28px !important;
                  margin-bottom: 30px !important;
                }
                .${gridId}-card-title {
                  font-size: 20px !important;
                }
                .${gridId}-card-desc {
                  font-size: 14px !important;
                }
              }
              
              @media (max-width: 640px) {
                .${gridId} {
                  padding: 40px 16px !important;
                }
                .${gridId}-grid {
                  grid-template-columns: 1fr !important;
                  gap: 16px !important;
                }
                .${gridId}-title {
                  font-size: 24px !important;
                  margin-bottom: 24px !important;
                }
                .${gridId}-card-title {
                  font-size: 18px !important;
                }
                .${gridId}-card-desc {
                  font-size: 14px !important;
                }
                .${gridId}-card img {
                  height: 200px !important;
                }
              }
            </style>
          </section>
        `;
      } else if (config.layout === 'vertical') {
        // Vertical Layout with multiple sections
        const verticalId = `article-vertical-${Math.random().toString(36).substr(2, 9)}`;
        return `
          <section class="${verticalId}" style="
            ${bgStyle}
            width: 100%;
            padding: ${config.padding?.top || 60}px 24px ${config.padding?.bottom || 60}px;
          ">
            <div style="
              max-width: ${config.fullWidth ? '100%' : (config.contentWidth || 1200) + 'px'};
              margin: 0 auto;
            ">
              ${config.title?.show ? `
                <h2 class="${verticalId}-title" style="
                  font-size: ${config.title.size || 32}px;
                  font-weight: 700;
                  color: ${config.title.color};
                  text-align: ${config.title.align || 'left'};
                  margin-bottom: 40px;
                ">
                  ${config.title.text}
                </h2>
              ` : ''}
              
              <div style="display: flex; flex-direction: column; gap: ${config.gap || 48}px;">
                ${(config.elements || []).map((element, idx) => {
                  const sectionBg = element.background?.type === 'gradient' 
                    ? `background: ${element.background.value};` 
                    : `background-color: ${element.background?.value || '#ffffff'};`;
                  
                  return `
                    <div class="${verticalId}-section-${idx}" style="
                      ${sectionBg}
                      border-radius: 12px;
                      overflow: hidden;
                    ">
                      ${element.layout === 'split' ? `
                        <div class="${verticalId}-split" style="
                          display: flex;
                          gap: ${element.gap || 40}px;
                          padding: 40px;
                        ">
                          <div class="${verticalId}-left" style="flex: ${element.leftWidth || 50}; min-width: 0;">
                            ${element.leftContent?.type === 'text' ? `
                              ${element.leftContent.title?.show ? `
                                <h3 class="${verticalId}-left-title" style="
                                  font-size: ${element.leftContent.title.size || 32}px;
                                  font-weight: ${element.leftContent.title.weight || 700};
                                  color: ${element.leftContent.title.color};
                                  font-style: ${element.leftContent.title.style || 'normal'};
                                  margin-bottom: 16px;
                                ">${element.leftContent.title.text}</h3>
                              ` : ''}
                              ${element.leftContent.description?.show ? `
                                <p class="${verticalId}-left-desc" style="
                                  font-size: ${element.leftContent.description.size || 16}px;
                                  color: ${element.leftContent.description.color};
                                  line-height: 1.6;
                                  margin-bottom: 20px;
                                ">${element.leftContent.description.text}</p>
                              ` : ''}
                              ${element.leftContent.button?.show ? `
                                <a href="${element.leftContent.button.link || '#'}" style="
                                  display: inline-block;
                                  background-color: ${element.leftContent.button.color};
                                  color: ${element.leftContent.button.textColor};
                                  padding: 12px 28px;
                                  border-radius: 6px;
                                  border: ${element.leftContent.button.color === 'transparent' ? `2px solid ${element.leftContent.button.borderColor || element.leftContent.button.textColor}` : 'none'};
                                  text-decoration: none;
                                  font-weight: 600;
                                  margin-right: 12px;
                                ">${element.leftContent.button.text}</a>
                              ` : ''}
                              ${element.leftContent.button2?.show ? `
                                <a href="${element.leftContent.button2.link || '#'}" style="
                                  display: inline-block;
                                  background-color: ${element.leftContent.button2.color};
                                  color: ${element.leftContent.button2.textColor};
                                  padding: 12px 28px;
                                  border-radius: 6px;
                                  border: ${element.leftContent.button2.color === 'transparent' ? `2px solid ${element.leftContent.button2.borderColor || element.leftContent.button2.textColor}` : 'none'};
                                  text-decoration: none;
                                  font-weight: 600;
                                ">${element.leftContent.button2.text}</a>
                              ` : ''}
                            ` : ''}
                          </div>
                          <div class="${verticalId}-right" style="flex: ${element.rightWidth || 50}; min-width: 0;">
                            ${element.rightContent?.type === 'text' ? `
                              ${element.rightContent.title?.show ? `
                                <h3 class="${verticalId}-right-title" style="
                                  font-size: ${element.rightContent.title.size || 40}px;
                                  font-weight: ${element.rightContent.title.weight || 700};
                                  color: ${element.rightContent.title.color};
                                  margin-bottom: 16px;
                                ">${element.rightContent.title.text}</h3>
                              ` : ''}
                              ${element.rightContent.subtitle?.show ? `
                                <h4 style="
                                  font-size: ${element.rightContent.subtitle.size || 18}px;
                                  color: ${element.rightContent.subtitle.color};
                                  margin-bottom: 12px;
                                ">${element.rightContent.subtitle.text}</h4>
                              ` : ''}
                              ${element.rightContent.description?.show ? `
                                <p class="${verticalId}-right-desc" style="
                                  font-size: ${element.rightContent.description.size || 14}px;
                                  color: ${element.rightContent.description.color};
                                  line-height: 1.6;
                                  margin-bottom: 20px;
                                  white-space: pre-wrap;
                                ">${element.rightContent.description.text}</p>
                              ` : ''}
                              ${element.rightContent.button?.show ? `
                                <a href="${element.rightContent.button.link || '#'}" style="
                                  display: inline-block;
                                  background-color: ${element.rightContent.button.color};
                                  color: ${element.rightContent.button.textColor};
                                  padding: 12px 28px;
                                  border-radius: 6px;
                                  border: ${element.rightContent.button.color === 'transparent' ? `2px solid ${element.rightContent.button.borderColor || element.rightContent.button.textColor}` : 'none'};
                                  text-decoration: none;
                                  font-weight: 600;
                                ">${element.rightContent.button.text}</a>
                              ` : ''}
                            ` : element.rightContent?.type === 'image' ? `
                              ${element.rightContent.image?.show ? `
                                <img 
                                  src="${element.rightContent.image.src || ''}" 
                                  alt="${element.rightContent.image.alt || ''}" 
                                  style="
                                    width: 100%;
                                    height: auto;
                                    object-fit: ${element.rightContent.image.objectFit || 'cover'};
                                    border-radius: 12px;
                                    margin-bottom: 20px;
                                  "
                                />
                              ` : ''}
                              ${element.rightContent.title?.show ? `
                                <h3 style="
                                  font-size: ${element.rightContent.title.size || 32}px;
                                  font-weight: ${element.rightContent.title.weight || 700};
                                  color: ${element.rightContent.title.color};
                                  margin-bottom: 12px;
                                ">${element.rightContent.title.text}</h3>
                              ` : ''}
                              ${element.rightContent.description?.show ? `
                                <p style="
                                  font-size: ${element.rightContent.description.size || 14}px;
                                  color: ${element.rightContent.description.color};
                                  line-height: 1.6;
                                  margin-bottom: 20px;
                                  white-space: pre-wrap;
                                ">${element.rightContent.description.text}</p>
                              ` : ''}
                              ${element.rightContent.button?.show ? `
                                <a href="${element.rightContent.button.link || '#'}" style="
                                  display: inline-block;
                                  background-color: ${element.rightContent.button.color};
                                  color: ${element.rightContent.button.textColor};
                                  padding: 12px 28px;
                                  border-radius: 6px;
                                  border: ${element.rightContent.button.color === 'transparent' ? `2px solid ${element.rightContent.button.borderColor || element.rightContent.button.textColor}` : 'none'};
                                  text-decoration: none;
                                  font-weight: 600;
                                  margin-right: 12px;
                                ">${element.rightContent.button.text}</a>
                              ` : ''}
                              ${element.rightContent.button2?.show ? `
                                <a href="${element.rightContent.button2.link || '#'}" style="
                                  display: inline-block;
                                  background-color: ${element.rightContent.button2.color};
                                  color: ${element.rightContent.button2.textColor};
                                  padding: 12px 28px;
                                  border-radius: 6px;
                                  border: ${element.rightContent.button2.color === 'transparent' ? `2px solid ${element.rightContent.button2.borderColor || element.rightContent.button2.textColor}` : 'none'};
                                  text-decoration: none;
                                  font-weight: 600;
                                ">${element.rightContent.button2.text}</a>
                              ` : ''}
                            ` : ''}
                          </div>
                        </div>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
            
            <style>
              /* Responsive Vertical Layout */
              @media (max-width: 1024px) {
                .${verticalId} {
                  padding: 40px 20px !important;
                }
                .${verticalId}-title {
                  font-size: 28px !important;
                  margin-bottom: 30px !important;
                }
                .${verticalId}-split {
                  padding: 30px !important;
                  gap: 30px !important;
                }
                .${verticalId}-left-title {
                  font-size: 24px !important;
                }
                .${verticalId}-right-title {
                  font-size: 32px !important;
                }
                .${verticalId}-left-desc,
                .${verticalId}-right-desc {
                  font-size: 14px !important;
                }
              }
              
              @media (max-width: 768px) {
                .${verticalId} {
                  padding: 30px 16px !important;
                }
                .${verticalId}-title {
                  font-size: 24px !important;
                  margin-bottom: 24px !important;
                }
                .${verticalId}-split {
                  flex-direction: column !important;
                  padding: 24px !important;
                  gap: 24px !important;
                }
                .${verticalId}-left,
                .${verticalId}-right {
                  flex: 1 !important;
                }
                .${verticalId}-left-title {
                  font-size: 20px !important;
                }
                .${verticalId}-right-title {
                  font-size: 24px !important;
                }
                .${verticalId}-left-desc,
                .${verticalId}-right-desc {
                  font-size: 14px !important;
                }
              }
            </style>
          </section>
        `;
      } else if (config.layout === 'split') {
        // Split Layout - 50/50 split with image and text
        const splitId = `article-split-${Math.random().toString(36).substr(2, 9)}`;
        return `
          <section class="${splitId}" style="
            ${bgStyle}
            width: 100%;
            padding: ${config.padding?.top || 0}px 0 ${config.padding?.bottom || 0}px;
            min-height: ${config.minHeight || 600}px;
          ">
            <div class="${splitId}-container" style="
              max-width: ${config.fullWidth ? '100%' : (config.contentWidth || 1400) + 'px'};
              margin: 0 auto;
              display: flex;
              height: 100%;
              min-height: ${config.minHeight || 600}px;
            ">
              <div class="${splitId}-left" style="
                flex: ${config.leftWidth || 50};
                background-color: ${config.leftContent?.background?.value || '#ffffff'};
                padding: ${config.leftContent?.padding?.top || 80}px ${config.leftContent?.padding?.right || 60}px ${config.leftContent?.padding?.bottom || 80}px ${config.leftContent?.padding?.left || 60}px;
                display: flex;
                flex-direction: column;
                justify-content: center;
              ">
                ${config.leftContent?.tag?.show ? `
                  <span style="
                    display: inline-block;
                    font-size: 12px;
                    font-weight: 600;
                    color: ${config.leftContent.tag.color};
                    background-color: ${config.leftContent.tag.bgColor};
                    padding: 6px 16px;
                    border-radius: 20px;
                    margin-bottom: 20px;
                    width: fit-content;
                  ">${config.leftContent.tag.text}</span>
                ` : ''}
                ${config.leftContent?.title?.show ? `
                  <h2 class="${splitId}-title" style="
                    font-size: ${config.leftContent.title.size || 48}px;
                    font-weight: ${config.leftContent.title.weight || 700};
                    color: ${config.leftContent.title.color};
                    margin-bottom: 24px;
                    line-height: 1.2;
                  ">${config.leftContent.title.text}</h2>
                ` : ''}
                ${config.leftContent?.description?.show ? `
                  <p class="${splitId}-desc" style="
                    font-size: ${config.leftContent.description.size || 18}px;
                    color: ${config.leftContent.description.color};
                    line-height: ${config.leftContent.description.lineHeight || 1.7};
                    margin-bottom: 32px;
                  ">${config.leftContent.description.text}</p>
                ` : ''}
                ${config.leftContent?.metadata?.show ? `
                  <div class="${splitId}-metadata" style="
                    font-size: 14px;
                    color: ${config.leftContent.metadata.color};
                    margin-bottom: 24px;
                  ">
                    ${config.leftContent.metadata.author} • ${config.leftContent.metadata.date} • ${config.leftContent.metadata.readTime}
                  </div>
                ` : ''}
                ${config.leftContent?.button?.show ? `
                  <a href="${config.leftContent.button.link || '#'}" style="
                    display: inline-block;
                    background-color: ${config.leftContent.button.color};
                    color: ${config.leftContent.button.textColor};
                    padding: 14px 32px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    width: fit-content;
                  ">${config.leftContent.button.text}</a>
                ` : ''}
              </div>
              <div class="${splitId}-right" style="
                flex: ${config.rightWidth || 50};
                position: relative;
                overflow: hidden;
              ">
                ${config.rightContent?.image?.show ? `
                  <img 
                    src="${config.rightContent.image.src || ''}" 
                    alt="${config.rightContent.image.alt || ''}" 
                    style="
                      width: 100%;
                      height: 100%;
                      object-fit: ${config.rightContent.image.objectFit || 'cover'};
                    "
                  />
                ` : ''}
                ${config.rightContent?.overlay?.show ? `
                  <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: ${config.rightContent.overlay.color};
                    opacity: ${config.rightContent.overlay.opacity || 0.1};
                  "></div>
                ` : ''}
              </div>
            </div>
            
            <style>
              /* Responsive Split Layout */
              @media (max-width: 1024px) {
                .${splitId} {
                  min-height: auto !important;
                }
                .${splitId}-container {
                  flex-direction: column !important;
                  min-height: auto !important;
                }
                .${splitId}-left {
                  flex: 1 !important;
                  padding: 60px 40px !important;
                }
                .${splitId}-right {
                  flex: 1 !important;
                  min-height: 400px !important;
                }
                .${splitId}-title {
                  font-size: 36px !important;
                }
                .${splitId}-desc {
                  font-size: 16px !important;
                }
              }
              
              @media (max-width: 768px) {
                .${splitId}-left {
                  padding: 40px 24px !important;
                }
                .${splitId}-right {
                  min-height: 300px !important;
                }
                .${splitId}-title {
                  font-size: 28px !important;
                  margin-bottom: 16px !important;
                }
                .${splitId}-desc {
                  font-size: 16px !important;
                  margin-bottom: 24px !important;
                }
                .${splitId}-metadata {
                  font-size: 12px !important;
                  margin-bottom: 20px !important;
                }
              }
              
              @media (max-width: 480px) {
                .${splitId}-left {
                  padding: 30px 20px !important;
                }
                .${splitId}-right {
                  min-height: 250px !important;
                }
                .${splitId}-title {
                  font-size: 24px !important;
                }
                .${splitId}-desc {
                  font-size: 14px !important;
                }
              }
            </style>
          </section>
        `;
      }

      // CLASSIC ARTICLE LAYOUTS: image-left, image-right, centered
      const layoutStyles = {
        'image-left': 'flex-direction: row;',
        'image-right': 'flex-direction: row-reverse;',
        'centered': 'flex-direction: column; align-items: center;'
      };

      return `
        <section style="
          ${bgStyle}
          width: 100%;
          padding: ${config.padding.top}px 24px ${config.padding.bottom}px;
        ">
          <div style="
            max-width: ${config.contentWidth}px;
            margin: 0 auto;
            display: flex;
            ${layoutStyles[config.layout] || layoutStyles['image-left']}
            align-items: center;
            gap: 60px;
          ">
            ${config.layout === 'centered' ? `
              <img 
                src="${config.image?.src || ''}" 
                alt="${config.image?.alt || ''}" 
                style="
                  width: 100%;
                  max-width: 800px;
                  border-radius: 16px;
                  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                  margin-bottom: 40px;
                "
              />
            ` : `
              <div style="flex: 1; min-width: 0;">
                <img 
                  src="${config.image?.src || ''}" 
                  alt="${config.image?.alt || ''}" 
                  style="
                    width: 100%;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                  "
                />
              </div>
            `}
            
            <div style="
              flex: 1;
              text-align: ${config.title?.align || 'left'};
            ">
              ${config.title?.show ? `
                <h2 style="
                  font-size: 42px;
                  font-weight: 700;
                  color: ${config.title.color};
                  margin-bottom: 20px;
                  line-height: 1.2;
                ">
                  ${config.title.text}
                </h2>
              ` : ''}
              
              ${config.description?.show ? `
                <p style="
                  font-size: 18px;
                  color: ${config.description.color};
                  margin-bottom: 28px;
                  line-height: 1.6;
                ">
                  ${config.description.text}
                </p>
              ` : ''}
              
              ${config.button?.show ? `
                <a href="${config.button.link}" style="
                  background-color: ${config.button.color};
                  color: ${config.button.textColor};
                  padding: 14px 32px;
                  font-size: 16px;
                  border-radius: 10px;
                  font-weight: 600;
                  text-decoration: none;
                  display: inline-block;
                ">
                  ${config.button.text}
                </a>
              ` : ''}
            </div>
          </div>
          
          <style>
            @media (max-width: 768px) {
              section > div {
                flex-direction: column !important;
                text-align: center !important;
              }
            }
          </style>
        </section>
      `;
    }

    case 'testimonial': {
      const bgStyle = config.background.type === 'gradient'
        ? `background: ${config.background.value};`
        : `background-color: ${config.background.value};`;

      return `
        <section style="
          ${bgStyle}
          width: 100%;
          padding: ${config.padding.top}px 24px ${config.padding.bottom}px;
        ">
          <div style="
            max-width: ${config.contentWidth}px;
            margin: 0 auto;
          ">
            ${config.title.show ? `
              <h2 style="
                font-size: 42px;
                font-weight: 700;
                color: ${config.title.color};
                text-align: ${config.title.align};
                margin-bottom: 16px;
              ">
                ${config.title.text}
              </h2>
            ` : ''}
            
            ${config.description.show ? `
              <p style="
                font-size: 18px;
                color: ${config.description.color};
                text-align: ${config.description.align};
                margin-bottom: 60px;
              ">
                ${config.description.text}
              </p>
            ` : ''}
            
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 32px;
              margin-top: 40px;
            ">
              ${(config.items || []).map(item => `
                <div style="
                  background: white;
                  padding: 32px;
                  border-radius: 12px;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                ">
                  <div style="margin-bottom: 20px;">
                    ${Array(item.rating || 5).fill('⭐').join('')}
                  </div>
                  <p style="
                    font-size: 16px;
                    color: #4a5568;
                    margin-bottom: 24px;
                    line-height: 1.6;
                  ">
                    "${item.text}"
                  </p>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <img 
                      src="${item.avatar}" 
                      alt="${item.name}"
                      style="
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                      "
                    />
                    <div>
                      <div style="font-weight: 600; color: #2d3748;">
                        ${item.name}
                      </div>
                      <div style="font-size: 14px; color: #718096;">
                        ${item.role}
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    case 'footer': {
      const bgStyle = config.background.type === 'gradient'
        ? `background: ${config.background.value};`
        : `background-color: ${config.background.value};`;

      return `
        <footer style="
          ${bgStyle}
          width: 100%;
          padding: ${config.padding.top}px 24px ${config.padding.bottom}px;
        ">
          <div style="
            max-width: ${config.contentWidth}px;
            margin: 0 auto;
          ">
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 40px;
              margin-bottom: 40px;
            ">
              ${config.logo.show ? `
                <div>
                  <div style="
                    font-size: 24px;
                    font-weight: 800;
                    color: ${config.logo.color};
                    margin-bottom: 16px;
                  ">
                    ${config.logo.text}
                  </div>
                </div>
              ` : ''}
              
              ${(config.columns || []).map(column => `
                <div>
                  <h3 style="
                    font-size: 16px;
                    font-weight: 600;
                    color: ${config.logo.color};
                    margin-bottom: 16px;
                  ">
                    ${column.title}
                  </h3>
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${(column.links || []).map(link => `
                      <a href="${link.url}" style="
                        color: ${config.copyright?.color || '#9a9aae'};
                        text-decoration: none;
                        font-size: 14px;
                      ">
                        ${link.text}
                      </a>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
            
            ${(config.social && config.social.length > 0) ? `
              <div style="
                display: flex;
                gap: 16px;
                justify-content: center;
                margin-bottom: 24px;
                padding-top: 24px;
                border-top: 1px solid rgba(255,255,255,0.1);
              ">
                ${config.social.map(item => `
                  <a href="${item.url}" style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${config.logo.color};
                    text-decoration: none;
                    font-weight: bold;
                  ">
                    ${item.icon.charAt(0)}
                  </a>
                `).join('')}
              </div>
            ` : ''}
            
            ${config.copyright.show ? `
              <div style="
                text-align: center;
                color: ${config.copyright.color};
                font-size: 14px;
                padding-top: 24px;
                border-top: 1px solid rgba(255,255,255,0.1);
              ">
                ${config.copyright.text}
              </div>
            ` : ''}
          </div>
        </footer>
      `;
    }

    case 'hero-parallax': {
      const bgStyle = config.background.type === 'gradient' 
        ? `background: ${config.background.value};`
        : config.background.type === 'image'
        ? `
            background-image: url(${config.background.value});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          `
        : `background-color: ${config.background.value};`;

      const overlayStyle = config.overlay?.show 
        ? `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${config.overlay.color};
            opacity: ${config.overlay.opacity};
            z-index: 1;
          `
        : '';

      const paddingTop = config.fullScreen ? (config.paddingTop || 4) : 0;
      const paddingBottom = config.fullScreen ? (config.paddingBottom || 5) : 0;
      const containerPaddingTop = !config.fullScreen ? (config.paddingTop || 4) : 0;
      const containerPaddingBottom = !config.fullScreen ? (config.paddingBottom || 5) : 0;

      return `
        <div style="
          position: relative;
          min-height: ${config.fullScreen ? '100vh' : 'auto'};
          width: 100%;
          overflow: hidden;
          padding-top: ${containerPaddingTop}rem;
          padding-bottom: ${containerPaddingBottom}rem;
          ${bgStyle}
        ">
          ${config.overlay?.show ? `<div style="${overlayStyle}"></div>` : ''}
          
          <div style="
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: ${config.fullWidth ? '100%' : `${config.contentWidth}px`};
            margin: 0 auto;
            padding: ${config.fullScreen ? `${paddingTop}rem 24px ${paddingBottom}rem` : '0 24px'};
            text-align: ${config.title?.align || 'center'};
          ">
            ${config.title?.show ? `
              <h1 style="
                font-size: ${config.title.size || 64}px;
                font-weight: ${config.title.weight || 700};
                color: ${config.title.color};
                text-align: ${config.title.align};
                margin-bottom: 24px;
                line-height: 1.2;
              ">
                ${config.title.text}
              </h1>
            ` : ''}
            
            ${config.description?.show ? `
              <p style="
                font-size: ${config.description.size || 20}px;
                color: ${config.description.color};
                text-align: ${config.description.align};
                margin-bottom: 40px;
                line-height: 1.6;
                max-width: 700px;
                margin: ${config.description.align === 'center' ? '0 auto 40px' : '0 0 40px'};
              ">
                ${config.description.text}
              </p>
            ` : ''}
            
            ${config.button?.show ? `
              <div style="text-align: ${config.title?.align || 'center'};">
                <a href="${config.button.link}" style="
                  background-color: ${config.button.color};
                  color: ${config.button.textColor};
                  padding: 16px 40px;
                  font-size: ${config.button.size || 18}px;
                  font-weight: 600;
                  border-radius: 8px;
                  border: none;
                  text-decoration: none;
                  display: inline-block;
                  cursor: pointer;
                  transition: all 0.3s ease;
                ">
                  ${config.button.text}
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    case 'parallax': {
      let bgStyle = '';
      
      if (config.background.type === 'image') {
        bgStyle = `
          background-image: url(${config.background.value});
          background-size: cover;
          background-position: center;
          background-attachment: ${config.background.parallax ? 'fixed' : 'scroll'};
        `;
      } else if (config.background.type === 'video') {
        // Video will be rendered separately
      } else if (config.background.type === 'color') {
        bgStyle = `background-color: ${config.background.value};`;
      } else if (config.background.type === 'gradient') {
        bgStyle = `background: ${config.background.value};`;
      }

      const overlayHtml = config.overlay && config.background.type !== 'color' ? `
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${config.overlayColor || '#232323'};
          opacity: ${config.overlayOpacity || 0.4};
          z-index: 1;
        "></div>
      ` : '';

      const videoHtml = config.background.type === 'video' ? `
        <video autoplay loop muted playsinline style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        ">
          <source src="${config.background.value}" type="video/mp4">
        </video>
      ` : '';

      return `
        <section style="
          position: relative;
          width: 100%;
          min-height: ${config.fullScreen ? '100vh' : 'auto'};
          padding-top: ${config.fullScreen ? 0 : (config.paddingTop || 60)}px;
          padding-bottom: ${config.fullScreen ? 0 : (config.paddingBottom || 80)}px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          ${bgStyle}
        ">
          ${videoHtml}
          ${overlayHtml}
          
          <div style="
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: ${config.fullWidth ? '100%' : '1200px'};
            margin: 0 auto;
            padding: 0 24px;
            text-align: center;
          ">
            ${config.content?.text ? `
              <h2 style="
                font-size: ${config.content.fontSize || 48}px;
                font-weight: ${config.content.fontWeight || 700};
                color: ${config.content.color || '#ffffff'};
                margin-bottom: 16px;
                line-height: 1.2;
              ">
                ${config.content.text}
              </h2>
            ` : ''}
            
            ${config.content?.description ? `
              <p style="
                font-size: ${config.content.descSize || 18}px;
                color: ${config.content.color || '#ffffff'};
                max-width: 600px;
                margin: 0 auto;
                line-height: 1.6;
              ">
                ${config.content.description}
              </p>
            ` : ''}
          </div>
        </section>
      `;
    }

    case 'features': {
      const bgStyle = config.background.type === 'gradient' 
        ? `background: ${config.background.value};`
        : `background-color: ${config.background.value};`;

      const layout = config.layout || 'cards-simple';
      
      // Simple cards with icons
      const renderSimpleCards = () => {
        const itemCount = (config.items || []).length;
        const actualColumns = Math.min(config.columns || 3, itemCount);
        
        return `
        <div class="feature-grid-simple" style="display: grid; grid-template-columns: repeat(${actualColumns}, 1fr); gap: 40px;">
          ${(config.items || []).map((item, idx) => `
            <div class="feature-card-simple-${idx}" style="text-align: center; padding: 32px; border-radius: 16px; transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background-color: ${item.color}33; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                <div style="color: ${item.color}; font-size: 40px;">●</div>
              </div>
              <h3 style="font-size: 22px; font-weight: 700; color: #1a1a2e; margin-bottom: 12px;">${item.title}</h3>
              <p style="font-size: 16px; color: #5a5a6e; line-height: 1.6;">${item.description}</p>
            </div>
          `).join('')}
        </div>
        <style>
          ${(config.items || []).map((item, idx) => `
            .feature-card-simple-${idx}:hover {
              transform: translateY(-8px);
              box-shadow: 0 12px 24px rgba(0,0,0,0.1);
            }
          `).join('')}
          
          /* Responsive grid for simple cards */
          @media (max-width: 768px) {
            .feature-grid-simple {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 24px !important;
            }
          }
          
          @media (max-width: 480px) {
            .feature-grid-simple {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
          }
        </style>
      `;
      };

      // Gradient cards
      const renderGradientCards = () => {
        const itemCount = (config.items || []).length;
        const actualColumns = Math.min(config.columns || 3, itemCount);
        
        return `
        <div class="feature-grid-gradient" style="display: grid; grid-template-columns: repeat(${actualColumns}, 1fr); gap: 30px;">
          ${(config.items || []).map((item, idx) => `
            <div class="feature-card-gradient-${idx}" style="background: ${item.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}; border-radius: 20px; padding: 40px 30px; color: #ffffff; transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer;">
              <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #ffffff;">${item.title}</h3>
              <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px; color: rgba(255,255,255,0.9);">${item.description}</p>
              ${item.features && item.features.length > 0 ? `
                <ul style="list-style: none; padding: 0; margin-bottom: 24px;">
                  ${item.features.map(feature => `
                    <li style="font-size: 14px; margin-bottom: 8px; padding-left: 20px; position: relative;">
                      <span style="position: absolute; left: 0;">✓</span>
                      ${feature}
                    </li>
                  `).join('')}
                </ul>
              ` : ''}
              ${item.button && item.button.show !== false ? `
                <button style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: #ffffff; padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; width: 100%;">
                  ${item.button.text}
                </button>
              ` : ''}
            </div>
          `).join('')}
        </div>
        <style>
          ${(config.items || []).map((item, idx) => `
            .feature-card-gradient-${idx}:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
          `).join('')}
          
          /* Responsive grid for gradient cards */
          @media (max-width: 768px) {
            .feature-grid-gradient {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 20px !important;
            }
          }
          
          @media (max-width: 480px) {
            .feature-grid-gradient {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
          }
        </style>
      `;
      };

      // Cards with images
      const renderCardsWithImages = () => {
        const itemCount = (config.items || []).length;
        const actualColumns = Math.min(config.columns || 3, itemCount);
        
        return `
        <div class="feature-grid-with-images" style="display: grid; grid-template-columns: repeat(${actualColumns}, 1fr); gap: 40px;">
          ${(config.items || []).map((item, idx) => `
            <div class="feature-card-image-${idx}" style="border-radius: 20px; overflow: hidden; background: ${item.cardBackground || '#1a1a2e'}; transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer;">
              ${item.image ? `
                <div style="width: 100%; height: 250px; background: url(${item.image}) center/cover;"></div>
              ` : ''}
              <div style="padding: 32px;">
                <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 12px; color: ${item.titleColor || '#ffffff'};">${item.title}</h3>
                <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px; color: ${item.descColor || 'rgba(255,255,255,0.8)'};">${item.description}</p>
                ${item.button && item.button.show !== false ? `
                  <button style="background: ${item.button.gradient || 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'}; border: none; color: #ffffff; padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer;">
                    ${item.button.text}
                  </button>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        <style>
          ${(config.items || []).map((item, idx) => `
            .feature-card-image-${idx}:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
          `).join('')}
          
          /* Responsive grid for image cards */
          @media (max-width: 768px) {
            .feature-grid-with-images {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 24px !important;
            }
          }
          
          @media (max-width: 480px) {
            .feature-grid-with-images {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
          }
        </style>
      `;
      };

      // Cards with image on side
      const renderCardsImageSide = () => `
        <div style="display: flex; flex-direction: column; gap: 40px;">
          ${(config.items || []).map((item, index) => `
            <div class="feature-card-side-${index}" style="display: flex; flex-direction: ${index % 2 === 0 ? 'row' : 'row-reverse'}; gap: 40px; align-items: center; background: ${item.cardBackground || '#ffffff'}; border-radius: 20px; padding: 40px; transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer;">
              ${item.image ? `
                <div style="flex: 0 0 45%; height: 300px; background: url(${item.image}) center/cover; border-radius: 12px;"></div>
              ` : ''}
              <div style="flex: 1;">
                ${item.label ? `
                  <span style="display: inline-block; font-size: 12px; font-weight: 600; color: ${item.labelColor || '#667eea'}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">${item.label}</span>
                ` : ''}
                <h3 style="font-size: 32px; font-weight: 700; margin-bottom: 16px; color: ${item.titleColor || '#1a1a2e'};">${item.title}</h3>
                <p style="font-size: 16px; line-height: 1.7; color: ${item.descColor || '#5a5a6e'}; margin-bottom: 24px;">${item.description}</p>
                ${item.button && item.button.show !== false ? `
                  <button style="background: ${item.button.color || '#667eea'}; border: none; color: #ffffff; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
                    ${item.button.text}
                  </button>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        <style>
          ${(config.items || []).map((item, idx) => `
            .feature-card-side-${idx}:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            }
          `).join('')}
        </style>
      `;

      // Dark cards
      const renderDarkCards = () => {
        const itemCount = (config.items || []).length;
        const actualColumns = Math.min(config.columns || 3, itemCount);
        
        return `
        <div class="feature-grid-dark" style="display: grid; grid-template-columns: repeat(${actualColumns}, 1fr); gap: 30px;">
          ${(config.items || []).map((item, idx) => `
            <div class="feature-card-dark-${idx}" style="background: ${item.cardBackground || 'rgba(30, 30, 46, 0.8)'}; border: 1px solid rgba(102, 126, 234, 0.2); border-radius: 20px; padding: 40px 32px; position: relative; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; cursor: pointer;">
              ${item.glowEffect ? `
                <div style="position: absolute; top: -50%; right: -50%; width: 200px; height: 200px; background: ${item.glowColor || 'radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)'}; border-radius: 50%; filter: blur(40px); pointer-events: none;"></div>
              ` : ''}
              <div style="width: 64px; height: 64px; background: ${item.iconBackground || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                <div style="color: #ffffff; font-size: 32px;">●</div>
              </div>
              <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 12px; color: ${item.titleColor || '#ffffff'};">${item.title}</h3>
              <p style="font-size: 15px; line-height: 1.6; color: ${item.descColor || 'rgba(255,255,255,0.7)'}; margin-bottom: 20px;">${item.description}</p>
              ${item.button && item.button.show !== false ? `
                <button style="background: transparent; border: 1px solid rgba(102, 126, 234, 0.5); color: #667eea; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">
                  ${item.button.text}
                </button>
              ` : ''}
            </div>
          `).join('')}
        </div>
        <style>
          ${(config.items || []).map((item, idx) => `
            .feature-card-dark-${idx}:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
              border-color: rgba(102, 126, 234, 0.5);
            }
          `).join('')}
          
          /* Responsive grid for dark cards */
          @media (max-width: 768px) {
            .feature-grid-dark {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 20px !important;
            }
          }
          
          @media (max-width: 480px) {
            .feature-grid-dark {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
          }
        </style>
      `;
      };

      let itemsHTML = '';
      if (layout === 'cards-gradient') {
        itemsHTML = renderGradientCards();
      } else if (layout === 'cards-with-images') {
        itemsHTML = renderCardsWithImages();
      } else if (layout === 'cards-image-side') {
        itemsHTML = renderCardsImageSide();
      } else if (layout === 'cards-dark') {
        itemsHTML = renderDarkCards();
      } else {
        itemsHTML = renderSimpleCards();
      }

      return `
        <section style="
          ${bgStyle}
          width: 100%;
          padding: ${config.padding.top}px 24px ${config.padding.bottom}px;
        ">
          <div style="
            max-width: ${config.fullWidth ? '100%' : `${config.contentWidth}px`};
            margin: 0 auto;
          ">
            ${config.title.show ? `
              <h2 style="
                font-size: ${config.title.size || 42}px;
                font-weight: 700;
                color: ${config.title.color};
                text-align: ${config.title.align};
                margin-bottom: 16px;
              ">
                ${config.title.text}
              </h2>
            ` : ''}
            
            ${config.description.show ? `
              <p style="
                font-size: ${config.description.size || 18}px;
                color: ${config.description.color};
                text-align: ${config.description.align};
                margin-bottom: 60px;
                max-width: 800px;
                margin: ${config.description.align === 'center' ? '0 auto 60px' : '0 0 60px'};
              ">
                ${config.description.text}
              </p>
            ` : ''}
            
            ${itemsHTML}
          </div>
        </section>
      `;
    }

    case 'gallery-scroll': {
      const imagesHTML = config.images.slice(0, 8).map((img, index) => {
        const positions = [
          { x: '-500%', y: '-200%', area: 'one' },
          { x: '-75%', y: '-200%', area: 'two' },
          { x: '200%', y: '0', area: 'three' },
          { x: '500%', y: '-200%', area: 'four' },
          { x: '-500%', y: '100%', area: 'five' },
          { x: '-200%', y: '0', area: 'six' },
          { x: '75%', y: '200%', area: 'seven' },
          { x: '500%', y: '200%', area: 'eight' }
        ];
        
        return `
          <div style="
            grid-area: ${positions[index].area};
            background-image: url(${img});
            background-size: cover;
            background-position: center;
            --x: ${positions[index].x};
            --y: ${positions[index].y};
            animation: slideIn 1s ease-out forwards;
            animation-timeline: scroll();
            transform: translate(var(--x), var(--y));
          "></div>
        `;
      }).join('');

      return `
        <style>
          @supports (animation-timeline: scroll()) {
            @keyframes slideIn {
              0%, 15% {
                transform: translate(var(--x), var(--y));
              }
              100% {
                transform: translate(0, 0);
              }
            }
          }
        </style>
        <section style="
          position: relative;
          min-height: ${config.scrollHeight || 500}vh;
          background-color: ${config.background?.color || '#111'};
          width: 100%;
          overflow: hidden;
        ">
          <div style="
            position: fixed;
            inset: 0;
            width: 100vw;
            height: 100vh;
            display: grid;
            grid-template-columns: 1fr 2fr ${config.sizeBase || 100}px 2fr 1fr;
            grid-template-rows: 1fr ${config.sizeBase || 100}px 1fr;
            grid-template-areas:
              'one two two three four'
              'one six center three eight'
              'five six seven seven eight';
            gap: 1rem;
          ">
            ${imagesHTML}
            
            <div style="
              grid-area: center;
              background-color: ${config.centerBg || '#333'};
              background-image: url(${config.images[8]});
              background-size: cover;
              background-position: center;
              color: ${config.centerColor || 'white'};
              display: grid;
              place-content: center;
              width: 600px;
              aspect-ratio: 1;
              translate: -250px -250px;
              text-align: center;
              position: relative;
            ">
              <div style="
                font-family: 'Jura', sans-serif;
                font-weight: 300;
                padding: 20px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 8px;
              ">
                <h1 style="
                  font-size: ${config.title?.size || 48}px;
                  font-weight: ${config.title?.weight || 500};
                  margin: 0 0 10px 0;
                ">
                  ${config.title?.text || 'Sliding images'}
                </h1>
                <p style="
                  font-size: ${config.description?.size || 18}px;
                  margin: 0;
                ">
                  ${config.description?.text || 'Scroll to reveal the images'}
                </p>
              </div>
              
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 40" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                style="
                  position: absolute;
                  bottom: 50px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 50px;
                  height: 50px;
                "
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 3m0 4a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4z" />
                <path d="M12 7l0 4" />
                <path d="M8 26l4 4l4 -4">
                  <animateTransform 
                    attributeType="XML" 
                    attributeName="transform" 
                    type="translate" 
                    values="0 0; 0 4; 0 0" 
                    dur="1s" 
                    repeatCount="indefinite" 
                  />
                </path>
              </svg>
            </div>
          </div>
        </section>
      `;
    }

    default:
      return `<div style="padding: 40px; text-align: center; font-family: sans-serif;"><p>Bloc de tip "${config.type}" - previzualizare indisponibilă</p></div>`;
  }
};

export const PreviewModal = ({ blocks, isOpen, onClose }) => {
  const [device, setDevice] = useState('desktop');

  const generateHTML = useMemo(() => {
    // Debug: Log blocks to see if there are duplicates
    console.log('🔍 PreviewModal received blocks:', blocks);
    console.log('🔍 Block IDs:', blocks?.map(b => b.id));
    console.log('🔍 Block types:', blocks?.map(b => b.config?.type));
    console.log('🔍 Block sticky states:', blocks?.map(b => ({ id: b.id, sticky: b.config?.sticky })));
    
    if (!blocks || blocks.length === 0) {
      return '<div style="padding: 40px; text-align: center; font-family: sans-serif;"><h2>Nu există blocuri de previzualizat</h2><p>Adaugă câteva blocuri pentru a vedea previzualizarea.</p></div>';
    }

    // AGGRESSIVE DEDUPLICATION: Remove all duplicates by ID AND type
    const uniqueBlocks = [];
    const seenIds = new Set();
    const seenTypes = new Set();
    let menuCount = 0;
    
    for (const block of blocks) {
      console.log('🔍 Processing block:', block.id, 'type:', block.config?.type, 'sticky:', block.config?.sticky);
      
      // Skip if we already saw this exact ID
      if (seenIds.has(block.id)) {
        console.log('⚠️ Skipping duplicate block ID:', block.id);
        continue;
      }
      
      // CRITICAL FIX: For menu blocks, ONLY allow ONE menu total
      if (block.config?.type === 'menu') {
        menuCount++;
        console.log('🔍 Found menu block #', menuCount, '- id:', block.id, 'sticky:', block.config?.sticky);
        
        // If this is not the first menu, SKIP IT
        if (menuCount > 1) {
          console.log('⚠️ BLOCKING duplicate menu block:', block.id);
          continue;
        }
        
        // Also check if we've seen menu type before
        if (seenTypes.has('menu')) {
          console.log('⚠️ BLOCKING duplicate menu by type check:', block.id);
          continue;
        }
        
        seenTypes.add('menu');
      }
      
      seenIds.add(block.id);
      uniqueBlocks.push(block);
    }
    
    console.log('🔍 After AGGRESSIVE dedup - uniqueBlocks count:', uniqueBlocks.length);
    console.log('🔍 Final uniqueBlocks:', uniqueBlocks.map(b => ({ id: b.id, type: b.config?.type, sticky: b.config?.sticky })));
    console.log('🔍 Removed duplicates:', blocks.length - uniqueBlocks.length);
    console.log('🔍 Total menus allowed:', menuCount > 0 ? 1 : 0);

    const htmlBlocks = uniqueBlocks.map(block => {
      const html = generateBlockHTML(block.config);
      const menuTag = html.includes('<nav') ? 'CONTAINS <nav>' : 'no nav';
      console.log('🔍 Generated HTML for block:', block.id, 'type:', block.config?.type, menuTag, 'length:', html.length);
      
      // Count how many <nav> tags are in this HTML
      const navCount = (html.match(/<nav/g) || []).length;
      if (navCount > 2) {
        console.error('❌ WARNING: Block', block.id, 'generated', navCount, '<nav> tags (expected max 2 for desktop+mobile)');
      }
      
      return html;
    }).join('\n');
    
    // Final check: count total outer <nav> tags (should be 1 for menu)
    const outerNavTags = (htmlBlocks.match(/<nav\s+style/g) || []).length;
    console.log('🔍 Total outer <nav> tags in final HTML:', outerNavTags);
    if (outerNavTags > 1) {
      console.error('❌ DUPLICATE MENU ERROR: Found', outerNavTags, 'outer <nav> tags in generated HTML!');
    }

    return `
      <!DOCTYPE html>
      <html lang="ro">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Previzualizare Site</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            margin: 0;
            padding: 0;
            height: auto;
            min-height: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            display: block;
          }
        </style>
      </head>
      <body>
        ${htmlBlocks}
      </body>
      </html>
    `;
  }, [blocks]);

  const openInNewWindow = () => {
    const newWindow = window.open('', '_blank', 'width=1200,height=800');
    if (newWindow) {
      newWindow.document.write(generateHTML);
      newWindow.document.close();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full h-full max-w-7xl max-h-[90vh] flex flex-col z-[201]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Previzualizare Site</h2>
          <div className="flex items-center gap-2">
            {/* Device selector */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {Object.entries(DEVICE_SIZES).map(([key, { label, icon: Icon }]) => (
                <Button
                  key={key}
                  onClick={() => setDevice(key)}
                  variant={device === key ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center gap-2 ${
                    device === key 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-300 mx-2"></div>

            <Button
              onClick={openInNewWindow}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              Deschide în fereastră nouă
            </Button>

            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="ml-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Preview iframe */}
        <div className="flex-1 overflow-hidden bg-gray-100 flex items-start justify-center p-4">
          <div 
            className="transition-all duration-300 h-full"
            style={{ 
              width: DEVICE_SIZES[device].width,
              maxWidth: '100%'
            }}
          >
            <iframe
              srcDoc={generateHTML}
              className="w-full h-full border-none bg-white shadow-lg"
              style={{ 
                display: 'block',
                border: 'none',
                borderRadius: '8px'
              }}
              title="Site Preview"
              scrolling="yes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

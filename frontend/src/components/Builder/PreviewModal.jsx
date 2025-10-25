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
    case 'menu':
      return `
        <nav style="
          background-color: ${config.background.value};
          width: 100%;
          position: ${config.sticky ? 'sticky' : 'relative'};
          top: ${config.sticky ? '0' : 'auto'};
          z-index: ${config.sticky ? '100' : 'auto'};
          border-bottom: 1px solid rgba(0,0,0,0.1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        ">
          <div style="
            max-width: ${config.fullWidth ? '100%' : config.contentWidth + 'px'};
            margin: 0 auto;
            padding: ${config.padding.top}px 24px ${config.padding.bottom}px;
            display: flex;
            align-items: center;
            justify-content: ${config.align === 'center' ? 'center' : 'space-between'};
            gap: 40px;
          ">
            ${config.logo.show && config.align !== 'center' ? `
              <div style="
                font-size: ${config.logo.size}px;
                font-weight: 800;
                color: ${config.logo.color};
              ">
                ${config.logo.text}
              </div>
            ` : ''}
            
            <!-- Hamburger Button (Mobile) -->
            <button 
              id="mobile-menu-toggle" 
              style="
                display: none;
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 8px;
                color: ${config.logo.color || '#1a1a2e'};
              "
              onclick="document.getElementById('mobile-menu').classList.toggle('mobile-menu-open')"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            
            <!-- Desktop Menu -->
            <div class="desktop-menu" style="
              display: flex;
              align-items: center;
              gap: ${config.align === 'center' ? '60px' : '40px'};
              flex-wrap: wrap;
            ">
              ${config.align === 'center' && config.logo.show ? `
                <div style="
                  font-size: ${config.logo.size}px;
                  font-weight: 800;
                  color: ${config.logo.color};
                ">
                  ${config.logo.text}
                </div>
              ` : ''}
              
              <div style="display: flex; align-items: center; gap: 32px; flex-wrap: wrap;">
                ${config.menuItems.filter(item => item.show).map(item => `
                  <a href="${item.link}" style="
                    font-size: 16px;
                    font-weight: 500;
                    color: ${item.color};
                    text-decoration: none;
                  ">
                    ${item.text}
                  </a>
                `).join('')}
              </div>
              
              ${config.button.show ? `
                <a href="${config.button.link}" style="
                  background-color: ${config.button.color};
                  color: ${config.button.textColor};
                  padding: 12px 28px;
                  font-size: 16px;
                  border-radius: 10px;
                  border: ${config.button.color === 'transparent' ? `2px solid ${config.button.textColor}` : 'none'};
                  font-weight: 600;
                  text-decoration: none;
                  display: inline-block;
                  white-space: nowrap;
                ">
                  ${config.button.text}
                </a>
              ` : ''}
            </div>
          </div>
          
          <!-- Mobile Menu Dropdown -->
          <div 
            id="mobile-menu" 
            class="mobile-menu-dropdown"
            style="
              display: none;
              background-color: ${config.background.value};
              padding: 20px;
              border-top: 1px solid rgba(0,0,0,0.1);
            "
          >
            <nav style="display: flex; flex-direction: column; gap: 16px;">
              ${config.menuItems.filter(item => item.show).map(item => `
                <a href="${item.link}" style="
                  font-size: 16px;
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
                  background-color: ${config.button.color};
                  color: ${config.button.textColor};
                  padding: 12px 28px;
                  font-size: 16px;
                  border-radius: 10px;
                  border: ${config.button.color === 'transparent' ? `2px solid ${config.button.textColor}` : 'none'};
                  font-weight: 600;
                  text-decoration: none;
                  text-align: center;
                  display: block;
                  margin-top: 8px;
                ">
                  ${config.button.text}
                </a>
              ` : ''}
            </nav>
          </div>
          
          <!-- Responsive CSS -->
          <style>
            @media (max-width: 768px) {
              .desktop-menu {
                display: none !important;
              }
              #mobile-menu-toggle {
                display: block !important;
              }
              .mobile-menu-dropdown.mobile-menu-open {
                display: block !important;
              }
            }
          </style>
        </nav>
      `;

    case 'hero': {
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

    default:
      return `<div style="padding: 40px; text-align: center; font-family: sans-serif;"><p>Bloc de tip "${config.type}" - previzualizare indisponibilă</p></div>`;
  }
};

export const PreviewModal = ({ blocks, isOpen, onClose }) => {
  const [device, setDevice] = useState('desktop');

  const generateHTML = useMemo(() => {
    if (!blocks || blocks.length === 0) {
      return '<div style="padding: 40px; text-align: center; font-family: sans-serif;"><h2>Nu există blocuri de previzualizat</h2><p>Adaugă câteva blocuri pentru a vedea previzualizarea.</p></div>';
    }

    const htmlBlocks = blocks.map(block => {
      return generateBlockHTML(block.config);
    }).join('\n');

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
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full h-full max-w-7xl max-h-[90vh] flex flex-col">
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
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div 
            className="mx-auto bg-white shadow-lg transition-all duration-300"
            style={{ 
              width: DEVICE_SIZES[device].width,
              minHeight: '100%'
            }}
          >
            <iframe
              srcDoc={generateHTML}
              className="w-full border-none"
              style={{ minHeight: '600px', height: '100%' }}
              title="Site Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

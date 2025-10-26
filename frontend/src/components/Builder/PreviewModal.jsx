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
    }

    case 'article': {
      const bgStyle = config.background.type === 'gradient'
        ? `background: ${config.background.value};`
        : `background-color: ${config.background.value};`;

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
                src="${config.image.src}" 
                alt="${config.image.alt}" 
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
                  src="${config.image.src}" 
                  alt="${config.image.alt}" 
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
              text-align: ${config.title.align};
            ">
              ${config.title.show ? `
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
              
              ${config.description.show ? `
                <p style="
                  font-size: 18px;
                  color: ${config.description.color};
                  margin-bottom: 28px;
                  line-height: 1.6;
                ">
                  ${config.description.text}
                </p>
              ` : ''}
              
              ${config.button.show ? `
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
        <div className="flex-1 overflow-auto bg-gray-100">
          <div 
            className="mx-auto transition-all duration-300"
            style={{ 
              width: DEVICE_SIZES[device].width,
              height: 'fit-content'
            }}
          >
            <iframe
              srcDoc={generateHTML}
              className="w-full border-none"
              style={{ 
                display: 'block',
                border: 'none',
                overflow: 'hidden'
              }}
              title="Site Preview"
              scrolling="no"
              onLoad={(e) => {
                try {
                  const iframe = e.target;
                  const body = iframe.contentWindow.document.body;
                  const html = iframe.contentWindow.document.documentElement;
                  const height = Math.max(
                    body.scrollHeight,
                    body.offsetHeight,
                    html.clientHeight,
                    html.scrollHeight,
                    html.offsetHeight
                  );
                  iframe.style.height = height + 'px';
                } catch (err) {
                  console.error('Error setting iframe height:', err);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

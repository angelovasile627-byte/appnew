import React, { useState, useMemo } from 'react';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { blockTemplates } from '../../data/mockBlocks';

const DEVICE_SIZES = {
  desktop: { width: '100%', label: 'Desktop', icon: Monitor },
  tablet: { width: '768px', label: 'Tabletă', icon: Tablet },
  mobile: { width: '375px', label: 'Mobil', icon: Smartphone }
};

export const PreviewModal = ({ blocks, isOpen, onClose }) => {
  const [device, setDevice] = useState('desktop');

  const generateHTML = useMemo(() => {
    if (!blocks || blocks.length === 0) {
      return '<div style="padding: 40px; text-align: center; font-family: sans-serif;"><h2>Nu există blocuri de previzualizat</h2><p>Adaugă câteva blocuri pentru a vedea previzualizarea.</p></div>';
    }

    const htmlBlocks = blocks.map(block => {
      const template = blockTemplates.find(t => t.id === block.templateId);
      if (!template) return '';

      let html = template.html || '';
      
      // Replace config values in HTML
      if (block.config) {
        Object.entries(block.config).forEach(([key, value]) => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          html = html.replace(regex, value || '');
        });
      }

      return html;
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
              className="w-full h-full"
              style={{ minHeight: '800px', border: 'none' }}
              title="Site Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

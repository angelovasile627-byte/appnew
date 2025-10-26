import React, { useState } from 'react';
import { ImageIcon, X, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ImageUploadDialog } from './ImageUploadDialog';

export const LogoEditPopover = ({ config, onUpdate, position, onClose }) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const updateConfig = (path, value) => {
    const keys = path.split('.');
    const newConfig = { ...config };
    let current = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    onUpdate(newConfig);
  };

  return (
    <>
      <div
        className="fixed bg-gray-900 rounded-lg shadow-2xl border border-gray-700 z-[60] p-4"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          minWidth: '320px',
          maxWidth: '400px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
          <h3 className="text-sm font-semibold text-white">Editează Logo</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Current Logo Preview */}
          {config.logo.image && (
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <Label className="text-xs text-gray-400 mb-2 block">Logo Curent</Label>
              <div className="flex items-center justify-center bg-white rounded p-2">
                <img
                  src={config.logo.image}
                  alt="Logo"
                  style={{
                    height: `${config.logo.imageSize || 40}px`,
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div>
            <Button
              onClick={() => setIsImageDialogOpen(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              size="sm"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              {config.logo.image ? 'Schimbă Imaginea' : 'Încarcă Imagine'}
            </Button>
          </div>

          {/* Logo Size Slider */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-300">
              Dimensiune Logo: {config.logo.image ? (config.logo.imageSize || 40) : (config.logo.size || 24)}px
            </Label>
            <Input
              type="range"
              value={config.logo.image ? (config.logo.imageSize || 40) : (config.logo.size || 24)}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (config.logo.image) {
                  updateConfig('logo.imageSize', value);
                } else {
                  updateConfig('logo.size', value);
                }
              }}
              className="w-full bg-gray-800 border-gray-700"
              min={config.logo.image ? "20" : "12"}
              max={config.logo.image ? "200" : "120"}
            />
          </div>

          {/* Text Logo (if no image) */}
          {!config.logo.image && config.logo.text && (
            <div className="space-y-2">
              <Label className="text-sm text-gray-300">Text Logo</Label>
              <Input
                value={config.logo.text || ''}
                onChange={(e) => updateConfig('logo.text', e.target.value)}
                placeholder="Brand name"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          )}

          {/* Remove Image Button */}
          {config.logo.image && (
            <Button
              onClick={() => updateConfig('logo.image', '')}
              variant="destructive"
              size="sm"
              className="w-full"
            >
              Șterge Imaginea Logo
            </Button>
          )}
        </div>
      </div>

      {/* Overlay to close popover when clicking outside */}
      <div
        className="fixed inset-0 z-[59]"
        onClick={onClose}
      />

      {/* Image Upload Dialog */}
      <ImageUploadDialog
        isOpen={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        onImageSelect={(imageData) => {
          updateConfig('logo.image', imageData.url);
          setIsImageDialogOpen(false);
        }}
        currentImage={config.logo?.image ? { url: config.logo.image } : null}
      />
    </>
  );
};

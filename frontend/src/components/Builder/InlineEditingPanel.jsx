import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const InlineEditingPanel = ({ block, onUpdate, onClose, position }) => {
  
  if (!block) return null;

  const { config } = block;

  const updateConfig = (path, value) => {
    const keys = path.split('.');
    const newConfig = { ...config };
    let current = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    onUpdate(newConfig);
  };

  return (
    <div
      className="fixed right-0 top-0 h-full bg-gray-900 shadow-2xl z-50 overflow-y-auto border-l border-gray-800"
      style={{
        width: '420px'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10">
        <div>
          <h3 className="font-bold text-white text-lg">Edit Block</h3>
          <p className="text-sm text-gray-400 capitalize">{config.type} Settings</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        {/* Show/Hide Section */}
        {config.type && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Show/Hide</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-gray-300">Visibility</Label>
                <Switch
                  checked={config.visible ?? true}
                  onCheckedChange={(checked) => updateConfig('visible', checked)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Size Controls for Hero */}
        {config.type === 'hero' && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Size</h4>
            
            {/* Full Screen */}
            <div className="flex items-center justify-between py-2">
              <Label className="text-sm text-gray-300">Full Screen</Label>
              <Switch
                checked={config.fullScreen ?? true}
                onCheckedChange={(checked) => updateConfig('fullScreen', checked)}
              />
            </div>

            {/* Full Width */}
            <div className="flex items-center justify-between py-2">
              <Label className="text-sm text-gray-300">Full Width</Label>
              <Switch
                checked={config.fullWidth ?? false}
                onCheckedChange={(checked) => updateConfig('fullWidth', checked)}
              />
            </div>

            {/* Content Width */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-300">Content Width</Label>
              <div className="flex items-center gap-3">
                <Input
                  type="range"
                  value={config.contentWidth || 800}
                  onChange={(e) => updateConfig('contentWidth', parseInt(e.target.value))}
                  className="flex-1 bg-gray-800 border-gray-700"
                  min="400"
                  max="1600"
                  step="50"
                />
                <span className="text-sm text-gray-400 w-20">{config.contentWidth || 800}px</span>
              </div>
            </div>
          </div>
        )}

        {/* Hero Image Controls */}
        {config.type === 'hero' && config.heroImage && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-white uppercase tracking-wider">Hero Image</Label>
              <Switch
                checked={config.heroImage.show ?? true}
                onCheckedChange={(checked) => updateConfig('heroImage.show', checked)}
              />
            </div>
            {config.heroImage.show && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">Image URL</Label>
                  <Input
                    value={config.heroImage.src || ''}
                    onChange={(e) => updateConfig('heroImage.src', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">Image Height</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="range"
                      value={config.heroImage.height || 600}
                      onChange={(e) => updateConfig('heroImage.height', parseInt(e.target.value))}
                      className="flex-1 bg-gray-800 border-gray-700"
                      min="200"
                      max="1000"
                      step="50"
                    />
                    <span className="text-sm text-gray-400 w-20">{config.heroImage.height || 600}px</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">Border Radius</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="range"
                      value={config.heroImage.borderRadius || 0}
                      onChange={(e) => updateConfig('heroImage.borderRadius', parseInt(e.target.value))}
                      className="flex-1 bg-gray-800 border-gray-700"
                      min="0"
                      max="50"
                      step="2"
                    />
                    <span className="text-sm text-gray-400 w-16">{config.heroImage.borderRadius || 0}px</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">Object Fit</Label>
                  <Select
                    value={config.heroImage.objectFit || 'cover'}
                    onValueChange={(value) => updateConfig('heroImage.objectFit', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="cover">Cover</SelectItem>
                      <SelectItem value="contain">Contain</SelectItem>
                      <SelectItem value="fill">Fill</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Background Color */}
        <div className="space-y-3 border-t border-gray-800 pt-4">
          <Label className="text-sm font-bold text-white uppercase tracking-wider">Background</Label>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Input
                type="color"
                value={config.background?.value || '#ffffff'}
                onChange={(e) => updateConfig('background.value', e.target.value)}
                className="w-16 h-16 p-1 cursor-pointer rounded-lg bg-gray-800 border-gray-700"
              />
            </div>
            <Input
              type="text"
              value={config.background?.value || '#ffffff'}
              onChange={(e) => updateConfig('background.value', e.target.value)}
              className="flex-1 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>

        {/* Size Controls for Menu - Full Width and Logo Size */}
        {config.type === 'menu' && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Size</h4>
            
            {/* Full Width */}
            <div className="flex items-center justify-between py-2">
              <Label className="text-sm text-gray-300">Full Width</Label>
              <Switch
                checked={config.fullWidth ?? true}
                onCheckedChange={(checked) => updateConfig('fullWidth', checked)}
              />
            </div>

            {/* Logo Size - doar pentru meniu */}
            {config.logo && (
              <div className="space-y-2">
                <Label className="text-sm text-gray-300">Logo Size</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="range"
                    value={config.logo.logoSize || 120}
                    onChange={(e) => updateConfig('logo.logoSize', parseInt(e.target.value))}
                    className="flex-1 bg-gray-800 border-gray-700"
                    min="60"
                    max="300"
                    step="10"
                  />
                  <span className="text-sm text-gray-400 w-20">{config.logo.logoSize || 120}px</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Logo */}
        {config.logo && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-white uppercase tracking-wider">Logo</Label>
              <Switch
                checked={config.logo.show ?? true}
                onCheckedChange={(checked) => updateConfig('logo.show', checked)}
              />
            </div>
            {config.logo.show && (
              <div className="space-y-3 ml-4">
                {/* Brand Name */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-gray-300">Brand Name</Label>
                    <Switch
                      checked={config.logo.text !== '' && config.logo.text !== undefined}
                      onCheckedChange={(checked) => updateConfig('logo.text', checked ? 'Brand' : '')}
                    />
                  </div>
                  {config.logo.text && (
                    <Input
                      value={config.logo.text || ''}
                      onChange={(e) => updateConfig('logo.text', e.target.value)}
                      placeholder="Brand name"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Menu Items Align - Only for Menu type */}
        {config.type === 'menu' && config.align !== undefined && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <Label className="text-sm font-bold text-white uppercase tracking-wider">Menu Items Align</Label>
            <Select
              value={config.align || 'left'}
              onValueChange={(value) => updateConfig('align', value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="space-between">Space Between</SelectItem>
                <SelectItem value="split">Split</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Icons - Only for Menu type */}
        {config.type === 'menu' && config.icons !== undefined && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-white uppercase tracking-wider">Icons</Label>
              <Switch
                checked={config.icons?.show ?? false}
                onCheckedChange={(checked) => updateConfig('icons.show', checked)}
              />
            </div>
          </div>
        )}

        {/* Button - Only for Menu type */}
        {config.type === 'menu' && config.button !== undefined && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-white uppercase tracking-wider">Button</Label>
              <Switch
                checked={config.button?.show ?? false}
                onCheckedChange={(checked) => updateConfig('button.show', checked)}
              />
            </div>
          </div>
        )}

        {/* Styles Section - Only for Menu type */}
        {config.type === 'menu' && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Styles</h4>
            
            {/* Sticky */}
            <div className="flex items-center justify-between py-2">
              <Label className="text-sm text-gray-300">Sticky</Label>
              <Switch
                checked={config.sticky ?? false}
                onCheckedChange={(checked) => updateConfig('sticky', checked)}
              />
            </div>

            {/* Collapsed */}
            <div className="flex items-center justify-between py-2">
              <Label className="text-sm text-gray-300">Collapsed</Label>
              <Switch
                checked={config.collapsed ?? false}
                onCheckedChange={(checked) => updateConfig('collapsed', checked)}
              />
            </div>

            {/* Transparent */}
            <div className="flex items-center justify-between py-2">
              <Label className="text-sm text-gray-300">Transparent</Label>
              <Switch
                checked={config.transparent ?? false}
                onCheckedChange={(checked) => updateConfig('transparent', checked)}
              />
            </div>

            {/* Color (Background Color) */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-300">Color</Label>
              <div className="flex gap-3 items-center">
                <Input
                  type="color"
                  value={config.background?.value || '#000000'}
                  onChange={(e) => updateConfig('background.value', e.target.value)}
                  className="w-16 h-16 p-1 cursor-pointer rounded-lg bg-gray-800 border-gray-700"
                />
                <Input
                  type="text"
                  value={config.background?.value || '#000000'}
                  onChange={(e) => updateConfig('background.value', e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            {/* Hamburger */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-300">Hamburger</Label>
              <div className="flex gap-3 items-center">
                <Input
                  type="color"
                  value={config.hamburger?.color || '#ffffff'}
                  onChange={(e) => updateConfig('hamburger.color', e.target.value)}
                  className="w-16 h-16 p-1 cursor-pointer rounded-lg bg-gray-800 border-gray-700"
                />
                <Input
                  type="text"
                  value={config.hamburger?.color || '#ffffff'}
                  onChange={(e) => updateConfig('hamburger.color', e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Title */}
        {config.title && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-white uppercase tracking-wider">Title</Label>
              <Switch
                checked={config.title.show ?? true}
                onCheckedChange={(checked) => updateConfig('title.show', checked)}
              />
            </div>
            {config.title.show && (
              <div className="space-y-3">
                <Textarea
                  value={config.title.text || ''}
                  onChange={(e) => updateConfig('title.text', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={2}
                />
                <div className="flex gap-3">
                  <Input
                    type="color"
                    value={config.title.color || '#000000'}
                    onChange={(e) => updateConfig('title.color', e.target.value)}
                    className="w-16 h-16 p-1 cursor-pointer rounded-lg bg-gray-800 border-gray-700"
                  />
                  <Select
                    value={config.title.align || 'center'}
                    onValueChange={(value) => updateConfig('title.align', value)}
                  >
                    <SelectTrigger className="flex-1 bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {config.description && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-white uppercase tracking-wider">Subtitle</Label>
              <Switch
                checked={config.description.show ?? true}
                onCheckedChange={(checked) => updateConfig('description.show', checked)}
              />
            </div>
            {config.description.show && (
              <div className="space-y-3">
                <Textarea
                  value={config.description.text || ''}
                  onChange={(e) => updateConfig('description.text', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
                <Input
                  type="color"
                  value={config.description.color || '#000000'}
                  onChange={(e) => updateConfig('description.color', e.target.value)}
                  className="w-16 h-16 p-1 cursor-pointer rounded-lg bg-gray-800 border-gray-700"
                />
              </div>
            )}
          </div>
        )}

        {/* Button */}
        {config.button && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-white uppercase tracking-wider">Buttons</Label>
              <Switch
                checked={config.button.show ?? true}
                onCheckedChange={(checked) => updateConfig('button.show', checked)}
              />
            </div>
            {config.button.show && (
              <div className="space-y-3">
                <Input
                  value={config.button.text || ''}
                  onChange={(e) => updateConfig('button.text', e.target.value)}
                  placeholder="Button text"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-300">BG Color</Label>
                    <Input
                      type="color"
                      value={config.button.color || '#5B4FC9'}
                      onChange={(e) => updateConfig('button.color', e.target.value)}
                      className="w-full h-12 p-1 cursor-pointer rounded-lg bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-300">Text Color</Label>
                    <Input
                      type="color"
                      value={config.button.textColor || '#ffffff'}
                      onChange={(e) => updateConfig('button.textColor', e.target.value)}
                      className="w-full h-12 p-1 cursor-pointer rounded-lg bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
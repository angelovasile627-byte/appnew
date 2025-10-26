import React, { useState, useEffect } from 'react';
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
  const [topPosition, setTopPosition] = useState('0px');

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

  // Calculate top position - if editing menu, start below it
  useEffect(() => {
    const calculatePosition = () => {
      if (config.type === 'menu') {
        // Get menu height dynamically
        const menuElement = document.querySelector('[data-block-type="menu"]');
        if (menuElement) {
          const rect = menuElement.getBoundingClientRect();
          setTopPosition(`${rect.bottom}px`);
          return;
        }
        setTopPosition('80px'); // Fallback height for menu
        return;
      }
      setTopPosition('0px');
    };

    calculatePosition();
    
    // Recalculate on config changes (sticky, collapsed, etc.)
    const timer = setTimeout(calculatePosition, 100);
    
    return () => clearTimeout(timer);
  }, [config.type, config.sticky, config.collapsed, config.transparent, config.opacity]);

  return (
    <div
      className="fixed right-0 bg-gray-900 shadow-2xl overflow-y-auto border-l border-gray-800"
      style={{
        width: '280px',
        top: topPosition,
        bottom: '0',
        zIndex: 9999
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-2 py-1.5 flex items-center justify-between z-10">
        <div>
          <h3 className="font-bold text-white text-xs">Edit Block</h3>
          <p className="text-[9px] text-gray-400 capitalize">{config.type} Settings</p>
        </div>
        <button
          onClick={onClose}
          className="p-0.5 hover:bg-gray-800 rounded transition-colors"
        >
          <X className="w-3 h-3 text-gray-400" />
        </button>
      </div>

      <div className="p-2 space-y-0.5">
        {/* Show/Hide Section */}
        {config.type && (
          <div className="space-y-0.5">
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">Show/Hide</h4>
            <div className="space-y-0">
              <div className="flex items-center justify-between py-0.5">
                <Label className="text-[9px] text-gray-300">Visibility</Label>
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
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">Size</h4>
            
            {/* Full Screen */}
            <div className="flex items-center justify-between py-0.5">
              <Label className="text-[9px] text-gray-300">Full Screen</Label>
              <Switch
                checked={config.fullScreen ?? true}
                onCheckedChange={(checked) => updateConfig('fullScreen', checked)}
              />
            </div>

            {/* Full Width */}
            <div className="flex items-center justify-between py-0.5">
              <Label className="text-[9px] text-gray-300">Full Width</Label>
              <Switch
                checked={config.fullWidth ?? false}
                onCheckedChange={(checked) => updateConfig('fullWidth', checked)}
              />
            </div>

            {/* Content Width */}
            <div className="space-y-0.5">
              <Label className="text-[9px] text-gray-300">Content Width</Label>
              <div className="flex items-center gap-1.5">
                <Input
                  type="range"
                  value={config.contentWidth || 800}
                  onChange={(e) => updateConfig('contentWidth', parseInt(e.target.value))}
                  className="flex-1 bg-gray-800 border-gray-700"
                  min="400"
                  max="1600"
                  step="50"
                />
                <span className="text-[9px] text-gray-400 w-10">{config.contentWidth || 800}px</span>
              </div>
            </div>
          </div>
        )}

        {/* Hero Image Controls */}
        {config.type === 'hero' && config.heroImage && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <div className="flex items-center justify-between">
              <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Hero Image</Label>
              <Switch
                checked={config.heroImage.show ?? true}
                onCheckedChange={(checked) => updateConfig('heroImage.show', checked)}
              />
            </div>
            {config.heroImage.show && (
              <div className="space-y-0.5">
                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Image URL</Label>
                  <Input
                    value={config.heroImage.src || ''}
                    onChange={(e) => updateConfig('heroImage.src', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="bg-gray-800 border-gray-700 text-white text-[9px] py-1 px-2"
                  />
                </div>
                
                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Image Height</Label>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="range"
                      value={config.heroImage.height || 600}
                      onChange={(e) => updateConfig('heroImage.height', parseInt(e.target.value))}
                      className="flex-1 bg-gray-800 border-gray-700"
                      min="200"
                      max="1000"
                      step="50"
                    />
                    <span className="text-[9px] text-gray-400 w-10">{config.heroImage.height || 600}px</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Border Radius</Label>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="range"
                      value={config.heroImage.borderRadius || 0}
                      onChange={(e) => updateConfig('heroImage.borderRadius', parseInt(e.target.value))}
                      className="flex-1 bg-gray-800 border-gray-700"
                      min="0"
                      max="50"
                      step="2"
                    />
                    <span className="text-[9px] text-gray-400 w-10">{config.heroImage.borderRadius || 0}px</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Object Fit</Label>
                  <Select
                    value={config.heroImage.objectFit || 'cover'}
                    onValueChange={(value) => updateConfig('heroImage.objectFit', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1 h-7">
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
        <div className="space-y-0.5 border-t border-gray-800 pt-1">
          <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Background</Label>
          <div className="flex gap-1.5 items-center">
            <div className="relative">
              <Input
                type="color"
                value={config.background?.value || '#ffffff'}
                onChange={(e) => updateConfig('background.value', e.target.value)}
                className="w-6 h-6 p-0.5 cursor-pointer rounded border border-gray-700 bg-transparent"
                style={{ padding: '1px' }}
              />
            </div>
            <Input
              type="text"
              value={config.background?.value || '#ffffff'}
              onChange={(e) => updateConfig('background.value', e.target.value)}
              className="flex-1 bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1 h-7"
              placeholder="#ffffff"
            />
          </div>
        </div>

        {/* Size Controls for Menu - Full Width and Logo Size */}
        {config.type === 'menu' && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">Size</h4>
            
            {/* Full Width */}
            <div className="flex items-center justify-between py-0.5">
              <Label className="text-[9px] text-gray-300">Full Width</Label>
              <Switch
                checked={config.fullWidth ?? true}
                onCheckedChange={(checked) => updateConfig('fullWidth', checked)}
              />
            </div>

            {/* Logo Size - doar pentru meniu */}
            {config.logo && (
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Logo Size</Label>
                <div className="flex items-center gap-1.5">
                  <Input
                    type="range"
                    value={config.logo.logoSize || 120}
                    onChange={(e) => updateConfig('logo.logoSize', parseInt(e.target.value))}
                    className="flex-1 bg-gray-800 border-gray-700"
                    min="60"
                    max="300"
                    step="10"
                  />
                  <span className="text-[9px] text-gray-400 w-10">{config.logo.logoSize || 120}px</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Logo */}
        {config.logo && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <div className="flex items-center justify-between">
              <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Logo</Label>
              <Switch
                checked={config.logo.show ?? true}
                onCheckedChange={(checked) => updateConfig('logo.show', checked)}
              />
            </div>
            {config.logo.show && (
              <div className="space-y-0.5 ml-1.5">
                {/* Brand Name */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-[9px] text-gray-300">Brand Name</Label>
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
                      className="bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1 h-7"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Menu Items Align - Only for Menu type */}
        {config.type === 'menu' && config.align !== undefined && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Menu Items Align</Label>
            <Select
              value={config.align || 'left'}
              onValueChange={(value) => updateConfig('align', value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1 h-7">
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

        {/* Active Color - Only for Menu type */}
        {config.type === 'menu' && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Active Color</Label>
            <div className="flex gap-1.5 items-center">
              <div className="relative">
                <Input
                  type="color"
                  value={config.activeColor || '#000000'}
                  onChange={(e) => updateConfig('activeColor', e.target.value)}
                  className="w-6 h-6 p-0.5 cursor-pointer rounded border border-gray-700 bg-transparent"
                  style={{ padding: '1px' }}
                />
              </div>
              <Input
                type="text"
                value={config.activeColor || '#000000'}
                onChange={(e) => updateConfig('activeColor', e.target.value)}
                className="flex-1 bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1 h-7"
                placeholder="#000000"
              />
            </div>
          </div>
        )}

        {/* Icons - Only for Menu type */}
        {config.type === 'menu' && config.icons !== undefined && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <div className="flex items-center justify-between">
              <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Icons</Label>
              <Switch
                checked={config.icons?.show ?? false}
                onCheckedChange={(checked) => updateConfig('icons.show', checked)}
              />
            </div>
          </div>
        )}

        {/* Button - Only for Menu type */}
        {config.type === 'menu' && config.button !== undefined && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <div className="flex items-center justify-between">
              <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Button</Label>
              <Switch
                checked={config.button?.show ?? false}
                onCheckedChange={(checked) => updateConfig('button.show', checked)}
              />
            </div>
          </div>
        )}

        {/* Styles Section - Only for Menu type */}
        {config.type === 'menu' && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">Styles</h4>
            
            {/* Sticky */}
            <div className="flex items-center justify-between py-0.5">
              <Label className="text-[9px] text-gray-300">Sticky</Label>
              <Switch
                checked={config.sticky ?? false}
                onCheckedChange={(checked) => updateConfig('sticky', checked)}
              />
            </div>

            {/* Collapsed */}
            <div className="flex items-center justify-between py-0.5">
              <Label className="text-[9px] text-gray-300">Collapsed</Label>
              <Switch
                checked={config.collapsed ?? false}
                onCheckedChange={(checked) => updateConfig('collapsed', checked)}
              />
            </div>

            {/* Transparent */}
            <div className="flex items-center justify-between py-0.5">
              <Label className="text-[9px] text-gray-300">Transparent</Label>
              <Switch
                checked={config.transparent ?? false}
                onCheckedChange={(checked) => updateConfig('transparent', checked)}
              />
            </div>

            {/* Opacity Slider - shown when Transparent is active */}
            {config.transparent && (
              <div className="space-y-0.5 ml-1.5">
                <Label className="text-[9px] text-gray-300">Opacity</Label>
                <div className="flex items-center gap-1.5">
                  <Input
                    type="range"
                    value={(config.opacity ?? 0.8) * 100}
                    onChange={(e) => updateConfig('opacity', parseInt(e.target.value) / 100)}
                    className="flex-1 bg-gray-800 border-gray-700"
                    min="0"
                    max="100"
                    step="5"
                  />
                  <span className="text-[9px] text-gray-400 w-10">{Math.round((config.opacity ?? 0.8) * 100)}%</span>
                </div>
              </div>
            )}

            {/* Color (Background Color) */}
            <div className="space-y-0.5">
              <Label className="text-[9px] text-gray-300">Color</Label>
              <div className="flex gap-1.5 items-center">
                <Input
                  type="color"
                  value={config.background?.value || '#000000'}
                  onChange={(e) => updateConfig('background.value', e.target.value)}
                  className="w-6 h-6 p-0.5 cursor-pointer rounded border border-gray-700 bg-transparent"
                />
                <Input
                  type="text"
                  value={config.background?.value || '#000000'}
                  onChange={(e) => updateConfig('background.value', e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1 h-7"
                />
              </div>
            </div>

            {/* Hamburger */}
            <div className="space-y-0.5">
              <Label className="text-[9px] text-gray-300">Hamburger</Label>
              <div className="flex gap-1.5 items-center">
                <Input
                  type="color"
                  value={config.hamburger?.color || '#ffffff'}
                  onChange={(e) => updateConfig('hamburger.color', e.target.value)}
                  className="w-6 h-6 p-0.5 cursor-pointer rounded border border-gray-700 bg-transparent"
                />
                <Input
                  type="text"
                  value={config.hamburger?.color || '#ffffff'}
                  onChange={(e) => updateConfig('hamburger.color', e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1 h-7"
                />
              </div>
            </div>
          </div>
        )}

        {/* Title */}
        {config.title && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <div className="flex items-center justify-between">
              <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Title</Label>
              <Switch
                checked={config.title.show ?? true}
                onCheckedChange={(checked) => updateConfig('title.show', checked)}
              />
            </div>
            {config.title.show && (
              <div className="space-y-0.5">
                <Textarea
                  value={config.title.text || ''}
                  onChange={(e) => updateConfig('title.text', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1"
                  rows={1}
                />
                <div className="flex gap-1.5">
                  <Input
                    type="color"
                    value={config.title.color || '#000000'}
                    onChange={(e) => updateConfig('title.color', e.target.value)}
                    className="w-6 h-6 p-0.5 cursor-pointer rounded border border-gray-700 bg-transparent"
                  />
                  <Select
                    value={config.title.align || 'center'}
                    onValueChange={(value) => updateConfig('title.align', value)}
                  >
                    <SelectTrigger className="flex-1 bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1 h-7">
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
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <div className="flex items-center justify-between">
              <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Subtitle</Label>
              <Switch
                checked={config.description.show ?? true}
                onCheckedChange={(checked) => updateConfig('description.show', checked)}
              />
            </div>
            {config.description.show && (
              <div className="space-y-0.5">
                <Textarea
                  value={config.description.text || ''}
                  onChange={(e) => updateConfig('description.text', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1"
                  rows={1}
                />
                <Input
                  type="color"
                  value={config.description.color || '#000000'}
                  onChange={(e) => updateConfig('description.color', e.target.value)}
                  className="w-6 h-6 p-0.5 cursor-pointer rounded border border-gray-700 bg-transparent"
                />
              </div>
            )}
          </div>
        )}

        {/* Button */}
        {config.button && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <div className="flex items-center justify-between">
              <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Buttons</Label>
              <Switch
                checked={config.button.show ?? true}
                onCheckedChange={(checked) => updateConfig('button.show', checked)}
              />
            </div>
            {config.button.show && (
              <div className="space-y-0.5">
                <Input
                  value={config.button.text || ''}
                  onChange={(e) => updateConfig('button.text', e.target.value)}
                  placeholder="Button text"
                  className="bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1 h-7"
                />
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">BG Color</Label>
                    <Input
                      type="color"
                      value={config.button.color || '#5B4FC9'}
                      onChange={(e) => updateConfig('button.color', e.target.value)}
                      className="w-full h-8 p-0.5 cursor-pointer rounded border border-gray-700 bg-transparent"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Text Color</Label>
                    <Input
                      type="color"
                      value={config.button.textColor || '#ffffff'}
                      onChange={(e) => updateConfig('button.textColor', e.target.value)}
                      className="w-full h-8 p-0.5 cursor-pointer rounded border border-gray-700 bg-transparent"
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
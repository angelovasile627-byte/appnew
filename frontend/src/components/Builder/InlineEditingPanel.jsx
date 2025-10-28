import React, { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';
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
import { SocialIconsModal } from './SocialIconsModal';

export const InlineEditingPanel = ({ block, onUpdate, onClose, position, selectedElementId }) => {
  
  if (!block) return null;

  const { config } = block;
  const [topPosition, setTopPosition] = useState('0px');
  const [showSocialIconsModal, setShowSocialIconsModal] = useState(false);

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

  const updateElementConfig = (elementId, path, value) => {
    const newConfig = { ...config };
    
    // Handle different layout types
    if (config.layout === 'grid') {
      const elements = [...(config.elements || [])];
      const elementIndex = elements.findIndex(el => el.id === elementId);
      
      if (elementIndex !== -1) {
        const keys = path.split('.');
        const updatedElement = JSON.parse(JSON.stringify(elements[elementIndex]));
        let current = updatedElement;
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
        elements[elementIndex] = updatedElement;
        newConfig.elements = elements;
      }
    } else if (config.layout === 'vertical') {
      // For vertical layout, elements have leftContent and rightContent
      const elements = [...(config.elements || [])];
      
      // Check if elementId is a composite ID like 'article-vertical-1-left'
      if (elementId.endsWith('-left') || elementId.endsWith('-right')) {
        const side = elementId.endsWith('-left') ? 'left' : 'right';
        const baseId = elementId.replace(/-left$|-right$/, '');
        const elementIndex = elements.findIndex(el => el.id === baseId);
        
        if (elementIndex !== -1) {
          const keys = path.split('.');
          const updatedElement = JSON.parse(JSON.stringify(elements[elementIndex]));
          const contentKey = side === 'left' ? 'leftContent' : 'rightContent';
          
          if (!updatedElement[contentKey]) updatedElement[contentKey] = {};
          let current = updatedElement[contentKey];
          
          for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
          }
          
          current[keys[keys.length - 1]] = value;
          elements[elementIndex] = updatedElement;
          newConfig.elements = elements;
        }
      } else {
        // Fallback for old behavior
        const elementIndex = elements.findIndex(el => el.id === elementId);
        
        if (elementIndex !== -1) {
          const keys = path.split('.');
          const updatedElement = JSON.parse(JSON.stringify(elements[elementIndex]));
          let current = updatedElement;
          
          for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
          }
          
          current[keys[keys.length - 1]] = value;
          elements[elementIndex] = updatedElement;
          newConfig.elements = elements;
        }
      }
    } else if (config.layout === 'split') {
      // For split layout, update leftContent or rightContent
      const keys = path.split('.');
      const contentType = elementId === 'left-content' ? 'leftContent' : 'rightContent';
      
      if (!newConfig[contentType]) newConfig[contentType] = {};
      let current = newConfig[contentType];
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
    }
    
    onUpdate(newConfig);
  };

  const handleSaveSocialIcons = (icons) => {
    const newConfig = {
      ...config,
      socialIcons: {
        ...config.socialIcons,
        items: icons
      }
    };
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

        {/* Parallax White Space Controls */}
        {config.type === 'hero-parallax' && config.whiteSpace && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">White Space</h4>
            
            {/* Top White Space */}
            <div className="space-y-0.5">
              <Label className="text-[9px] text-gray-300">Top</Label>
              <div className="flex items-center gap-1.5">
                <Input
                  type="range"
                  value={config.whiteSpace.top || 200}
                  onChange={(e) => updateConfig('whiteSpace.top', parseInt(e.target.value))}
                  className="flex-1 bg-gray-800 border-gray-700"
                  min="0"
                  max="600"
                  step="10"
                />
                <span className="text-[9px] text-gray-400 w-10">{config.whiteSpace.top || 200}px</span>
              </div>
            </div>

            {/* Bottom White Space */}
            <div className="space-y-0.5">
              <Label className="text-[9px] text-gray-300">Bottom</Label>
              <div className="flex items-center gap-1.5">
                <Input
                  type="range"
                  value={config.whiteSpace.bottom || 200}
                  onChange={(e) => updateConfig('whiteSpace.bottom', parseInt(e.target.value))}
                  className="flex-1 bg-gray-800 border-gray-700"
                  min="0"
                  max="600"
                  step="10"
                />
                <span className="text-[9px] text-gray-400 w-10">{config.whiteSpace.bottom || 200}px</span>
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
          
          {/* Special handling for hero-parallax with image upload */}
          {config.type === 'hero-parallax' && config.background?.type === 'image' ? (
            <div className="space-y-1">
              <div className="flex gap-1.5 items-center">
                <Input
                  type="text"
                  value={config.background?.value || ''}
                  onChange={(e) => updateConfig('background.value', e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white text-[9px] px-2 py-1 h-7"
                  placeholder="Image URL sau încarcă din calculator"
                />
              </div>
              
              <label className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] py-1.5 px-2 rounded cursor-pointer transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Încarcă Imagine</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    // Show loading state
                    const formData = new FormData();
                    formData.append('file', file);
                    
                    try {
                      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
                      const response = await fetch(`${backendUrl}/api/upload/image`, {
                        method: 'POST',
                        body: formData
                      });
                      
                      if (!response.ok) throw new Error('Upload failed');
                      
                      const data = await response.json();
                      if (data.success && data.url) {
                        // Convert relative URL to absolute
                        const fullUrl = `${backendUrl}${data.url}`;
                        updateConfig('background.value', fullUrl);
                      }
                    } catch (error) {
                      console.error('Upload error:', error);
                      alert('Eroare la încărcarea imaginii');
                    }
                    
                    // Reset input
                    e.target.value = '';
                  }}
                />
              </label>
            </div>
          ) : (
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
          )}
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
                    value={config.logo.size || 24}
                    onChange={(e) => updateConfig('logo.size', parseInt(e.target.value))}
                    className="flex-1 bg-gray-800 border-gray-700"
                    min="16"
                    max="60"
                    step="2"
                  />
                  <span className="text-[9px] text-gray-400 w-10">{config.logo.size || 24}px</span>
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
              <SelectContent className="bg-gray-800 border-gray-700 z-[10000]">
                <SelectItem value="left" className="text-white text-[9px]">Left</SelectItem>
                <SelectItem value="center" className="text-white text-[9px]">Center</SelectItem>
                <SelectItem value="right" className="text-white text-[9px]">Right</SelectItem>
                <SelectItem value="space-between" className="text-white text-[9px]">Space Between</SelectItem>
                <SelectItem value="split" className="text-white text-[9px]">Split</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Split Items Count - Only visible when align is 'split' */}
            {config.align === 'split' && (
              <div className="space-y-0.5 ml-1.5 mt-1">
                <Label className="text-[9px] text-gray-300">Items în stânga logoului</Label>
                <div className="flex items-center gap-1.5">
                  <Input
                    type="range"
                    value={config.splitCount || 2}
                    onChange={(e) => updateConfig('splitCount', parseInt(e.target.value))}
                    className="flex-1 bg-gray-800 border-gray-700"
                    min="0"
                    max={config.menuItems ? config.menuItems.filter(i => i.show).length : 4}
                    step="1"
                  />
                  <span className="text-[9px] text-gray-400 w-10">{config.splitCount || 2}</span>
                </div>
              </div>
            )}
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

        {/* Social Icons - Only for Menu type */}
        {config.type === 'menu' && config.socialIcons !== undefined && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <div className="flex items-center justify-between mb-1">
              <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Social Icons</Label>
              <Switch
                checked={config.socialIcons?.show ?? false}
                onCheckedChange={(checked) => updateConfig('socialIcons.show', checked)}
              />
            </div>
            
            {config.socialIcons?.show && (
              <div className="space-y-0.5 ml-1.5">
                <Button
                  onClick={() => setShowSocialIconsModal(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] py-1.5 h-7 flex items-center justify-center gap-1"
                >
                  <Settings size={12} />
                  Configurează Iconițe ({config.socialIcons?.items?.length || 0})
                </Button>
                
                {/* Preview Selected Icons */}
                {config.socialIcons?.items?.length > 0 && (
                  <div className="flex gap-1 flex-wrap mt-1">
                    {config.socialIcons.items.filter(icon => icon.show).map((iconData, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded flex items-center justify-center"
                        style={{ backgroundColor: iconData.color }}
                        title={iconData.name}
                      >
                        <span className="text-white text-xs">•</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
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

        {/* Features Items */}
        {config.type === 'features' && config.items && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <div className="flex items-center justify-between mb-1">
              <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Feature Items</Label>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-5 px-1.5 text-[9px] text-green-400 hover:text-green-300 hover:bg-gray-800"
                  onClick={() => {
                    const newItem = {
                      title: 'New Feature',
                      description: 'Feature description',
                      icon: 'Box',
                      color: '#667eea',
                      button: { text: 'Learn More', show: true }
                    };
                    const newItems = [...config.items, newItem];
                    updateConfig('items', newItems);
                  }}
                >
                  + Add
                </Button>
              </div>
            </div>

            {config.items.map((item, index) => (
              <div key={index} className="bg-gray-800/50 rounded p-1.5 space-y-1 mb-1 border border-gray-700">
                <div className="flex items-center justify-between mb-0.5">
                  <Label className="text-[9px] font-semibold text-indigo-400">Item {index + 1}</Label>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-4 px-1 text-[8px] text-red-400 hover:text-red-300 hover:bg-gray-700"
                    onClick={() => {
                      const newItems = config.items.filter((_, i) => i !== index);
                      updateConfig('items', newItems);
                    }}
                  >
                    Remove
                  </Button>
                </div>

                {/* Title */}
                <div className="space-y-0.5">
                  <Label className="text-[8px] text-gray-400">Title</Label>
                  <Input
                    value={item.title || ''}
                    onChange={(e) => {
                      const newItems = [...config.items];
                      newItems[index] = { ...newItems[index], title: e.target.value };
                      updateConfig('items', newItems);
                    }}
                    className="bg-gray-900 border-gray-600 text-white text-[9px] px-1.5 py-0.5 h-6"
                  />
                </div>

                {/* Description */}
                <div className="space-y-0.5">
                  <Label className="text-[8px] text-gray-400">Description</Label>
                  <Textarea
                    value={item.description || ''}
                    onChange={(e) => {
                      const newItems = [...config.items];
                      newItems[index] = { ...newItems[index], description: e.target.value };
                      updateConfig('items', newItems);
                    }}
                    className="bg-gray-900 border-gray-600 text-white text-[9px] px-1.5 py-0.5"
                    rows={2}
                  />
                </div>

                {/* Image URL (for layouts with images) */}
                {(config.layout === 'cards-with-images' || config.layout === 'cards-image-side') && (
                  <div className="space-y-0.5">
                    <Label className="text-[8px] text-gray-400">Image URL</Label>
                    <Input
                      value={item.image || ''}
                      onChange={(e) => {
                        const newItems = [...config.items];
                        newItems[index] = { ...newItems[index], image: e.target.value };
                        updateConfig('items', newItems);
                      }}
                      placeholder="https://..."
                      className="bg-gray-900 border-gray-600 text-white text-[9px] px-1.5 py-0.5 h-6"
                    />
                    {/* Upload Button */}
                    <input
                      type="file"
                      id={`upload-${index}`}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const formData = new FormData();
                        formData.append('file', file);

                        try {
                          const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/upload/image', {
                            method: 'POST',
                            body: formData,
                          });
                          const data = await response.json();
                          
                          if (data.url) {
                            const newItems = [...config.items];
                            newItems[index] = { ...newItems[index], image: data.url };
                            updateConfig('items', newItems);
                          }
                        } catch (error) {
                          console.error('Upload error:', error);
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-full text-[8px] bg-indigo-600 hover:bg-indigo-700 text-white border-0"
                      onClick={() => document.getElementById(`upload-${index}`).click()}
                    >
                      Upload Image
                    </Button>
                  </div>
                )}

                {/* Label (for image-side layout) */}
                {config.layout === 'cards-image-side' && (
                  <div className="space-y-0.5">
                    <Label className="text-[8px] text-gray-400">Label</Label>
                    <Input
                      value={item.label || ''}
                      onChange={(e) => {
                        const newItems = [...config.items];
                        newItems[index] = { ...newItems[index], label: e.target.value };
                        updateConfig('items', newItems);
                      }}
                      placeholder="e.g. Strategy 1"
                      className="bg-gray-900 border-gray-600 text-white text-[9px] px-1.5 py-0.5 h-6"
                    />
                  </div>
                )}

                {/* Color/Gradient */}
                {config.layout === 'cards-simple' && (
                  <div className="space-y-0.5">
                    <Label className="text-[8px] text-gray-400">Color</Label>
                    <Input
                      type="color"
                      value={item.color || '#667eea'}
                      onChange={(e) => {
                        const newItems = [...config.items];
                        newItems[index] = { ...newItems[index], color: e.target.value };
                        updateConfig('items', newItems);
                      }}
                      className="w-full h-7 p-0.5 cursor-pointer rounded border border-gray-600 bg-transparent"
                    />
                  </div>
                )}
                
                {/* Gradient (2-3 colors) */}
                {config.layout === 'cards-gradient' && (
                  <div className="space-y-0.5">
                    <Label className="text-[8px] text-gray-400">Gradient Colors</Label>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="space-y-0.5">
                        <Label className="text-[7px] text-gray-500">Color 1</Label>
                        <Input
                          type="color"
                          value={item.gradientColors?.[0] || '#667eea'}
                          onChange={(e) => {
                            const newItems = [...config.items];
                            const colors = item.gradientColors || ['#667eea', '#764ba2'];
                            colors[0] = e.target.value;
                            const gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
                            newItems[index] = { ...newItems[index], gradientColors: colors, gradient };
                            updateConfig('items', newItems);
                          }}
                          className="w-full h-6 p-0.5 cursor-pointer rounded border border-gray-600 bg-transparent"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <Label className="text-[7px] text-gray-500">Color 2</Label>
                        <Input
                          type="color"
                          value={item.gradientColors?.[1] || '#764ba2'}
                          onChange={(e) => {
                            const newItems = [...config.items];
                            const colors = item.gradientColors || ['#667eea', '#764ba2'];
                            colors[1] = e.target.value;
                            const gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
                            newItems[index] = { ...newItems[index], gradientColors: colors, gradient };
                            updateConfig('items', newItems);
                          }}
                          className="w-full h-6 p-0.5 cursor-pointer rounded border border-gray-600 bg-transparent"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <Label className="text-[7px] text-gray-500">Angle</Label>
                        <Input
                          type="number"
                          value={item.gradientAngle || 135}
                          onChange={(e) => {
                            const newItems = [...config.items];
                            const colors = item.gradientColors || ['#667eea', '#764ba2'];
                            const angle = e.target.value;
                            const gradient = `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
                            newItems[index] = { ...newItems[index], gradientAngle: angle, gradient };
                            updateConfig('items', newItems);
                          }}
                          placeholder="135"
                          className="bg-gray-900 border-gray-600 text-white text-[8px] px-1 py-0.5 h-6"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Button Show/Hide */}
                {item.button !== undefined && (
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-[8px] text-gray-400">Button</Label>
                      <Switch
                        checked={item.button?.show ?? true}
                        onCheckedChange={(checked) => {
                          const newItems = [...config.items];
                          newItems[index] = {
                            ...newItems[index],
                            button: { ...newItems[index].button, show: checked }
                          };
                          updateConfig('items', newItems);
                        }}
                      />
                    </div>
                    {item.button?.show && (
                      <Input
                        value={item.button?.text || 'Learn More'}
                        onChange={(e) => {
                          const newItems = [...config.items];
                          newItems[index] = {
                            ...newItems[index],
                            button: { ...newItems[index].button, text: e.target.value }
                          };
                          updateConfig('items', newItems);
                        }}
                        placeholder="Button text"
                        className="bg-gray-900 border-gray-600 text-white text-[9px] px-1.5 py-0.5 h-6"
                      />
                    )}
                  </div>
                )}

                {/* Features list (for gradient cards) */}
                {config.layout === 'cards-gradient' && item.features && (
                  <div className="space-y-0.5">
                    <Label className="text-[8px] text-gray-400">Feature Points</Label>
                    {item.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex gap-1">
                        <Input
                          value={feature || ''}
                          onChange={(e) => {
                            const newItems = [...config.items];
                            const newFeatures = [...newItems[index].features];
                            newFeatures[fIndex] = e.target.value;
                            newItems[index] = { ...newItems[index], features: newFeatures };
                            updateConfig('items', newItems);
                          }}
                          className="bg-gray-900 border-gray-600 text-white text-[9px] px-1.5 py-0.5 h-5 flex-1"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-5 px-1 text-[8px] text-red-400 hover:bg-gray-700"
                          onClick={() => {
                            const newItems = [...config.items];
                            const newFeatures = newItems[index].features.filter((_, i) => i !== fIndex);
                            newItems[index] = { ...newItems[index], features: newFeatures };
                            updateConfig('items', newItems);
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-5 w-full text-[8px] bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                      onClick={() => {
                        const newItems = [...config.items];
                        const currentFeatures = newItems[index].features || [];
                        newItems[index] = {
                          ...newItems[index],
                          features: [...currentFeatures, 'New feature point']
                        };
                        updateConfig('items', newItems);
                      }}
                    >
                      + Add Point
                    </Button>
                  </div>
                )}
              </div>
            ))}
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

        {/* Article Block Controls */}
        {config.type === 'article' && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">
              Article {selectedElementId ? `- Element` : '- General'}
            </h4>
            
            {!selectedElementId ? (
              /* General Article Settings */
              <>
                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Layout</Label>
                  <Select
                    value={config.layout || 'grid'}
                    onValueChange={(value) => updateConfig('layout', value)}
                  >
                    <SelectTrigger className="h-7 bg-gray-800 border-gray-700 text-[9px] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid Masonry</SelectItem>
                      <SelectItem value="vertical">Vertical Layout</SelectItem>
                      <SelectItem value="split">Split Layout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {config.layout === 'grid' && (
                  <>
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Columns</Label>
                      <div className="flex items-center gap-1.5">
                        <Input
                          type="range"
                          value={config.columns || 3}
                          onChange={(e) => updateConfig('columns', parseInt(e.target.value))}
                          className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                          min="2"
                          max="4"
                          step="1"
                        />
                        <span className="text-[9px] text-gray-400 w-10 text-right">{config.columns || 3}</span>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Gap (px)</Label>
                      <div className="flex items-center gap-1.5">
                        <Input
                          type="range"
                          value={config.gap || 24}
                          onChange={(e) => updateConfig('gap', parseInt(e.target.value))}
                          className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                          min="0"
                          max="60"
                          step="4"
                        />
                        <span className="text-[9px] text-gray-400 w-10 text-right">{config.gap || 24}px</span>
                      </div>
                    </div>
                  </>
                )}

                {config.title && (
                  <>
                    <div className="flex items-center justify-between py-0.5">
                      <Label className="text-[9px] text-gray-300">Show Title</Label>
                      <Switch
                        checked={config.title.show ?? true}
                        onCheckedChange={(checked) => updateConfig('title.show', checked)}
                      />
                    </div>
                    
                    {config.title.show && (
                      <>
                        <div className="space-y-0.5">
                          <Label className="text-[9px] text-gray-300">Title Text</Label>
                          <Input
                            type="text"
                            value={config.title.text || ''}
                            onChange={(e) => updateConfig('title.text', e.target.value)}
                            className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                          />
                        </div>
                        
                        <div className="space-y-0.5">
                          <Label className="text-[9px] text-gray-300">Title Color</Label>
                          <Input
                            type="color"
                            value={config.title.color || '#ffffff'}
                            onChange={(e) => updateConfig('title.color', e.target.value)}
                            className="w-6 h-6 bg-gray-800 border-gray-700"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Background Color</Label>
                  <Input
                    type="color"
                    value={config.background?.value || '#f7fafc'}
                    onChange={(e) => updateConfig('background.value', e.target.value)}
                    className="w-6 h-6 bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="pt-1 border-t border-gray-700">
                  <p className="text-[9px] text-indigo-400 italic">
                    💡 Click on any card/element to edit it individually
                  </p>
                </div>
              </>
            ) : (
              /* Individual Element Editing */
              (() => {
                let element;
                
                if (config.layout === 'split') {
                  // For split layout
                  element = selectedElementId === 'left-content' ? config.leftContent : config.rightContent;
                } else if (config.layout === 'vertical') {
                  // For vertical layout, check if it's a composite ID
                  if (selectedElementId.endsWith('-left') || selectedElementId.endsWith('-right')) {
                    const side = selectedElementId.endsWith('-left') ? 'left' : 'right';
                    const baseId = selectedElementId.replace(/-left$|-right$/, '');
                    const parentElement = config.elements?.find(el => el.id === baseId);
                    
                    if (parentElement) {
                      element = side === 'left' ? parentElement.leftContent : parentElement.rightContent;
                    }
                  } else {
                    element = config.elements?.find(el => el.id === selectedElementId);
                  }
                } else {
                  // For grid layout
                  element = config.elements?.find(el => el.id === selectedElementId);
                }
                
                if (!element) return <p className="text-[9px] text-gray-400">Element not found</p>;

                return (
                  <>
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-white font-bold">
                        Editing: {element.title?.text?.substring(0, 30) || 'Element'}
                      </Label>
                    </div>

                    {/* Image Controls */}
                    {element.image && (
                      <>
                        <div className="flex items-center justify-between py-0.5">
                          <Label className="text-[9px] text-gray-300">Show Image</Label>
                          <Switch
                            checked={element.image.show ?? true}
                            onCheckedChange={(checked) => updateElementConfig(selectedElementId, 'image.show', checked)}
                          />
                        </div>
                        
                        {element.image.show && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Image URL</Label>
                              <Input
                                type="text"
                                value={element.image.src || ''}
                                onChange={(e) => updateElementConfig(selectedElementId, 'image.src', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                              />
                            </div>
                            
                            {element.image.height !== undefined && (
                              <div className="space-y-0.5">
                                <Label className="text-[9px] text-gray-300">Image Height (px)</Label>
                                <div className="flex items-center gap-1.5">
                                  <Input
                                    type="range"
                                    value={element.image.height || 300}
                                    onChange={(e) => updateElementConfig(selectedElementId, 'image.height', parseInt(e.target.value))}
                                    className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                                    min="200"
                                    max="600"
                                    step="50"
                                  />
                                  <span className="text-[9px] text-gray-400 w-10 text-right">{element.image.height || 300}px</span>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {/* Tag Controls */}
                    {element.tag && (
                      <>
                        <div className="flex items-center justify-between py-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Show Tag</Label>
                          <Switch
                            checked={element.tag.show ?? false}
                            onCheckedChange={(checked) => updateElementConfig(selectedElementId, 'tag.show', checked)}
                          />
                        </div>
                        
                        {element.tag.show && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Tag Text</Label>
                              <Input
                                type="text"
                                value={element.tag.text || ''}
                                onChange={(e) => updateElementConfig(selectedElementId, 'tag.text', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Tag Color</Label>
                              <Input
                                type="color"
                                value={element.tag.color || '#10b981'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'tag.color', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Title Controls */}
                    {element.title && (
                      <>
                        <div className="flex items-center justify-between py-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Show Title</Label>
                          <Switch
                            checked={element.title.show ?? true}
                            onCheckedChange={(checked) => updateElementConfig(selectedElementId, 'title.show', checked)}
                          />
                        </div>
                        
                        {element.title.show && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Title Text</Label>
                              <Textarea
                                value={element.title.text || ''}
                                onChange={(e) => updateElementConfig(selectedElementId, 'title.text', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] text-white"
                                rows={1}
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Title Color</Label>
                              <Input
                                type="color"
                                value={element.title.color || '#1a202c'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'title.color', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Title Size (px)</Label>
                              <div className="flex items-center gap-1.5">
                                <Input
                                  type="range"
                                  value={element.title.size || 24}
                                  onChange={(e) => updateElementConfig(selectedElementId, 'title.size', parseInt(e.target.value))}
                                  className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                                  min="16"
                                  max="64"
                                  step="2"
                                />
                                <span className="text-[9px] text-gray-400 w-10 text-right">{element.title.size || 24}px</span>
                              </div>
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Title Weight</Label>
                              <Select
                                value={String(element.title.weight || 700)}
                                onValueChange={(value) => updateElementConfig(selectedElementId, 'title.weight', parseInt(value))}
                              >
                                <SelectTrigger className="h-7 bg-gray-800 border-gray-700 text-[9px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="300">Light (300)</SelectItem>
                                  <SelectItem value="400">Regular (400)</SelectItem>
                                  <SelectItem value="500">Medium (500)</SelectItem>
                                  <SelectItem value="600">Semi-Bold (600)</SelectItem>
                                  <SelectItem value="700">Bold (700)</SelectItem>
                                  <SelectItem value="800">Extra Bold (800)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {element.title.style !== undefined && (
                              <div className="space-y-0.5">
                                <Label className="text-[9px] text-gray-300">Title Style</Label>
                                <Select
                                  value={element.title.style || 'normal'}
                                  onValueChange={(value) => updateElementConfig(selectedElementId, 'title.style', value)}
                                >
                                  <SelectTrigger className="h-7 bg-gray-800 border-gray-700 text-[9px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="italic">Italic</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {/* Subtitle Controls (for Vertical Layout rightContent) */}
                    {element.subtitle && (
                      <>
                        <div className="flex items-center justify-between py-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Show Subtitle</Label>
                          <Switch
                            checked={element.subtitle.show ?? true}
                            onCheckedChange={(checked) => updateElementConfig(selectedElementId, 'subtitle.show', checked)}
                          />
                        </div>
                        
                        {element.subtitle.show && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Subtitle Text</Label>
                              <Textarea
                                value={element.subtitle.text || ''}
                                onChange={(e) => updateElementConfig(selectedElementId, 'subtitle.text', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] text-white"
                                rows={2}
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Subtitle Color</Label>
                              <Input
                                type="color"
                                value={element.subtitle.color || '#4a5568'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'subtitle.color', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Subtitle Size (px)</Label>
                              <div className="flex items-center gap-1.5">
                                <Input
                                  type="range"
                                  value={element.subtitle.size || 18}
                                  onChange={(e) => updateElementConfig(selectedElementId, 'subtitle.size', parseInt(e.target.value))}
                                  className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                                  min="12"
                                  max="32"
                                  step="2"
                                />
                                <span className="text-[9px] text-gray-400 w-10 text-right">{element.subtitle.size || 18}px</span>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Description Controls */}
                    {element.description && (
                      <>
                        <div className="flex items-center justify-between py-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Show Description</Label>
                          <Switch
                            checked={element.description.show ?? true}
                            onCheckedChange={(checked) => updateElementConfig(selectedElementId, 'description.show', checked)}
                          />
                        </div>
                        
                        {element.description.show && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Description Text</Label>
                              <Textarea
                                value={element.description.text || ''}
                                onChange={(e) => updateElementConfig(selectedElementId, 'description.text', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] text-white"
                                rows={3}
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Description Color</Label>
                              <Input
                                type="color"
                                value={element.description.color || '#4a5568'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'description.color', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Description Size (px)</Label>
                              <div className="flex items-center gap-1.5">
                                <Input
                                  type="range"
                                  value={element.description.size || 16}
                                  onChange={(e) => updateElementConfig(selectedElementId, 'description.size', parseInt(e.target.value))}
                                  className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                                  min="12"
                                  max="24"
                                  step="1"
                                />
                                <span className="text-[9px] text-gray-400 w-10 text-right">{element.description.size || 16}px</span>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Button Controls */}
                    {element.button && (
                      <>
                        <div className="flex items-center justify-between py-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Show Button</Label>
                          <Switch
                            checked={element.button.show ?? true}
                            onCheckedChange={(checked) => updateElementConfig(selectedElementId, 'button.show', checked)}
                          />
                        </div>
                        
                        {element.button.show && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Button Text</Label>
                              <Input
                                type="text"
                                value={element.button.text || ''}
                                onChange={(e) => updateElementConfig(selectedElementId, 'button.text', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Button Color</Label>
                              <Input
                                type="color"
                                value={element.button.color || '#667eea'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'button.color', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Button Text Color</Label>
                              <Input
                                type="color"
                                value={element.button.textColor || '#ffffff'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'button.textColor', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Button Link</Label>
                              <Input
                                type="text"
                                value={element.button.link || '#'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'button.link', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Button 2 Controls (for Vertical Layout) */}
                    {element.button2 && (
                      <>
                        <div className="flex items-center justify-between py-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Show Button 2</Label>
                          <Switch
                            checked={element.button2.show ?? false}
                            onCheckedChange={(checked) => updateElementConfig(selectedElementId, 'button2.show', checked)}
                          />
                        </div>
                        
                        {element.button2.show && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Button 2 Text</Label>
                              <Input
                                type="text"
                                value={element.button2.text || ''}
                                onChange={(e) => updateElementConfig(selectedElementId, 'button2.text', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Button 2 Color</Label>
                              <Input
                                type="color"
                                value={element.button2.color || 'transparent'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'button2.color', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Button 2 Text Color</Label>
                              <Input
                                type="color"
                                value={element.button2.textColor || '#ffffff'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'button2.textColor', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Button 2 Border Color</Label>
                              <Input
                                type="color"
                                value={element.button2.borderColor || '#ffffff'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'button2.borderColor', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Button 2 Link</Label>
                              <Input
                                type="text"
                                value={element.button2.link || '#'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'button2.link', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Date Controls */}
                    {element.date && (
                      <>
                        <div className="flex items-center justify-between py-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Show Date</Label>
                          <Switch
                            checked={element.date.show ?? false}
                            onCheckedChange={(checked) => updateElementConfig(selectedElementId, 'date.show', checked)}
                          />
                        </div>
                        
                        {element.date.show && (
                          <div className="space-y-0.5">
                            <Label className="text-[9px] text-gray-300">Date Text</Label>
                            <Input
                              type="text"
                              value={element.date.text || ''}
                              onChange={(e) => updateElementConfig(selectedElementId, 'date.text', e.target.value)}
                              className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                            />
                          </div>
                        )}
                      </>
                    )}

                    {/* Icon Controls */}
                    {element.icon && (
                      <>
                        <div className="flex items-center justify-between py-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Show Icon</Label>
                          <Switch
                            checked={element.icon.show ?? false}
                            onCheckedChange={(checked) => updateElementConfig(selectedElementId, 'icon.show', checked)}
                          />
                        </div>
                        
                        {element.icon.show && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Icon Name</Label>
                              <Input
                                type="text"
                                value={element.icon.name || 'Circle'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'icon.name', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                                placeholder="Camera, Heart, Star, etc."
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Icon Color</Label>
                              <Input
                                type="color"
                                value={element.icon.color || '#667eea'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'icon.color', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Metadata Controls (for Split Layout) */}
                    {element.metadata && (
                      <>
                        <div className="flex items-center justify-between py-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Show Metadata</Label>
                          <Switch
                            checked={element.metadata.show ?? false}
                            onCheckedChange={(checked) => updateElementConfig(selectedElementId, 'metadata.show', checked)}
                          />
                        </div>
                        
                        {element.metadata.show && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Author</Label>
                              <Input
                                type="text"
                                value={element.metadata.author || ''}
                                onChange={(e) => updateElementConfig(selectedElementId, 'metadata.author', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Date</Label>
                              <Input
                                type="text"
                                value={element.metadata.date || ''}
                                onChange={(e) => updateElementConfig(selectedElementId, 'metadata.date', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Read Time</Label>
                              <Input
                                type="text"
                                value={element.metadata.readTime || ''}
                                onChange={(e) => updateElementConfig(selectedElementId, 'metadata.readTime', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Metadata Color</Label>
                              <Input
                                type="color"
                                value={element.metadata.color || '#4a5568'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'metadata.color', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Background Controls (for Vertical Layout elements) */}
                    {element.background && (
                      <>
                        <div className="space-y-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Background Color</Label>
                          <Input
                            type="color"
                            value={element.background.value || '#ffffff'}
                            onChange={(e) => updateElementConfig(selectedElementId, 'background.value', e.target.value)}
                            className="w-6 h-6 bg-gray-800 border-gray-700"
                          />
                        </div>
                      </>
                    )}

                    {/* Padding Controls (for Split Layout leftContent) */}
                    {element.padding && (
                      <>
                        <div className="space-y-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Padding Top (px)</Label>
                          <div className="flex items-center gap-1.5">
                            <Input
                              type="range"
                              value={element.padding.top || 80}
                              onChange={(e) => updateElementConfig(selectedElementId, 'padding.top', parseInt(e.target.value))}
                              className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                              min="0"
                              max="200"
                              step="10"
                            />
                            <span className="text-[9px] text-gray-400 w-10 text-right">{element.padding.top || 80}px</span>
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <Label className="text-[9px] text-gray-300">Padding Bottom (px)</Label>
                          <div className="flex items-center gap-1.5">
                            <Input
                              type="range"
                              value={element.padding.bottom || 80}
                              onChange={(e) => updateElementConfig(selectedElementId, 'padding.bottom', parseInt(e.target.value))}
                              className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                              min="0"
                              max="200"
                              step="10"
                            />
                            <span className="text-[9px] text-gray-400 w-10 text-right">{element.padding.bottom || 80}px</span>
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <Label className="text-[9px] text-gray-300">Padding Left (px)</Label>
                          <div className="flex items-center gap-1.5">
                            <Input
                              type="range"
                              value={element.padding.left || 60}
                              onChange={(e) => updateElementConfig(selectedElementId, 'padding.left', parseInt(e.target.value))}
                              className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                              min="0"
                              max="200"
                              step="10"
                            />
                            <span className="text-[9px] text-gray-400 w-10 text-right">{element.padding.left || 60}px</span>
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <Label className="text-[9px] text-gray-300">Padding Right (px)</Label>
                          <div className="flex items-center gap-1.5">
                            <Input
                              type="range"
                              value={element.padding.right || 60}
                              onChange={(e) => updateElementConfig(selectedElementId, 'padding.right', parseInt(e.target.value))}
                              className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                              min="0"
                              max="200"
                              step="10"
                            />
                            <span className="text-[9px] text-gray-400 w-10 text-right">{element.padding.right || 60}px</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Overlay Controls (for Split Layout rightContent with image) */}
                    {element.overlay && (
                      <>
                        <div className="flex items-center justify-between py-0.5 border-t border-gray-800 pt-1">
                          <Label className="text-[9px] text-gray-300">Show Overlay</Label>
                          <Switch
                            checked={element.overlay.show ?? false}
                            onCheckedChange={(checked) => updateElementConfig(selectedElementId, 'overlay.show', checked)}
                          />
                        </div>
                        
                        {element.overlay.show && (
                          <>
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Overlay Color</Label>
                              <Input
                                type="color"
                                value={element.overlay.color || '#667eea'}
                                onChange={(e) => updateElementConfig(selectedElementId, 'overlay.color', e.target.value)}
                                className="w-6 h-6 bg-gray-800 border-gray-700"
                              />
                            </div>
                            
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Overlay Opacity</Label>
                              <div className="flex items-center gap-1.5">
                                <Input
                                  type="range"
                                  value={(element.overlay.opacity || 0.1) * 100}
                                  onChange={(e) => updateElementConfig(selectedElementId, 'overlay.opacity', parseInt(e.target.value) / 100)}
                                  className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                                  min="0"
                                  max="100"
                                  step="5"
                                />
                                <span className="text-[9px] text-gray-400 w-10 text-right">{Math.round((element.overlay.opacity || 0.1) * 100)}%</span>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                );
              })()
            )}
          </div>
        )}
      </div>

      {/* Social Icons Modal */}
      <SocialIconsModal
        isOpen={showSocialIconsModal}
        onClose={() => setShowSocialIconsModal(false)}
        currentIcons={config.socialIcons?.items || []}
        onSave={handleSaveSocialIcons}
      />
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { X, Settings, Upload } from 'lucide-react';
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

        {/* Size Controls for Hero Parallax */}
        {config.type === 'hero-parallax' && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">Size</h4>
            
            {/* Full Screen */}
            <div className="flex items-center justify-between py-0.5">
              <Label className="text-[9px] text-gray-300">Full Screen</Label>
              <Switch
                checked={config.fullScreen ?? false}
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

            {/* Top Padding (only when not full screen) */}
            {!config.fullScreen && (
              <>
                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Top</Label>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="range"
                      value={config.paddingTop || 4}
                      onChange={(e) => updateConfig('paddingTop', parseInt(e.target.value))}
                      className="flex-1 bg-gray-800 border-gray-700"
                      min="0"
                      max="12"
                      step="1"
                    />
                    <span className="text-[9px] text-gray-400 w-10">{config.paddingTop || 4}rem</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Bottom</Label>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="range"
                      value={config.paddingBottom || 5}
                      onChange={(e) => updateConfig('paddingBottom', parseInt(e.target.value))}
                      className="flex-1 bg-gray-800 border-gray-700"
                      min="0"
                      max="12"
                      step="1"
                    />
                    <span className="text-[9px] text-gray-400 w-10">{config.paddingBottom || 5}rem</span>
                  </div>
                </div>
              </>
            )}
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

        {/* PARALLAX BLOCK SETTINGS */}
        {config.type === 'parallax' && (
          <>
            {/* Size Controls */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">Size</h4>
              
              <div className="flex items-center justify-between py-0.5">
                <Label className="text-[9px] text-gray-300">Full Screen</Label>
                <Switch
                  checked={config.fullScreen ?? false}
                  onCheckedChange={(checked) => updateConfig('fullScreen', checked)}
                />
              </div>

              <div className="flex items-center justify-between py-0.5">
                <Label className="text-[9px] text-gray-300">Full Width</Label>
                <Switch
                  checked={config.fullWidth ?? false}
                  onCheckedChange={(checked) => updateConfig('fullWidth', checked)}
                />
              </div>

              {!config.fullScreen && (
                <>
                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Top Padding</Label>
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="range"
                        value={config.paddingTop || 4}
                        onChange={(e) => updateConfig('paddingTop', parseInt(e.target.value))}
                        className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                        min="0"
                        max="12"
                        step="1"
                      />
                      <span className="text-[9px] text-gray-400 w-10 text-right">{config.paddingTop || 4}rem</span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Bottom Padding</Label>
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="range"
                        value={config.paddingBottom || 5}
                        onChange={(e) => updateConfig('paddingBottom', parseInt(e.target.value))}
                        className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                        min="0"
                        max="12"
                        step="1"
                      />
                      <span className="text-[9px] text-gray-400 w-10 text-right">{config.paddingBottom || 5}rem</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Background Type Selection */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Background Type</Label>
              <Select
                value={config.background?.type || 'image'}
                onValueChange={(value) => updateConfig('background.type', value)}
              >
                <SelectTrigger className="h-7 bg-gray-800 border-gray-700 text-[9px] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="color">Color</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Background Controls based on type */}
            {config.background?.type === 'image' && (
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Image URL</Label>
                <Input
                  type="text"
                  value={config.background?.value || ''}
                  onChange={(e) => updateConfig('background.value', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                  placeholder="https://example.com/image.jpg"
                />
                
                <label className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] py-1.5 px-2 rounded cursor-pointer transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append('file', file);
                      try {
                        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
                        const response = await fetch(`${backendUrl}/api/upload/image`, {
                          method: 'POST',
                          body: formData
                        });
                        if (response.ok) {
                          const data = await response.json();
                          updateConfig('background.value', data.url);
                        }
                      } catch (error) {
                        console.error('Error uploading image:', error);
                      }
                    }}
                  />
                </label>

                <div className="flex items-center justify-between py-0.5">
                  <Label className="text-[9px] text-gray-300">Parallax Effect</Label>
                  <Switch
                    checked={config.background?.parallax ?? true}
                    onCheckedChange={(checked) => updateConfig('background.parallax', checked)}
                  />
                </div>
              </div>
            )}

            {config.background?.type === 'video' && (
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Video URL</Label>
                <Input
                  type="text"
                  value={config.background?.value || ''}
                  onChange={(e) => updateConfig('background.value', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                  placeholder="https://example.com/video.mp4"
                />
                
                <label className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] py-1.5 px-2 rounded cursor-pointer transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Upload Video
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append('file', file);
                      try {
                        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
                        const response = await fetch(`${backendUrl}/api/upload/video`, {
                          method: 'POST',
                          body: formData
                        });
                        if (response.ok) {
                          const data = await response.json();
                          updateConfig('background.value', data.url);
                        }
                      } catch (error) {
                        console.error('Error uploading video:', error);
                      }
                    }}
                  />
                </label>
              </div>
            )}

            {config.background?.type === 'color' && (
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Background Color</Label>
                <Input
                  type="color"
                  value={config.background?.value || '#ffffff'}
                  onChange={(e) => updateConfig('background.value', e.target.value)}
                  className="w-full h-10 bg-gray-800 border-gray-700"
                />
              </div>
            )}

            {config.background?.type === 'gradient' && (
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Gradient CSS</Label>
                <Textarea
                  value={config.background?.value || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}
                  onChange={(e) => updateConfig('background.value', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-[9px] text-white"
                  placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  rows={2}
                />
              </div>
            )}

            {/* Overlay Controls */}
            {config.background?.type !== 'color' && (
              <div className="space-y-0.5 border-t border-gray-800 pt-1">
                <div className="flex items-center justify-between py-0.5">
                  <Label className="text-[9px] text-gray-300">Overlay</Label>
                  <Switch
                    checked={config.overlay ?? true}
                    onCheckedChange={(checked) => updateConfig('overlay', checked)}
                  />
                </div>

                {config.overlay && (
                  <>
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Overlay Color</Label>
                      <Input
                        type="color"
                        value={config.overlayColor || '#232323'}
                        onChange={(e) => updateConfig('overlayColor', e.target.value)}
                        className="w-full h-10 bg-gray-800 border-gray-700"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Opacity</Label>
                      <div className="flex items-center gap-1.5">
                        <Input
                          type="range"
                          value={config.overlayOpacity || 0.4}
                          onChange={(e) => updateConfig('overlayOpacity', parseFloat(e.target.value))}
                          className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                          min="0"
                          max="1"
                          step="0.1"
                        />
                        <span className="text-[9px] text-gray-400 w-10 text-right">{((config.overlayOpacity || 0.4) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Content Controls */}
            {config.content && (
              <div className="space-y-0.5 border-t border-gray-800 pt-1">
                <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">Content</h4>
                
                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Heading</Label>
                  <Input
                    type="text"
                    value={config.content?.text || ''}
                    onChange={(e) => updateConfig('content.text', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-[9px] h-7 text-white"
                    placeholder="Your heading"
                  />
                </div>

                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Description</Label>
                  <Textarea
                    value={config.content?.description || ''}
                    onChange={(e) => updateConfig('content.description', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-[9px] text-white"
                    placeholder="Your description"
                    rows={2}
                  />
                </div>

                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Text Color</Label>
                  <Input
                    type="color"
                    value={config.content?.color || '#ffffff'}
                    onChange={(e) => updateConfig('content.color', e.target.value)}
                    className="w-full h-10 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
            )}
          </>
        )}

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

                    {/* Card Height Control */}
                    <div className="space-y-0.5 border-b border-gray-700 pb-1">
                      <Label className="text-[9px] text-gray-300">Card Height (px)</Label>
                      <div className="flex items-center gap-1.5">
                        <Input
                          type="range"
                          value={element.minHeight || 400}
                          onChange={(e) => updateElementConfig(selectedElementId, 'minHeight', parseInt(e.target.value))}
                          className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                          min="200"
                          max="800"
                          step="50"
                        />
                        <span className="text-[9px] text-gray-400 w-10 text-right">{element.minHeight || 400}px</span>
                      </div>
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

        {/* Gallery 3D Block Controls */}
        {config.type === 'gallery-3d' && (
          <div className="space-y-0.5 border-t border-gray-800 pt-1">
            <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Gallery Images</Label>
            
            <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
              {(config.images || []).map((image, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-gray-800/50 p-1.5 rounded border border-gray-700">
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={typeof image === 'string' ? image : image.src} 
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Input
                      type="text"
                      value={typeof image === 'string' ? image : image.src}
                      onChange={(e) => {
                        const newImages = [...config.images];
                        newImages[index] = e.target.value;
                        updateConfig('images', newImages);
                      }}
                      className="bg-gray-700 border-gray-600 text-white text-[9px] px-2 py-1 h-7"
                      placeholder="Image URL"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newImages = config.images.filter((_, i) => i !== index);
                      updateConfig('images', newImages);
                    }}
                    className="flex-shrink-0 p-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                    title="Delete"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Upload Image Button */}
            <label className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] py-1.5 px-2 rounded cursor-pointer transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Încarcă Imagine</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
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
                      const fullUrl = `${backendUrl}${data.url}`;
                      const newImages = [...(config.images || []), fullUrl];
                      updateConfig('images', newImages);
                    }
                  } catch (error) {
                    console.error('Upload error:', error);
                    alert('Eroare la încărcarea imaginii');
                  }
                  
                  e.target.value = '';
                }}
              />
            </label>

            {/* Background Color */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1 mt-1">
              <Label className="text-[9px] text-gray-300">Background Color</Label>
              <Input
                type="color"
                value={config.background?.value || '#020617'}
                onChange={(e) => updateConfig('background.value', e.target.value)}
                className="w-6 h-6 bg-gray-800 border-gray-700"
              />
            </div>

            {/* Padding Controls */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <Label className="text-[9px] text-gray-300">Padding Top (px)</Label>
              <div className="flex items-center gap-1.5">
                <Input
                  type="range"
                  value={config.padding?.top || 80}
                  onChange={(e) => updateConfig('padding.top', parseInt(e.target.value))}
                  className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                  min="0"
                  max="200"
                  step="10"
                />
                <span className="text-[9px] text-gray-400 w-10 text-right">{config.padding?.top || 80}px</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <Label className="text-[9px] text-gray-300">Padding Bottom (px)</Label>
              <div className="flex items-center gap-1.5">
                <Input
                  type="range"
                  value={config.padding?.bottom || 80}
                  onChange={(e) => updateConfig('padding.bottom', parseInt(e.target.value))}
                  className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                  min="0"
                  max="200"
                  step="10"
                />
                <span className="text-[9px] text-gray-400 w-10 text-right">{config.padding?.bottom || 80}px</span>
              </div>
            </div>

            <div className="pt-1 border-t border-gray-700">
              <p className="text-[9px] text-indigo-400 italic">
                💡 Hover peste imagini pentru efectul wave, click pentru zoom
              </p>
            </div>
          </div>
        )}

        {/* Parallax Block Controls */}
        {config.type === 'parallax' && (
          <div className="space-y-0.5">
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider border-b border-gray-700 pb-1">Parallax Settings</h4>
            
            {/* Hero Section */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <h5 className="text-[9px] font-semibold text-indigo-400">Hero Section</h5>
              
              {/* Hero Background Image */}
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Background Image URL</Label>
                <Input
                  type="text"
                  value={config.hero?.background?.value || ''}
                  onChange={(e) => updateConfig('hero.background.value', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                  placeholder="https://..."
                />
              </div>

              {/* Hero Height */}
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Hero Height (vh)</Label>
                <div className="flex items-center gap-1.5">
                  <Input
                    type="range"
                    value={config.hero?.height || 60}
                    onChange={(e) => updateConfig('hero.height', parseInt(e.target.value))}
                    className="flex-1 bg-gray-800 border-gray-700"
                    min="30"
                    max="100"
                    step="5"
                  />
                  <span className="text-[9px] text-gray-400 w-10 text-right">{config.hero?.height || 60}vh</span>
                </div>
              </div>

              {/* Hero Title */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <Label className="text-[9px] text-gray-300">Title</Label>
                  <Switch
                    checked={config.hero?.title?.show ?? true}
                    onCheckedChange={(checked) => updateConfig('hero.title.show', checked)}
                  />
                </div>
                {config.hero?.title?.show && (
                  <>
                    <Input
                      type="text"
                      value={config.hero?.title?.text || ''}
                      onChange={(e) => updateConfig('hero.title.text', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                    />
                    <div className="flex gap-1.5">
                      <div className="flex-1">
                        <Label className="text-[9px] text-gray-300">Size</Label>
                        <Input
                          type="range"
                          value={config.hero?.title?.size || 48}
                          onChange={(e) => updateConfig('hero.title.size', parseInt(e.target.value))}
                          className="w-full bg-gray-800 border-gray-700"
                          min="24"
                          max="80"
                        />
                        <span className="text-[9px] text-gray-400">{config.hero?.title?.size || 48}px</span>
                      </div>
                      <div className="flex-1">
                        <Label className="text-[9px] text-gray-300">Color</Label>
                        <Input
                          type="color"
                          value={config.hero?.title?.color || '#333333'}
                          onChange={(e) => updateConfig('hero.title.color', e.target.value)}
                          className="w-full h-6 bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Hero Description */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <Label className="text-[9px] text-gray-300">Description</Label>
                  <Switch
                    checked={config.hero?.description?.show ?? true}
                    onCheckedChange={(checked) => updateConfig('hero.description.show', checked)}
                  />
                </div>
                {config.hero?.description?.show && (
                  <>
                    <Textarea
                      value={config.hero?.description?.text || ''}
                      onChange={(e) => updateConfig('hero.description.text', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] min-h-[60px]"
                      rows={2}
                    />
                    <div className="flex gap-1.5">
                      <div className="flex-1">
                        <Label className="text-[9px] text-gray-300">Size</Label>
                        <Input
                          type="range"
                          value={config.hero?.description?.size || 16}
                          onChange={(e) => updateConfig('hero.description.size', parseInt(e.target.value))}
                          className="w-full bg-gray-800 border-gray-700"
                          min="12"
                          max="24"
                        />
                        <span className="text-[9px] text-gray-400">{config.hero?.description?.size || 16}px</span>
                      </div>
                      <div className="flex-1">
                        <Label className="text-[9px] text-gray-300">Color</Label>
                        <Input
                          type="color"
                          value={config.hero?.description?.color || '#333333'}
                          onChange={(e) => updateConfig('hero.description.color', e.target.value)}
                          className="w-full h-6 bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Hero Button */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <Label className="text-[9px] text-gray-300">Button</Label>
                  <Switch
                    checked={config.hero?.button?.show ?? true}
                    onCheckedChange={(checked) => updateConfig('hero.button.show', checked)}
                  />
                </div>
                {config.hero?.button?.show && (
                  <>
                    <Input
                      type="text"
                      value={config.hero?.button?.text || ''}
                      onChange={(e) => updateConfig('hero.button.text', e.target.value)}
                      placeholder="Button text"
                      className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                    />
                    <Input
                      type="text"
                      value={config.hero?.button?.link || '#'}
                      onChange={(e) => updateConfig('hero.button.link', e.target.value)}
                      placeholder="Link URL"
                      className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                    />
                    <div className="flex gap-1.5">
                      <div className="flex-1">
                        <Label className="text-[9px] text-gray-300">Background</Label>
                        <Input
                          type="color"
                          value={config.hero?.button?.color || '#333333'}
                          onChange={(e) => updateConfig('hero.button.color', e.target.value)}
                          className="w-full h-6 bg-gray-800 border-gray-700"
                        />
                      </div>
                      <div className="flex-1">
                        <Label className="text-[9px] text-gray-300">Text</Label>
                        <Input
                          type="color"
                          value={config.hero?.button?.textColor || '#ffffff'}
                          onChange={(e) => updateConfig('hero.button.textColor', e.target.value)}
                          className="w-full h-6 bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Spacer Section */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <h5 className="text-[9px] font-semibold text-indigo-400">Spacer Settings</h5>
              
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Height</Label>
                <div className="flex items-center gap-1.5">
                  <Input
                    type="range"
                    value={config.spacer?.height || 400}
                    onChange={(e) => updateConfig('spacer.height', parseInt(e.target.value))}
                    className="flex-1 bg-gray-800 border-gray-700"
                    min="100"
                    max="800"
                    step="50"
                  />
                  <span className="text-[9px] text-gray-400 w-12">{config.spacer?.height || 400}px</span>
                </div>
              </div>

              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Background Color</Label>
                <Input
                  type="color"
                  value={config.spacer?.backgroundColor || '#333333'}
                  onChange={(e) => updateConfig('spacer.backgroundColor', e.target.value)}
                  className="w-full h-6 bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            {/* Cards Section */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <h5 className="text-[9px] font-semibold text-indigo-400">Cards Section</h5>
              
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Background Image URL</Label>
                <Input
                  type="text"
                  value={config.cardsSection?.background?.value || ''}
                  onChange={(e) => updateConfig('cardsSection.background.value', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Section Height</Label>
                <div className="flex items-center gap-1.5">
                  <Input
                    type="range"
                    value={config.cardsSection?.height || 1200}
                    onChange={(e) => updateConfig('cardsSection.height', parseInt(e.target.value))}
                    className="flex-1 bg-gray-800 border-gray-700"
                    min="600"
                    max="2000"
                    step="100"
                  />
                  <span className="text-[9px] text-gray-400 w-12">{config.cardsSection?.height || 1200}px</span>
                </div>
              </div>
            </div>

            {/* Cards Management */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <div className="flex items-center justify-between">
                <h5 className="text-[9px] font-semibold text-indigo-400">Cards ({config.cards?.length || 0})</h5>
                <Button
                  onClick={() => {
                    const newCard = {
                      id: `card-${Date.now()}`,
                      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                      title: 'New Activity',
                      description: 'Add your description here',
                      link: '#',
                      linkText: 'Learn more'
                    };
                    const newCards = [...(config.cards || []), newCard];
                    updateConfig('cards', newCards);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white h-6 text-[10px] px-2"
                >
                  + Add Card
                </Button>
              </div>

              {config.cards?.map((card, index) => (
                <div key={card.id} className="space-y-0.5 border border-gray-700 p-1.5 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-[9px] font-semibold text-white">Card {index + 1}</Label>
                    <Button
                      onClick={() => {
                        const newCards = config.cards.filter(c => c.id !== card.id);
                        updateConfig('cards', newCards);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white h-5 w-5 p-0 text-[10px]"
                    >
                      ×
                    </Button>
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Image URL</Label>
                    <Input
                      type="text"
                      value={card.image || ''}
                      onChange={(e) => {
                        const newCards = [...config.cards];
                        newCards[index] = { ...card, image: e.target.value };
                        updateConfig('cards', newCards);
                      }}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Title</Label>
                    <Input
                      type="text"
                      value={card.title || ''}
                      onChange={(e) => {
                        const newCards = [...config.cards];
                        newCards[index] = { ...card, title: e.target.value };
                        updateConfig('cards', newCards);
                      }}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Description</Label>
                    <Textarea
                      value={card.description || ''}
                      onChange={(e) => {
                        const newCards = [...config.cards];
                        newCards[index] = { ...card, description: e.target.value };
                        updateConfig('cards', newCards);
                      }}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] min-h-[50px]"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Button Text</Label>
                    <Input
                      type="text"
                      value={card.linkText || ''}
                      onChange={(e) => {
                        const newCards = [...config.cards];
                        newCards[index] = { ...card, linkText: e.target.value };
                        updateConfig('cards', newCards);
                      }}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Link URL</Label>
                    <Input
                      type="text"
                      value={card.link || ''}
                      onChange={(e) => {
                        const newCards = [...config.cards];
                        newCards[index] = { ...card, link: e.target.value };
                        updateConfig('cards', newCards);
                      }}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                      placeholder="#"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1 border-t border-gray-700">
              <p className="text-[9px] text-indigo-400 italic">
                💡 Parallax effect cu background-attachment: fixed
              </p>
            </div>
          </div>
        )}

        {/* Home Parallax Block Controls */}
        {config.type === 'home-parallax' && (
          <div className="space-y-0.5">
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider border-b border-gray-700 pb-1">Home Parallax Settings</h4>
            
            {/* Central Text */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <h5 className="text-[9px] font-semibold text-indigo-400">Central Text</h5>
              
              <div className="flex items-center justify-between">
                <Label className="text-[9px] text-gray-300">Show Text</Label>
                <Switch
                  checked={config.text?.show ?? true}
                  onCheckedChange={(checked) => updateConfig('text.show', checked)}
                />
              </div>

              {config.text?.show && (
                <>
                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Text Content</Label>
                    <Input
                      type="text"
                      value={config.text?.content || 'Bine ai venit!'}
                      onChange={(e) => updateConfig('text.content', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Text Color</Label>
                      <Input
                        type="color"
                        value={config.text?.color || '#FFFFFF'}
                        onChange={(e) => updateConfig('text.color', e.target.value)}
                        className="w-full h-6 bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Shadow Color</Label>
                      <Input
                        type="color"
                        value={config.text?.shadowColor?.replace(/rgba?\((\d+),\s*(\d+),\s*(\d+).*\)/, (m, r, g, b) => {
                          return '#' + [r, g, b].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
                        }) || '#000000'}
                        onChange={(e) => {
                          const hex = e.target.value;
                          const r = parseInt(hex.slice(1, 3), 16);
                          const g = parseInt(hex.slice(3, 5), 16);
                          const b = parseInt(hex.slice(5, 7), 16);
                          updateConfig('text.shadowColor', `rgba(${r}, ${g}, ${b}, 0.5)`);
                        }}
                        className="w-full h-6 bg-gray-800 border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Font Size: {config.text?.size || 64}px</Label>
                    <Input
                      type="range"
                      value={config.text?.size || 64}
                      onChange={(e) => updateConfig('text.size', parseInt(e.target.value))}
                      className="w-full bg-gray-800 border-gray-700"
                      min="24"
                      max="120"
                      step="4"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Font Weight: {config.text?.weight || 700}</Label>
                    <Input
                      type="range"
                      value={config.text?.weight || 700}
                      onChange={(e) => updateConfig('text.weight', parseInt(e.target.value))}
                      className="w-full bg-gray-800 border-gray-700"
                      min="300"
                      max="900"
                      step="100"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Shadow Blur: {config.text?.shadowBlur || 20}px</Label>
                    <Input
                      type="range"
                      value={config.text?.shadowBlur || 20}
                      onChange={(e) => updateConfig('text.shadowBlur', parseInt(e.target.value))}
                      className="w-full bg-gray-800 border-gray-700"
                      min="0"
                      max="50"
                      step="5"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Layers Management */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <div className="flex items-center justify-between">
                <h5 className="text-[9px] font-semibold text-indigo-400">Parallax Layers ({config.layers?.length || 0})</h5>
                <button
                  onClick={() => {
                    const newLayer = {
                      id: `layer-${Date.now()}`,
                      name: `Layer ${(config.layers?.length || 0) + 1}`,
                      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
                      speedx: 0.1,
                      speedy: 0.1,
                      speedz: 0.5,
                      rotation: 0,
                      distance: 100,
                      zIndex: config.layers?.length || 0
                    };
                    updateConfig('layers', [...(config.layers || []), newLayer]);
                  }}
                  className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] rounded"
                >
                  + Add Layer
                </button>
              </div>

              {config.layers?.map((layer, index) => (
                <div key={layer.id} className="p-2 bg-gray-800 rounded border border-gray-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-[9px] font-semibold text-white">Layer {index + 1}: {layer.name}</Label>
                    <button
                      onClick={() => {
                        const newLayers = config.layers.filter((_, i) => i !== index);
                        updateConfig('layers', newLayers);
                      }}
                      className="text-red-400 hover:text-red-300 text-[9px]"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Layer Name</Label>
                    <Input
                      type="text"
                      value={layer.name || ''}
                      onChange={(e) => {
                        const newLayers = [...config.layers];
                        newLayers[index] = { ...layer, name: e.target.value };
                        updateConfig('layers', newLayers);
                      }}
                      className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Image URL</Label>
                    <Input
                      type="text"
                      value={layer.image || ''}
                      onChange={(e) => {
                        const newLayers = [...config.layers];
                        newLayers[index] = { ...layer, image: e.target.value };
                        updateConfig('layers', newLayers);
                      }}
                      className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                      placeholder="https://..."
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || ''}/api/upload/image`, {
                              method: 'POST',
                              body: formData
                            });
                            if (response.ok) {
                              const data = await response.json();
                              const newLayers = [...config.layers];
                              newLayers[index] = { ...layer, image: data.url };
                              updateConfig('layers', newLayers);
                            }
                          } catch (error) {
                            console.error('Upload failed:', error);
                          }
                        }
                      }}
                      className="text-[9px] text-gray-400"
                      style={{ display: 'none' }}
                      id={`upload-layer-${index}`}
                    />
                    <label
                      htmlFor={`upload-layer-${index}`}
                      className="block w-full text-center px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] rounded cursor-pointer"
                    >
                      📤 Upload Image
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Speed X: {layer.speedx?.toFixed(2)}</Label>
                      <Input
                        type="range"
                        value={layer.speedx || 0}
                        onChange={(e) => {
                          const newLayers = [...config.layers];
                          newLayers[index] = { ...layer, speedx: parseFloat(e.target.value) };
                          updateConfig('layers', newLayers);
                        }}
                        className="w-full bg-gray-900 border-gray-600"
                        min="-1"
                        max="1"
                        step="0.05"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Speed Y: {layer.speedy?.toFixed(2)}</Label>
                      <Input
                        type="range"
                        value={layer.speedy || 0}
                        onChange={(e) => {
                          const newLayers = [...config.layers];
                          newLayers[index] = { ...layer, speedy: parseFloat(e.target.value) };
                          updateConfig('layers', newLayers);
                        }}
                        className="w-full bg-gray-900 border-gray-600"
                        min="-1"
                        max="1"
                        step="0.05"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Speed Z: {layer.speedz?.toFixed(2)}</Label>
                      <Input
                        type="range"
                        value={layer.speedz || 0}
                        onChange={(e) => {
                          const newLayers = [...config.layers];
                          newLayers[index] = { ...layer, speedz: parseFloat(e.target.value) };
                          updateConfig('layers', newLayers);
                        }}
                        className="w-full bg-gray-900 border-gray-600"
                        min="0"
                        max="5"
                        step="0.1"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Rotation: {layer.rotation?.toFixed(2)}</Label>
                      <Input
                        type="range"
                        value={layer.rotation || 0}
                        onChange={(e) => {
                          const newLayers = [...config.layers];
                          newLayers[index] = { ...layer, rotation: parseFloat(e.target.value) };
                          updateConfig('layers', newLayers);
                        }}
                        className="w-full bg-gray-900 border-gray-600"
                        min="-0.5"
                        max="0.5"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Z-Index: {layer.zIndex}</Label>
                      <Input
                        type="number"
                        value={layer.zIndex || 0}
                        onChange={(e) => {
                          const newLayers = [...config.layers];
                          newLayers[index] = { ...layer, zIndex: parseInt(e.target.value) };
                          updateConfig('layers', newLayers);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                      />
                    </div>
                    <div className="flex items-end gap-1">
                      {index > 0 && (
                        <button
                          onClick={() => {
                            const newLayers = [...config.layers];
                            [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
                            updateConfig('layers', newLayers);
                          }}
                          className="flex-1 px-1 py-1 bg-gray-700 hover:bg-gray-600 text-white text-[9px] rounded"
                        >
                          ↑
                        </button>
                      )}
                      {index < config.layers.length - 1 && (
                        <button
                          onClick={() => {
                            const newLayers = [...config.layers];
                            [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
                            updateConfig('layers', newLayers);
                          }}
                          className="flex-1 px-1 py-1 bg-gray-700 hover:bg-gray-600 text-white text-[9px] rounded"
                        >
                          ↓
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1 border-t border-gray-700">
              <p className="text-[9px] text-indigo-400 italic">
                💡 Efect Parallax 3D cu layere multiple - vezi modelul https://background-parallax-mountain.netlify.app/
              </p>
            </div>
          </div>
        )}

        {/* Cards Skew Block Controls */}
        {config.type === 'cards-skew' && (
          <div className="space-y-0.5">
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider border-b border-gray-700 pb-1">Cards Skew Settings</h4>
            
            {/* Dimensions */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <h5 className="text-[9px] font-semibold text-indigo-400">Dimensions</h5>
              
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Container Width (px)</Label>
                <div className="flex items-center gap-1.5">
                  <Input
                    type="range"
                    value={config.width || 400}
                    onChange={(e) => updateConfig('width', parseInt(e.target.value))}
                    className="flex-1 bg-gray-800 border-gray-700"
                    min="300"
                    max="800"
                    step="50"
                  />
                  <span className="text-[9px] text-gray-400 w-10 text-right">{config.width || 400}px</span>
                </div>
              </div>

              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Image Height (px)</Label>
                <div className="flex items-center gap-1.5">
                  <Input
                    type="range"
                    value={config.imageHeight || 300}
                    onChange={(e) => updateConfig('imageHeight', parseInt(e.target.value))}
                    className="flex-1 bg-gray-800 border-gray-700"
                    min="200"
                    max="600"
                    step="50"
                  />
                  <span className="text-[9px] text-gray-400 w-10 text-right">{config.imageHeight || 300}px</span>
                </div>
              </div>

              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Card Width (px)</Label>
                <div className="flex items-center gap-1.5">
                  <Input
                    type="range"
                    value={config.cardWidth || 300}
                    onChange={(e) => updateConfig('cardWidth', parseInt(e.target.value))}
                    className="flex-1 bg-gray-800 border-gray-700"
                    min="250"
                    max="700"
                    step="50"
                  />
                  <span className="text-[9px] text-gray-400 w-10 text-right">{config.cardWidth || 300}px</span>
                </div>
              </div>
            </div>

            {/* Background Image */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <h5 className="text-[9px] font-semibold text-indigo-400">Background Image</h5>
              
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Image URL</Label>
                <Input
                  type="text"
                  value={config.backgroundImage || ''}
                  onChange={(e) => updateConfig('backgroundImage', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                  placeholder="https://..."
                />
              </div>

              <label className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] py-1.5 px-2 rounded cursor-pointer transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append('file', file);
                    try {
                      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
                      const response = await fetch(`${backendUrl}/api/upload/image`, {
                        method: 'POST',
                        body: formData
                      });
                      if (response.ok) {
                        const data = await response.json();
                        updateConfig('backgroundImage', data.url);
                      }
                    } catch (error) {
                      console.error('Error uploading image:', error);
                    }
                    e.target.value = '';
                  }}
                />
              </label>
            </div>

            {/* Title Settings */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <h5 className="text-[9px] font-semibold text-indigo-400">Title</h5>
              
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Title Text</Label>
                <Input
                  type="text"
                  value={config.title || ''}
                  onChange={(e) => updateConfig('title', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                  placeholder="Some Title"
                />
              </div>

              <div className="flex gap-1.5">
                <div className="flex-1 space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Size</Label>
                  <Input
                    type="range"
                    value={config.titleSize || 24}
                    onChange={(e) => updateConfig('titleSize', parseInt(e.target.value))}
                    className="w-full bg-gray-800 border-gray-700"
                    min="16"
                    max="48"
                  />
                  <span className="text-[9px] text-gray-400">{config.titleSize || 24}px</span>
                </div>
                <div className="flex-1 space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Color</Label>
                  <Input
                    type="color"
                    value={config.titleColor || '#333333'}
                    onChange={(e) => updateConfig('titleColor', e.target.value)}
                    className="w-full h-6 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <h5 className="text-[9px] font-semibold text-indigo-400">Description</h5>
              
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Text</Label>
                <Textarea
                  value={config.description || ''}
                  onChange={(e) => updateConfig('description', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white text-[10px] min-h-[60px]"
                  rows={3}
                />
              </div>

              <div className="flex gap-1.5">
                <div className="flex-1 space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Size</Label>
                  <Input
                    type="range"
                    value={config.textSize || 14}
                    onChange={(e) => updateConfig('textSize', parseInt(e.target.value))}
                    className="w-full bg-gray-800 border-gray-700"
                    min="12"
                    max="20"
                  />
                  <span className="text-[9px] text-gray-400">{config.textSize || 14}px</span>
                </div>
                <div className="flex-1 space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Color</Label>
                  <Input
                    type="color"
                    value={config.textColor || '#555555'}
                    onChange={(e) => updateConfig('textColor', e.target.value)}
                    className="w-full h-6 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Link Settings */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <h5 className="text-[9px] font-semibold text-indigo-400">Link</h5>
              
              <div className="flex items-center justify-between py-0.5">
                <Label className="text-[9px] text-gray-300">Show Link</Label>
                <Switch
                  checked={config.showLink ?? true}
                  onCheckedChange={(checked) => updateConfig('showLink', checked)}
                />
              </div>

              {config.showLink && (
                <>
                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Link Text</Label>
                    <Input
                      type="text"
                      value={config.linkText || ''}
                      onChange={(e) => updateConfig('linkText', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                      placeholder="read more ..."
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Link URL</Label>
                    <Input
                      type="text"
                      value={config.linkUrl || ''}
                      onChange={(e) => updateConfig('linkUrl', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                      placeholder="#"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Accent Color */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <h5 className="text-[9px] font-semibold text-indigo-400">Accent Color</h5>
              
              <div className="flex items-center gap-1.5">
                <Input
                  type="color"
                  value={config.accentColor || '#e91e63'}
                  onChange={(e) => updateConfig('accentColor', e.target.value)}
                  className="w-6 h-6 bg-gray-800 border-gray-700"
                />
                <Input
                  type="text"
                  value={config.accentColor || '#e91e63'}
                  onChange={(e) => updateConfig('accentColor', e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                />
              </div>
            </div>

            <div className="pt-1 border-t border-gray-700">
              <p className="text-[9px] text-indigo-400 italic">
                💡 Skewed card design cu hover effects
              </p>
            </div>
          </div>
        )}

        {/* PEOPLE BLOCKS SETTINGS */}
        {(config.type === 'people-hiring' || config.type === 'people-creators' || 
          config.type === 'people-testimonials' || config.type === 'people-clients') && (
          <div className="space-y-0.5">
            <h4 className="text-[9px] font-bold text-white uppercase tracking-wider border-b border-gray-700 pb-1">
              {config.type === 'people-hiring' && 'People - Hiring Settings'}
              {config.type === 'people-creators' && 'People - Creators Settings'}
              {config.type === 'people-testimonials' && 'People - Testimonials Settings'}
              {config.type === 'people-clients' && 'People - Clients Settings'}
            </h4>
            
            {/* Title */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <div className="flex items-center justify-between">
                <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Title</Label>
                <Switch
                  checked={config.title?.show ?? true}
                  onCheckedChange={(checked) => updateConfig('title.show', checked)}
                />
              </div>
              {config.title?.show && (
                <>
                  <Input
                    type="text"
                    value={config.title?.text || ''}
                    onChange={(e) => updateConfig('title.text', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                    placeholder="Title"
                  />
                  <div className="flex gap-1.5">
                    <div className="flex-1 space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Size</Label>
                      <Input
                        type="range"
                        value={config.title?.size || 36}
                        onChange={(e) => updateConfig('title.size', parseInt(e.target.value))}
                        className="w-full bg-gray-800 border-gray-700"
                        min="20"
                        max="60"
                      />
                      <span className="text-[9px] text-gray-400">{config.title?.size || 36}px</span>
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Weight</Label>
                      <Select
                        value={String(config.title?.weight || 700)}
                        onValueChange={(value) => updateConfig('title.weight', parseInt(value))}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white text-[10px] h-7">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="400">Normal</SelectItem>
                          <SelectItem value="600">Semibold</SelectItem>
                          <SelectItem value="700">Bold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <Label className="text-[9px] text-gray-300">Color</Label>
                    <Input
                      type="color"
                      value={config.title?.color || '#1a1a1a'}
                      onChange={(e) => updateConfig('title.color', e.target.value)}
                      className="w-full h-6 bg-gray-800 border-gray-700"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Description - Only for people-hiring */}
            {config.type === 'people-hiring' && (
              <div className="space-y-0.5 border-t border-gray-800 pt-1">
                <div className="flex items-center justify-between">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Description</Label>
                  <Switch
                    checked={config.description?.show ?? true}
                    onCheckedChange={(checked) => updateConfig('description.show', checked)}
                  />
                </div>
                {config.description?.show && (
                  <>
                    <Textarea
                      value={config.description?.text || ''}
                      onChange={(e) => updateConfig('description.text', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] min-h-[60px]"
                      rows={3}
                      placeholder="Description"
                    />
                    <div className="flex gap-1.5">
                      <div className="flex-1 space-y-0.5">
                        <Label className="text-[9px] text-gray-300">Size</Label>
                        <Input
                          type="range"
                          value={config.description?.size || 16}
                          onChange={(e) => updateConfig('description.size', parseInt(e.target.value))}
                          className="w-full bg-gray-800 border-gray-700"
                          min="12"
                          max="24"
                        />
                        <span className="text-[9px] text-gray-400">{config.description?.size || 16}px</span>
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <Label className="text-[9px] text-gray-300">Color</Label>
                        <Input
                          type="color"
                          value={config.description?.color || '#666666'}
                          onChange={(e) => updateConfig('description.color', e.target.value)}
                          className="w-full h-6 bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Read More Button - Only for people-hiring */}
            {config.type === 'people-hiring' && config.readMoreButton && (
              <div className="space-y-0.5 border-t border-gray-800 pt-1">
                <div className="flex items-center justify-between">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Read More Button</Label>
                  <Switch
                    checked={config.readMoreButton?.show ?? false}
                    onCheckedChange={(checked) => updateConfig('readMoreButton.show', checked)}
                  />
                </div>
                {config.readMoreButton?.show && (
                  <>
                    <Input
                      type="text"
                      value={config.readMoreButton?.text || 'Read more'}
                      onChange={(e) => updateConfig('readMoreButton.text', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white text-[10px] h-7"
                      placeholder="Button text"
                    />
                    <div className="flex gap-1.5">
                      <div className="flex-1 space-y-0.5">
                        <Label className="text-[9px] text-gray-300">BG Color</Label>
                        <Input
                          type="color"
                          value={config.readMoreButton?.color || '#A8F5B8'}
                          onChange={(e) => updateConfig('readMoreButton.color', e.target.value)}
                          className="w-full h-6 bg-gray-800 border-gray-700"
                        />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <Label className="text-[9px] text-gray-300">Text Color</Label>
                        <Input
                          type="color"
                          value={config.readMoreButton?.textColor || '#2B2B2B'}
                          onChange={(e) => updateConfig('readMoreButton.textColor', e.target.value)}
                          className="w-full h-6 bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Columns - Only for people-testimonials */}
            {config.type === 'people-testimonials' && (
              <div className="space-y-0.5 border-t border-gray-800 pt-1">
                <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Columns</Label>
                <Input
                  type="range"
                  value={config.columns || 3}
                  onChange={(e) => updateConfig('columns', parseInt(e.target.value))}
                  className="w-full bg-gray-800 border-gray-700"
                  min="1"
                  max="4"
                />
                <span className="text-[9px] text-gray-400">{config.columns || 3} columns</span>
              </div>
            )}

            {/* Jobs List - Only for people-hiring */}
            {config.type === 'people-hiring' && config.jobs && (
              <div className="space-y-0.5 border-t border-gray-800 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Jobs</Label>
                  <Button
                    onClick={() => {
                      const newJob = {
                        id: `job-${Date.now()}`,
                        title: 'New Position',
                        description: 'Job description',
                        type: 'Full-time',
                        buttonText: 'Apply',
                        buttonColor: '#333333',
                        buttonTextColor: '#ffffff',
                        link: '#'
                      };
                      updateConfig('jobs', [...(config.jobs || []), newJob]);
                    }}
                    className="h-5 px-2 text-[9px] bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add Job
                  </Button>
                </div>
                <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                  {config.jobs.map((job, index) => (
                    <div key={job.id} className="bg-gray-800 p-1.5 rounded border border-gray-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-indigo-400">Job {index + 1}</span>
                        <Button
                          onClick={() => {
                            const updated = config.jobs.filter((_, i) => i !== index);
                            updateConfig('jobs', updated);
                          }}
                          className="h-4 w-4 p-0 bg-red-600 hover:bg-red-700"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <Input
                        type="text"
                        value={job.title}
                        onChange={(e) => {
                          const updated = [...config.jobs];
                          updated[index] = { ...updated[index], title: e.target.value };
                          updateConfig('jobs', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                        placeholder="Job title"
                      />
                      <Textarea
                        value={job.description}
                        onChange={(e) => {
                          const updated = [...config.jobs];
                          updated[index] = { ...updated[index], description: e.target.value };
                          updateConfig('jobs', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] mb-1"
                        rows={2}
                        placeholder="Description"
                      />
                      <Input
                        type="text"
                        value={job.type}
                        onChange={(e) => {
                          const updated = [...config.jobs];
                          updated[index] = { ...updated[index], type: e.target.value };
                          updateConfig('jobs', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                        placeholder="Full-time / Part-time"
                      />
                      <Input
                        type="text"
                        value={job.buttonText}
                        onChange={(e) => {
                          const updated = [...config.jobs];
                          updated[index] = { ...updated[index], buttonText: e.target.value };
                          updateConfig('jobs', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                        placeholder="Button text"
                      />
                      <div className="flex gap-1">
                        <Input
                          type="color"
                          value={job.buttonColor}
                          onChange={(e) => {
                            const updated = [...config.jobs];
                            updated[index] = { ...updated[index], buttonColor: e.target.value };
                            updateConfig('jobs', updated);
                          }}
                          className="w-full h-6 bg-gray-900 border-gray-600"
                        />
                        <Input
                          type="color"
                          value={job.buttonTextColor}
                          onChange={(e) => {
                            const updated = [...config.jobs];
                            updated[index] = { ...updated[index], buttonTextColor: e.target.value };
                            updateConfig('jobs', updated);
                          }}
                          className="w-full h-6 bg-gray-900 border-gray-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Creators List - Only for people-creators */}
            {config.type === 'people-creators' && config.creators && (
              <div className="space-y-0.5 border-t border-gray-800 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Creators</Label>
                  <Button
                    onClick={() => {
                      const newCreator = {
                        id: `creator-${Date.now()}`,
                        name: 'New Creator',
                        role: 'Role',
                        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
                        link: '#'
                      };
                      updateConfig('creators', [...(config.creators || []), newCreator]);
                    }}
                    className="h-5 px-2 text-[9px] bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add Creator
                  </Button>
                </div>
                <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                  {config.creators.map((creator, index) => (
                    <div key={creator.id} className="bg-gray-800 p-1.5 rounded border border-gray-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-indigo-400">Creator {index + 1}</span>
                        <Button
                          onClick={() => {
                            const updated = config.creators.filter((_, i) => i !== index);
                            updateConfig('creators', updated);
                          }}
                          className="h-4 w-4 p-0 bg-red-600 hover:bg-red-700"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <Input
                        type="text"
                        value={creator.name}
                        onChange={(e) => {
                          const updated = [...config.creators];
                          updated[index] = { ...updated[index], name: e.target.value };
                          updateConfig('creators', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                        placeholder="Name"
                      />
                      <Input
                        type="text"
                        value={creator.role}
                        onChange={(e) => {
                          const updated = [...config.creators];
                          updated[index] = { ...updated[index], role: e.target.value };
                          updateConfig('creators', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                        placeholder="Role"
                      />
                      <Input
                        type="text"
                        value={creator.image}
                        onChange={(e) => {
                          const updated = [...config.creators];
                          updated[index] = { ...updated[index], image: e.target.value };
                          updateConfig('creators', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                        placeholder="Image URL"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials List - Only for people-testimonials */}
            {config.type === 'people-testimonials' && config.testimonials && (
              <div className="space-y-0.5 border-t border-gray-800 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Testimonials</Label>
                  <Button
                    onClick={() => {
                      const newTestimonial = {
                        id: `test-${Date.now()}`,
                        quote: 'Great experience!',
                        name: 'Customer Name',
                        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
                        rating: 5
                      };
                      updateConfig('testimonials', [...(config.testimonials || []), newTestimonial]);
                    }}
                    className="h-5 px-2 text-[9px] bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add Testimonial
                  </Button>
                </div>
                <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                  {config.testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="bg-gray-800 p-1.5 rounded border border-gray-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-indigo-400">Testimonial {index + 1}</span>
                        <Button
                          onClick={() => {
                            const updated = config.testimonials.filter((_, i) => i !== index);
                            updateConfig('testimonials', updated);
                          }}
                          className="h-4 w-4 p-0 bg-red-600 hover:bg-red-700"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <Textarea
                        value={testimonial.quote}
                        onChange={(e) => {
                          const updated = [...config.testimonials];
                          updated[index] = { ...updated[index], quote: e.target.value };
                          updateConfig('testimonials', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] mb-1"
                        rows={3}
                        placeholder="Quote"
                      />
                      <Input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => {
                          const updated = [...config.testimonials];
                          updated[index] = { ...updated[index], name: e.target.value };
                          updateConfig('testimonials', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                        placeholder="Name"
                      />
                      <Input
                        type="text"
                        value={testimonial.image}
                        onChange={(e) => {
                          const updated = [...config.testimonials];
                          updated[index] = { ...updated[index], image: e.target.value };
                          updateConfig('testimonials', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                        placeholder="Image URL"
                      />
                      <div className="space-y-0.5">
                        <Label className="text-[9px] text-gray-300">Rating</Label>
                        <Input
                          type="range"
                          value={testimonial.rating || 5}
                          onChange={(e) => {
                            const updated = [...config.testimonials];
                            updated[index] = { ...updated[index], rating: parseInt(e.target.value) };
                            updateConfig('testimonials', updated);
                          }}
                          className="w-full bg-gray-900 border-gray-600"
                          min="1"
                          max="5"
                        />
                        <span className="text-[9px] text-gray-400">{testimonial.rating || 5} stars</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clients List - Only for people-clients */}
            {config.type === 'people-clients' && config.clients && (
              <div className="space-y-0.5 border-t border-gray-800 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Clients</Label>
                  <Button
                    onClick={() => {
                      const newClient = {
                        id: `client-${Date.now()}`,
                        name: 'Client Name',
                        logo: '🏢',
                        backgroundColor: '#E0F2FE',
                        textColor: '#0369A1',
                        link: '#'
                      };
                      updateConfig('clients', [...(config.clients || []), newClient]);
                    }}
                    className="h-5 px-2 text-[9px] bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add Client
                  </Button>
                </div>
                <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                  {config.clients.map((client, index) => (
                    <div key={client.id} className="bg-gray-800 p-1.5 rounded border border-gray-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-indigo-400">Client {index + 1}</span>
                        <Button
                          onClick={() => {
                            const updated = config.clients.filter((_, i) => i !== index);
                            updateConfig('clients', updated);
                          }}
                          className="h-4 w-4 p-0 bg-red-600 hover:bg-red-700"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <Input
                        type="text"
                        value={client.name}
                        onChange={(e) => {
                          const updated = [...config.clients];
                          updated[index] = { ...updated[index], name: e.target.value };
                          updateConfig('clients', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                        placeholder="Client name"
                      />
                      <Input
                        type="text"
                        value={client.logo}
                        onChange={(e) => {
                          const updated = [...config.clients];
                          updated[index] = { ...updated[index], logo: e.target.value };
                          updateConfig('clients', updated);
                        }}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                        placeholder="Logo emoji"
                      />
                      <div className="flex gap-1">
                        <div className="flex-1 space-y-0.5">
                          <Label className="text-[9px] text-gray-300">BG</Label>
                          <Input
                            type="color"
                            value={client.backgroundColor}
                            onChange={(e) => {
                              const updated = [...config.clients];
                              updated[index] = { ...updated[index], backgroundColor: e.target.value };
                              updateConfig('clients', updated);
                            }}
                            className="w-full h-6 bg-gray-900 border-gray-600"
                          />
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <Label className="text-[9px] text-gray-300">Text</Label>
                          <Input
                            type="color"
                            value={client.textColor}
                            onChange={(e) => {
                              const updated = [...config.clients];
                              updated[index] = { ...updated[index], textColor: e.target.value };
                              updateConfig('clients', updated);
                            }}
                            className="w-full h-6 bg-gray-900 border-gray-600"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Block Controls */}
            {console.log('🔍 Gallery Check - config.type:', config.type, 'config:', config)}
            {config.type === 'gallery' && (
              <>
                {/* Layout Selection */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Layout</Label>
                  <Select
                    value={config.layout || 'grid'}
                    onValueChange={(value) => updateConfig('layout', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white text-[9px] h-7">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="masonry">Masonry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Columns */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <Label className="text-[9px] text-gray-300">Columns</Label>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="range"
                      value={config.columns || 3}
                      onChange={(e) => updateConfig('columns', parseInt(e.target.value))}
                      className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                      min="1"
                      max="6"
                    />
                    <span className="text-[9px] text-gray-400 w-10 text-right">{config.columns || 3}</span>
                  </div>
                </div>

                {/* Gap */}
                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Gap (px)</Label>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="range"
                      value={config.gap || 20}
                      onChange={(e) => updateConfig('gap', parseInt(e.target.value))}
                      className="flex-1 bg-gray-800 border-gray-700 h-7 text-white"
                      min="0"
                      max="60"
                      step="4"
                    />
                    <span className="text-[9px] text-gray-400 w-10 text-right">{config.gap || 20}px</span>
                  </div>
                </div>

                {/* Lightbox Toggle */}
                <div className="flex items-center justify-between py-0.5">
                  <Label className="text-[9px] text-gray-300">Lightbox</Label>
                  <Switch
                    checked={config.lightbox ?? true}
                    onCheckedChange={(checked) => updateConfig('lightbox', checked)}
                  />
                </div>

                {/* Animation Selection */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Animation</Label>
                  <Select
                    value={config.animation || 'hover-zoom'}
                    onValueChange={(value) => updateConfig('animation', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white text-[9px] h-7">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="hover-zoom">Hover Zoom</SelectItem>
                      <SelectItem value="fade-scroll">Fade on Scroll</SelectItem>
                      <SelectItem value="slide">Slide Up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Images Management */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Images</Label>
                    <Button
                      onClick={() => {
                        const newImage = {
                          id: `gallery-img-${Date.now()}`,
                          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600',
                          alt: 'New Image',
                          title: 'Image Title',
                          price: '$199'
                        };
                        updateConfig('images', [...(config.images || []), newImage]);
                      }}
                      className="h-5 px-2 text-[9px] bg-indigo-600 hover:bg-indigo-700"
                    >
                      Add Image
                    </Button>
                  </div>
                  <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                    {(config.images || []).map((image, index) => (
                      <div key={image.id || index} className="bg-gray-800 p-1.5 rounded border border-gray-700">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] text-indigo-400">Image {index + 1}</span>
                          <Button
                            onClick={() => {
                              const updated = config.images.filter((_, i) => i !== index);
                              updateConfig('images', updated);
                            }}
                            className="h-4 w-4 p-0 bg-red-600 hover:bg-red-700"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <Input
                          type="text"
                          value={image.src}
                          onChange={(e) => {
                            const updated = [...config.images];
                            updated[index] = { ...updated[index], src: e.target.value };
                            updateConfig('images', updated);
                          }}
                          className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                          placeholder="Image URL"
                        />
                        <Button
                          onClick={async () => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/jpeg,image/jpg,image/png,image/gif,image/webp';
                            input.onchange = async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              
                              const formData = new FormData();
                              formData.append('file', file);
                              
                              try {
                                const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
                                const response = await fetch(`${backendUrl}/api/upload/image`, {
                                  method: 'POST',
                                  body: formData
                                });
                                
                                if (response.ok) {
                                  const data = await response.json();
                                  const updated = [...config.images];
                                  updated[index] = { ...updated[index], src: data.url };
                                  updateConfig('images', updated);
                                } else {
                                  console.error('Upload failed');
                                }
                              } catch (error) {
                                console.error('Upload error:', error);
                              }
                            };
                            input.click();
                          }}
                          className="h-5 px-2 text-[9px] bg-indigo-600 hover:bg-indigo-700 mb-1 w-full"
                        >
                          <Upload className="w-3 h-3 mr-1" />
                          Încarcă Imagine
                        </Button>
                        <Input
                          type="text"
                          value={image.alt || ''}
                          onChange={(e) => {
                            const updated = [...config.images];
                            updated[index] = { ...updated[index], alt: e.target.value };
                            updateConfig('images', updated);
                          }}
                          className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                          placeholder="Alt text"
                        />
                        <Input
                          type="text"
                          value={image.title || ''}
                          onChange={(e) => {
                            const updated = [...config.images];
                            updated[index] = { ...updated[index], title: e.target.value };
                            updateConfig('images', updated);
                          }}
                          className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                          placeholder="Title"
                        />
                        <Input
                          type="text"
                          value={image.price || ''}
                          onChange={(e) => {
                            const updated = [...config.images];
                            updated[index] = { ...updated[index], price: e.target.value };
                            updateConfig('images', updated);
                          }}
                          className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                          placeholder="Price (optional)"
                        />
                        <Input
                          type="text"
                          value={image.link || ''}
                          onChange={(e) => {
                            const updated = [...config.images];
                            updated[index] = { ...updated[index], link: e.target.value };
                            updateConfig('images', updated);
                          }}
                          className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                          placeholder="Link URL (optional)"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Contact Block Controls */}
            {config.type === 'contact' && (
              <>
                {/* Layout Selection */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Layout</Label>
                  <Select
                    value={config.layout || 'side-by-side'}
                    onValueChange={(value) => updateConfig('layout', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white text-[9px] h-7">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="side-by-side">Side by Side</SelectItem>
                      <SelectItem value="stacked">Stacked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Contact Info Toggle */}
                <div className="flex items-center justify-between py-0.5 border-t border-gray-800 pt-1">
                  <Label className="text-[9px] text-gray-300">Show Contact Info</Label>
                  <Switch
                    checked={config.contactInfo?.show ?? true}
                    onCheckedChange={(checked) => updateConfig('contactInfo.show', checked)}
                  />
                </div>

                {/* Contact Info Details */}
                {config.contactInfo?.show && (
                  <div className="space-y-1 pl-1.5">
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Email</Label>
                      <Input
                        type="email"
                        value={config.contactInfo?.email || ''}
                        onChange={(e) => updateConfig('contactInfo.email', e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                        placeholder="contact@example.com"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Phone</Label>
                      <Input
                        type="tel"
                        value={config.contactInfo?.phone || ''}
                        onChange={(e) => updateConfig('contactInfo.phone', e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Address</Label>
                      <Input
                        type="text"
                        value={config.contactInfo?.address || ''}
                        onChange={(e) => updateConfig('contactInfo.address', e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                        placeholder="City, State, Zip"
                      />
                    </div>
                  </div>
                )}

                {/* Form Fields Configuration */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Form Fields</Label>
                  </div>
                  <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                    {(config.form?.fields || []).map((field, index) => (
                      <div key={field.id || index} className="bg-gray-800 p-1.5 rounded border border-gray-700">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] text-indigo-400">{field.label || `Field ${index + 1}`}</span>
                          <div className="flex items-center gap-1">
                            <Label className="text-[8px] text-gray-400">Required</Label>
                            <Switch
                              checked={field.required ?? false}
                              onCheckedChange={(checked) => {
                                const updated = [...(config.form?.fields || [])];
                                updated[index] = { ...updated[index], required: checked };
                                updateConfig('form.fields', updated);
                              }}
                              className="scale-75"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Input
                            type="text"
                            value={field.label}
                            onChange={(e) => {
                              const updated = [...(config.form?.fields || [])];
                              updated[index] = { ...updated[index], label: e.target.value };
                              updateConfig('form.fields', updated);
                            }}
                            className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                            placeholder="Field Label"
                          />
                          <Input
                            type="text"
                            value={field.placeholder || ''}
                            onChange={(e) => {
                              const updated = [...(config.form?.fields || [])];
                              updated[index] = { ...updated[index], placeholder: e.target.value };
                              updateConfig('form.fields', updated);
                            }}
                            className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                            placeholder="Placeholder"
                          />
                          <Select
                            value={field.type}
                            onValueChange={(value) => {
                              const updated = [...(config.form?.fields || [])];
                              updated[index] = { ...updated[index], type: value };
                              updateConfig('form.fields', updated);
                            }}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white text-[9px] h-6">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="tel">Phone</SelectItem>
                              <SelectItem value="textarea">Textarea</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email Notification Configuration */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Notification Email</Label>
                  <Input
                    type="email"
                    value={config.form?.notificationEmail || ''}
                    onChange={(e) => updateConfig('form.notificationEmail', e.target.value)}
                    className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                    placeholder="exemplu@example.com"
                  />
                  <p className="text-[8px] text-gray-400">Mesajele se vor trimite la acest email</p>
                </div>

                {/* Success Message Configuration */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Success Message</Label>
                  <Textarea
                    value={config.form?.successMessage || 'Thanks for filling out the form!'}
                    onChange={(e) => updateConfig('form.successMessage', e.target.value)}
                    className="bg-gray-900 border-gray-600 text-white text-[10px] min-h-[60px]"
                    placeholder="Message after form submission"
                  />
                </div>

                {/* Form Button Customization */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Form Button</Label>
                  <Input
                    type="text"
                    value={config.form?.button?.text || 'Send Message'}
                    onChange={(e) => updateConfig('form.button.text', e.target.value)}
                    className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                    placeholder="Button text"
                  />
                  <div className="flex gap-1.5">
                    <div className="flex-1 space-y-0.5">
                      <Label className="text-[9px] text-gray-300">BG Color</Label>
                      <Input
                        type="color"
                        value={config.form?.button?.color || '#A8F5B8'}
                        onChange={(e) => updateConfig('form.button.color', e.target.value)}
                        className="w-full h-6 bg-gray-900 border-gray-600"
                      />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <Label className="text-[9px] text-gray-300">Text Color</Label>
                      <Input
                        type="color"
                        value={config.form?.button?.textColor || '#1a1a1a'}
                        onChange={(e) => updateConfig('form.button.textColor', e.target.value)}
                        className="w-full h-6 bg-gray-900 border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Footer Block Controls */}
            {config.type === 'footer' && (
              <>
                {/* Layout Selection */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Layout</Label>
                  <Select
                    value={config.layout || 'simple'}
                    onValueChange={(value) => updateConfig('layout', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white text-[9px] h-7">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="3-columns">3 Columns</SelectItem>
                      <SelectItem value="4-columns">4 Columns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Text Color */}
                <div className="space-y-0.5">
                  <Label className="text-[9px] text-gray-300">Text Color</Label>
                  <Input
                    type="color"
                    value={config.textColor || '#ffffff'}
                    onChange={(e) => updateConfig('textColor', e.target.value)}
                    className="w-6 h-6 bg-gray-800 border-gray-700"
                  />
                </div>

                {/* Logo Section */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Logo</Label>
                    <Switch
                      checked={config.logo?.show ?? true}
                      onCheckedChange={(checked) => updateConfig('logo.show', checked)}
                    />
                  </div>
                  {config.logo?.show && (
                    <>
                      <Input
                        type="text"
                        value={config.logo?.text || ''}
                        onChange={(e) => updateConfig('logo.text', e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                        placeholder="Logo text"
                      />
                      <div className="flex gap-1.5">
                        <div className="flex-1 space-y-0.5">
                          <Label className="text-[9px] text-gray-300">Color</Label>
                          <Input
                            type="color"
                            value={config.logo?.color || '#ffffff'}
                            onChange={(e) => updateConfig('logo.color', e.target.value)}
                            className="w-full h-6 bg-gray-900 border-gray-600"
                          />
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <Label className="text-[9px] text-gray-300">Size</Label>
                          <Input
                            type="number"
                            value={config.logo?.size || 24}
                            onChange={(e) => updateConfig('logo.size', parseInt(e.target.value))}
                            className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                            min="12"
                            max="48"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Description Section */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Description</Label>
                    <Switch
                      checked={config.description?.show ?? true}
                      onCheckedChange={(checked) => updateConfig('description.show', checked)}
                    />
                  </div>
                  {config.description?.show && (
                    <>
                      <Textarea
                        value={config.description?.text || ''}
                        onChange={(e) => updateConfig('description.text', e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] min-h-[60px]"
                        placeholder="Footer description"
                      />
                      <div className="space-y-0.5">
                        <Label className="text-[9px] text-gray-300">Color</Label>
                        <Input
                          type="color"
                          value={config.description?.color || '#cccccc'}
                          onChange={(e) => updateConfig('description.color', e.target.value)}
                          className="w-6 h-6 bg-gray-900 border-gray-600"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Links Management */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Menu Links</Label>
                    <Switch
                      checked={config.showLinks ?? true}
                      onCheckedChange={(checked) => updateConfig('showLinks', checked)}
                    />
                  </div>
                  {config.showLinks !== false && (
                    <>
                      <Button
                        onClick={() => {
                          const newLink = {
                            id: `footer-link-${Date.now()}`,
                            text: 'New Link',
                            link: '#',
                            color: '#cccccc'
                          };
                          updateConfig('links', [...(config.links || []), newLink]);
                        }}
                        className="h-5 px-2 text-[9px] bg-indigo-600 hover:bg-indigo-700 w-full mb-1"
                      >
                        Add Link
                      </Button>
                      <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                        {(config.links || []).map((link, index) => (
                          <div key={link.id || index} className="bg-gray-800 p-1.5 rounded border border-gray-700">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[9px] text-indigo-400">Link {index + 1}</span>
                              <Button
                                onClick={() => {
                                  const updated = config.links.filter((_, i) => i !== index);
                                  updateConfig('links', updated);
                                }}
                                className="h-4 w-4 p-0 bg-red-600 hover:bg-red-700"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                        <Input
                          type="text"
                          value={link.text}
                          onChange={(e) => {
                            const updated = [...config.links];
                            updated[index] = { ...updated[index], text: e.target.value };
                            updateConfig('links', updated);
                          }}
                          className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                          placeholder="Link text"
                        />
                        <Input
                          type="text"
                          value={link.link}
                          onChange={(e) => {
                            const updated = [...config.links];
                            updated[index] = { ...updated[index], link: e.target.value };
                            updateConfig('links', updated);
                          }}
                          className="bg-gray-900 border-gray-600 text-white text-[10px] h-6"
                          placeholder="URL"
                        />
                      </div>
                    ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Social Links */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Social Media</Label>
                    <Switch
                      checked={config.social?.show ?? true}
                      onCheckedChange={(checked) => updateConfig('social.show', checked)}
                    />
                  </div>
                  {config.social?.show && (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] text-gray-400">Platforms</span>
                        <Button
                          onClick={() => {
                            const newSocial = {
                              platform: 'instagram',
                              url: 'https://instagram.com',
                              color: '#A8F5B8'
                            };
                            const currentLinks = config.social?.links || [];
                            updateConfig('social.links', [...currentLinks, newSocial]);
                          }}
                          className="h-5 px-2 text-[9px] bg-indigo-600 hover:bg-indigo-700"
                        >
                          Add Platform
                        </Button>
                      </div>
                      <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                        {(config.social?.links || []).map((social, index) => (
                          <div key={index} className="bg-gray-800 p-1.5 rounded border border-gray-700">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[9px] text-indigo-400 capitalize">{social.platform}</span>
                              <Button
                                onClick={() => {
                                  const updated = config.social.links.filter((_, i) => i !== index);
                                  updateConfig('social.links', updated);
                                }}
                                className="h-4 w-4 p-0 bg-red-600 hover:bg-red-700"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                            <Select
                              value={social.platform}
                              onValueChange={(value) => {
                                const updated = [...config.social.links];
                                updated[index] = { ...updated[index], platform: value };
                                updateConfig('social.links', updated);
                              }}
                            >
                              <SelectTrigger className="bg-gray-900 border-gray-600 text-white text-[9px] h-6 mb-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900 border-gray-600">
                                <SelectItem value="instagram">Instagram</SelectItem>
                                <SelectItem value="facebook">Facebook</SelectItem>
                                <SelectItem value="twitter">Twitter</SelectItem>
                                <SelectItem value="linkedin">LinkedIn</SelectItem>
                                <SelectItem value="youtube">YouTube</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              type="text"
                              value={social.url}
                              onChange={(e) => {
                                const updated = [...config.social.links];
                                updated[index] = { ...updated[index], url: e.target.value };
                                updateConfig('social.links', updated);
                              }}
                              className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                              placeholder="Profile URL"
                            />
                            <div className="space-y-0.5">
                              <Label className="text-[9px] text-gray-300">Icon Color</Label>
                              <Input
                                type="color"
                                value={social.color || '#A8F5B8'}
                                onChange={(e) => {
                                  const updated = [...config.social.links];
                                  updated[index] = { ...updated[index], color: e.target.value };
                                  updateConfig('social.links', updated);
                                }}
                                className="w-full h-6 bg-gray-900 border-gray-600"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Copyright */}
                <div className="space-y-0.5 border-t border-gray-800 pt-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Copyright</Label>
                    <Switch
                      checked={config.copyright?.show ?? true}
                      onCheckedChange={(checked) => updateConfig('copyright.show', checked)}
                    />
                  </div>
                  {config.copyright?.show && (
                    <>
                      <Input
                        type="text"
                        value={config.copyright?.text || ''}
                        onChange={(e) => updateConfig('copyright.text', e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white text-[10px] h-6 mb-1"
                        placeholder="© 2025 Your Company. All rights reserved."
                      />
                      <div className="space-y-0.5">
                        <Label className="text-[9px] text-gray-300">Color</Label>
                        <Input
                          type="color"
                          value={config.copyright?.color || '#888888'}
                          onChange={(e) => updateConfig('copyright.color', e.target.value)}
                          className="w-6 h-6 bg-gray-900 border-gray-600"
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {/* Padding */}
            <div className="space-y-0.5 border-t border-gray-800 pt-1">
              <Label className="text-[9px] font-bold text-white uppercase tracking-wider">Padding</Label>
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Top</Label>
                <Input
                  type="range"
                  value={config.padding?.top || 60}
                  onChange={(e) => updateConfig('padding.top', parseInt(e.target.value))}
                  className="w-full bg-gray-800 border-gray-700"
                  min="0"
                  max="200"
                />
                <span className="text-[9px] text-gray-400">{config.padding?.top || 60}px</span>
              </div>
              <div className="space-y-0.5">
                <Label className="text-[9px] text-gray-300">Bottom</Label>
                <Input
                  type="range"
                  value={config.padding?.bottom || 60}
                  onChange={(e) => updateConfig('padding.bottom', parseInt(e.target.value))}
                  className="w-full bg-gray-800 border-gray-700"
                  min="0"
                  max="200"
                />
                <span className="text-[9px] text-gray-400">{config.padding?.bottom || 60}px</span>
              </div>
            </div>
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
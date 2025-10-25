import React from 'react';
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
    const newConfig = { ...config };
    const keys = path.split('.');
    let current = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    onUpdate(newConfig);
  };

  const updateMenuItem = (index, field, value) => {
    const newMenuItems = [...config.menuItems];
    newMenuItems[index] = { ...newMenuItems[index], [field]: value };
    updateConfig('menuItems', newMenuItems);
  };

  const addMenuItem = () => {
    const newMenuItems = [...(config.menuItems || []), { text: 'New Link', link: '#', color: '#1a1a2e', show: true }];
    updateConfig('menuItems', newMenuItems);
  };

  const removeMenuItem = (index) => {
    const newMenuItems = config.menuItems.filter((_, i) => i !== index);
    updateConfig('menuItems', newMenuItems);
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
                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">Brand Name</Label>
                  <Switch
                    checked={config.logo.text !== '' && config.logo.text !== undefined}
                    onCheckedChange={(checked) => updateConfig('logo.text', checked ? 'Brand' : '')}
                  />
                  {config.logo.text && (
                    <Input
                      value={config.logo.text || ''}
                      onChange={(e) => updateConfig('logo.text', e.target.value)}
                      placeholder="Brand name"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">Logo Size</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="range"
                      value={config.logo.size || 24}
                      onChange={(e) => updateConfig('logo.size', parseInt(e.target.value))}
                      className="flex-1 bg-gray-800 border-gray-700"
                      min="12"
                      max="72"
                    />
                    <span className="text-sm text-gray-400 w-12">{config.logo.size || 24}px</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-300">Color</Label>
                  <div className="flex gap-3 items-center">
                    <Input
                      type="color"
                      value={config.logo.color || '#000000'}
                      onChange={(e) => updateConfig('logo.color', e.target.value)}
                      className="w-16 h-16 p-1 cursor-pointer rounded-full bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Menu Items */}
        {config.menuItems && (
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-white uppercase tracking-wider">Menu Items</Label>
              <Button
                onClick={addMenuItem}
                size="sm"
                className="h-8 px-3 bg-indigo-600 hover:bg-indigo-700"
              >
                + Add
              </Button>
            </div>
            {config.menuItems.map((item, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg space-y-3 border border-gray-700">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-white">Item {index + 1}</Label>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={item.show ?? true}
                      onCheckedChange={(checked) => updateMenuItem(index, 'show', checked)}
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {item.show && (
                  <>
                    <Input
                      value={item.text}
                      onChange={(e) => updateMenuItem(index, 'text', e.target.value)}
                      placeholder="Link text"
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                    <Input
                      value={item.link}
                      onChange={(e) => updateMenuItem(index, 'link', e.target.value)}
                      placeholder="Link URL"
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-300">Color</Label>
                      <Input
                        type="color"
                        value={item.color}
                        onChange={(e) => updateMenuItem(index, 'color', e.target.value)}
                        className="w-full h-10 p-1 cursor-pointer bg-gray-900 border-gray-700"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
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
        {config.type === 'menu' && (
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Icons</Label>
              <Switch
                checked={config.showIcons ?? false}
                onCheckedChange={(checked) => updateConfig('showIcons', checked)}
              />
            </div>
          </div>
        )}

        {/* Styles Section - Only for Menu type */}
        {config.type === 'menu' && (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <Label className="text-sm font-semibold">Styles</Label>
            
            {/* Transparent */}
            <div className="flex items-center justify-between">
              <Label className="text-xs text-gray-600">Transparent</Label>
              <Switch
                checked={config.transparent ?? false}
                onCheckedChange={(checked) => updateConfig('transparent', checked)}
              />
            </div>

            {/* Sticky */}
            <div className="flex items-center justify-between">
              <Label className="text-xs text-gray-600">Sticky</Label>
              <Switch
                checked={config.sticky ?? false}
                onCheckedChange={(checked) => updateConfig('sticky', checked)}
              />
            </div>
          </div>
        )}

        {/* Opacity - Only for Menu type */}
        {config.type === 'menu' && (
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <Label className="text-sm font-semibold">Opacity</Label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                value={(config.opacity ?? 100)}
                onChange={(e) => updateConfig('opacity', parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs text-gray-600 w-12">{config.opacity ?? 100}%</span>
            </div>
          </div>
        )}

        {/* Hamburger - Only for Menu type */}
        {config.type === 'menu' && (
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Hamburger</Label>
              <Switch
                checked={config.hamburger ?? false}
                onCheckedChange={(checked) => updateConfig('hamburger', checked)}
              />
            </div>
          </div>
        )}

        {/* Title */}
        {config.title && (
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Title</Label>
              <Switch
                checked={config.title.show ?? true}
                onCheckedChange={(checked) => updateConfig('title.show', checked)}
              />
            </div>
            {config.title.show && (
              <>
                <Textarea
                  value={config.title.text || ''}
                  onChange={(e) => updateConfig('title.text', e.target.value)}
                  className="text-sm"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={config.title.color || '#000000'}
                    onChange={(e) => updateConfig('title.color', e.target.value)}
                    className="w-14 h-10 p-1 cursor-pointer"
                  />
                  <Select
                    value={config.title.align || 'center'}
                    onValueChange={(value) => updateConfig('title.align', value)}
                  >
                    <SelectTrigger className="flex-1 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        )}

        {/* Description */}
        {config.description && (
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Description</Label>
              <Switch
                checked={config.description.show ?? true}
                onCheckedChange={(checked) => updateConfig('description.show', checked)}
              />
            </div>
            {config.description.show && (
              <>
                <Textarea
                  value={config.description.text || ''}
                  onChange={(e) => updateConfig('description.text', e.target.value)}
                  className="text-sm"
                  rows={3}
                />
                <Input
                  type="color"
                  value={config.description.color || '#000000'}
                  onChange={(e) => updateConfig('description.color', e.target.value)}
                  className="w-14 h-10 p-1 cursor-pointer"
                />
              </>
            )}
          </div>
        )}

        {/* Button */}
        {config.button && (
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Button</Label>
              <Switch
                checked={config.button.show ?? true}
                onCheckedChange={(checked) => updateConfig('button.show', checked)}
              />
            </div>
            {config.button.show && (
              <>
                <Input
                  value={config.button.text || ''}
                  onChange={(e) => updateConfig('button.text', e.target.value)}
                  placeholder="Button text"
                  className="text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-gray-600">BG Color</Label>
                    <Input
                      type="color"
                      value={config.button.color || '#5B4FC9'}
                      onChange={(e) => updateConfig('button.color', e.target.value)}
                      className="w-full h-10 p-1 cursor-pointer"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Text Color</Label>
                    <Input
                      type="color"
                      value={config.button.textColor || '#ffffff'}
                      onChange={(e) => updateConfig('button.textColor', e.target.value)}
                      className="w-full h-10 p-1 cursor-pointer"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
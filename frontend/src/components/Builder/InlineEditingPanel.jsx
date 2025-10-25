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
      className="absolute bg-white rounded-lg shadow-2xl border-2 border-indigo-500 z-50 max-h-[500px] overflow-y-auto"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: '420px'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
        <div>
          <h3 className="font-bold text-gray-900">Edit Block</h3>
          <p className="text-xs text-gray-500 capitalize">{config.type} Settings</p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Show/Hide Toggle */}
        {config.type && (
          <div className="space-y-2 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Show/Hide</Label>
              <Switch
                checked={config.visible ?? true}
                onCheckedChange={(checked) => updateConfig('visible', checked)}
              />
            </div>
          </div>
        )}

        {/* Size Controls for Hero */}
        {config.type === 'hero' && (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <Label className="text-sm font-semibold">Size</Label>
            
            {/* Full Screen */}
            <div className="flex items-center justify-between">
              <Label className="text-xs text-gray-600">Full Screen</Label>
              <Switch
                checked={config.fullScreen ?? true}
                onCheckedChange={(checked) => updateConfig('fullScreen', checked)}
              />
            </div>

            {/* Full Width */}
            <div className="flex items-center justify-between">
              <Label className="text-xs text-gray-600">Full Width</Label>
              <Switch
                checked={config.fullWidth ?? false}
                onCheckedChange={(checked) => updateConfig('fullWidth', checked)}
              />
            </div>

            {/* Content Width */}
            <div>
              <Label className="text-xs text-gray-600">Content Width</Label>
              <Input
                type="number"
                value={config.contentWidth || 800}
                onChange={(e) => updateConfig('contentWidth', parseInt(e.target.value))}
                className="text-sm"
                min="400"
                max="1600"
                step="50"
              />
            </div>
          </div>
        )}

        {/* Background Color */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Background</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={config.background?.value || '#ffffff'}
              onChange={(e) => updateConfig('background.value', e.target.value)}
              className="w-14 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={config.background?.value || '#ffffff'}
              onChange={(e) => updateConfig('background.value', e.target.value)}
              className="flex-1 text-sm"
            />
          </div>
        </div>

        {/* Logo */}
        {config.logo && (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Logo</Label>
              <Switch
                checked={config.logo.show ?? true}
                onCheckedChange={(checked) => updateConfig('logo.show', checked)}
              />
            </div>
            {config.logo.show && (
              <>
                <div>
                  <Label className="text-xs text-gray-600">Brand Name</Label>
                  <Input
                    value={config.logo.text || ''}
                    onChange={(e) => updateConfig('logo.text', e.target.value)}
                    placeholder="Brand name"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Logo Size</Label>
                  <Input
                    type="number"
                    value={config.logo.size || 24}
                    onChange={(e) => updateConfig('logo.size', parseInt(e.target.value))}
                    className="text-sm"
                    min="12"
                    max="72"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Color</Label>
                  <Input
                    type="color"
                    value={config.logo.color || '#000000'}
                    onChange={(e) => updateConfig('logo.color', e.target.value)}
                    className="w-full h-10 p-1 cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Menu Items */}
        {config.menuItems && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Menu Items</Label>
              <Button
                onClick={addMenuItem}
                size="sm"
                className="text-xs h-7 px-3"
              >
                + Add
              </Button>
            </div>
            {config.menuItems.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold">Item {index + 1}</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.show ?? true}
                      onCheckedChange={(checked) => updateMenuItem(index, 'show', checked)}
                    />
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="text-red-500 hover:text-red-700 text-xs"
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
                      className="text-sm"
                    />
                    <Input
                      value={item.link}
                      onChange={(e) => updateMenuItem(index, 'link', e.target.value)}
                      placeholder="Link URL"
                      className="text-sm"
                    />
                    <div>
                      <Label className="text-xs text-gray-600">Color</Label>
                      <Input
                        type="color"
                        value={item.color}
                        onChange={(e) => updateMenuItem(index, 'color', e.target.value)}
                        className="w-full h-8 p-1 cursor-pointer"
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
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <Label className="text-sm font-semibold">Menu Items Align</Label>
            <Select
              value={config.align || 'space-between'}
              onValueChange={(value) => updateConfig('align', value)}
            >
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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
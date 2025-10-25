import React, { useState } from 'react';
import { X, Download, Code, Settings, Trash2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const ModernEditingPanel = ({ block, onUpdate, onClose, onDelete }) => {
  const { config } = block;
  const [activeTab, setActiveTab] = useState('settings');

  const handleChange = (path, value) => {
    const newConfig = { ...config };
    const keys = path.split('.');
    let current = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    onUpdate(newConfig);
  };

  const renderMenuSettings = () => (
    <div className="space-y-6">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Show/Hide</div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Logo</Label>
          <Switch
            checked={config.logo?.show !== false}
            onCheckedChange={(checked) => handleChange('logo.show', checked)}
          />
        </div>

        {config.logo?.show && (
          <div className="pl-4 space-y-3">
            <div>
              <Label className="text-sm text-gray-200 mb-2 block">Logo Size</Label>
              <Slider
                value={[config.logo?.size || 24]}
                onValueChange={([value]) => handleChange('logo.size', value)}
                min={16}
                max={48}
                step={2}
                className="w-full"
              />
              <div className="text-xs text-gray-400 mt-1">{config.logo?.size || 24}px</div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Brand Name</Label>
          <Switch
            checked={config.logo?.show !== false}
            onCheckedChange={(checked) => handleChange('logo.show', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Menu Items</Label>
          <Switch
            checked={config.menuItems && config.menuItems.length > 0}
            onCheckedChange={(checked) => {
              if (!checked) handleChange('menuItems', []);
            }}
          />
        </div>

        {config.menuItems && config.menuItems.length > 0 && (
          <div className="pl-4">
            <Label className="text-sm text-gray-200 mb-2 block">Menu Items Align</Label>
            <Select
              value={config.align || 'left'}
              onValueChange={(value) => handleChange('align', value)}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="space-between">Space Between</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Icons</Label>
          <Switch
            checked={config.icons?.show !== false}
            onCheckedChange={(checked) => handleChange('icons.show', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Button</Label>
          <Switch
            checked={config.button?.show !== false}
            onCheckedChange={(checked) => handleChange('button.show', checked)}
          />
        </div>
      </div>

      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8">Styles</div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Transparent</Label>
          <Switch
            checked={config.transparent === true}
            onCheckedChange={(checked) => handleChange('transparent', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Sticky</Label>
          <Switch
            checked={config.sticky === true}
            onCheckedChange={(checked) => handleChange('sticky', checked)}
          />
        </div>

        <div>
          <Label className="text-sm text-gray-200 mb-2 block">Opacity</Label>
          <Slider
            value={[config.opacity || 1.0]}
            onValueChange={([value]) => handleChange('opacity', value)}
            min={0}
            max={1}
            step={0.1}
            className="w-full"
          />
          <div className="text-xs text-gray-400 mt-1">{((config.opacity || 1.0) * 100).toFixed(0)}%</div>
        </div>

        <div>
          <Label className="text-sm text-gray-200 mb-2 block">Color</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={config.background?.value || '#ffffff'}
              onChange={(e) => handleChange('background.value', e.target.value)}
              className="h-10 w-20 cursor-pointer"
            />
            <Input
              type="text"
              value={config.background?.value || '#ffffff'}
              onChange={(e) => handleChange('background.value', e.target.value)}
              className="flex-1 bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm text-gray-200 mb-2 block">Hamburger</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={config.hamburgerColor || '#000000'}
              onChange={(e) => handleChange('hamburgerColor', e.target.value)}
              className="h-10 w-20 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderHeroSettings = () => (
    <div className="space-y-6">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Size</div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Full Screen</Label>
          <Switch
            checked={config.fullScreen === true}
            onCheckedChange={(checked) => handleChange('fullScreen', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Full Width</Label>
          <Switch
            checked={config.fullWidth === true}
            onCheckedChange={(checked) => handleChange('fullWidth', checked)}
          />
        </div>

        <div>
          <Label className="text-sm text-gray-200 mb-2 block">Content Width</Label>
          <Slider
            value={[config.contentWidth || 800]}
            onValueChange={([value]) => handleChange('contentWidth', value)}
            min={600}
            max={1400}
            step={50}
            className="w-full"
          />
          <div className="text-xs text-gray-400 mt-1">{config.contentWidth || 800}px</div>
        </div>
      </div>

      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8">Show / Hide</div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Title</Label>
          <Switch
            checked={config.title?.show !== false}
            onCheckedChange={(checked) => handleChange('title.show', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Subtitle</Label>
          <Switch
            checked={config.subtitle?.show !== false}
            onCheckedChange={(checked) => handleChange('subtitle.show', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Text</Label>
          <Switch
            checked={config.description?.show !== false}
            onCheckedChange={(checked) => handleChange('description.show', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Buttons</Label>
          <Switch
            checked={config.button?.show !== false}
            onCheckedChange={(checked) => handleChange('button.show', checked)}
          />
        </div>
      </div>

      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8">Alignment</div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm text-gray-200 mb-2 block">Vertical Align</Label>
          <Select
            value={config.verticalAlign || 'center'}
            onValueChange={(value) => handleChange('verticalAlign', value)}
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm text-gray-200 mb-2 block">Horizontal Align</Label>
          <Select
            value={config.title?.align || 'center'}
            onValueChange={(value) => {
              handleChange('title.align', value);
              handleChange('description.align', value);
              handleChange('subtitle.align', value);
            }}
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8">Background</div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="bgType"
              value="image"
              checked={config.background?.type === 'image'}
              onChange={() => handleChange('background.type', 'image')}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-200">Image</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="bgType"
              value="color"
              checked={config.background?.type === 'color' || config.background?.type === 'gradient'}
              onChange={() => handleChange('background.type', 'color')}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-200">Color</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="bgType"
              value="video"
              checked={config.background?.type === 'video'}
              onChange={() => handleChange('background.type', 'video')}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-200">Video</span>
          </label>
        </div>

        {config.background?.type === 'image' && (
          <div className="mt-4">
            <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-700">
              <img
                src={config.background.value}
                alt="Background preview"
                className="w-full h-full object-cover"
              />
            </div>
            <Input
              type="text"
              value={config.background?.value || ''}
              onChange={(e) => handleChange('background.value', e.target.value)}
              placeholder="Image URL"
              className="mt-2 bg-gray-700 border-gray-600 text-white"
            />
          </div>
        )}

        {(config.background?.type === 'color' || config.background?.type === 'gradient') && (
          <div className="mt-4">
            <Input
              type="text"
              value={config.background?.value || '#ffffff'}
              onChange={(e) => handleChange('background.value', e.target.value)}
              placeholder="Color or gradient"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        )}
      </div>

      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-8">Effects</div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Parallax</Label>
          <Switch
            checked={config.background?.parallax === true}
            onCheckedChange={(checked) => handleChange('background.parallax', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-200">Overlay</Label>
          <Switch
            checked={config.background?.overlay === true}
            onCheckedChange={(checked) => handleChange('background.overlay', checked)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed right-0 top-16 bottom-0 w-80 bg-gray-800 shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-700 rounded-md transition-colors"
          >
            <Download className="w-4 h-4 text-gray-300" />
          </button>
          <button className="p-1.5 hover:bg-gray-700 rounded-md transition-colors">
            <Code className="w-4 h-4 text-gray-300" />
          </button>
          <button className="p-1.5 hover:bg-gray-700 rounded-md transition-colors">
            <Code className="w-4 h-4 text-gray-300" />
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`p-1.5 hover:bg-gray-700 rounded-md transition-colors ${
              activeTab === 'settings' ? 'bg-gray-700' : ''
            }`}
          >
            <Settings className="w-4 h-4 text-blue-400" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 hover:bg-red-600 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4 text-gray-300" />
          </button>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-700 rounded-md transition-colors"
        >
          <X className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {config.type === 'menu' ? renderMenuSettings() : renderHeroSettings()}
      </div>
    </div>
  );
};

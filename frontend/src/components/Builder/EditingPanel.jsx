import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const EditingPanel = ({ block, onUpdate, onClose }) => {
  if (!block) {
    return (
      <div className="w-80 bg-gray-900 text-white p-6 overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <p className="text-center">Select a block to edit its properties</p>
        </div>
      </div>
    );
  }

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

  const renderSizeControls = () => (
    <div className="space-y-4">
      <div className="pb-3 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Size</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-300">Full Screen</Label>
          <Switch
            checked={config.fullScreen || false}
            onCheckedChange={(checked) => updateConfig('fullScreen', checked)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-300">Full Width</Label>
          <Switch
            checked={config.fullWidth || false}
            onCheckedChange={(checked) => updateConfig('fullWidth', checked)}
          />
        </div>
      </div>

      {!config.fullWidth && (
        <div className="space-y-2">
          <Label className="text-sm text-gray-300">Content Width</Label>
          <Slider
            value={[config.contentWidth || 1200]}
            onValueChange={([value]) => updateConfig('contentWidth', value)}
            min={600}
            max={1400}
            step={50}
            className="mt-2"
          />
          <p className="text-xs text-gray-500">{config.contentWidth || 1200}px</p>
        </div>
      )}
    </div>
  );

  const renderTextControl = (label, path, isTextarea = false) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-gray-300">Show {label}</Label>
        <Switch
          checked={config[path.split('.')[0]]?.show ?? true}
          onCheckedChange={(checked) => updateConfig(`${path.split('.')[0]}.show`, checked)}
        />
      </div>
      {(config[path.split('.')[0]]?.show ?? true) && (
        <>
          <Label className="text-xs text-gray-400">{label}</Label>
          {isTextarea ? (
            <Textarea
              value={config[path.split('.')[0]]?.text || ''}
              onChange={(e) => updateConfig(`${path.split('.')[0]}.text`, e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              rows={3}
            />
          ) : (
            <Input
              value={config[path.split('.')[0]]?.text || ''}
              onChange={(e) => updateConfig(`${path.split('.')[0]}.text`, e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          )}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Text Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={config[path.split('.')[0]]?.color || '#ffffff'}
                onChange={(e) => updateConfig(`${path.split('.')[0]}.color`, e.target.value)}
                className="w-12 h-10 p-1 bg-gray-800 border-gray-700"
              />
              <Input
                type="text"
                value={config[path.split('.')[0]]?.color || '#ffffff'}
                onChange={(e) => updateConfig(`${path.split('.')[0]}.color`, e.target.value)}
                className="flex-1 bg-gray-800 border-gray-700 text-white text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Alignment</Label>
            <Select
              value={config[path.split('.')[0]]?.align || 'center'}
              onValueChange={(value) => updateConfig(`${path.split('.')[0]}.align`, value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
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
  );

  const renderButtonControl = () => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-gray-300">Show Button</Label>
        <Switch
          checked={config.button?.show ?? true}
          onCheckedChange={(checked) => updateConfig('button.show', checked)}
        />
      </div>
      {(config.button?.show ?? true) && (
        <>
          <Label className="text-xs text-gray-400">Button Text</Label>
          <Input
            value={config.button?.text || ''}
            onChange={(e) => updateConfig('button.text', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Button Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={config.button?.color || '#5B4FC9'}
                onChange={(e) => updateConfig('button.color', e.target.value)}
                className="w-12 h-10 p-1 bg-gray-800 border-gray-700"
              />
              <Input
                type="text"
                value={config.button?.color || '#5B4FC9'}
                onChange={(e) => updateConfig('button.color', e.target.value)}
                className="flex-1 bg-gray-800 border-gray-700 text-white text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Text Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={config.button?.textColor || '#ffffff'}
                onChange={(e) => updateConfig('button.textColor', e.target.value)}
                className="w-12 h-10 p-1 bg-gray-800 border-gray-700"
              />
              <Input
                type="text"
                value={config.button?.textColor || '#ffffff'}
                onChange={(e) => updateConfig('button.textColor', e.target.value)}
                className="flex-1 bg-gray-800 border-gray-700 text-white text-sm"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderBackgroundControl = () => (
    <div className="space-y-4">
      <div className="pb-3 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Background</h3>
      </div>
      
      <div className="space-y-2">
        <Label className="text-xs text-gray-400">Type</Label>
        <Select
          value={config.background?.type || 'color'}
          onValueChange={(value) => updateConfig('background.type', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="color">Solid Color</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="image">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {config.background?.type === 'color' && (
        <div className="space-y-2">
          <Label className="text-xs text-gray-400">Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={config.background?.value || '#ffffff'}
              onChange={(e) => updateConfig('background.value', e.target.value)}
              className="w-12 h-10 p-1 bg-gray-800 border-gray-700"
            />
            <Input
              type="text"
              value={config.background?.value || '#ffffff'}
              onChange={(e) => updateConfig('background.value', e.target.value)}
              className="flex-1 bg-gray-800 border-gray-700 text-white text-sm"
            />
          </div>
        </div>
      )}

      {config.background?.type === 'image' && (
        <div className="space-y-2">
          <Label className="text-xs text-gray-400">Image URL</Label>
          <Input
            value={config.background?.value || ''}
            onChange={(e) => updateConfig('background.value', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white text-sm"
            placeholder="https://..."
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-80 bg-gray-900 text-white overflow-y-auto border-l border-gray-800">
      <div className="p-6 space-y-6">
        <div className="pb-3 border-b border-gray-700">
          <h2 className="text-lg font-bold">Block Settings</h2>
          <p className="text-xs text-gray-400 mt-1 capitalize">{config.type} Block</p>
        </div>

        {renderSizeControls()}
        {renderBackgroundControl()}

        <div className="space-y-4">
          <div className="pb-3 border-b border-gray-700">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Content</h3>
          </div>
          
          {config.title && renderTextControl('Title', 'title')}
          {config.description && renderTextControl('Description', 'description', true)}
          {config.subtitle && renderTextControl('Subtitle', 'subtitle')}
          {config.button && renderButtonControl()}
        </div>
      </div>
    </div>
  );
};
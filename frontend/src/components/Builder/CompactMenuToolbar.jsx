import React, { useState } from 'react';
import { Link, Sun, Plus, List, ArrowLeft, Trash2, ChevronDown } from 'lucide-react';

export const CompactMenuToolbar = ({ 
  position, 
  onAddItem, 
  onSettings, 
  onDelete, 
  onBack,
  menuItem,
  onUpdateMenuItem
}) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);

  const colors = [
    '#A8F5B8', '#FFC0CB', '#8B4513', 
    '#8B0000', '#00CED1', '#FFD700',
    '#FFFFFF', '#000000'
  ];

  const handleColorSelect = (color) => {
    if (onUpdateMenuItem && menuItem) {
      onUpdateMenuItem({ ...menuItem, color });
    }
    setShowColorPicker(false);
  };

  return (
    <>
      <div
        className="fixed z-50 bg-gray-800 rounded-lg shadow-2xl flex items-center"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: 'translateX(-50%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Link Tool */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700 rounded-l-lg relative"
          title="Legătură"
          onClick={(e) => {
            e.stopPropagation();
            setShowLinkDialog(!showLinkDialog);
            setShowColorPicker(false);
            setShowMenuDropdown(false);
          }}
        >
          <Link className="w-4 h-4 text-white" />
          {showLinkDialog && (
            <div className="absolute top-0 right-0 text-xs bg-gray-900 text-white px-2 py-1 rounded -mt-6">
              Legătură
            </div>
          )}
        </button>

        {/* Color Picker */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700 relative"
          title="Culoare"
          onClick={(e) => {
            e.stopPropagation();
            setShowColorPicker(!showColorPicker);
            setShowLinkDialog(false);
            setShowMenuDropdown(false);
          }}
        >
          <div 
            className="w-4 h-4 rounded-full border border-white" 
            style={{ backgroundColor: menuItem?.color || '#ffffff' }}
          />
          {showColorPicker && (
            <div className="absolute top-0 right-0 text-xs bg-gray-900 text-white px-2 py-1 rounded -mt-6">
              Color
            </div>
          )}
        </button>

        {/* Menu Dropdown */}
        <button
          className="px-3 py-2 hover:bg-gray-700 transition-colors border-r border-gray-700 flex items-center gap-1 relative"
          title="Menu"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenuDropdown(!showMenuDropdown);
            setShowLinkDialog(false);
            setShowColorPicker(false);
          }}
        >
          <span className="text-white text-sm font-medium">Menu</span>
          <ChevronDown className="w-3 h-3 text-white" />
        </button>

        {/* Settings/Styles */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700 relative"
          title="Stiluri"
          onClick={(e) => {
            e.stopPropagation();
            if (onSettings) onSettings();
          }}
        >
          <Sun className="w-4 h-4 text-white" />
        </button>

        {/* Add Item */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700"
          title="Adaugă item"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddItem) onAddItem();
          }}
        >
          <Plus className="w-4 h-4 text-white" />
        </button>

        {/* Reorder */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700"
          title="Reordonează"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <List className="w-4 h-4 text-white" />
        </button>

        {/* Back */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700"
          title="Înapoi"
          onClick={(e) => {
            e.stopPropagation();
            if (onBack) onBack();
          }}
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>

        {/* Delete */}
        <button
          className="p-2 hover:bg-red-600 transition-colors rounded-r-lg"
          title="Șterge"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete();
          }}
        >
          <Trash2 className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Color Picker Dropdown */}
      {showColorPicker && (
        <div
          className="fixed z-50 bg-gray-800 rounded-lg shadow-2xl p-3"
          style={{
            top: `${position.top + 50}px`,
            left: `${position.left - 60}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-3 gap-2">
            {colors.map((color, idx) => (
              <button
                key={idx}
                className="w-8 h-8 rounded-full border-2 border-gray-600 hover:border-white transition-colors"
                style={{ backgroundColor: color }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorSelect(color);
                }}
              />
            ))}
          </div>
          <button
            className="mt-2 w-full bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 flex items-center justify-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              setShowColorPicker(false);
            }}
          >
            <Link className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Menu Dropdown */}
      {showMenuDropdown && (
        <div
          className="fixed z-50 bg-gray-800 rounded-lg shadow-2xl py-2"
          style={{
            top: `${position.top + 50}px`,
            left: `${position.left - 50}px`,
            minWidth: '160px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm">
            Title 1
          </button>
          <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm">
            Title 2
          </button>
          <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm">
            Title 3
          </button>
          <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm">
            Text
          </button>
          <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm flex items-center justify-between">
            <span>Menu</span>
            <Link className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center"
          onClick={() => setShowLinkDialog(false)}
        >
          <div
            className="bg-gray-800 rounded-lg p-6 w-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">Legătură la</h3>
              <button
                onClick={() => setShowLinkDialog(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-2 mb-4 border-b border-gray-700">
              <button className="px-3 py-2 text-sm text-white bg-gray-700 rounded-t">
                Pagină
              </button>
              <button className="px-3 py-2 text-sm text-gray-400 hover:text-white">
                Adresă Web
              </button>
              <button className="px-3 py-2 text-sm text-gray-400 hover:text-white">
                Email
              </button>
              <button className="px-3 py-2 text-sm text-gray-400 hover:text-white">
                Phone/chat
              </button>
              <button className="px-3 py-2 text-sm text-gray-400 hover:text-white">
                Fișier
              </button>
              <button className="px-3 py-2 text-sm text-gray-400 hover:text-white">
                ...
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Paginile site-ului</label>
                <select className="w-full bg-gray-700 text-white px-3 py-2 rounded">
                  <option value="">Selectează pagină</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Bloc în pagina 'Home'</label>
                <select className="w-full bg-gray-700 text-white px-3 py-2 rounded">
                  <option value="">Home</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="newWindow" className="rounded" />
                <label htmlFor="newWindow" className="text-sm text-white">
                  Deschide în fereastră nouă
                </label>
              </div>

              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                INTRODU LEGĂTURĂ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

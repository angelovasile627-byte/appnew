import React, { useState } from 'react';
import { 
  Link, Sun, Plus, List, ArrowLeft, ArrowRight, Trash2, ChevronDown,
  Home, Mail, Phone, FileText, Globe, MessageCircle,
  Heart, Star, Zap, Coffee, Music, Camera, Settings, User, Bell, Search
} from 'lucide-react';

export const CompactMenuToolbar = ({ 
  position, 
  onAddItem, 
  onSettings, 
  onDelete, 
  onBack,
  menuItem,
  onUpdateMenuItem,
  menuItems = [],
  currentIndex = 0,
  onMoveLeft,
  onMoveRight,
  onAddSubmenu
}) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showSubmenuDialog, setShowSubmenuDialog] = useState(false);
  const [linkTab, setLinkTab] = useState('page');
  
  // Link form data
  const [linkData, setLinkData] = useState({
    type: 'page',
    url: '',
    page: '',
    block: '',
    email: '',
    phone: '',
    file: '',
    newWindow: false
  });

  const colors = [
    '#A8F5B8', '#FFC0CB', '#8B4513', 
    '#8B0000', '#00CED1', '#FFD700',
    '#FFFFFF', '#000000', '#6366F1', '#EC4899',
    '#10B981', '#F59E0B'
  ];

  const icons = [
    { name: 'Home', component: Home },
    { name: 'Mail', component: Mail },
    { name: 'Phone', component: Phone },
    { name: 'FileText', component: FileText },
    { name: 'Globe', component: Globe },
    { name: 'MessageCircle', component: MessageCircle },
    { name: 'Heart', component: Heart },
    { name: 'Star', component: Star },
    { name: 'Zap', component: Zap },
    { name: 'Coffee', component: Coffee },
    { name: 'Music', component: Music },
    { name: 'Camera', component: Camera },
    { name: 'Settings', component: Settings },
    { name: 'User', component: User },
    { name: 'Bell', component: Bell },
    { name: 'Search', component: Search }
  ];

  const handleColorSelect = (color) => {
    if (onUpdateMenuItem && menuItem) {
      onUpdateMenuItem({ ...menuItem, color });
    }
    setShowColorPicker(false);
  };

  const handleMenuTypeSelect = (type) => {
    if (onUpdateMenuItem && menuItem) {
      onUpdateMenuItem({ ...menuItem, type });
    }
    setShowMenuDropdown(false);
  };

  const handleIconSelect = (iconName) => {
    if (onUpdateMenuItem && menuItem) {
      onUpdateMenuItem({ ...menuItem, icon: iconName });
    }
    setShowIconPicker(false);
  };

  const handleLinkSubmit = () => {
    if (onUpdateMenuItem && menuItem) {
      let link = '#';
      
      switch (linkTab) {
        case 'page':
          link = linkData.page || '#';
          if (linkData.block) link += `#${linkData.block}`;
          break;
        case 'web':
          link = linkData.url || '#';
          break;
        case 'email':
          link = `mailto:${linkData.email}`;
          break;
        case 'phone':
          link = `tel:${linkData.phone}`;
          break;
        case 'file':
          link = linkData.file || '#';
          break;
      }
      
      onUpdateMenuItem({ 
        ...menuItem, 
        link,
        linkType: linkTab,
        newWindow: linkData.newWindow
      });
    }
    setShowLinkDialog(false);
  };

  const closeAllDialogs = () => {
    setShowLinkDialog(false);
    setShowColorPicker(false);
    setShowMenuDropdown(false);
    setShowIconPicker(false);
    setShowSubmenuDialog(false);
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
            closeAllDialogs();
            setShowLinkDialog(true);
          }}
        >
          <Link className="w-4 h-4 text-white" />
        </button>

        {/* Color Picker */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700 relative"
          title="Culoare"
          onClick={(e) => {
            e.stopPropagation();
            closeAllDialogs();
            setShowColorPicker(true);
          }}
        >
          <div 
            className="w-4 h-4 rounded-full border border-white" 
            style={{ backgroundColor: menuItem?.color || '#ffffff' }}
          />
        </button>

        {/* Menu Dropdown */}
        <button
          className="px-3 py-2 hover:bg-gray-700 transition-colors border-r border-gray-700 flex items-center gap-1 relative"
          title="Menu Type"
          onClick={(e) => {
            e.stopPropagation();
            closeAllDialogs();
            setShowMenuDropdown(true);
          }}
        >
          <span className="text-white text-sm font-medium">Menu</span>
          <ChevronDown className="w-3 h-3 text-white" />
        </button>

        {/* Icon Picker */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700 relative"
          title="Iconită"
          onClick={(e) => {
            e.stopPropagation();
            closeAllDialogs();
            setShowIconPicker(true);
          }}
        >
          <Sun className="w-4 h-4 text-white" />
        </button>

        {/* Add Item (Duplicate) */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700"
          title="Adaugă item (dublează)"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddItem) onAddItem();
          }}
        >
          <Plus className="w-4 h-4 text-white" />
        </button>

        {/* Add Submenu */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700"
          title="Adaugă submeniu"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddSubmenu) onAddSubmenu();
          }}
        >
          <List className="w-4 h-4 text-white" />
        </button>

        {/* Move Left */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700"
          title="Mută stânga"
          onClick={(e) => {
            e.stopPropagation();
            if (onMoveLeft && currentIndex > 0) onMoveLeft();
          }}
          disabled={currentIndex === 0}
          style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>

        {/* Move Right */}
        <button
          className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700"
          title="Mută dreapta"
          onClick={(e) => {
            e.stopPropagation();
            if (onMoveRight && currentIndex < menuItems.length - 1) onMoveRight();
          }}
          disabled={currentIndex >= menuItems.length - 1}
          style={{ opacity: currentIndex >= menuItems.length - 1 ? 0.5 : 1 }}
        >
          <ArrowRight className="w-4 h-4 text-white" />
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
          <div className="grid grid-cols-4 gap-2">
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
        </div>
      )}

      {/* Menu Type Dropdown */}
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
          <button 
            className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-lg font-bold"
            onClick={() => handleMenuTypeSelect('title1')}
          >
            Title 1
          </button>
          <button 
            className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-base font-semibold"
            onClick={() => handleMenuTypeSelect('title2')}
          >
            Title 2
          </button>
          <button 
            className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm font-medium"
            onClick={() => handleMenuTypeSelect('title3')}
          >
            Title 3
          </button>
          <button 
            className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm"
            onClick={() => handleMenuTypeSelect('text')}
          >
            Text
          </button>
          <button 
            className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm flex items-center justify-between"
            onClick={() => handleMenuTypeSelect('menu')}
          >
            <span>Menu</span>
            <Link className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Icon Picker */}
      {showIconPicker && (
        <div
          className="fixed z-50 bg-gray-800 rounded-lg shadow-2xl p-4"
          style={{
            top: `${position.top + 50}px`,
            left: `${position.left - 100}px`,
            maxWidth: '280px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-white text-sm font-semibold mb-3">Alege iconită</div>
          <div className="grid grid-cols-4 gap-2">
            {icons.map((icon, idx) => {
              const IconComponent = icon.component;
              return (
                <button
                  key={idx}
                  className="p-3 rounded hover:bg-gray-700 transition-colors flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIconSelect(icon.name);
                  }}
                  title={icon.name}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </button>
              );
            })}
          </div>
          <button
            className="mt-3 w-full bg-gray-700 text-white px-3 py-2 rounded text-sm hover:bg-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              handleIconSelect(null);
            }}
          >
            Fără iconită
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
            className="bg-gray-800 rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto"
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

            {/* Tabs */}
            <div className="flex gap-2 mb-4 border-b border-gray-700 flex-wrap">
              <button 
                className={`px-3 py-2 text-sm ${linkTab === 'page' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white'} rounded-t`}
                onClick={() => setLinkTab('page')}
              >
                Pagină
              </button>
              <button 
                className={`px-3 py-2 text-sm ${linkTab === 'web' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white'} rounded-t`}
                onClick={() => setLinkTab('web')}
              >
                Adresă Web
              </button>
              <button 
                className={`px-3 py-2 text-sm ${linkTab === 'email' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white'} rounded-t`}
                onClick={() => setLinkTab('email')}
              >
                Email
              </button>
              <button 
                className={`px-3 py-2 text-sm ${linkTab === 'phone' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white'} rounded-t`}
                onClick={() => setLinkTab('phone')}
              >
                Phone/chat
              </button>
              <button 
                className={`px-3 py-2 text-sm ${linkTab === 'file' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white'} rounded-t`}
                onClick={() => setLinkTab('file')}
              >
                Fișier
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {/* Page Tab */}
              {linkTab === 'page' && (
                <>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Paginile site-ului</label>
                    <select 
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                      value={linkData.page}
                      onChange={(e) => setLinkData({...linkData, page: e.target.value})}
                    >
                      <option value="">Selectează pagină</option>
                      <option value="/">Home</option>
                      <option value="/about">About</option>
                      <option value="/contact">Contact</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Bloc în pagină (opțional)</label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                      placeholder="ex: hero, features"
                      value={linkData.block}
                      onChange={(e) => setLinkData({...linkData, block: e.target.value})}
                    />
                  </div>
                </>
              )}

              {/* Web Tab */}
              {linkTab === 'web' && (
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Adresă URL</label>
                  <input
                    type="url"
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                    placeholder="https://example.com"
                    value={linkData.url}
                    onChange={(e) => setLinkData({...linkData, url: e.target.value})}
                  />
                </div>
              )}

              {/* Email Tab */}
              {linkTab === 'email' && (
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Adresă Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                    placeholder="contact@example.com"
                    value={linkData.email}
                    onChange={(e) => setLinkData({...linkData, email: e.target.value})}
                  />
                </div>
              )}

              {/* Phone Tab */}
              {linkTab === 'phone' && (
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Număr telefon</label>
                  <input
                    type="tel"
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                    placeholder="+40 123 456 789"
                    value={linkData.phone}
                    onChange={(e) => setLinkData({...linkData, phone: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-1">Pentru WhatsApp: +40123456789</p>
                </div>
              )}

              {/* File Tab */}
              {linkTab === 'file' && (
                <div>
                  <label className="text-sm text-gray-400 block mb-2">URL Fișier</label>
                  <input
                    type="url"
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                    placeholder="https://example.com/document.pdf"
                    value={linkData.file}
                    onChange={(e) => setLinkData({...linkData, file: e.target.value})}
                  />
                </div>
              )}

              {/* New Window Option */}
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="newWindow" 
                  className="rounded"
                  checked={linkData.newWindow}
                  onChange={(e) => setLinkData({...linkData, newWindow: e.target.checked})}
                />
                <label htmlFor="newWindow" className="text-sm text-white">
                  Deschide în fereastră nouă
                </label>
              </div>

              <button 
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                onClick={handleLinkSubmit}
              >
                INTRODU LEGĂTURĂ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

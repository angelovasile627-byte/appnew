import React, { useState, useEffect } from 'react';
import { X, Settings, Globe, Search, Code, Palette, FileText, Plus, Copy, Edit2, Trash2, Home } from 'lucide-react';
import { Button } from '../ui/button';

export const SettingsModal = ({ 
  isOpen, 
  onClose, 
  projectId, 
  initialSettings, 
  onSave,
  // Pages management props
  pages = [],
  onCreatePage,
  onDuplicatePage,
  onRenamePage,
  onDeletePage
}) => {
  const [activeTab, setActiveTab] = useState('general');
  
  // Pages tab state
  const [pageModalOpen, setPageModalOpen] = useState(false);
  const [pageModalType, setPageModalType] = useState('blank'); // 'blank' or 'duplicate'
  const [newPageName, setNewPageName] = useState('');
  const [selectedPageId, setSelectedPageId] = useState('');
  const [editingPageId, setEditingPageId] = useState(null);
  const [editPageName, setEditPageName] = useState('');
  
  const [settings, setSettings] = useState({
    // General
    site_name: '',
    site_description: '',
    site_logo: '',
    favicon: '',
    // SEO
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    // Technical
    google_analytics_id: '',
    facebook_pixel_id: '',
    custom_css: '',
    custom_js: '',
    header_scripts: '',
    footer_scripts: '',
    // Design
    primary_font: 'Inter',
    primary_color: '#3B82F6',
    secondary_color: '#6B7280',
    accent_color: '#10B981',
    border_radius: '8px',
    spacing: '16px'
  });

  useEffect(() => {
    if (initialSettings) {
      setSettings(prev => ({ ...prev, ...initialSettings }));
    }
  }, [initialSettings]);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  // Pages management functions
  const handleOpenPageModal = (type) => {
    setPageModalType(type);
    setNewPageName('');
    setSelectedPageId('');
    setPageModalOpen(true);
  };

  const handleClosePageModal = () => {
    setPageModalOpen(false);
    setNewPageName('');
    setSelectedPageId('');
  };

  const handleCreateNewPage = () => {
    if (!newPageName.trim()) {
      alert('Te rog introdu un nume pentru pagină');
      return;
    }

    if (pageModalType === 'blank') {
      onCreatePage(newPageName);
    } else {
      if (!selectedPageId) {
        alert('Te rog selectează o pagină de duplicat');
        return;
      }
      onDuplicatePage(selectedPageId, newPageName);
    }

    handleClosePageModal();
  };

  const handleStartEditPage = (pageId, pageName) => {
    setEditingPageId(pageId);
    setEditPageName(pageName);
  };

  const handleSavePageRename = (pageId) => {
    if (editPageName.trim()) {
      onRenamePage(pageId, editPageName.trim());
    }
    setEditingPageId(null);
    setEditPageName('');
  };

  const handleCancelEditPage = () => {
    setEditingPageId(null);
    setEditPageName('');
  };

  const handleDeletePageConfirm = (pageId, pageName) => {
    if (window.confirm(`Sigur vrei să ștergi pagina "${pageName}"?`)) {
      onDeletePage(pageId);
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'pages', label: 'Pagini', icon: FileText },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'technical', label: 'Tehnic', icon: Code },
    { id: 'design', label: 'Design', icon: Palette }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Setări Proiect</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Tabs Sidebar */}
          <div className="w-48 bg-gray-50 border-r border-gray-200 p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Setări Generale Site</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nume Site
                  </label>
                  <input
                    type="text"
                    value={settings.site_name}
                    onChange={(e) => handleChange('site_name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Ex: AXXO Builder"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descriere Site
                  </label>
                  <textarea
                    value={settings.site_description}
                    onChange={(e) => handleChange('site_description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                    placeholder="Descriere scurtă despre site-ul tău"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Principal (URL)
                  </label>
                  <input
                    type="text"
                    value={settings.site_logo}
                    onChange={(e) => handleChange('site_logo', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://example.com/logo.png"
                  />
                  {settings.site_logo && (
                    <img src={settings.site_logo} alt="Logo preview" className="mt-2 h-16 object-contain" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon (URL)
                  </label>
                  <input
                    type="text"
                    value={settings.favicon}
                    onChange={(e) => handleChange('favicon', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Setări SEO</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title (Titlu implicit)
                  </label>
                  <input
                    type="text"
                    value={settings.meta_title}
                    onChange={(e) => handleChange('meta_title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Titlul care apare în rezultatele Google"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recomandat: 50-60 caractere</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={settings.meta_description}
                    onChange={(e) => handleChange('meta_description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                    placeholder="Descrierea care apare în rezultatele Google"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recomandat: 150-160 caractere</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords (separate prin virgulă)
                  </label>
                  <input
                    type="text"
                    value={settings.meta_keywords}
                    onChange={(e) => handleChange('meta_keywords', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="web builder, design, website"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Open Graph (Social Media)</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Title
                      </label>
                      <input
                        type="text"
                        value={settings.og_title}
                        onChange={(e) => handleChange('og_title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Titlu pentru Facebook, Twitter, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Description
                      </label>
                      <textarea
                        value={settings.og_description}
                        onChange={(e) => handleChange('og_description', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows="2"
                        placeholder="Descriere pentru social media"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Image (URL)
                      </label>
                      <input
                        type="text"
                        value={settings.og_image}
                        onChange={(e) => handleChange('og_image', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="https://example.com/og-image.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recomandat: 1200x630px</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'technical' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Setări Tehnice</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={settings.google_analytics_id}
                    onChange={(e) => handleChange('google_analytics_id', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="G-XXXXXXXXXX sau UA-XXXXXXXXX-X"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    value={settings.facebook_pixel_id}
                    onChange={(e) => handleChange('facebook_pixel_id', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="123456789012345"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom CSS
                  </label>
                  <textarea
                    value={settings.custom_css}
                    onChange={(e) => handleChange('custom_css', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                    rows="6"
                    placeholder=".custom-class { color: red; }"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom JavaScript
                  </label>
                  <textarea
                    value={settings.custom_js}
                    onChange={(e) => handleChange('custom_js', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                    rows="6"
                    placeholder="console.log('Hello');"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scripts în Header
                  </label>
                  <textarea
                    value={settings.header_scripts}
                    onChange={(e) => handleChange('header_scripts', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                    rows="4"
                    placeholder="<script>...</script>"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scripts în Footer
                  </label>
                  <textarea
                    value={settings.footer_scripts}
                    onChange={(e) => handleChange('footer_scripts', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                    rows="4"
                    placeholder="<script>...</script>"
                  />
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Setări Design</h3>
                <p className="text-sm text-gray-600">Aceste setări se vor aplica automat pe toate blocurile existente și viitoare.</p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Principal
                  </label>
                  <select
                    value={settings.primary_font}
                    onChange={(e) => handleChange('primary_font', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Raleway">Raleway</option>
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="Merriweather">Merriweather</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Culoare Primară
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.primary_color}
                        onChange={(e) => handleChange('primary_color', e.target.value)}
                        className="w-12 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.primary_color}
                        onChange={(e) => handleChange('primary_color', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Culoare Secundară
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.secondary_color}
                        onChange={(e) => handleChange('secondary_color', e.target.value)}
                        className="w-12 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.secondary_color}
                        onChange={(e) => handleChange('secondary_color', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Culoare Accent
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.accent_color}
                        onChange={(e) => handleChange('accent_color', e.target.value)}
                        className="w-12 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.accent_color}
                        onChange={(e) => handleChange('accent_color', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Border Radius Global
                    </label>
                    <select
                      value={settings.border_radius}
                      onChange={(e) => handleChange('border_radius', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="0px">Fără rotunjire (0px)</option>
                      <option value="4px">Mic (4px)</option>
                      <option value="8px">Mediu (8px)</option>
                      <option value="12px">Mare (12px)</option>
                      <option value="16px">Foarte mare (16px)</option>
                      <option value="24px">Extra mare (24px)</option>
                      <option value="9999px">Complet rotund</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Spacing Global
                    </label>
                    <select
                      value={settings.spacing}
                      onChange={(e) => handleChange('spacing', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="8px">Mic (8px)</option>
                      <option value="12px">Mediu-Mic (12px)</option>
                      <option value="16px">Mediu (16px)</option>
                      <option value="20px">Mediu-Mare (20px)</option>
                      <option value="24px">Mare (24px)</option>
                      <option value="32px">Foarte mare (32px)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Anulează
          </Button>
          <Button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Salvează Setări
          </Button>
        </div>
      </div>
    </div>
  );
};

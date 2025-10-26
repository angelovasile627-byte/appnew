import React, { useState, useEffect } from 'react';
import { X, Settings, Globe, Search, Code, Palette, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';

export const SettingsModal = ({ isOpen, onClose, settings, onSave }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    // General
    siteName: '',
    siteDescription: '',
    siteLogo: '',
    favicon: '',
    
    // SEO
    defaultMetaTitle: '',
    defaultMetaDescription: '',
    defaultKeywords: '',
    ogImage: '',
    
    // Technical
    googleAnalyticsId: '',
    facebookPixelId: '',
    customHeaderCode: '',
    customFooterCode: '',
    customCSS: '',
    
    // Design
    primaryFont: 'Inter',
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    accentColor: '#10b981',
    borderRadius: '8',
    spacing: '16'
  });
  
  const { toast } = useToast();

  // Load settings when modal opens
  useEffect(() => {
    if (isOpen && settings) {
      setFormData({ ...formData, ...settings });
    }
  }, [isOpen, settings]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    toast({
      title: 'Setări salvate',
      description: 'Setările site-ului au fost actualizate cu succes'
    });
    onClose();
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'seo', name: 'SEO', icon: Search },
    { id: 'technical', name: 'Tehnic', icon: Code },
    { id: 'design', name: 'Design', icon: Palette }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Setări Site</h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* GENERAL TAB */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="siteName" className="text-sm font-medium text-gray-700">
                  Nume Site *
                </Label>
                <Input
                  id="siteName"
                  type="text"
                  placeholder="ex: Compania Mea SRL"
                  value={formData.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Numele afișat în browser și motoarele de căutare</p>
              </div>

              <div>
                <Label htmlFor="siteDescription" className="text-sm font-medium text-gray-700">
                  Descriere Site
                </Label>
                <textarea
                  id="siteDescription"
                  rows={3}
                  placeholder="Descrierea scurtă a site-ului..."
                  value={formData.siteDescription}
                  onChange={(e) => handleChange('siteDescription', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <Label htmlFor="siteLogo" className="text-sm font-medium text-gray-700">
                  Logo URL
                </Label>
                <Input
                  id="siteLogo"
                  type="text"
                  placeholder="https://example.com/logo.png"
                  value={formData.siteLogo}
                  onChange={(e) => handleChange('siteLogo', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">URL-ul imaginii logo pentru site</p>
              </div>

              <div>
                <Label htmlFor="favicon" className="text-sm font-medium text-gray-700">
                  Favicon URL
                </Label>
                <Input
                  id="favicon"
                  type="text"
                  placeholder="https://example.com/favicon.ico"
                  value={formData.favicon}
                  onChange={(e) => handleChange('favicon', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Iconița afișată în tab-ul browser-ului (16x16 sau 32x32px)</p>
              </div>
            </div>
          )}

          {/* SEO TAB */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Info:</strong> Aceste setări vor fi folosite ca valori implicite pentru toate paginile. Poți customiza SEO pentru fiecare pagină separat.
                </p>
              </div>

              <div>
                <Label htmlFor="defaultMetaTitle" className="text-sm font-medium text-gray-700">
                  Meta Title Implicit
                </Label>
                <Input
                  id="defaultMetaTitle"
                  type="text"
                  placeholder="ex: Compania Mea - Servicii Premium"
                  value={formData.defaultMetaTitle}
                  onChange={(e) => handleChange('defaultMetaTitle', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Recomandat: 50-60 caractere</p>
              </div>

              <div>
                <Label htmlFor="defaultMetaDescription" className="text-sm font-medium text-gray-700">
                  Meta Description Implicită
                </Label>
                <textarea
                  id="defaultMetaDescription"
                  rows={3}
                  placeholder="Descrierea site-ului pentru motoarele de căutare..."
                  value={formData.defaultMetaDescription}
                  onChange={(e) => handleChange('defaultMetaDescription', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">Recomandat: 150-160 caractere</p>
              </div>

              <div>
                <Label htmlFor="defaultKeywords" className="text-sm font-medium text-gray-700">
                  Keywords (separate prin virgulă)
                </Label>
                <Input
                  id="defaultKeywords"
                  type="text"
                  placeholder="servicii, companie, calitate, România"
                  value={formData.defaultKeywords}
                  onChange={(e) => handleChange('defaultKeywords', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="ogImage" className="text-sm font-medium text-gray-700">
                  Open Graph Image (Social Media)
                </Label>
                <Input
                  id="ogImage"
                  type="text"
                  placeholder="https://example.com/og-image.jpg"
                  value={formData.ogImage}
                  onChange={(e) => handleChange('ogImage', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Imaginea afișată când site-ul este partajat pe Facebook, Twitter, etc. (1200x630px recomandat)</p>
              </div>
            </div>
          )}

          {/* TECHNICAL TAB */}
          {activeTab === 'technical' && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="googleAnalyticsId" className="text-sm font-medium text-gray-700">
                  Google Analytics ID
                </Label>
                <Input
                  id="googleAnalyticsId"
                  type="text"
                  placeholder="G-XXXXXXXXXX sau UA-XXXXXXXXX-X"
                  value={formData.googleAnalyticsId}
                  onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Tracking ID din Google Analytics pentru statistici vizitatori</p>
              </div>

              <div>
                <Label htmlFor="facebookPixelId" className="text-sm font-medium text-gray-700">
                  Facebook Pixel ID
                </Label>
                <Input
                  id="facebookPixelId"
                  type="text"
                  placeholder="123456789012345"
                  value={formData.facebookPixelId}
                  onChange={(e) => handleChange('facebookPixelId', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">ID-ul Facebook Pixel pentru tracking conversii</p>
              </div>

              <div>
                <Label htmlFor="customHeaderCode" className="text-sm font-medium text-gray-700">
                  Custom Code - Header (HEAD)
                </Label>
                <textarea
                  id="customHeaderCode"
                  rows={6}
                  placeholder="<!-- Script-uri custom pentru <head> -->
<script>
  // Codul tău aici
</script>"
                  value={formData.customHeaderCode}
                  onChange={(e) => handleChange('customHeaderCode', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Cod HTML/JavaScript inserat în &lt;head&gt;</p>
              </div>

              <div>
                <Label htmlFor="customFooterCode" className="text-sm font-medium text-gray-700">
                  Custom Code - Footer (înainte de &lt;/body&gt;)
                </Label>
                <textarea
                  id="customFooterCode"
                  rows={6}
                  placeholder="<!-- Script-uri custom pentru footer -->
<script>
  // Codul tău aici
</script>"
                  value={formData.customFooterCode}
                  onChange={(e) => handleChange('customFooterCode', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Cod HTML/JavaScript inserat înainte de închiderea &lt;/body&gt;</p>
              </div>

              <div>
                <Label htmlFor="customCSS" className="text-sm font-medium text-gray-700">
                  Custom CSS Global
                </Label>
                <textarea
                  id="customCSS"
                  rows={8}
                  placeholder="/* CSS-ul tău custom aici */
body {
  /* stiluri custom */
}"
                  value={formData.customCSS}
                  onChange={(e) => handleChange('customCSS', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">CSS custom aplicat pe întreg site-ul</p>
              </div>
            </div>
          )}

          {/* DESIGN TAB */}
          {activeTab === 'design' && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-purple-800">
                  <strong>Info:</strong> Aceste setări vor afecta designul global al site-ului. Schimbările vor fi aplicate la următoarea generare/export.
                </p>
              </div>

              <div>
                <Label htmlFor="primaryFont" className="text-sm font-medium text-gray-700">
                  Font Principal
                </Label>
                <select
                  id="primaryFont"
                  value={formData.primaryFont}
                  onChange={(e) => handleChange('primaryFont', e.target.value)}
                  className="mt-1 w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Lato">Lato</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Raleway">Raleway</option>
                  <option value="Ubuntu">Ubuntu</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primaryColor" className="text-sm font-medium text-gray-700">
                    Culoare Primară
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <input
                      id="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondaryColor" className="text-sm font-medium text-gray-700">
                    Culoare Secundară
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <input
                      id="secondaryColor"
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="accentColor" className="text-sm font-medium text-gray-700">
                    Culoare Accent
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <input
                      id="accentColor"
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => handleChange('accentColor', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => handleChange('accentColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="borderRadius" className="text-sm font-medium text-gray-700">
                    Border Radius (px)
                  </Label>
                  <Input
                    id="borderRadius"
                    type="number"
                    min="0"
                    max="50"
                    value={formData.borderRadius}
                    onChange={(e) => handleChange('borderRadius', e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Rotunjirea colțurilor elementelor (0-50px)</p>
                </div>

                <div>
                  <Label htmlFor="spacing" className="text-sm font-medium text-gray-700">
                    Spacing Base (px)
                  </Label>
                  <Input
                    id="spacing"
                    type="number"
                    min="8"
                    max="32"
                    step="4"
                    value={formData.spacing}
                    onChange={(e) => handleChange('spacing', e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Spacing de bază între elemente (8-32px)</p>
                </div>
              </div>

              {/* Color Preview */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Preview Culori</h4>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div 
                      className="h-20 rounded-lg mb-2" 
                      style={{ backgroundColor: formData.primaryColor }}
                    />
                    <p className="text-xs text-gray-600 text-center">Primară</p>
                  </div>
                  <div className="flex-1">
                    <div 
                      className="h-20 rounded-lg mb-2" 
                      style={{ backgroundColor: formData.secondaryColor }}
                    />
                    <p className="text-xs text-gray-600 text-center">Secundară</p>
                  </div>
                  <div className="flex-1">
                    <div 
                      className="h-20 rounded-lg mb-2" 
                      style={{ backgroundColor: formData.accentColor }}
                    />
                    <p className="text-xs text-gray-600 text-center">Accent</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            onClick={onClose}
            variant="outline"
          >
            Anulează
          </Button>
          <Button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Salvează Setări
          </Button>
        </div>
      </div>
    </div>
  );
};

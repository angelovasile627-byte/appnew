import React, { useState } from 'react';
import { X, Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';

// Librărie de iconițe Mobirise 2 style - iconițe sociale populare
const ICON_LIBRARY = {
  'Mobirise 2': [
    // Social Media Icons
    { name: 'Facebook', icon: 'FaFacebookF', component: FaIcons.FaFacebookF, defaultColor: '#1877f2' },
    { name: 'Twitter/X', icon: 'FaXTwitter', component: Fa6Icons.FaXTwitter, defaultColor: '#000000' },
    { name: 'Instagram', icon: 'FaInstagram', component: FaIcons.FaInstagram, defaultColor: '#e4405f' },
    { name: 'LinkedIn', icon: 'FaLinkedinIn', component: FaIcons.FaLinkedinIn, defaultColor: '#0077b5' },
    { name: 'YouTube', icon: 'FaYoutube', component: FaIcons.FaYoutube, defaultColor: '#ff0000' },
    { name: 'TikTok', icon: 'FaTiktok', component: FaIcons.FaTiktok, defaultColor: '#000000' },
    { name: 'Pinterest', icon: 'FaPinterestP', component: FaIcons.FaPinterestP, defaultColor: '#bd081c' },
    { name: 'Snapchat', icon: 'FaSnapchatGhost', component: FaIcons.FaSnapchatGhost, defaultColor: '#fffc00' },
    { name: 'WhatsApp', icon: 'FaWhatsapp', component: FaIcons.FaWhatsapp, defaultColor: '#25d366' },
    { name: 'Telegram', icon: 'FaTelegramPlane', component: FaIcons.FaTelegramPlane, defaultColor: '#0088cc' },
    { name: 'Reddit', icon: 'FaRedditAlien', component: FaIcons.FaRedditAlien, defaultColor: '#ff4500' },
    { name: 'Twitch', icon: 'FaTwitch', component: FaIcons.FaTwitch, defaultColor: '#9146ff' },
    { name: 'Discord', icon: 'FaDiscord', component: FaIcons.FaDiscord, defaultColor: '#5865f2' },
    { name: 'Spotify', icon: 'FaSpotify', component: FaIcons.FaSpotify, defaultColor: '#1db954' },
    { name: 'SoundCloud', icon: 'FaSoundcloud', component: FaIcons.FaSoundcloud, defaultColor: '#ff5500' },
    { name: 'Medium', icon: 'FaMediumM', component: FaIcons.FaMediumM, defaultColor: '#00ab6c' },
    { name: 'GitHub', icon: 'FaGithub', component: FaIcons.FaGithub, defaultColor: '#181717' },
    { name: 'Dribbble', icon: 'FaDribbble', component: FaIcons.FaDribbble, defaultColor: '#ea4c89' },
    { name: 'Behance', icon: 'FaBehance', component: FaIcons.FaBehance, defaultColor: '#1769ff' },
    { name: 'Vimeo', icon: 'FaVimeoV', component: FaIcons.FaVimeoV, defaultColor: '#1ab7ea' },
    { name: 'Flickr', icon: 'FaFlickr', component: FaIcons.FaFlickr, defaultColor: '#0063dc' },
    { name: 'Tumblr', icon: 'FaTumblr', component: FaIcons.FaTumblr, defaultColor: '#35465c' },
    { name: 'Slack', icon: 'FaSlack', component: FaIcons.FaSlack, defaultColor: '#4a154b' },
    { name: 'Skype', icon: 'FaSkype', component: FaIcons.FaSkype, defaultColor: '#00aff0' }
  ]
};

export const SocialIconsModal = ({ isOpen, onClose, currentIcons = [], onSave }) => {
  const [selectedIcons, setSelectedIcons] = useState(currentIcons.length > 0 ? currentIcons : []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleSelectIcon = (iconData) => {
    const newIcon = {
      icon: iconData.icon,
      name: iconData.name,
      color: iconData.defaultColor,
      link: '',
      show: true
    };
    setSelectedIcons([...selectedIcons, newIcon]);
  };

  const handleRemoveIcon = (index) => {
    setSelectedIcons(selectedIcons.filter((_, i) => i !== index));
  };

  const handleUpdateIcon = (index, field, value) => {
    const updated = selectedIcons.map((icon, i) => 
      i === index ? { ...icon, [field]: value } : icon
    );
    setSelectedIcons(updated);
  };

  const handleSave = () => {
    onSave(selectedIcons);
    onClose();
  };

  const filteredIcons = ICON_LIBRARY['Mobirise 2'].filter(icon =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[10000]"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl w-[900px] max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Selectează Iconițele</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-140px)]">
          {/* Left Side - Selected Icons */}
          <div className="w-1/3 border-r border-gray-700 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Iconițe Selectate
              </h3>
              <div className="flex gap-2">
                {selectedIcons.map((iconData, index) => {
                  const IconComponent = ICON_LIBRARY['Mobirise 2'].find(i => i.icon === iconData.icon)?.component;
                  return (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                      style={{ backgroundColor: iconData.color }}
                      onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    >
                      {IconComponent && <IconComponent size={20} color="white" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Icon Configuration */}
            {selectedIcons.map((iconData, index) => {
              const IconComponent = ICON_LIBRARY['Mobirise 2'].find(i => i.icon === iconData.icon)?.component;
              
              return (
                <div
                  key={index}
                  className={`mb-4 p-4 rounded-lg border transition-all ${
                    editingIndex === index 
                      ? 'border-indigo-500 bg-gray-800/50' 
                      : 'border-gray-700 bg-gray-800/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: iconData.color }}
                      >
                        {IconComponent && <IconComponent size={20} color="white" />}
                      </div>
                      <span className="text-sm font-medium text-white">{iconData.name}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveIcon(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {editingIndex === index && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                          Culoare Iconiță
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={iconData.color}
                            onChange={(e) => handleUpdateIcon(index, 'color', e.target.value)}
                            className="w-12 h-10 rounded border-2 border-gray-600 cursor-pointer"
                          />
                          <span className="text-xs text-gray-400">{iconData.color}</span>
                          <button
                            onClick={() => handleUpdateIcon(index, 'color', 'auto')}
                            className="ml-auto px-3 py-1.5 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-500 transition-colors"
                          >
                            Auto
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1">
                          <LinkIcon size={14} />
                          Leagă Iconiția de
                        </label>
                        <input
                          type="text"
                          value={iconData.link}
                          onChange={(e) => handleUpdateIcon(index, 'link', e.target.value)}
                          placeholder="https://mobiri.se"
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                          className="mt-2 w-full px-3 py-2 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-500 transition-colors font-medium"
                        >
                          EDITEAZĂ LEGĂTURA
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {selectedIcons.length === 0 && (
              <div className="text-center text-gray-500 text-sm mt-8">
                Nicio iconiță selectată
              </div>
            )}
          </div>

          {/* Right Side - Icon Library */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Caută..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                Mobirise 2
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-500 transition-colors">
                  COLLAPSE ALL
                </button>
                <button className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-500 transition-colors">
                  EXPAND ALL
                </button>
              </div>
            </div>

            {/* Icon Grid */}
            <div className="grid grid-cols-8 gap-3">
              {filteredIcons.map((iconData, index) => {
                const IconComponent = iconData.component;
                const isSelected = selectedIcons.some(i => i.icon === iconData.icon);
                
                return (
                  <button
                    key={index}
                    onClick={() => !isSelected && handleSelectIcon(iconData)}
                    disabled={isSelected}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-gray-700 cursor-not-allowed opacity-50'
                        : 'bg-gray-800 hover:bg-indigo-600 hover:scale-110 cursor-pointer'
                    }`}
                    title={iconData.name}
                  >
                    <IconComponent size={24} color="white" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-700 bg-gray-900/50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Anulează
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors font-medium"
          >
            Salvează
          </button>
        </div>
      </div>
    </div>
  );
};

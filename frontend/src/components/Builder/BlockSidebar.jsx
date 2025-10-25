import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { blockTemplates } from '../../data/mockBlocks';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const BlockSidebar = ({ isOpen, onToggle, onAddBlock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'menu', 'hero', 'features', 'article', 'intro', 'cta', 'gallery', 'testimonial', 'contact', 'pricing', 'footer', 'team', 'stats', 'faq'];

  const filteredBlocks = blockTemplates.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-r-lg shadow-lg hover:bg-indigo-700 transition-colors z-40"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Blocks</h2>
        <button
          onClick={onToggle}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredBlocks.map(block => {
            // Generate dynamic thumbnail preview based on config
            const renderThumbnail = () => {
              const config = block.config;
              
              if (config.type === 'menu') {
                return (
                  <div style={{
                    background: config.background.value,
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '6px',
                    height: '100%'
                  }}>
                    <div style={{ color: config.logo.color, fontWeight: 'bold', fontSize: '8px' }}>
                      {config.logo.text}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {config.menuItems.slice(0, 3).map((item, i) => (
                        <span key={i} style={{ color: item.color, fontSize: '6px' }}>
                          {item.text}
                        </span>
                      ))}
                      <div style={{
                        background: config.button.color,
                        color: config.button.textColor,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '6px',
                        fontWeight: '600'
                      }}>
                        {config.button.text}
                      </div>
                    </div>
                  </div>
                );
              }
              
              if (config.type === 'hero') {
                const bgStyle = config.background.type === 'gradient'
                  ? { background: config.background.value }
                  : config.background.type === 'image'
                  ? { 
                      backgroundImage: `url(${config.background.value})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }
                  : { background: config.background.value };
                
                return (
                  <div style={{
                    ...bgStyle,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px 12px',
                    height: '100%',
                    textAlign: config.title.align
                  }}>
                    {config.background.overlay && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: config.background.overlayColor || 'rgba(0,0,0,0.5)'
                      }}></div>
                    )}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        color: config.title.color,
                        fontWeight: 'bold',
                        fontSize: '10px',
                        marginBottom: '4px',
                        lineHeight: 1.2
                      }}>
                        {config.title.text}
                      </div>
                      {config.description.show && (
                        <div style={{
                          color: config.description.color,
                          fontSize: '5px',
                          marginBottom: '6px',
                          lineHeight: 1.3
                        }}>
                          {config.description.text.substring(0, 60)}...
                        </div>
                      )}
                      {config.button.show && (
                        <div style={{
                          display: 'inline-block',
                          background: config.button.color,
                          color: config.button.textColor,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '6px',
                          fontWeight: '600'
                        }}>
                          {config.button.text}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              
              // Fallback for other block types
              return (
                <img
                  src={block.thumbnail}
                  alt={block.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              );
            };
            
            return (
              <div
                key={block.id}
                className="group cursor-pointer border-2 border-gray-200 rounded-lg overflow-hidden hover:border-indigo-500 hover:shadow-md transition-all"
                onClick={() => onAddBlock(block)}
              >
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {renderThumbnail()}
                </div>
                <div className="p-2.5">
                  <h3 className="font-semibold text-sm text-gray-900 mb-0.5">{block.name}</h3>
                  <p className="text-xs text-gray-500 capitalize">{block.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

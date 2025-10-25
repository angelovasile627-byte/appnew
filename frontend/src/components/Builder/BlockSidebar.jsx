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
          {filteredBlocks.map(block => (
            <div
              key={block.id}
              className="group cursor-pointer border-2 border-gray-200 rounded-lg overflow-hidden hover:border-indigo-500 hover:shadow-md transition-all"
              onClick={() => onAddBlock(block)}
            >
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={block.thumbnail}
                  alt={block.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2.5">
                <h3 className="font-semibold text-sm text-gray-900 mb-0.5">{block.name}</h3>
                <p className="text-xs text-gray-500 capitalize">{block.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

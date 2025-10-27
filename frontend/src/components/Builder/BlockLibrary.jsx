import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { blockTemplates } from '../../data/mockBlocks';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const BlockLibrary = ({ isOpen, onClose, onAddBlock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'menu', 'hero', 'features', 'article', 'intro', 'cta', 'gallery', 'testimonial', 'contact', 'pricing', 'footer', 'team', 'stats', 'faq'];

  const filteredBlocks = blockTemplates.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[90vw] h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Block Library</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 border-b">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search blocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
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

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-6">
            {filteredBlocks.map(block => (
              <div
                key={block.id}
                className="group cursor-pointer border-2 border-gray-200 rounded-lg overflow-hidden hover:border-indigo-500 hover:shadow-lg transition-all"
                onClick={() => {
                  onAddBlock(block);
                  onClose();
                }}
              >
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={block.thumbnail}
                    alt={block.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{block.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{block.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Link, Settings, Plus, List, Undo, Trash2, ChevronDown } from 'lucide-react';

export const InlineToolbar = ({ block, onUpdate, onDelete, onAddMenuItem, position }) => {
  if (!block) return null;

  const { config } = block;

  const handleUndo = () => {
    // This would integrate with the undo system
    console.log('Undo action');
  };

  return (
    <div
      className="inline-flex items-center bg-gray-800 text-white rounded-lg shadow-xl border border-gray-700 z-50"
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Link Tool */}
      <button
        className="p-3 hover:bg-gray-700 transition-colors border-r border-gray-700"
        title="Adaugă link"
      >
        <Link className="w-5 h-5" />
      </button>

      {/* Menu Dropdown */}
      <button
        className="px-4 py-3 hover:bg-gray-700 transition-colors border-r border-gray-700 flex items-center gap-2"
        title="Setări menu"
      >
        <span className="text-sm font-medium">Menu</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Settings Tool */}
      <button
        className="p-3 hover:bg-gray-700 transition-colors border-r border-gray-700"
        title="Setări styling"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Add Item */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (onAddMenuItem) {
            onAddMenuItem();
          }
        }}
        className="p-3 hover:bg-gray-700 transition-colors border-r border-gray-700"
        title="Adaugă item nou"
      >
        <Plus className="w-5 h-5" />
      </button>

      {/* Reorder List */}
      <button
        className="p-3 hover:bg-gray-700 transition-colors border-r border-gray-700"
        title="Reordonează items"
      >
        <List className="w-5 h-5" />
      </button>

      {/* Undo */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleUndo();
        }}
        className="p-3 hover:bg-gray-700 transition-colors border-r border-gray-700"
        title="Anulează"
      >
        <Undo className="w-5 h-5" />
      </button>

      {/* Delete */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (onDelete) {
            onDelete();
          }
        }}
        className="p-3 hover:bg-red-600 transition-colors"
        title="Șterge"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

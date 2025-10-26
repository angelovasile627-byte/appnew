import React from 'react';
import { Link, Sun, Plus, List, ArrowLeft, Trash2 } from 'lucide-react';

export const CompactMenuToolbar = ({ position, onAddItem, onSettings, onDelete, onBack }) => {
  return (
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
        className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700 rounded-l-lg"
        title="Link"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Link className="w-4 h-4 text-white" />
      </button>

      {/* Dark/Light Mode Toggle */}
      <button
        className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700"
        title="Culoare"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Sun className="w-4 h-4 text-white" />
      </button>

      {/* Menu Label */}
      <div className="px-3 py-2 border-r border-gray-700">
        <span className="text-white text-sm font-medium">Menu</span>
      </div>

      {/* Settings/Styles */}
      <button
        className="p-2 hover:bg-gray-700 transition-colors border-r border-gray-700"
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
  );
};

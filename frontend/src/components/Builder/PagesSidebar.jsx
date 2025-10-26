import React, { useState } from 'react';
import { Home, FileText, Plus, MoreVertical, Trash2, Edit2, Copy, Settings } from 'lucide-react';
import { Button } from '../ui/button';

export const PagesSidebar = ({ 
  pages, 
  currentPageId, 
  onSelectPage, 
  onCreatePage, 
  onDeletePage,
  onRenamePage,
  onOpenSettings
}) => {
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleMenuToggle = (pageId, e) => {
    e.stopPropagation();
    setMenuOpenId(menuOpenId === pageId ? null : pageId);
  };

  const handleDelete = (pageId, e) => {
    e.stopPropagation();
    const page = pages.find(p => p.id === pageId);
    if (window.confirm(`Sigur vrei să ștergi pagina "${page?.name}"?`)) {
      onDeletePage(pageId);
    }
    setMenuOpenId(null);
  };

  const handleRename = (pageId, e) => {
    e.stopPropagation();
    const page = pages.find(p => p.id === pageId);
    setEditingId(pageId);
    setEditName(page?.name || '');
    setMenuOpenId(null);
  };

  const handleSaveRename = (pageId) => {
    if (editName.trim()) {
      onRenamePage(pageId, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full border-r border-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-bold mb-3">Pagini</h2>
        <Button
          onClick={onCreatePage}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Creează Pagină Nouă
        </Button>
      </div>

      {/* Pages List */}
      <div className="flex-1 overflow-y-auto">
        {pages.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nu există pagini</p>
            <p className="text-xs mt-1">Creează prima pagină</p>
          </div>
        ) : (
          <div className="p-2">
            {pages.map((page) => (
              <div
                key={page.id}
                className={`relative group rounded-lg mb-1 cursor-pointer transition-all ${
                  currentPageId === page.id
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
                onClick={() => onSelectPage(page.id)}
              >
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {page.is_home ? (
                      <Home className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 flex-shrink-0" />
                    )}
                    
                    {editingId === page.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onBlur={() => handleSaveRename(page.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveRename(page.id);
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        autoFocus
                      />
                    ) : (
                      <span className="flex-1 text-sm font-medium truncate">
                        {page.name}
                      </span>
                    )}
                  </div>

                  {editingId !== page.id && (
                    <button
                      onClick={(e) => handleMenuToggle(page.id, e)}
                      className={`p-1 rounded hover:bg-gray-700 ${
                        menuOpenId === page.id ? 'bg-gray-700' : ''
                      }`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Context Menu */}
                {menuOpenId === page.id && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMenuOpenId(null)}
                    />
                    <div className="absolute right-2 top-12 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 py-1 w-40">
                      <button
                        onClick={(e) => handleRename(page.id, e)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2"
                      >
                        <Edit2 className="w-3 h-3" />
                        Redenumește
                      </button>
                      {!page.is_home && (
                        <button
                          onClick={(e) => handleDelete(page.id, e)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 text-red-400 flex items-center gap-2"
                        >
                          <Trash2 className="w-3 h-3" />
                          Șterge
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-400">
        <p>{pages.length} {pages.length === 1 ? 'pagină' : 'pagini'}</p>
      </div>
    </div>
  );
};

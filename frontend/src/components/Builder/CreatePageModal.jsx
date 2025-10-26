import React, { useState } from 'react';
import { X, Plus, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const CreatePageModal = ({ isOpen, onClose, onCreatePage, onDuplicatePage, pages }) => {
  const [pageType, setPageType] = useState('blank'); // 'blank' or 'duplicate'
  const [pageName, setPageName] = useState('');
  const [selectedPageId, setSelectedPageId] = useState('');

  const handleCreate = () => {
    console.log('🔷 handleCreate called', { pageName, pageType, selectedPageId });
    
    if (!pageName.trim()) {
      alert('Te rog introdu un nume pentru pagină');
      return;
    }

    if (pageType === 'blank') {
      console.log('🔷 Creating blank page:', pageName);
      onCreatePage(pageName);
    } else {
      if (!selectedPageId) {
        alert('Te rog selectează o pagină de duplicat');
        return;
      }
      console.log('🔷 Duplicating page:', selectedPageId, 'as', pageName);
      onDuplicatePage(selectedPageId, pageName);
    }

    // Reset form
    setPageName('');
    setPageType('blank');
    setSelectedPageId('');
    console.log('🔷 Closing modal');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Creează Pagină Nouă</h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Page Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Tip pagină</Label>
            
            <div 
              className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                pageType === 'blank' 
                  ? 'border-indigo-600 bg-indigo-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setPageType('blank')}
            >
              <input
                type="radio"
                name="pageType"
                value="blank"
                checked={pageType === 'blank'}
                onChange={() => setPageType('blank')}
                className="w-4 h-4 text-indigo-600"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-900">Pagină Goală</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Începe de la zero</p>
              </div>
            </div>

            <div 
              className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                pageType === 'duplicate' 
                  ? 'border-indigo-600 bg-indigo-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setPageType('duplicate')}
            >
              <input
                type="radio"
                name="pageType"
                value="duplicate"
                checked={pageType === 'duplicate'}
                onChange={() => setPageType('duplicate')}
                className="w-4 h-4 text-indigo-600"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Copy className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-900">Duplicare Pagină</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Copiază o pagină existentă</p>
              </div>
            </div>
          </div>

          {/* Page Name */}
          <div>
            <Label htmlFor="pageName" className="text-sm font-medium text-gray-700">
              Nume pagină *
            </Label>
            <Input
              id="pageName"
              type="text"
              placeholder="ex: Despre Noi, Servicii, Contact"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Select Page to Duplicate */}
          {pageType === 'duplicate' && pages.length > 0 && (
            <div>
              <Label htmlFor="selectPage" className="text-sm font-medium text-gray-700">
                Selectează pagina de duplicat *
              </Label>
              <select
                id="selectPage"
                value={selectedPageId}
                onChange={(e) => setSelectedPageId(e.target.value)}
                className="mt-1 w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">-- Selectează o pagină --</option>
                {pages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.name} {page.is_home ? '(Home)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          {pageType === 'duplicate' && pages.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                Nu există pagini de duplicat. Creează mai întâi o pagină.
              </p>
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
            onClick={handleCreate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
          >
            {pageType === 'blank' ? (
              <>
                <Plus className="w-4 h-4" />
                Creează Pagină
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Duplicare Pagină
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

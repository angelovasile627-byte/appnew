import React from 'react';
import { Plus, Save, Download, Eye, Upload, Undo, Redo } from 'lucide-react';
import { Button } from '../ui/button';

export const Toolbar = ({ onAddBlock, onSave, onExport, onPreview, onFTPUpload, onUndo, onRedo, canUndo, canRedo }) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg"></div>
          <h1 className="text-xl font-bold text-gray-900">Mobirise Builder</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onAddBlock}
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Adaugă Bloc
        </Button>

        <div className="h-6 w-px bg-gray-300"></div>

        <Button
          onClick={onUndo}
          variant="outline"
          className="flex items-center gap-2"
          disabled={!canUndo}
        >
          <Undo className="w-4 h-4" />
          Anulează
        </Button>

        <Button
          onClick={onRedo}
          variant="outline"
          className="flex items-center gap-2"
          disabled={!canRedo}
        >
          <Redo className="w-4 h-4" />
          Refă
        </Button>

        <div className="h-6 w-px bg-gray-300"></div>

        <Button
          onClick={onSave}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Salvează
        </Button>

        <Button
          onClick={onPreview}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Previzualizare
        </Button>

        <Button
          onClick={onExport}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Exportă
        </Button>

        <Button
          onClick={onFTPUpload}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Încărcare FTP
        </Button>
      </div>
    </div>
  );
};
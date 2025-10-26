import React, { useState, useEffect } from 'react';
import { Plus, Save, Download, Eye, Upload, Undo, Redo, Maximize, Minimize, Settings, FileText } from 'lucide-react';
import { Button } from '../ui/button';

export const Toolbar = ({ 
  pages = [],
  currentPageId,
  onSelectPage,
  onAddBlock, 
  onSave, 
  onExport, 
  onPreview, 
  onFTPUpload, 
  onUndo, 
  onRedo, 
  onOpenSettings,
  canUndo, 
  canRedo 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check fullscreen state on mount and listen for changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(document.fullscreenElement || 
           document.webkitFullscreenElement || 
           document.mozFullScreenElement || 
           document.msFullscreenElement)
      );
    };

    // Add listeners for all browser variants
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    console.log('Toggle fullscreen clicked');
    try {
      if (!document.fullscreenElement) {
        console.log('Entering fullscreen...');
        // Try multiple methods for better browser compatibility
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          await elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
        console.log('Fullscreen activated');
      } else {
        console.log('Exiting fullscreen...');
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
        console.log('Fullscreen exited');
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
      alert('Nu s-a putut activa modul fullscreen. Vă rugăm să încercați din nou sau să folosiți tasta F11.');
    }
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg"></div>
          <h1 className="text-xl font-bold text-gray-900">AXXO Builder</h1>
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

        <div className="h-6 w-px bg-gray-300"></div>

        <Button
          onClick={toggleFullscreen}
          variant="outline"
          className="flex items-center gap-2"
          title={isFullscreen ? 'Ieși din modul fullscreen' : 'Activează modul fullscreen'}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};
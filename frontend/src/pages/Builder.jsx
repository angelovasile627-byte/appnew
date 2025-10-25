import React, { useState } from 'react';
import { Toolbar } from '../components/Builder/Toolbar';
import { Canvas } from '../components/Builder/Canvas';
import { BlockLibrary } from '../components/Builder/BlockLibrary';
import { EditingPanel } from '../components/Builder/EditingPanel';
import { PreviewModal } from '../components/Builder/PreviewModal';
import { FTPDialog } from '../components/Builder/FTPDialog';
import { useToast } from '../hooks/use-toast';

const Builder = () => {
  const [blocks, setBlocks] = useState([]);
  const [history, setHistory] = useState({ past: [], future: [] });
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isFTPDialogOpen, setIsFTPDialogOpen] = useState(false);
  const { toast } = useToast();

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  // Function to save current state to history before making changes
  const saveToHistory = (currentBlocks) => {
    setHistory(prev => ({
      past: [...prev.past, currentBlocks],
      future: [] // Clear future when new action is made
    }));
  };

  const handleAddBlock = (template) => {
    saveToHistory(blocks);
    const newBlock = {
      id: `block-${Date.now()}`,
      templateId: template.id,
      config: JSON.parse(JSON.stringify(template.config)) // Deep clone
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    toast({
      title: 'Bloc adăugat',
      description: `${template.name} a fost adăugat pe pagină`
    });
  };

  const handleUpdateBlock = (blockId, newConfig) => {
    saveToHistory(blocks);
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, config: newConfig } : block
    ));
  };

  const handleDeleteBlock = (blockId) => {
    saveToHistory(blocks);
    setBlocks(blocks.filter(block => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
    toast({
      title: 'Bloc șters',
      description: 'Blocul a fost eliminat de pe pagină'
    });
  };

  const handleMoveBlock = (fromIndex, toIndex) => {
    saveToHistory(blocks);
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(newBlocks);
  };

  const handleUndo = () => {
    if (history.past.length === 0) {
      toast({
        title: 'Nu se poate anula',
        description: 'Nu mai există acțiuni de anulat'
      });
      return;
    }
    
    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);
    
    setHistory({
      past: newPast,
      future: [blocks, ...history.future]
    });
    setBlocks(previous);
    toast({
      title: 'Acțiune anulată',
      description: 'Ultima modificare a fost anulată'
    });
  };

  const handleRedo = () => {
    if (history.future.length === 0) {
      toast({
        title: 'Nu se poate reface',
        description: 'Nu mai există acțiuni de refăcut'
      });
      return;
    }
    
    const next = history.future[0];
    const newFuture = history.future.slice(1);
    
    setHistory({
      past: [...history.past, blocks],
      future: newFuture
    });
    setBlocks(next);
    toast({
      title: 'Acțiune refăcută',
      description: 'Modificarea a fost refăcută'
    });
  };

  const handleSave = () => {
    // Mock save - will be connected to backend later
    const projectData = {
      id: 'project-' + Date.now(),
      name: 'Site-ul meu',
      blocks: blocks,
      updatedAt: new Date()
    };
    localStorage.setItem('currentProject', JSON.stringify(projectData));
    toast({
      title: 'Proiect salvat',
      description: 'Site-ul tău a fost salvat cu succes'
    });
  };

  const handleExport = () => {
    // Mock export - will generate HTML/CSS
    toast({
      title: 'Export inițiat',
      description: 'Se generează fișierele HTML și CSS...'
    });
    setTimeout(() => {
      toast({
        title: 'Export complet',
        description: 'Fișierele tale sunt gata pentru descărcare'
      });
    }, 2000);
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleFTPUpload = () => {
    // Mock FTP upload
    toast({
      title: 'Încărcare FTP',
      description: 'Această funcție va fi disponibilă în curând'
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <Toolbar
        onAddBlock={() => setIsLibraryOpen(true)}
        onSave={handleSave}
        onExport={handleExport}
        onPreview={handlePreview}
        onFTPUpload={handleFTPUpload}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={history.past.length > 0}
        canRedo={history.future.length > 0}
      />
      <div className="flex-1 flex overflow-hidden">
        <Canvas
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          onUpdateBlock={handleUpdateBlock}
          onDeleteBlock={handleDeleteBlock}
          onMoveBlock={handleMoveBlock}
        />
        <EditingPanel
          block={selectedBlock}
          onUpdate={(newConfig) => handleUpdateBlock(selectedBlockId, newConfig)}
          onClose={() => setSelectedBlockId(null)}
        />
      </div>
      <BlockLibrary
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onAddBlock={handleAddBlock}
      />
      <PreviewModal
        blocks={blocks}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

export default Builder;
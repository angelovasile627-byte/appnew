import React, { useState, useRef, useEffect } from 'react';
import { Toolbar } from '../components/Builder/Toolbar';
import { Canvas } from '../components/Builder/Canvas';
import { BlockSidebar } from '../components/Builder/BlockSidebar';
import { InlineEditingPanel } from '../components/Builder/InlineEditingPanel';
import { PreviewModal } from '../components/Builder/PreviewModal';
import { FTPDialog } from '../components/Builder/FTPDialog';
import { useToast } from '../hooks/use-toast';

const BuilderNew = () => {
  const [blocks, setBlocks] = useState([]);
  const [history, setHistory] = useState({ past: [], future: [] });
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isFTPDialogOpen, setIsFTPDialogOpen] = useState(false);
  const [editPanelPosition, setEditPanelPosition] = useState({ top: 0, left: 0 });
  const selectedBlockRef = useRef(null);
  const { toast } = useToast();

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);
  
  // Load project from localStorage on mount
  useEffect(() => {
    const savedProject = localStorage.getItem('currentProject');
    if (savedProject) {
      try {
        const projectData = JSON.parse(savedProject);
        if (projectData.blocks && Array.isArray(projectData.blocks)) {
          setBlocks(projectData.blocks);
          toast({
            title: 'Proiect încărcat',
            description: `Proiectul "${projectData.name}" a fost încărcat cu succes`
          });
        }
      } catch (e) {
        console.error('Error loading project:', e);
      }
    }
  }, []);
  
  // Function to save current state to history before making changes
  const saveToHistory = (currentBlocks) => {
    setHistory(prev => ({
      past: [...prev.past, currentBlocks],
      future: [] // Clear future when new action is made
    }));
  };

  // Calculate position for inline editing panel
  useEffect(() => {
    if (selectedBlockId && selectedBlockRef.current) {
      const rect = selectedBlockRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const panelHeight = 500; // Approximate height of the panel
      const panelWidth = 420;
      
      // Calculate top position - try to position above block, but ensure it's visible
      let top = rect.top + scrollTop - panelHeight - 20;
      
      // If panel would be above viewport, position it below the block instead
      if (top < scrollTop + 80) { // 80px for toolbar
        top = rect.bottom + scrollTop + 20;
      }
      
      // Calculate left position - center horizontally but keep on screen
      let left = rect.left + (rect.width / 2) - (panelWidth / 2);
      
      // Ensure panel stays within viewport horizontally
      const maxLeft = window.innerWidth - panelWidth - 20;
      if (left < 20) left = 20;
      if (left > maxLeft) left = maxLeft;
      
      setEditPanelPosition({ top, left });
    }
  }, [selectedBlockId]);

  const handleAddBlock = (template) => {
    saveToHistory(blocks);
    const newBlock = {
      id: `block-${Date.now()}`,
      templateId: template.id,
      config: JSON.parse(JSON.stringify(template.config))
    };
    
    // If it's a Menu block, always add it at the beginning
    if (template.category === 'menu') {
      setBlocks([newBlock, ...blocks]);
    } else {
      setBlocks([...blocks, newBlock]);
    }
    
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
    setIsFTPDialogOpen(true);
  };

  const handleSelectBlock = (blockId) => {
    setSelectedBlockId(blockId);
  };

  return (
    <div className="h-screen flex flex-col">
      <Toolbar
        onAddBlock={() => setIsSidebarOpen(true)}
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
        <BlockSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onAddBlock={handleAddBlock}
        />
        <div className="flex-1 relative">
          <Canvas
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={handleSelectBlock}
            onUpdateBlock={handleUpdateBlock}
            onDeleteBlock={handleDeleteBlock}
            onMoveBlock={handleMoveBlock}
            selectedBlockRef={selectedBlockRef}
          />
          {selectedBlock && (
            <InlineEditingPanel
              block={selectedBlock}
              onUpdate={(newConfig) => handleUpdateBlock(selectedBlockId, newConfig)}
              onClose={() => setSelectedBlockId(null)}
              position={editPanelPosition}
            />
          )}
        </div>
      </div>
      
      {/* Modals */}
      <PreviewModal
        blocks={blocks}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
      
      <FTPDialog
        blocks={blocks}
        isOpen={isFTPDialogOpen}
        onClose={() => setIsFTPDialogOpen(false)}
      />
    </div>
  );
};

export default BuilderNew;

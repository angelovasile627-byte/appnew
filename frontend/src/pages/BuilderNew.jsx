import React, { useState, useRef, useEffect } from 'react';
import { Toolbar } from '../components/Builder/Toolbar';
import { Canvas } from '../components/Builder/Canvas';
import { BlockSidebar } from '../components/Builder/BlockSidebar';
import { InlineEditingPanel } from '../components/Builder/InlineEditingPanel';
import { InlineToolbar } from '../components/Builder/InlineToolbar';
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
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const selectedBlockRef = useRef(null);
  const cleanupInProgressRef = useRef(false);
  const { toast } = useToast();

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);
  
  // Helper function to remove duplicate blocks by ID
  const removeDuplicates = (blocksArray) => {
    const seen = new Set();
    const uniqueBlocks = [];
    
    for (const block of blocksArray) {
      // Use block ID as unique identifier
      if (!seen.has(block.id)) {
        seen.add(block.id);
        uniqueBlocks.push(block);
      }
    }
    
    return uniqueBlocks;
  };
  
  // Auto-clean duplicates whenever blocks change
  React.useEffect(() => {
    if (cleanupInProgressRef.current) return; // Prevent loop
    
    const originalLength = blocks.length;
    const cleanedBlocks = removeDuplicates(blocks);
    
    if (cleanedBlocks.length < originalLength) {
      cleanupInProgressRef.current = true;
      
      setBlocks(cleanedBlocks);
      
      // Update localStorage immediately
      const savedProject = localStorage.getItem('currentProject');
      if (savedProject) {
        try {
          const projectData = JSON.parse(savedProject);
          projectData.blocks = cleanedBlocks;
          localStorage.setItem('currentProject', JSON.stringify(projectData));
        } catch (e) {
          console.error('Error updating localStorage:', e);
        }
      }
      
      const removedCount = originalLength - cleanedBlocks.length;
      toast({
        title: 'Blocuri duplicate eliminate',
        description: `${removedCount} bloc(uri) duplicate au fost eliminate automat`
      });
      
      // Reset flag after a short delay
      setTimeout(() => {
        cleanupInProgressRef.current = false;
      }, 500);
    }
  }, [blocks]);
  
  // Load project from localStorage on mount
  useEffect(() => {
    const savedProject = localStorage.getItem('currentProject');
    if (savedProject) {
      try {
        const projectData = JSON.parse(savedProject);
        if (projectData.blocks && Array.isArray(projectData.blocks)) {
          // Remove duplicate blocks - keep only unique ones by ID
          const cleanedBlocks = removeDuplicates(projectData.blocks);
          
          setBlocks(cleanedBlocks);
          
          const removedCount = projectData.blocks.length - cleanedBlocks.length;
          if (removedCount > 0) {
            toast({
              title: 'Proiect curățat',
              description: `${removedCount} bloc(uri) duplicate au fost eliminate automat`
            });
          } else {
            toast({
              title: 'Proiect încărcat',
              description: `Proiectul "${projectData.name}" a fost încărcat cu succes`
            });
          }
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

  // Calculate position for inline editing panel or toolbar
  useEffect(() => {
    if (selectedBlockId && selectedBlockRef.current) {
      const rect = selectedBlockRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (isMenuBlock) {
        // Position toolbar directly below menu
        setToolbarPosition({ 
          top: rect.bottom + scrollTop + 10,
          left: rect.left + 20
        });
      } else {
        // Keep existing logic for panel
        const panelHeight = 500;
        const panelWidth = 420;
        
        let top = rect.top + scrollTop - panelHeight - 20;
        
        if (top < scrollTop + 80) {
          top = rect.bottom + scrollTop + 20;
        }
        
        let left = rect.left + (rect.width / 2) - (panelWidth / 2);
        
        const maxLeft = window.innerWidth - panelWidth - 20;
        if (left < 20) left = 20;
        if (left > maxLeft) left = maxLeft;
        
        setEditPanelPosition({ top, left });
      }
    }
  }, [selectedBlockId, isMenuBlock]);

  const handleAddBlock = (template) => {
    // Check if trying to add a menu when one already exists
    if (template.category === 'menu') {
      const hasMenuBlock = blocks.some(block => {
        const { blockTemplates } = require('../data/mockBlocks');
        const blockTemplate = blockTemplates.find(t => t.id === block.templateId);
        return blockTemplate && blockTemplate.category === 'menu';
      });
      
      if (hasMenuBlock) {
        toast({
          title: 'Meniu existent',
          description: 'Există deja un bloc de meniu pe pagină. Vă rugăm să ștergeți meniul existent înainte de a adăuga unul nou.',
          variant: 'destructive'
        });
        return;
      }
    }
    
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
    const movedBlock = blocks[fromIndex];
    
    // Import blockTemplates to check if it's a menu
    const { blockTemplates } = require('../data/mockBlocks');
    const template = blockTemplates.find(t => t.id === movedBlock.templateId);
    
    // If moving a menu block, it should always stay at position 0
    if (template && template.category === 'menu' && toIndex !== 0) {
      toast({
        title: 'Meniul trebuie să fie primul',
        description: 'Meniul trebuie să fie întotdeauna primul element din pagină',
        variant: 'destructive'
      });
      return;
    }
    
    // If moving another block to position 0 and there's a menu at position 0
    if (toIndex === 0 && fromIndex !== 0) {
      const firstBlock = blocks[0];
      const firstTemplate = blockTemplates.find(t => t.id === firstBlock.templateId);
      if (firstTemplate && firstTemplate.category === 'menu') {
        toast({
          title: 'Meniul trebuie să fie primul',
          description: 'Nu poți muta alte blocuri înaintea meniului',
          variant: 'destructive'
        });
        return;
      }
    }
    
    saveToHistory(blocks);
    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, moved);
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

  const handleAddMenuItem = () => {
    if (selectedBlock && selectedBlock.config.menuItems) {
      const newMenuItems = [
        ...(selectedBlock.config.menuItems || []), 
        { text: 'New Link', link: '#', color: '#1a1a2e', show: true }
      ];
      const newConfig = { ...selectedBlock.config, menuItems: newMenuItems };
      handleUpdateBlock(selectedBlockId, newConfig);
      toast({
        title: 'Item adăugat',
        description: 'Un nou item a fost adăugat în meniu'
      });
    }
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
          
          {/* Show InlineToolbar for Menu, InlineEditingPanel for others */}
          {selectedBlock && isMenuBlock && (
            <InlineToolbar
              block={selectedBlock}
              onUpdate={(newConfig) => handleUpdateBlock(selectedBlockId, newConfig)}
              onDelete={() => handleDeleteBlock(selectedBlockId)}
              onAddMenuItem={handleAddMenuItem}
              position={toolbarPosition}
            />
          )}
          
          {selectedBlock && !isMenuBlock && (
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

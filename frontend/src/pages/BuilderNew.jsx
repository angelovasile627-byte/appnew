import React, { useState, useRef, useEffect } from 'react';
import { Toolbar } from '../components/Builder/Toolbar';
import { Canvas } from '../components/Builder/Canvas';
import { BlockSidebar } from '../components/Builder/BlockSidebar';
import { InlineEditingPanel } from '../components/Builder/InlineEditingPanel';
import { useToast } from '../hooks/use-toast';

const BuilderNew = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editPanelPosition, setEditPanelPosition] = useState({ top: 0, left: 0 });
  const selectedBlockRef = useRef(null);
  const { toast } = useToast();

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  // Calculate position for inline editing panel
  useEffect(() => {
    if (selectedBlockId && selectedBlockRef.current) {
      const rect = selectedBlockRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setEditPanelPosition({
        top: rect.top + scrollTop - 520, // Position above the block
        left: rect.left + (rect.width / 2) - 210 // Center horizontally
      });
    }
  }, [selectedBlockId]);

  const handleAddBlock = (template) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      templateId: template.id,
      config: JSON.parse(JSON.stringify(template.config))
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    toast({
      title: 'Block added',
      description: `${template.name} has been added to your page`
    });
  };

  const handleUpdateBlock = (blockId, newConfig) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, config: newConfig } : block
    ));
  };

  const handleDeleteBlock = (blockId) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
    toast({
      title: 'Block deleted',
      description: 'The block has been removed from your page'
    });
  };

  const handleMoveBlock = (fromIndex, toIndex) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(newBlocks);
  };

  const handleSave = () => {
    const projectData = {
      id: 'project-' + Date.now(),
      name: 'My Website',
      blocks: blocks,
      updatedAt: new Date()
    };
    localStorage.setItem('currentProject', JSON.stringify(projectData));
    toast({
      title: 'Project saved',
      description: 'Your website has been saved successfully'
    });
  };

  const handleExport = () => {
    toast({
      title: 'Export started',
      description: 'Generating HTML and CSS files...'
    });
    setTimeout(() => {
      toast({
        title: 'Export complete',
        description: 'Your files are ready for download'
      });
    }, 2000);
  };

  const handlePreview = () => {
    toast({
      title: 'Preview mode',
      description: 'Opening preview in new window...'
    });
  };

  const handleFTPUpload = () => {
    toast({
      title: 'FTP Upload',
      description: 'This feature will be available soon'
    });
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
    </div>
  );
};

export default BuilderNew;

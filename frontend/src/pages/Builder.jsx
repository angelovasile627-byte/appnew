import React, { useState } from 'react';
import { Toolbar } from '../components/Builder/Toolbar';
import { Canvas } from '../components/Builder/Canvas';
import { BlockLibrary } from '../components/Builder/BlockLibrary';
import { EditingPanel } from '../components/Builder/EditingPanel';
import { useToast } from '../hooks/use-toast';

const Builder = () => {
  const [blocks, setBlocks] = useState([]);
  const [history, setHistory] = useState({ past: [], future: [] });
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
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
    const newBlock = {
      id: `block-${Date.now()}`,
      templateId: template.id,
      config: JSON.parse(JSON.stringify(template.config)) // Deep clone
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
    // Mock save - will be connected to backend later
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
    // Mock export - will generate HTML/CSS
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
    // Mock preview
    toast({
      title: 'Preview mode',
      description: 'Opening preview in new window...'
    });
  };

  const handleFTPUpload = () => {
    // Mock FTP upload
    toast({
      title: 'FTP Upload',
      description: 'This feature will be available soon'
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
    </div>
  );
};

export default Builder;
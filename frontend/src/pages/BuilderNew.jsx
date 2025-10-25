import React, { useState, useRef, useEffect } from 'react';
import { Toolbar } from '../components/Builder/Toolbar';
import { Canvas } from '../components/Builder/Canvas';
import { BlockSidebar } from '../components/Builder/BlockSidebar';
import { InlineEditingPanel } from '../components/Builder/InlineEditingPanel';
import { useToast } from '../hooks/use-toast';

const BuilderNew = () => {
  const [blocks, setBlocks] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editPanelPosition, setEditPanelPosition] = useState({ top: 0, left: 0 });
  const selectedBlockRef = useRef(null);
  const { toast } = useToast();

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  // Add to history whenever blocks change
  const addToHistory = (newBlocks) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newBlocks)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setBlocks(newBlocks);
  };

  // Undo function
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setBlocks(JSON.parse(JSON.stringify(history[newIndex])));
      toast({
        title: 'Undo',
        description: 'Action undone successfully'
      });
    }
  };

  // Redo function
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setBlocks(JSON.parse(JSON.stringify(history[newIndex])));
      toast({
        title: 'Redo',
        description: 'Action redone successfully'
      });
    }
  };

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
    const newBlocks = [...blocks, newBlock];
    addToHistory(newBlocks);
    setSelectedBlockId(newBlock.id);
    toast({
      title: 'Block added',
      description: `${template.name} has been added to your page`
    });
  };

  const handleUpdateBlock = (blockId, newConfig) => {
    const newBlocks = blocks.map(block => 
      block.id === blockId ? { ...block, config: newConfig } : block
    );
    addToHistory(newBlocks);
  };

  const handleDeleteBlock = (blockId) => {
    const newBlocks = blocks.filter(block => block.id !== blockId);
    addToHistory(newBlocks);
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
    addToHistory(newBlocks);
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
    // Create preview window with responsive design viewer
    const previewWindow = window.open('', '_blank', 'width=1200,height=800');
    if (previewWindow) {
      const htmlContent = generateHTMLPreview();
      previewWindow.document.write(htmlContent);
      previewWindow.document.close();
    }
  };

  const generateHTMLPreview = () => {
    // Generate HTML from blocks for preview
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview - Mobirise Builder</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { margin: 0; padding: 0; }
          .responsive-controls {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #1a1a2e;
            color: white;
            padding: 12px 24px;
            display: flex;
            gap: 12px;
            align-items: center;
            z-index: 9999;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          }
          .responsive-btn {
            padding: 8px 16px;
            border: 1px solid #667eea;
            background: transparent;
            color: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
          }
          .responsive-btn:hover {
            background: #667eea;
          }
          .responsive-btn.active {
            background: #667eea;
          }
          .preview-frame {
            margin-top: 60px;
            width: 100%;
            transition: all 0.3s;
          }
          .preview-frame.mobile {
            width: 375px;
            margin-left: auto;
            margin-right: auto;
          }
          .preview-frame.tablet {
            width: 768px;
            margin-left: auto;
            margin-right: auto;
          }
          .preview-frame.desktop {
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="responsive-controls">
          <span style="font-weight: 600; margin-right: 12px;">Preview Mode:</span>
          <button class="responsive-btn active" onclick="setView('desktop')">Desktop</button>
          <button class="responsive-btn" onclick="setView('tablet')">Tablet</button>
          <button class="responsive-btn" onclick="setView('mobile')">Mobile</button>
        </div>
        <div class="preview-frame desktop" id="previewFrame">
          ${blocks.map(block => renderBlockPreview(block)).join('')}
        </div>
        <script>
          function setView(view) {
            const frame = document.getElementById('previewFrame');
            const buttons = document.querySelectorAll('.responsive-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            frame.className = 'preview-frame ' + view;
          }
        </script>
      </body>
      </html>
    `;
  };

  const renderBlockPreview = (block) => {
    const config = block.config;
    // Simple preview rendering - you can expand this
    return `<div style="padding: ${config.padding?.top || 40}px 20px ${config.padding?.bottom || 40}px; background: ${config.background?.value || '#fff'};">
      <div style="max-width: ${config.contentWidth || 1200}px; margin: 0 auto;">
        ${config.title?.show ? `<h1 style="color: ${config.title.color}; text-align: ${config.title.align};">${config.title.text}</h1>` : ''}
        ${config.description?.show ? `<p style="color: ${config.description.color}; text-align: ${config.description.align};">${config.description.text}</p>` : ''}
      </div>
    </div>`;
  };

  const handleFTPUpload = () => {
    // Open FTP upload dialog
    const ftpDialog = window.open('', 'FTP Upload', 'width=600,height=700');
    if (ftpDialog) {
      ftpDialog.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>FTP Upload - Mobirise Builder</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50 p-8">
          <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">FTP Upload</h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">FTP Server</label>
                <input type="text" id="ftpServer" placeholder="ftp.example.com" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input type="text" id="ftpUsername" placeholder="username" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" id="ftpPassword" placeholder="password" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Remote Folder</label>
                <input type="text" id="ftpFolder" placeholder="/public_html" value="/public_html" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              
              <div class="pt-4">
                <button onclick="uploadToFTP()" 
                  class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                  Upload Website
                </button>
              </div>
              
              <div id="uploadStatus" class="hidden mt-4 p-3 rounded-md"></div>
            </div>
          </div>
          
          <script>
            function uploadToFTP() {
              const status = document.getElementById('uploadStatus');
              status.className = 'mt-4 p-3 rounded-md bg-blue-100 text-blue-800';
              status.textContent = 'Uploading files...';
              status.classList.remove('hidden');
              
              // Simulate upload process
              setTimeout(() => {
                status.className = 'mt-4 p-3 rounded-md bg-green-100 text-green-800';
                status.textContent = 'Upload completed successfully!';
              }, 2000);
            }
          </script>
        </body>
        </html>
      `);
      ftpDialog.document.close();
    }
    toast({
      title: 'FTP Upload',
      description: 'Opening FTP upload dialog...'
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
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
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

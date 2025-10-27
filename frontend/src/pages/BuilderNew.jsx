import React, { useState, useRef, useEffect } from 'react';
import { Toolbar } from '../components/Builder/Toolbar';
import { Canvas } from '../components/Builder/Canvas';
import { BlockSidebar } from '../components/Builder/BlockSidebar';
import { InlineEditingPanel } from '../components/Builder/InlineEditingPanel';
import { InlineToolbar } from '../components/Builder/InlineToolbar';
import { PreviewModal } from '../components/Builder/PreviewModal';
import { FTPDialog } from '../components/Builder/FTPDialog';
import { SettingsModal } from '../components/Builder/SettingsModal';
import { ConfirmDialog } from '../components/Builder/ConfirmDialog';
import { useToast } from '../hooks/use-toast';

const BuilderNew = () => {
  // Pages state
  const [pages, setPages] = useState([]);
  const [currentPageId, setCurrentPageId] = useState(null);
  const [sharedMenu, setSharedMenu] = useState(null);
  const [projectId, setProjectId] = useState('project-default');
  const [settings, setSettings] = useState(null);
  
  // UI state
  const [history, setHistory] = useState({ past: [], future: [] });
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isFTPDialogOpen, setIsFTPDialogOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [blockToDelete, setBlockToDelete] = useState(null);
  const [editPanelPosition, setEditPanelPosition] = useState({ top: 0, left: 0 });
  const selectedBlockRef = useRef(null);
  const cleanupInProgressRef = useRef(false);
  const { toast } = useToast();

  // Get current page
  const currentPage = pages.find(p => p.id === currentPageId);
  const blocks = currentPage ? currentPage.blocks : [];
  
  // Combine shared menu with current page blocks
  const allBlocks = sharedMenu ? [sharedMenu, ...blocks] : blocks;
  
  // Find selected block in allBlocks (includes menu)
  const selectedBlock = allBlocks.find(b => b.id === selectedBlockId);


  // Load project from localStorage on mount
  useEffect(() => {
    const loadProject = () => {
      const savedData = localStorage.getItem('axxo_builder_project');
      if (savedData) {
        try {
          const projectData = JSON.parse(savedData);
          
          setProjectId(projectData.projectId || 'project-default');
          setPages(projectData.pages || []);
          setSharedMenu(projectData.sharedMenu || null);
          setSettings(projectData.settings || null);
          setCurrentPageId(projectData.currentPageId || (projectData.pages && projectData.pages[0]?.id));
          
          toast({
            title: 'Proiect încărcat',
            description: `${projectData.pages?.length || 0} pagini încărcate`
          });
        } catch (e) {
          console.error('Error loading project:', e);
          initializeDefaultPage();
        }
      } else {
        initializeDefaultPage();
      }
    };

    loadProject();
  }, []);

  // Initialize with default Home page
  const initializeDefaultPage = () => {
    const homePage = {
      id: `page-${Date.now()}`,
      name: 'Home',
      blocks: [],
      is_home: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setPages([homePage]);
    setCurrentPageId(homePage.id);
    saveToLocalStorage([homePage], null, homePage.id);
  };

  // Save to localStorage whenever pages, sharedMenu, settings, or currentPageId change
  useEffect(() => {
    if (pages.length > 0) {
      saveToLocalStorage(pages, sharedMenu, settings, currentPageId);
    }
  }, [pages, sharedMenu, settings, currentPageId]);

  const saveToLocalStorage = (pagesData, menuData, settingsData, pageId) => {
    const projectData = {
      projectId: projectId,
      pages: pagesData,
      sharedMenu: menuData,
      settings: settingsData,
      currentPageId: pageId,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('axxo_builder_project', JSON.stringify(projectData));
  };

  
  // Function to save current state to history before making changes
  const saveToHistory = (currentBlocks) => {
    setHistory(prev => ({
      past: [...prev.past, currentBlocks],
      future: [] // Clear future when new action is made
    }));
  };

  // ============ PAGES FUNCTIONS ============
  
  const handleCreatePage = (pageName) => {
    console.log('🔵 handleCreatePage called with:', pageName);
    console.log('🔵 Current pages:', pages);
    
    const newPage = {
      id: `page-${Date.now()}`,
      name: pageName,
      blocks: [],
      is_home: pages.length === 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('🔵 New page created:', newPage);
    
    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    setCurrentPageId(newPage.id);
    
    console.log('🔵 Pages updated to:', updatedPages);
    
    toast({
      title: 'Pagină creată',
      description: `Pagina "${pageName}" a fost creată cu succes`
    });
  };

  const handleDuplicatePage = (pageId, newPageName) => {
    const pageToDuplicate = pages.find(p => p.id === pageId);
    if (!pageToDuplicate) return;

    const newPage = {
      id: `page-${Date.now()}`,
      name: newPageName,
      blocks: JSON.parse(JSON.stringify(pageToDuplicate.blocks)), // Deep clone
      is_home: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    setCurrentPageId(newPage.id);
    
    toast({
      title: 'Pagină duplicată',
      description: `Pagina "${newPageName}" a fost creată din "${pageToDuplicate.name}"`
    });
  };

  const handleSelectPage = (pageId) => {
    setCurrentPageId(pageId);
    setSelectedBlockId(null);
  };

  const handleDeletePage = (pageId) => {
    const page = pages.find(p => p.id === pageId);
    
    if (page?.is_home && pages.length > 1) {
      toast({
        title: 'Nu se poate șterge',
        description: 'Nu poți șterge pagina Home. Setează mai întâi altă pagină ca Home.',
        variant: 'destructive'
      });
      return;
    }

    const updatedPages = pages.filter(p => p.id !== pageId);
    setPages(updatedPages);
    
    if (currentPageId === pageId && updatedPages.length > 0) {
      setCurrentPageId(updatedPages[0].id);
    }
    
    toast({
      title: 'Pagină ștearsă',
      description: `Pagina a fost eliminată`
    });
  };

  const handleRenamePage = (pageId, newName) => {
    const updatedPages = pages.map(p => 
      p.id === pageId 
        ? { ...p, name: newName, updated_at: new Date().toISOString() } 
        : p
    );
    setPages(updatedPages);
    
    toast({
      title: 'Pagină redenumită',
      description: `Pagina a fost redenumită în "${newName}"`
    });
  };

  const updateCurrentPageBlocks = (newBlocks) => {
    const updatedPages = pages.map(p => 
      p.id === currentPageId 
        ? { ...p, blocks: newBlocks, updated_at: new Date().toISOString() } 
        : p
    );
    setPages(updatedPages);
  };


  // Calculate position for inline editing panel
  useEffect(() => {
    if (selectedBlockId && selectedBlockRef.current) {
      const rect = selectedBlockRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Always use panel positioning for all blocks (including menu)
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
  }, [selectedBlockId]);

  // ============ BLOCKS FUNCTIONS ============

  const handleAddBlock = (template) => {
    if (!currentPageId) {
      toast({
        title: 'Nicio pagină selectată',
        description: 'Creează sau selectează o pagină mai întâi',
        variant: 'destructive'
      });
      return;
    }

    // Check if trying to add a menu
    if (template.category === 'menu') {
      // Menu is shared, not per-page
      if (sharedMenu) {
        toast({
          title: 'Meniu existent',
          description: 'Există deja un meniu partajat pentru toate paginile. Șterge-l mai întâi.',
          variant: 'destructive'
        });
        return;
      }
      
      const newMenuBlock = {
        id: `block-${Date.now()}`,
        templateId: template.id,
        config: JSON.parse(JSON.stringify(template.config))
      };
      
      setSharedMenu(newMenuBlock);
      setSelectedBlockId(newMenuBlock.id);
      
      toast({
        title: 'Meniu adăugat',
        description: `${template.name} a fost adăugat ca meniu partajat`
      });
      return;
    }
    
    // Regular block
    saveToHistory(blocks);
    const newBlock = {
      id: `block-${Date.now()}`,
      templateId: template.id,
      config: JSON.parse(JSON.stringify(template.config))
    };
    
    const newBlocks = [...blocks, newBlock];
    updateCurrentPageBlocks(newBlocks);
    
    setSelectedBlockId(newBlock.id);
    toast({
      title: 'Bloc adăugat',
      description: `${template.name} a fost adăugat pe pagină`
    });
  };

  const handleUpdateBlock = (blockId, newConfig) => {
    // Check if it's the shared menu
    if (sharedMenu && sharedMenu.id === blockId) {
      setSharedMenu({ ...sharedMenu, config: newConfig });
      return;
    }
    
    // Regular block
    saveToHistory(blocks);
    const newBlocks = blocks.map(block => 
      block.id === blockId ? { ...block, config: newConfig } : block
    );
    updateCurrentPageBlocks(newBlocks);
  };

  const handleDeleteBlock = (blockId) => {
    // Check if it's the shared menu
    if (sharedMenu && sharedMenu.id === blockId) {
      // Show confirm dialog for menu deletion
      setBlockToDelete(blockId);
      setIsConfirmDeleteOpen(true);
      return;
    }
    
    // Regular block - delete immediately
    saveToHistory(blocks);
    const newBlocks = blocks.filter(block => block.id !== blockId);
    updateCurrentPageBlocks(newBlocks);
    
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
    toast({
      title: 'Bloc șters',
      description: 'Blocul a fost eliminat de pe pagină'
    });
  };

  const confirmDeleteMenu = () => {
    setSharedMenu(null);
    if (selectedBlockId === blockToDelete) {
      setSelectedBlockId(null);
    }
    setBlockToDelete(null);
    toast({
      title: 'Meniu șters',
      description: 'Meniul partajat a fost eliminat de pe toate paginile'
    });
  };

  const handleMoveBlock = (fromIndex, toIndex) => {
    // If menu is present, adjust indices (menu is at index 0 in allBlocks)
    const hasMenu = sharedMenu !== null;
    
    // Check if trying to move the menu
    if (hasMenu && (fromIndex === 0 || toIndex === 0)) {
      toast({
        title: 'Nu se poate muta meniul',
        description: 'Meniul trebuie să rămână în partea de sus',
        variant: 'destructive'
      });
      return;
    }
    
    // Adjust indices to account for menu offset
    const adjustedFromIndex = hasMenu ? fromIndex - 1 : fromIndex;
    const adjustedToIndex = hasMenu ? toIndex - 1 : toIndex;
    
    saveToHistory(blocks);
    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(adjustedFromIndex, 1);
    newBlocks.splice(adjustedToIndex, 0, moved);
    updateCurrentPageBlocks(newBlocks);
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
    updateCurrentPageBlocks(previous);
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
    updateCurrentPageBlocks(next);
    toast({
      title: 'Acțiune refăcută',
      description: 'Modificarea a fost refăcută'
    });
  };

  const handleSave = () => {
    saveToLocalStorage(pages, sharedMenu, settings, currentPageId);
    toast({
      title: 'Proiect salvat',
      description: `${pages.length} ${pages.length === 1 ? 'pagină salvată' : 'pagini salvate'}`
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

  const handleOpenSettings = () => {
    setIsSettingsModalOpen(true);
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setIsSettingsModalOpen(false);
    toast({
      title: 'Setări salvate',
      description: 'Setările proiectului au fost actualizate'
    });
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
        pages={pages}
        currentPageId={currentPageId}
        onSelectPage={handleSelectPage}
        onAddBlock={() => setIsSidebarOpen(true)}
        onSave={handleSave}
        onExport={handleExport}
        onPreview={handlePreview}
        onFTPUpload={handleFTPUpload}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onOpenSettings={handleOpenSettings}
        canUndo={history.past.length > 0}
        canRedo={history.future.length > 0}
      />
      <div className="flex-1 flex overflow-hidden">
        {/* Blocks Sidebar */}
        <BlockSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onAddBlock={handleAddBlock}
        />
        
        <div className="flex-1 relative">
          {currentPageId ? (
            <>
              <Canvas
                blocks={allBlocks}
                selectedBlockId={selectedBlockId}
                onSelectBlock={handleSelectBlock}
                onUpdateBlock={handleUpdateBlock}
                onDeleteBlock={handleDeleteBlock}
                onMoveBlock={handleMoveBlock}
                selectedBlockRef={selectedBlockRef}
              />
              
              {/* Show InlineEditingPanel for ALL blocks (including menu) */}
              {selectedBlock && (
                <InlineEditingPanel
                  block={selectedBlock}
                  onUpdate={(newConfig) => handleUpdateBlock(selectedBlockId, newConfig)}
                  onClose={() => setSelectedBlockId(null)}
                  position={editPanelPosition}
                />
              )}
              
              {/* Show InlineEditingPanel for shared menu */}
              {sharedMenu && selectedBlockId === sharedMenu.id && (
                <InlineEditingPanel
                  block={sharedMenu}
                  onUpdate={(newConfig) => handleUpdateBlock(sharedMenu.id, newConfig)}
                  onClose={() => setSelectedBlockId(null)}
                  position={editPanelPosition}
                />
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <p className="text-lg mb-2">Nicio pagină selectată</p>
                <p className="text-sm">Creează sau selectează o pagină pentru a începe</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      <PreviewModal
        blocks={allBlocks}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
      
      <FTPDialog
        blocks={allBlocks}
        isOpen={isFTPDialogOpen}
        onClose={() => setIsFTPDialogOpen(false)}
      />
      
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        projectId={projectId}
        initialSettings={settings}
        onSave={handleSaveSettings}
        pages={pages}
        onCreatePage={handleCreatePage}
        onDuplicatePage={handleDuplicatePage}
        onRenamePage={handleRenamePage}
        onDeletePage={handleDeletePage}
      />
    </div>
  );
};

export default BuilderNew;

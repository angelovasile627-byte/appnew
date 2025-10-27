import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { blockTemplates } from '../../data/mockBlocks';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const BlockSidebar = ({ isOpen, onToggle, onAddBlock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'menu', 'hero', 'features', 'article', 'intro', 'cta', 'gallery', 'testimonial', 'contact', 'pricing', 'footer', 'team', 'stats', 'faq'];

  const filteredBlocks = blockTemplates.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-r-lg shadow-lg hover:bg-indigo-700 transition-colors z-40"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Blocks</h2>
        <button
          onClick={onToggle}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredBlocks.map(block => {
            // Generate dynamic thumbnail preview based on config
            const renderThumbnail = () => {
              const config = block.config;
              
              if (config.type === 'menu') {
                return (
                  <div style={{
                    background: '#f8f9fa',
                    padding: '6px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    {/* Header cu title și descriere */}
                    <div style={{
                      fontSize: '7px',
                      fontWeight: '600',
                      color: '#1a1a2e',
                      lineHeight: '1.2'
                    }}>
                      {block.name}
                    </div>
                    <div style={{
                      fontSize: '5px',
                      color: '#6b7280',
                      lineHeight: '1.2'
                    }}>
                      {config.type.charAt(0).toUpperCase() + config.type.slice(1)}
                    </div>
                    
                    {/* Menu Preview cu chenar */}
                    <div style={{
                      background: config.background.value,
                      border: '1px solid #e5e7eb',
                      borderRadius: '3px',
                      padding: '6px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '2px'
                    }}>
                      <div style={{ color: config.logo.color, fontWeight: 'bold', fontSize: '7px' }}>
                        {config.logo.text}
                      </div>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {config.menuItems.slice(0, 3).map((item, i) => (
                          <span key={i} style={{ color: item.color, fontSize: '5px' }}>
                            {item.text}
                          </span>
                        ))}
                        {config.button?.show && (
                          <div style={{
                            background: config.button.color,
                            color: config.button.textColor,
                            padding: '2px 6px',
                            borderRadius: '3px',
                            fontSize: '5px',
                            fontWeight: '600'
                          }}>
                            {config.button.text}
                          </div>
                        )}
                        {config.socialIcons?.show && config.socialIcons?.items?.length > 0 && (
                          <div style={{ display: 'flex', gap: '3px', marginLeft: '4px' }}>
                            {config.socialIcons.items.slice(0, 3).map((icon, i) => (
                              <div
                                key={i}
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '2px',
                                  background: icon.color,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <span style={{ color: 'white', fontSize: '6px' }}>•</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
              
              if (config.type === 'hero') {
                const bgStyle = config.background.type === 'gradient'
                  ? { background: config.background.value }
                  : config.background.type === 'image'
                  ? { 
                      backgroundImage: `url(${config.background.value})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }
                  : { background: config.background.value };
                
                return (
                  <div style={{
                    ...bgStyle,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px 12px',
                    height: '100%',
                    textAlign: config.title.align
                  }}>
                    {config.background.overlay && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: config.background.overlayColor || 'rgba(0,0,0,0.5)'
                      }}></div>
                    )}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        color: config.title.color,
                        fontWeight: 'bold',
                        fontSize: '10px',
                        marginBottom: '4px',
                        lineHeight: 1.2
                      }}>
                        {config.title.text}
                      </div>
                      {config.description.show && (
                        <div style={{
                          color: config.description.color,
                          fontSize: '5px',
                          marginBottom: '6px',
                          lineHeight: 1.3
                        }}>
                          {config.description.text.substring(0, 60)}...
                        </div>
                      )}
                      {config.button.show && (
                        <div style={{
                          display: 'inline-block',
                          background: config.button.color,
                          color: config.button.textColor,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '6px',
                          fontWeight: '600'
                        }}>
                          {config.button.text}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              
              // Article block
              if (config.type === 'article') {
                return (
                  <div style={{
                    background: config.background?.value || '#ffffff',
                    padding: '12px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    {config.title?.show && (
                      <div style={{
                        color: config.title.color || '#000',
                        fontWeight: 'bold',
                        fontSize: '9px',
                        lineHeight: 1.2
                      }}>
                        {config.title.text}
                      </div>
                    )}
                    {config.content && (
                      <div style={{
                        color: '#666',
                        fontSize: '5px',
                        lineHeight: 1.4,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {config.content.text?.substring(0, 80)}...
                      </div>
                    )}
                  </div>
                );
              }
              
              // Footer block
              if (config.type === 'footer') {
                return (
                  <div style={{
                    background: config.background?.value || '#1a1a2e',
                    padding: '10px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '4px'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '6px',
                      fontSize: '4px',
                      color: '#ffffff'
                    }}>
                      <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Company</div>
                        <div style={{ opacity: 0.7 }}>About</div>
                        <div style={{ opacity: 0.7 }}>Contact</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Products</div>
                        <div style={{ opacity: 0.7 }}>Services</div>
                        <div style={{ opacity: 0.7 }}>Pricing</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Legal</div>
                        <div style={{ opacity: 0.7 }}>Privacy</div>
                        <div style={{ opacity: 0.7 }}>Terms</div>
                      </div>
                    </div>
                    <div style={{
                      borderTop: '1px solid rgba(255,255,255,0.2)',
                      paddingTop: '4px',
                      fontSize: '4px',
                      color: 'rgba(255,255,255,0.6)',
                      textAlign: 'center'
                    }}>
                      © 2024 Company
                    </div>
                  </div>
                );
              }
              
              // Features block
              if (config.type === 'features') {
                return (
                  <div style={{
                    background: config.background?.value || '#f9fafb',
                    padding: '12px',
                    height: '100%'
                  }}>
                    {config.title?.show && (
                      <div style={{
                        color: config.title.color || '#000',
                        fontWeight: 'bold',
                        fontSize: '8px',
                        marginBottom: '6px',
                        textAlign: 'center'
                      }}>
                        {config.title.text}
                      </div>
                    )}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '4px'
                    }}>
                      {[1, 2, 3].map(i => (
                        <div key={i} style={{
                          background: '#fff',
                          padding: '4px',
                          borderRadius: '3px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '10px', marginBottom: '2px' }}>✨</div>
                          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#333' }}>Feature {i}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              // Gallery block
              if (config.type === 'gallery') {
                return (
                  <div style={{
                    background: config.background?.value || '#ffffff',
                    padding: '8px',
                    height: '100%'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '3px',
                      height: '100%'
                    }}>
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} style={{
                          background: `hsl(${i * 60}, 70%, 70%)`,
                          borderRadius: '2px',
                          minHeight: '20px'
                        }} />
                      ))}
                    </div>
                  </div>
                );
              }
              
              // Testimonial block
              if (config.type === 'testimonial') {
                return (
                  <div style={{
                    background: config.background?.value || '#f9fafb',
                    padding: '12px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '6px',
                        color: '#666',
                        marginBottom: '4px',
                        lineHeight: 1.3
                      }}>
                        "Great experience..."
                      </div>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#e0e0e0',
                        margin: '0 auto 2px'
                      }} />
                      <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#333' }}>John Doe</div>
                    </div>
                  </div>
                );
              }
              
              // Contact block
              if (config.type === 'contact') {
                return (
                  <div style={{
                    background: config.background?.value || '#ffffff',
                    padding: '12px',
                    height: '100%'
                  }}>
                    <div style={{
                      fontSize: '8px',
                      fontWeight: 'bold',
                      marginBottom: '6px',
                      textAlign: 'center'
                    }}>
                      Get in Touch
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {[1, 2, 3].map(i => (
                        <div key={i} style={{
                          height: '8px',
                          background: '#f0f0f0',
                          borderRadius: '2px'
                        }} />
                      ))}
                      <div style={{
                        height: '10px',
                        background: '#5B4FC9',
                        borderRadius: '2px',
                        marginTop: '2px'
                      }} />
                    </div>
                  </div>
                );
              }
              
              // Pricing block
              if (config.type === 'pricing') {
                return (
                  <div style={{
                    background: config.background?.value || '#f9fafb',
                    padding: '10px',
                    height: '100%'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '4px',
                      height: '100%'
                    }}>
                      {[1, 2, 3].map(i => (
                        <div key={i} style={{
                          background: '#fff',
                          padding: '4px',
                          borderRadius: '3px',
                          border: i === 2 ? '2px solid #5B4FC9' : '1px solid #e0e0e0',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{ fontSize: '5px', fontWeight: 'bold', marginBottom: '2px' }}>
                            Plan {i}
                          </div>
                          <div style={{ fontSize: '8px', fontWeight: 'bold', color: '#5B4FC9' }}>
                            ${i * 10}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              // Generic fallback for remaining types
              return (
                <div style={{
                  background: config.background?.value || '#f9fafb',
                  padding: '12px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{
                    fontSize: '16px',
                    opacity: 0.5
                  }}>
                    📄
                  </div>
                  {config.title?.text && (
                    <div style={{
                      fontSize: '7px',
                      fontWeight: 'bold',
                      color: '#333',
                      textAlign: 'center',
                      lineHeight: 1.2
                    }}>
                      {config.title.text.substring(0, 30)}
                    </div>
                  )}
                  <div style={{
                    fontSize: '5px',
                    color: '#999',
                    textTransform: 'capitalize'
                  }}>
                    {config.type}
                  </div>
                </div>
              );
            };
            
            return (
              <div
                key={block.id}
                className="group cursor-pointer border-2 border-gray-200 rounded-lg overflow-hidden hover:border-indigo-500 hover:shadow-md transition-all"
                onClick={() => onAddBlock(block)}
              >
                <div className={`bg-gray-100 overflow-hidden ${block.config.type === 'menu' ? 'h-16' : 'aspect-video'}`}>
                  {renderThumbnail()}
                </div>
                <div className="p-2.5">
                  <h3 className="font-semibold text-sm text-gray-900 mb-0.5">{block.name}</h3>
                  <p className="text-xs text-gray-500 capitalize">{block.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

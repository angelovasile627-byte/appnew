import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { blockTemplates } from '../../data/mockBlocks';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const BlockSidebar = ({ isOpen, onToggle, onAddBlock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'themes', 'menu', 'hero', 'features', 'article', 'intro', 'cta', 'gallery', 'home', 'parallax', 'text', 'cards', 'testimonial', 'contact', 'pricing', 'footer', 'team', 'stats', 'faq', 'people'];

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
        <div className="flex gap-1 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${
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
                    background: config.background.value,
                    padding: '2px 4px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ color: config.logo.color, fontWeight: 'bold', fontSize: '5px' }}>
                      {config.logo.text}
                    </div>
                    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                      {config.menuItems.slice(0, 3).map((item, i) => (
                        <span key={i} style={{ color: item.color, fontSize: '3.5px' }}>
                          {item.text}
                        </span>
                      ))}
                      {config.button?.show && (
                        <div style={{
                          background: config.button.color,
                          color: config.button.textColor,
                          padding: '1px 3px',
                          borderRadius: '1px',
                          fontSize: '3.5px',
                          fontWeight: '600'
                        }}>
                          {config.button.text}
                        </div>
                      )}
                      {config.socialIcons?.show && config.socialIcons?.items?.length > 0 && (
                        <div style={{ display: 'flex', gap: '1.5px', marginLeft: '2px' }}>
                          {config.socialIcons.items.slice(0, 3).map((icon, i) => (
                            <div
                              key={i}
                              style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '1px',
                                background: icon.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <span style={{ color: 'white', fontSize: '3px' }}>•</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              
              if (config.type === 'hero' || config.type === 'hero-parallax') {
                const bgStyle = config.background.type === 'gradient'
                  ? { background: config.background.value }
                  : config.background.type === 'image'
                  ? { 
                      backgroundImage: `url(${config.background.value})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }
                  : { background: config.background.value };
                
                // Check if hero has image above text layout
                const hasHeroImage = config.heroImage?.show && config.heroImage?.src;
                const hasOverlay = config.overlay?.show || config.background.overlay;
                const overlayColor = config.overlay?.color || config.background.overlayColor || 'rgba(0,0,0,0.5)';
                const overlayOpacity = config.overlay?.opacity ?? 0.5;
                
                return (
                  <div style={{
                    ...bgStyle,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: hasHeroImage ? '8px' : '20px 12px',
                    height: '100%',
                    gap: '6px'
                  }}>
                    {hasOverlay && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: overlayColor,
                        opacity: overlayOpacity
                      }}></div>
                    )}
                    
                    {hasHeroImage && (
                      <div style={{
                        position: 'relative',
                        zIndex: 1,
                        width: '100%',
                        height: '45px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        marginBottom: '4px'
                      }}>
                        <img 
                          src={config.heroImage.src} 
                          alt="Hero preview"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    )}
                    
                    <div style={{ 
                      position: 'relative', 
                      zIndex: 1,
                      textAlign: config.title.align,
                      width: '100%'
                    }}>
                      <div style={{
                        color: config.title.color,
                        fontWeight: 'bold',
                        fontSize: hasHeroImage ? '8px' : '10px',
                        marginBottom: '3px',
                        lineHeight: 1.2
                      }}>
                        {config.title.text.substring(0, 30)}
                      </div>
                      {config.description.show && (
                        <div style={{
                          color: config.description.color,
                          fontSize: '5px',
                          marginBottom: '5px',
                          lineHeight: 1.3
                        }}>
                          {config.description.text.substring(0, 45)}...
                        </div>
                      )}
                      {config.button.show && (
                        <div style={{
                          display: 'inline-block',
                          background: config.button.color,
                          color: config.button.textColor,
                          padding: '3px 6px',
                          borderRadius: '3px',
                          fontSize: '5px',
                          fontWeight: '600'
                        }}>
                          {config.button.text}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              
              // Text Parallax block
              if (config.type === 'text') {
                return (
                  <div style={{
                    position: 'relative',
                    height: '100%',
                    backgroundImage: `url(${config.background?.value || ''})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                  }}>
                    {/* Title with background clip */}
                    {config.title?.show && (
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        backgroundImage: `url(${config.title?.backgroundImage?.value || ''})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center',
                        marginBottom: '4px'
                      }}>
                        {config.title.text}
                      </div>
                    )}
                    
                    {/* Description Preview */}
                    {config.description?.show && (
                      <div style={{
                        fontSize: '4px',
                        color: config.description.color,
                        textAlign: 'center',
                        marginBottom: '4px',
                        lineHeight: 1.2,
                        maxWidth: '90%'
                      }}>
                        {(config.description.text || '').substring(0, 60)}...
                      </div>
                    )}
                    
                    {/* Button Preview */}
                    {config.button?.show && (
                      <div style={{
                        backgroundColor: config.button.color,
                        color: config.button.textColor,
                        padding: '2px 4px',
                        borderRadius: '2px',
                        fontSize: '4px',
                        fontWeight: 600
                      }}>
                        {config.button.text}
                      </div>
                    )}
                  </div>
                );
              }
              
              // Parallax block
              if (config.type === 'parallax') {
                return (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    gap: '0px',
                    overflow: 'hidden'
                  }}>
                    {/* Hero Section Preview */}
                    <div style={{
                      backgroundImage: `url(${config.hero?.background?.value || ''})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      minHeight: '35px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px'
                    }}>
                      {config.hero?.title?.show && (
                        <div style={{
                          color: config.hero.title.color,
                          fontWeight: 700,
                          fontSize: '6px',
                          textAlign: 'center'
                        }}>
                          {(config.hero.title.text || '').substring(0, 20)}
                        </div>
                      )}
                    </div>
                    
                    {/* Spacer Preview */}
                    <div style={{
                      backgroundColor: config.spacer?.backgroundColor || '#333333',
                      minHeight: '10px'
                    }}></div>
                    
                    {/* Cards Section Preview */}
                    <div style={{
                      backgroundImage: `url(${config.cardsSection?.background?.value || ''})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '3px',
                      padding: '4px'
                    }}>
                      {(config.cards || []).slice(0, 3).map((card, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: '22px',
                            height: '28px',
                            backgroundColor: 'white',
                            borderRadius: '2px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <div style={{
                            backgroundImage: `url(${card.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '12px',
                            width: '90%',
                            margin: '2px auto 0'
                          }}></div>
                          <div style={{
                            fontSize: '3px',
                            padding: '2px',
                            textAlign: 'center',
                            color: '#333',
                            fontWeight: 600
                          }}>
                            {(card.title || '').substring(0, 10)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              // Home Parallax block
              if (config.type === 'home-parallax') {
                const firstLayer = config.layers?.[0] || {};
                const text = config.text || {};
                
                return (
                  <div style={{
                    position: 'relative',
                    height: '100%',
                    backgroundImage: `url(${firstLayer.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {/* Show layer indicators */}
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      padding: '1px 3px',
                      borderRadius: '2px',
                      fontSize: '4px',
                      fontWeight: 600
                    }}>
                      {config.layers?.length || 0} layers
                    </div>
                    
                    {/* Central text */}
                    {text.show && (
                      <div style={{
                        color: text.color || '#FFFFFF',
                        fontWeight: text.weight || 700,
                        fontSize: '8px',
                        textAlign: 'center',
                        textShadow: '0 0 3px rgba(0,0,0,0.5)',
                        zIndex: 10
                      }}>
                        {(text.content || 'Bine ai venit!').substring(0, 15)}
                      </div>
                    )}
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
                const columns = config.columns || 3;
                const itemsToShow = Math.min((config.items || []).length, columns);
                
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
                      gridTemplateColumns: `repeat(${columns}, 1fr)`,
                      gap: '4px'
                    }}>
                      {(config.items || []).slice(0, itemsToShow).map((item, i) => (
                        <div key={i} style={{
                          background: '#fff',
                          padding: '4px',
                          borderRadius: '3px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '10px', marginBottom: '2px' }}>✨</div>
                          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#333' }}>
                            {item.title?.substring(0, 10) || `Feature ${i + 1}`}
                          </div>
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

              // Gallery 3D block
              if (config.type === 'gallery-3d') {
                return (
                  <div style={{
                    background: config.background?.value || '#020617',
                    padding: '8px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '2px',
                      height: '60%',
                      perspective: '500px',
                      transformStyle: 'preserve-3d'
                    }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} style={{
                          flex: 1,
                          background: `linear-gradient(135deg, hsl(${i * 45}, 60%, ${40 + i * 5}%), hsl(${i * 45 + 30}, 60%, ${30 + i * 3}%))`,
                          borderRadius: '1px',
                          minWidth: '4px',
                          transform: `rotateY(${i % 2 === 0 ? '5deg' : '-5deg'})`,
                          opacity: 0.7 + (i * 0.03),
                          transition: 'all 0.3s'
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
              
              // People blocks
              if (config.type === 'people-hiring') {
                return (
                  <div style={{
                    background: config.background || '#F8F8F8',
                    padding: '8px',
                    height: '100%'
                  }}>
                    {config.title?.show && (
                      <div style={{
                        fontSize: '8px',
                        fontWeight: 700,
                        color: config.title.color,
                        marginBottom: '4px'
                      }}>
                        {config.title.text}
                      </div>
                    )}
                    <div style={{
                      background: '#ffffff',
                      borderRadius: '4px',
                      padding: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}>
                      {(config.jobs || []).slice(0, 2).map((job, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderBottom: i < 1 ? '1px solid #e5e5e5' : 'none',
                          paddingBottom: '2px'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '5px', fontWeight: 600, color: '#1a1a1a' }}>
                              {job.title}
                            </div>
                            <div style={{ fontSize: '3px', color: '#999999' }}>
                              {job.type}
                            </div>
                          </div>
                          <div style={{
                            background: job.buttonColor,
                            color: job.buttonTextColor,
                            fontSize: '3px',
                            padding: '1px 3px',
                            borderRadius: '2px'
                          }}>
                            {job.buttonText}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              if (config.type === 'people-creators') {
                return (
                  <div style={{
                    background: config.background || '#ffffff',
                    padding: '8px',
                    height: '100%'
                  }}>
                    {config.title?.show && (
                      <div style={{
                        fontSize: '6px',
                        fontWeight: 700,
                        color: config.title.color,
                        marginBottom: '4px',
                        textAlign: 'center'
                      }}>
                        {config.title.text}
                      </div>
                    )}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '3px'
                    }}>
                      {(config.creators || []).slice(0, 3).map((creator, i) => (
                        <div key={i} style={{
                          background: '#f8f8f8',
                          borderRadius: '3px',
                          padding: '3px',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: '#e0e0e0',
                            margin: '0 auto 2px'
                          }} />
                          <div style={{ fontSize: '4px', fontWeight: 600, color: '#1a1a1a' }}>
                            {creator.name.split(' ')[0]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              if (config.type === 'people-testimonials') {
                return (
                  <div style={{
                    background: config.background || '#F8F8F8',
                    padding: '8px',
                    height: '100%'
                  }}>
                    {config.title?.show && (
                      <div style={{
                        fontSize: '6px',
                        fontWeight: 700,
                        color: config.title.color,
                        marginBottom: '4px',
                        textAlign: 'center'
                      }}>
                        {config.title.text}
                      </div>
                    )}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${Math.min(config.columns || 3, 3)}, 1fr)`,
                      gap: '3px'
                    }}>
                      {(config.testimonials || []).slice(0, Math.min(config.columns || 3, 3)).map((test, i) => (
                        <div key={i} style={{
                          background: '#ffffff',
                          borderRadius: '3px',
                          padding: '3px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '4px', marginBottom: '2px' }}>
                            {'⭐'.repeat(test.rating || 5)}
                          </div>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#e0e0e0',
                            margin: '0 auto 2px'
                          }} />
                          <div style={{ fontSize: '3px', fontWeight: 600, color: '#1a1a1a' }}>
                            {test.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              if (config.type === 'people-clients') {
                return (
                  <div style={{
                    background: config.background || '#ffffff',
                    padding: '8px',
                    height: '100%'
                  }}>
                    {config.title?.show && (
                      <div style={{
                        fontSize: '6px',
                        fontWeight: 700,
                        color: config.title.color,
                        marginBottom: '4px',
                        textAlign: 'center'
                      }}>
                        {config.title.text}
                      </div>
                    )}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '3px'
                    }}>
                      {(config.clients || []).slice(0, 3).map((client, i) => (
                        <div key={i} style={{
                          background: client.backgroundColor,
                          borderRadius: '3px',
                          padding: '4px',
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{ fontSize: '8px', marginBottom: '1px' }}>
                            {client.logo}
                          </div>
                          <div style={{ fontSize: '3px', fontWeight: 600, color: client.textColor }}>
                            {client.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              // Theme block - complete website template
              if (config.type === 'theme') {
                return (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    gap: '0px',
                    overflow: 'hidden',
                    background: '#f8f9fa'
                  }}>
                    {/* Mini Menu Bar */}
                    <div style={{
                      background: '#1a1a1a',
                      padding: '2px 4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        color: '#ffffff', 
                        fontSize: '4px', 
                        fontWeight: 'bold' 
                      }}>
                        THEME
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '2px'
                      }}>
                        <div style={{ 
                          color: '#cccccc', 
                          fontSize: '3px' 
                        }}>
                          Menu
                        </div>
                        <div style={{ 
                          color: '#cccccc', 
                          fontSize: '3px' 
                        }}>
                          About
                        </div>
                      </div>
                    </div>
                    
                    {/* Hero Section Preview */}
                    <div style={{
                      backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      minHeight: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px'
                    }}>
                      <div style={{
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '7px',
                        textAlign: 'center'
                      }}>
                        Complete Website
                      </div>
                    </div>
                    
                    {/* Gallery Grid Preview */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '2px',
                      padding: '4px',
                      flex: 1,
                      background: '#ffffff'
                    }}>
                      <div style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=200&h=200&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '20px',
                        borderRadius: '1px'
                      }}></div>
                      <div style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '20px',
                        borderRadius: '1px'
                      }}></div>
                      <div style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '20px',
                        borderRadius: '1px'
                      }}></div>
                    </div>
                    
                    {/* Footer Preview */}
                    <div style={{
                      background: '#1a1a1a',
                      padding: '3px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        color: '#888888', 
                        fontSize: '3px' 
                      }}>
                        Complete Theme
                      </div>
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
                <div className={`bg-gray-100 overflow-hidden ${block.config.type === 'menu' ? 'h-6' : 'aspect-video'}`}>
                  {renderThumbnail()}
                </div>
                <div className="p-2">
                  <h3 className="font-semibold text-xs text-gray-900">{block.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
